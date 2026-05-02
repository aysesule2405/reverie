const mongoose = require('mongoose');

const MediaItemSchema = new mongoose.Schema(
  {
    user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:        { type: String, required: true, trim: true },
    type:         { type: String, enum: ['image', 'video', 'audio'], required: true },
    url:          { type: String, required: true },
    originalName: { type: String },
    mimeType:     { type: String },
    size:         { type: Number },
    source:       { type: String, enum: ['upload', 'external'], default: 'upload' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MediaItem', MediaItemSchema);
