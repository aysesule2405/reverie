const User = require('../models/User');

// Helper: shape the user object consistently for all responses
function formatUser(user) {
  return {
    id:               user._id,
    name:             user.name,
    email:            user.email,
    avatarUrl:        user.avatarUrl,
    backgroundMusic:  user.backgroundMusic,
    musicSettings:    user.musicSettings,
  };
}

// ── GET /api/profile ──────────────────────────────────────────────────────────
// Returns the full profile for the logged-in user including music preferences.
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user: formatUser(user) });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/profile ──────────────────────────────────────────────────────────
// Update display name, avatar URL, background music preference, and music settings.
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatarUrl, backgroundMusic, musicSettings } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });

    const updates = { name: name.trim() };
    if (avatarUrl !== undefined)        updates.avatarUrl       = avatarUrl;
    if (backgroundMusic !== undefined)  updates.backgroundMusic = backgroundMusic;
    if (musicSettings !== undefined)    updates.musicSettings   = musicSettings;

    const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/profile/photo ───────────────────────────────────────────────────
// Upload a profile photo; the uploaded path becomes the user's avatarUrl.
exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No photo file provided.' });

    const photoUrl = `/uploads/profiles/${req.file.filename}`;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: photoUrl },
      { new: true }
    ).select('-password');

    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/profile/music ───────────────────────────────────────────────────
// Upload a custom background music file; saves it as the user's backgroundMusic.
exports.uploadMusic = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No music file provided.' });

    const musicUrl = `/uploads/music/${req.file.filename}`;
    const track = {
      type: 'upload',
      name: req.file.originalname.replace(/\.[^/.]+$/, ''), // strip file extension
      url:  musicUrl,
    };

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { backgroundMusic: track },
      { new: true }
    ).select('-password');

    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/profile/music ─────────────────────────────────────────────────
// Clears the saved background music preference.
exports.deleteMusic = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { backgroundMusic: '' } },
      { new: true }
    ).select('-password');

    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};
