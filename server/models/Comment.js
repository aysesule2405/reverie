const mongoose = require('mongoose');

/**
 * Comment Schema
 * Each comment belongs to one user and one atmosphere (moodboard).
 * Only the text, user ref, and atmosphere ref are required.
 */
const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Comments cannot exceed 500 characters'],
    },
    // The user who wrote the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The moodboard the comment belongs to
    atmosphere: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Atmosphere',
      required: true,
    },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

module.exports = mongoose.model('Comment', CommentSchema);
