const mongoose = require('mongoose');

const PlaylistTrackSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  type:      { type: String, enum: ['default', 'upload', 'external'], required: true },
  url:       { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  avatarUrl: { type: String },

  // ── Background music playlist ──────────────────────────────────────────────
  backgroundMusicPlaylist: [PlaylistTrackSchema],

  // The track currently selected for ambient playback
  activeBackgroundTrack: {
    _id:  { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    type: { type: String },
    url:  { type: String },
  },

  // Persistent volume / loop preferences
  musicSettings: {
    volume: { type: Number, default: 0.5 },
    loop:   { type: Boolean, default: true },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
