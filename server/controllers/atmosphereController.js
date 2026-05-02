const Atmosphere = require('../models/Atmosphere');

// ── Helper ────────────────────────────────────────────────────────────────────
/**
 * Build file path strings from multer's req.files object.
 * e.g. { images: [{ filename: 'abc.jpg', ... }] }
 *   → ['/uploads/images/abc.jpg']
 */
function extractFilePaths(files, field, subDir) {
  if (!files || !files[field]) return [];
  return files[field].map((f) => `/uploads/${subDir}/${f.filename}`);
}

/**
 * Parse a JSON string array from a FormData text field.
 * Falls back gracefully if the value is already an array or is missing.
 */
function parseArrayField(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Treat a plain comma-separated string as a list
    return value.split(',').map((s) => s.trim()).filter(Boolean);
  }
}

// ── GET /api/atmospheres/timeline ────────────────────────────────────────────
// Returns the logged-in user's own mood spaces sorted by newest first.
// Supports optional filters: ?mood= ?visibility= ?startDate= ?endDate=
exports.timeline = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const { mood, visibility, startDate, endDate } = req.query;
    const filter = { user: req.user._id };

    if (mood)       filter.mood       = mood;
    if (visibility) filter.visibility = visibility;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const items = await Atmosphere.find(filter)
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    next(err);
  }
};

// ── GET /api/atmospheres ──────────────────────────────────────────────────────
exports.list = async (req, res, next) => {
  try {
    const { category, tag, q, mine, mood } = req.query;
    const filter = {};

    // "mine=true" → return ALL of this user's spaces (any visibility)
    if (mine === 'true' && req.user) {
      filter.user = req.user._id;
    } else {
      // Public listing for everyone
      filter.visibility = 'public';
    }

    if (category) filter.category = category;
    if (mood)     filter.mood = mood;
    if (tag)      filter.moodTags = tag;
    if (q)        filter.title = { $regex: q, $options: 'i' };

    const items = await Atmosphere.find(filter)
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    next(err);
  }
};

// ── GET /api/atmospheres/:id ──────────────────────────────────────────────────
exports.get = async (req, res, next) => {
  try {
    const item = await Atmosphere.findById(req.params.id)
      .populate('user', 'name avatarUrl')
      .populate('libraryItems');
    if (!item) return res.status(404).json({ message: 'Mood space not found' });

    // Block access to private spaces by non-owners
    const isOwner = req.user && item.user._id.toString() === req.user._id.toString();
    if (item.visibility === 'private' && !isOwner) {
      return res.status(403).json({ message: 'This mood space is private' });
    }

    // Attach like/save counts and current-user state without exposing raw ID arrays
    const userId = req.user?._id;
    const obj = item.toObject();
    obj.likeCount = item.likes.length;
    obj.saveCount = item.saves.length;
    obj.isLiked   = userId ? item.likes.some((id) => id.toString() === userId.toString()) : false;
    obj.isSaved   = userId ? item.saves.some((id) => id.toString() === userId.toString()) : false;
    delete obj.likes;
    delete obj.saves;

    res.json(obj);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/atmospheres ─────────────────────────────────────────────────────
exports.create = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    // req.body contains text fields from FormData (or JSON body)
    const {
      title,
      mood,
      description,
      reflection,
      category,
      visibility,
      coverImageUrl,
      aiPrompt,
      aiResult,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Arrays may arrive as JSON strings when sent via FormData
    const moodTags     = parseArrayField(req.body.moodTags);
    const emotions     = parseArrayField(req.body.emotions);
    const songLinks    = parseArrayField(req.body.songLinks);
    const colorPalette = parseArrayField(req.body.colorPalette);
    const imageUrls    = parseArrayField(req.body.imageUrls);
    const videos       = parseArrayField(req.body.videos);
    const libraryItems = parseArrayField(req.body.libraryItems);

    // Extract paths for locally uploaded files (from multer)
    const uploadedImages = extractFilePaths(req.files, 'images', 'images');
    const uploadedAudios = extractFilePaths(req.files, 'audios', 'audio');
    const uploadedVideos = extractFilePaths(req.files, 'videos', 'videos');

    const data = {
      user: req.user._id,
      title: title.trim(),
      mood: mood ? mood.trim() : undefined,
      description: description ? description.trim() : undefined,
      reflection: reflection ? reflection.trim() : undefined,
      category: category ? category.trim() : undefined,
      visibility: visibility || 'private',
      coverImageUrl: coverImageUrl ? coverImageUrl.trim() : undefined,
      moodTags,
      emotions,
      songLinks,
      colorPalette,
      imageUrls,
      // Merge body video URLs (external) with locally uploaded video paths
      videos: [...videos, ...uploadedVideos],
      libraryItems,
      aiPrompt: aiPrompt ? aiPrompt.trim() : undefined,
      aiResult: aiResult ? aiResult.trim() : undefined,
      images: uploadedImages,
      audios: uploadedAudios,
    };

    const created = await Atmosphere.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/atmospheres/:id ──────────────────────────────────────────────────
exports.update = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const item = await Atmosphere.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Mood space not found' });

    // Only the owner can edit
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own mood spaces' });
    }

    const {
      title, mood, description, reflection, category,
      visibility, coverImageUrl, aiPrompt, aiResult,
    } = req.body;

    if (title !== undefined) item.title = title.trim();
    if (mood !== undefined) item.mood = mood.trim();
    if (description !== undefined) item.description = description.trim();
    if (reflection !== undefined) item.reflection = reflection.trim();
    if (category !== undefined) item.category = category.trim();
    if (visibility !== undefined) item.visibility = visibility;
    if (coverImageUrl !== undefined) item.coverImageUrl = coverImageUrl.trim();
    if (aiPrompt !== undefined) item.aiPrompt = aiPrompt.trim();
    if (aiResult !== undefined) item.aiResult = aiResult.trim();

    if (req.body.moodTags !== undefined)     item.moodTags     = parseArrayField(req.body.moodTags);
    if (req.body.emotions !== undefined)     item.emotions     = parseArrayField(req.body.emotions);
    if (req.body.songLinks !== undefined)    item.songLinks    = parseArrayField(req.body.songLinks);
    if (req.body.colorPalette !== undefined) item.colorPalette = parseArrayField(req.body.colorPalette);
    if (req.body.imageUrls !== undefined)    item.imageUrls    = parseArrayField(req.body.imageUrls);

    // Append any newly uploaded files (don't erase existing ones)
    const newImages = extractFilePaths(req.files, 'images', 'images');
    const newAudios = extractFilePaths(req.files, 'audios', 'audio');
    const newVideos = extractFilePaths(req.files, 'videos', 'videos');
    if (newImages.length) item.images = [...(item.images || []), ...newImages];
    if (newAudios.length) item.audios = [...(item.audios || []), ...newAudios];

    // keepVideos: explicit list of existing video URLs to retain (sent by edit form).
    // If provided, replace item.videos with that list, then append newly uploaded files.
    // This is how individual video deletion from the edit form works.
    if (req.body.keepVideos !== undefined) {
      item.videos = parseArrayField(req.body.keepVideos);
    }
    if (newVideos.length) item.videos = [...(item.videos || []), ...newVideos];

    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/atmospheres/:id ───────────────────────────────────────────────
exports.remove = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    const item = await Atmosphere.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Mood space not found' });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own mood spaces' });
    }

    await Atmosphere.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mood space deleted' });
  } catch (err) {
    next(err);
  }
};
