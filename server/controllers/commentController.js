const Comment = require('../models/Comment');
const Atmosphere = require('../models/Atmosphere');

exports.list = async (req, res, next) => {
  try {
    const comments = await Comment.find({ atmosphere: req.params.atmosphereId })
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Comment text is required.' });

    const atmosphere = await Atmosphere.findById(req.params.atmosphereId);
    if (!atmosphere) return res.status(404).json({ message: 'Mood space not found.' });

    const isOwner = atmosphere.user.toString() === req.user._id.toString();
    if (atmosphere.visibility === 'private' && !isOwner) {
      return res.status(403).json({ message: 'Cannot comment on a private mood space.' });
    }

    const comment = await Comment.create({
      text: text.trim(),
      user: req.user._id,
      atmosphere: atmosphere._id,
    });

    const populated = await comment.populate('user', 'name avatarUrl');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};
