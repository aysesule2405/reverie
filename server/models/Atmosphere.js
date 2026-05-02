const mongoose = require('mongoose');

const AtmosphereSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  reflection: { type: String, trim: true },
  moodTags: [{ type: String, trim: true }],
  emotions: [{ type: String, trim: true }],
  category: { type: String, trim: true },
  coverImageUrl: { type: String, trim: true },
  imageUrls: [{ type: String }],
  songLinks: [{ type: String }],
  colorPalette: [{ type: String }],
  aiPrompt: { type: String, trim: true },
  aiResult: { type: String, trim: true },
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Atmosphere', AtmosphereSchema);
