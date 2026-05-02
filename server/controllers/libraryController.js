const path = require('path');
const fs   = require('fs');
const MediaItem = require('../models/MediaItem');

function detectType(mimeType) {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'audio';
}

function uploadUrl(file) {
  const mime = file.mimetype;
  if (mime.startsWith('image/')) return `/uploads/library/images/${file.filename}`;
  if (mime.startsWith('video/')) return `/uploads/library/videos/${file.filename}`;
  return `/uploads/library/audio/${file.filename}`;
}

// ── GET /api/library ──────────────────────────────────────────────────────────
// Returns all media items owned by the logged-in user.
// Optional query: ?type=image|video|audio
exports.list = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (['image', 'video', 'audio'].includes(req.query.type)) {
      filter.type = req.query.type;
    }
    const items = await MediaItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// ── GET /api/library/:id ──────────────────────────────────────────────────────
exports.getOne = async (req, res, next) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Media item not found.' });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/library/upload ──────────────────────────────────────────────────
// Upload a single file (image, video, or audio) to the library.
exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file provided.' });

    const type  = detectType(req.file.mimetype);
    const url   = uploadUrl(req.file);
    const title = (req.body.title?.trim() || req.file.originalname.replace(/\.[^/.]+$/, ''));

    const item = await MediaItem.create({
      user:         req.user._id,
      title,
      type,
      url,
      originalName: req.file.originalname,
      mimeType:     req.file.mimetype,
      size:         req.file.size,
      source:       'upload',
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/library/link ────────────────────────────────────────────────────
// Add an external media URL (no file upload).
exports.link = async (req, res, next) => {
  try {
    const { title, url, type } = req.body;
    if (!url?.trim()) return res.status(400).json({ message: 'URL is required.' });
    if (!['image', 'video', 'audio'].includes(type)) {
      return res.status(400).json({ message: 'type must be image, video, or audio.' });
    }

    const item = await MediaItem.create({
      user:   req.user._id,
      title:  title?.trim() || url.trim(),
      type,
      url:    url.trim(),
      source: 'external',
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/library/:id ──────────────────────────────────────────────────────
// Rename/update the title of a library item.
exports.update = async (req, res, next) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Media item not found.' });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    if (req.body.title !== undefined) item.title = req.body.title.trim();
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/library/:id ───────────────────────────────────────────────────
// Delete a library item and its file from disk (if a local upload).
exports.remove = async (req, res, next) => {
  try {
    const item = await MediaItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Media item not found.' });
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    if (item.source === 'upload' && item.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', item.url);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch { /* ignore deletion errors */ }
      }
    }

    await MediaItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Media item deleted.' });
  } catch (err) {
    next(err);
  }
};
