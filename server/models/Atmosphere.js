const mongoose = require('mongoose');

const AtmosphereSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  moodTags: [{ type: String }],
  category: { type: String },
  coverImageUrl: { type: String },
  imageUrls: [{ type: String }],
  songLinks: [{ type: String }],
  colorPalette: [{ type: String }],
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Atmosphere', AtmosphereSchema);
