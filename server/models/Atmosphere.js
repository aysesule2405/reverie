const mongoose = require('mongoose');

/**
 * MoodSpace (Atmosphere) Schema
 *
 * Each document belongs to one user via the `user` field (ObjectId ref).
 * Uploaded files are stored on disk; only their paths are saved here.
 */
const AtmosphereSchema = new mongoose.Schema(
  {
    // ── Ownership ──────────────────────────────────────────────────────────
    // Every mood space is tied to the user who created it.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ── Core content ───────────────────────────────────────────────────────
    title: { type: String, required: true, trim: true },

    // The single selected mood (e.g. "peaceful", "energetic")
    mood: { type: String, trim: true },

    description: { type: String, trim: true }, // journal / freeform text
    reflection: { type: String, trim: true },  // private note

    // ── Categorisation & tags ──────────────────────────────────────────────
    category: { type: String, trim: true },
    moodTags: [{ type: String, trim: true }],  // extra keyword tags
    emotions: [{ type: String, trim: true }],  // emotion labels

    // ── Uploaded media ─────────────────────────────────────────────────────
    // Paths are relative to the server root, e.g. "/uploads/images/abc.jpg"
    // The binary file lives on disk; MongoDB only stores the path string.
    images: [{ type: String }],   // local image uploads
    audios: [{ type: String }],   // local audio uploads

    // ── External links & palette ───────────────────────────────────────────
    coverImageUrl: { type: String, trim: true }, // remote cover image URL
    imageUrls: [{ type: String }],               // remote gallery URLs
    songLinks: [{ type: String }],               // Spotify / YouTube links
    colorPalette: [{ type: String }],            // hex color swatches

    // ── AI mood board ──────────────────────────────────────────────────────
    aiPrompt: { type: String, trim: true },
    aiResult: { type: String, trim: true },

    // ── Visibility ─────────────────────────────────────────────────────────
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },

    // ── Community interactions ──────────────────────────────────────────────
    // Arrays of user IDs — each user can appear at most once (enforced in controller)
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    // Adds createdAt and updatedAt automatically
    timestamps: true,
  }
);

module.exports = mongoose.model('Atmosphere', AtmosphereSchema);
