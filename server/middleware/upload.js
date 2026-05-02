const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ── Ensure all upload folders exist at server start ───────────────────────────
const UPLOADS_ROOT  = path.join(__dirname, '..', 'uploads');
const IMAGE_DIR     = path.join(UPLOADS_ROOT, 'images');
const AUDIO_DIR     = path.join(UPLOADS_ROOT, 'audio');
const PROFILES_DIR  = path.join(UPLOADS_ROOT, 'profiles');
const MUSIC_DIR     = path.join(UPLOADS_ROOT, 'music');

[IMAGE_DIR, AUDIO_DIR, PROFILES_DIR, MUSIC_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Shared filename generator ─────────────────────────────────────────────────
function uniqueFilename(originalname) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return unique + path.extname(originalname).toLowerCase();
}

// ── 1. Mood-space upload (images + audios) ────────────────────────────────────
// Used by atmosphere create/update routes.
const moodSpaceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file.fieldname === 'images' ? IMAGE_DIR : AUDIO_DIR);
  },
  filename: (req, file, cb) => cb(null, uniqueFilename(file.originalname)),
});

function moodSpaceFilter(req, file, cb) {
  if (file.fieldname === 'images' && !file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed for the images field'));
  }
  if (file.fieldname === 'audios' && !file.mimetype.startsWith('audio/')) {
    return cb(new Error('Only audio files are allowed for the audios field'));
  }
  cb(null, true);
}

const moodSpace = multer({
  storage: moodSpaceStorage,
  fileFilter: moodSpaceFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
  { name: 'images', maxCount: 5 },
  { name: 'audios', maxCount: 3 },
]);

// ── 2. Profile photo upload ───────────────────────────────────────────────────
// Single image file, stored in uploads/profiles/
const profilePhotoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PROFILES_DIR),
  filename: (_req, file, cb) => cb(null, uniqueFilename(file.originalname)),
});

function profilePhotoFilter(_req, file, cb) {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Only jpg, jpeg, png, and webp images are allowed.'));
  }
  cb(null, true);
}

const profilePhoto = multer({
  storage: profilePhotoStorage,
  fileFilter: profilePhotoFilter,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB max
}).single('photo');

// ── 3. Background music upload ────────────────────────────────────────────────
// Single audio file, stored in uploads/music/
const musicStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, MUSIC_DIR),
  filename: (_req, file, cb) => cb(null, uniqueFilename(file.originalname)),
});

function musicFilter(_req, file, cb) {
  if (!file.mimetype.startsWith('audio/')) {
    return cb(new Error('Only audio files are allowed.'));
  }
  cb(null, true);
}

const music = multer({
  storage: musicStorage,
  fileFilter: musicFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single('music');

module.exports = { moodSpace, profilePhoto, music };
