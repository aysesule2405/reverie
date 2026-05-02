const Atmosphere = require('../models/Atmosphere');
const Comment = require('../models/Comment');

// ── Helper ────────────────────────────────────────────────────────────────────
// Converts a Mongoose Atmosphere document into a plain object enriched with
// like/save counts and whether the requesting user has liked/saved it.
// The raw likes/saves ID arrays are stripped for privacy.
function withMeta(space, userId) {
  const obj = space.toObject();
  obj.likeCount = space.likes.length;
  obj.saveCount = space.saves.length;
  obj.isLiked   = userId ? space.likes.some((id) => id.toString() === userId.toString()) : false;
  obj.isSaved   = userId ? space.saves.some((id) => id.toString() === userId.toString()) : false;
  delete obj.likes;
  delete obj.saves;
  return obj;
}

// ── GET /api/community/spaces ─────────────────────────────────────────────────
// Returns all public mood spaces. Supports ?q= (title/description search) and
// ?category= filtering. optionalAuth populates req.user when a token is present
// so we can return isLiked/isSaved for logged-in users.
exports.listSpaces = async (req, res, next) => {
  try {
    const { category, q } = req.query;
    const filter = { visibility: 'public' };

    if (category) filter.category = category;
    if (q) {
      const regex = { $regex: q, $options: 'i' };
      filter.$or = [{ title: regex }, { description: regex }];
    }

    const spaces = await Atmosphere.find(filter)
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });

    const userId = req.user?._id;
    res.json(spaces.map((s) => withMeta(s, userId)));
  } catch (err) {
    next(err);
  }
};

// ── GET /api/community/spaces/:id ─────────────────────────────────────────────
exports.getSpace = async (req, res, next) => {
  try {
    const space = await Atmosphere.findById(req.params.id).populate('user', 'name avatarUrl');
    if (!space) return res.status(404).json({ message: 'Mood space not found.' });
    if (space.visibility !== 'public') return res.status(403).json({ message: 'This mood space is private.' });

    const userId = req.user?._id;
    res.json(withMeta(space, userId));
  } catch (err) {
    next(err);
  }
};

// ── POST /api/community/spaces/:id/like ───────────────────────────────────────
// Toggles a like. Calling it again removes the like (idempotent toggle).
exports.toggleLike = async (req, res, next) => {
  try {
    const space = await Atmosphere.findById(req.params.id);
    if (!space) return res.status(404).json({ message: 'Mood space not found.' });
    if (space.visibility !== 'public') return res.status(403).json({ message: 'Cannot like a private mood space.' });

    const userId = req.user._id.toString();
    const idx = space.likes.findIndex((id) => id.toString() === userId);

    if (idx > -1) {
      space.likes.splice(idx, 1);   // unlike
    } else {
      space.likes.push(req.user._id); // like
    }

    await space.save();
    res.json({ likeCount: space.likes.length, isLiked: idx === -1 });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/community/spaces/:id/save ───────────────────────────────────────
// Toggles a save. Calling it again removes the save (idempotent toggle).
exports.toggleSave = async (req, res, next) => {
  try {
    const space = await Atmosphere.findById(req.params.id);
    if (!space) return res.status(404).json({ message: 'Mood space not found.' });
    if (space.visibility !== 'public') return res.status(403).json({ message: 'Cannot save a private mood space.' });

    const userId = req.user._id.toString();
    const idx = space.saves.findIndex((id) => id.toString() === userId);

    if (idx > -1) {
      space.saves.splice(idx, 1);    // unsave
    } else {
      space.saves.push(req.user._id); // save
    }

    await space.save();
    res.json({ saveCount: space.saves.length, isSaved: idx === -1 });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/community/spaces/:id/comments ───────────────────────────────────
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Comment text is required.' });

    const space = await Atmosphere.findById(req.params.id);
    if (!space) return res.status(404).json({ message: 'Mood space not found.' });
    if (space.visibility !== 'public') return res.status(403).json({ message: 'Cannot comment on a private mood space.' });

    const comment = await Comment.create({
      text: text.trim(),
      user: req.user._id,
      atmosphere: space._id,
    });
    const populated = await comment.populate('user', 'name avatarUrl');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/community/spaces/:id/comments/:commentId ─────────────────────
// Only the comment author OR the mood-space owner can delete a comment.
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    const space = await Atmosphere.findById(req.params.id);
    if (!space) return res.status(404).json({ message: 'Mood space not found.' });

    const isCommentOwner = comment.user.toString() === req.user._id.toString();
    const isSpaceOwner   = space.user.toString()   === req.user._id.toString();

    if (!isCommentOwner && !isSpaceOwner) {
      return res.status(403).json({ message: 'Not authorized to delete this comment.' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted.' });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/community/saved ──────────────────────────────────────────────────
// Returns all public mood spaces the current user has saved.
exports.getSaved = async (req, res, next) => {
  try {
    const spaces = await Atmosphere.find({ saves: req.user._id, visibility: 'public' })
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });

    res.json(spaces.map((s) => withMeta(s, req.user._id)));
  } catch (err) {
    next(err);
  }
};
