const User = require('../models/User');

// Helper: shape the user object consistently for all profile responses
function formatUser(user) {
  return {
    id:                     user._id,
    name:                   user.name,
    email:                  user.email,
    avatarUrl:              user.avatarUrl,
    backgroundMusicPlaylist: user.backgroundMusicPlaylist || [],
    activeBackgroundTrack:  user.activeBackgroundTrack || null,
    musicSettings:          user.musicSettings || { volume: 0.5, loop: true },
  };
}

// ── GET /api/profile ──────────────────────────────────────────────────────────
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
// Updates name and optional avatarUrl.
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatarUrl } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });

    const updates = { name: name.trim() };
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/profile/photo ───────────────────────────────────────────────────
exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No photo file provided.' });
    const photoUrl = `/uploads/profiles/${req.file.filename}`;
    const updated = await User.findByIdAndUpdate(req.user._id, { avatarUrl: photoUrl }, { new: true }).select('-password');
    res.json({ user: formatUser(updated) });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/profile/music ────────────────────────────────────────────────────
// Returns the full playlist, active track, and settings.
exports.getMusicPlaylist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('backgroundMusicPlaylist activeBackgroundTrack musicSettings');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({
      playlist:    user.backgroundMusicPlaylist || [],
      activeTrack: user.activeBackgroundTrack   || null,
      settings:    user.musicSettings           || { volume: 0.5, loop: true },
    });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/profile/music/upload ────────────────────────────────────────────
// Upload an audio file and add it to the playlist.
exports.uploadMusicTrack = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No music file provided.' });

    const track = {
      name: (req.body.name || req.file.originalname.replace(/\.[^/.]+$/, '')).trim(),
      type: 'upload',
      url:  `/uploads/music/${req.file.filename}`,
    };

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { backgroundMusicPlaylist: track } },
      { new: true }
    ).select('-password');

    const added = updated.backgroundMusicPlaylist[updated.backgroundMusicPlaylist.length - 1];
    res.status(201).json({ track: added, playlist: updated.backgroundMusicPlaylist });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/profile/music/link ──────────────────────────────────────────────
// Add an external URL or default track to the playlist.
exports.linkMusicTrack = async (req, res, next) => {
  try {
    const { name, url, type = 'external' } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Track name is required.' });
    if (!url?.trim())  return res.status(400).json({ message: 'Track URL is required.' });

    const validTypes = ['default', 'external'];
    const trackType = validTypes.includes(type) ? type : 'external';

    const track = { name: name.trim(), type: trackType, url: url.trim() };

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { backgroundMusicPlaylist: track } },
      { new: true }
    ).select('-password');

    const added = updated.backgroundMusicPlaylist[updated.backgroundMusicPlaylist.length - 1];
    res.status(201).json({ track: added, playlist: updated.backgroundMusicPlaylist });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/profile/music/active ─────────────────────────────────────────────
// Set the active background track by playlist item _id.
exports.setActiveTrack = async (req, res, next) => {
  try {
    const { trackId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    let activeTrack = null;

    if (trackId) {
      const found = user.backgroundMusicPlaylist.id(trackId);
      if (!found) return res.status(404).json({ message: 'Track not found in playlist.' });
      activeTrack = { _id: found._id, name: found.name, type: found.type, url: found.url };
    }
    // trackId null/missing → clears the active track

    user.activeBackgroundTrack = activeTrack;
    await user.save();
    res.json({ activeTrack: user.activeBackgroundTrack });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/profile/music/:trackId ───────────────────────────────────────
// Remove a track from the playlist. Clears active if it was the active track.
exports.deleteTrack = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const track = user.backgroundMusicPlaylist.id(req.params.trackId);
    if (!track) return res.status(404).json({ message: 'Track not found.' });

    // Clear active track if it matched the one being deleted
    if (user.activeBackgroundTrack?._id?.toString() === req.params.trackId) {
      user.activeBackgroundTrack = undefined;
    }

    user.backgroundMusicPlaylist.pull({ _id: req.params.trackId });
    await user.save();

    res.json({ playlist: user.backgroundMusicPlaylist });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/profile/music/settings ──────────────────────────────────────────
// Update volume and loop preferences.
exports.updateMusicSettings = async (req, res, next) => {
  try {
    const { volume, loop } = req.body;
    const settings = {};
    if (volume !== undefined) settings['musicSettings.volume'] = Math.max(0, Math.min(1, Number(volume)));
    if (loop   !== undefined) settings['musicSettings.loop']   = Boolean(loop);

    const updated = await User.findByIdAndUpdate(req.user._id, { $set: settings }, { new: true }).select('-password');
    res.json({ settings: updated.musicSettings });
  } catch (err) {
    next(err);
  }
};
