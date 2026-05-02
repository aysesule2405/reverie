const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  avatarUrl: { type: String },

  // ── Background ambience music preference ───────────────────────────────────
  // Stores the track the user selected. type is one of: 'default', 'upload', 'external'
  backgroundMusic: {
    type: { type: String },   // 'default' | 'upload' | 'external'
    name: { type: String },
    url:  { type: String },
  },

  // Persistent player settings (volume/loop are also stored in localStorage,
  // this is the server-side backup so preferences survive device switches)
  musicSettings: {
    volume: { type: Number, default: 0.5 },
    loop:   { type: Boolean, default: true },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
