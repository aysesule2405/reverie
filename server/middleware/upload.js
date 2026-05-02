const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ── Ensure all upload folders exist at server start ───────────────────────────
const UPLOADS_ROOT      = path.join(__dirname, '..', 'uploads');
const IMAGE_DIR         = path.join(UPLOADS_ROOT, 'images');
const AUDIO_DIR         = path.join(UPLOADS_ROOT, 'audio');
const VIDEO_DIR         = path.join(UPLOADS_ROOT, 'videos');
const PROFILES_DIR      = path.join(UPLOADS_ROOT, 'profiles');
const MUSIC_DIR         = path.join(UPLOADS_ROOT, 'music');
const LIB_IMAGES_DIR    = path.join(UPLOADS_ROOT, 'library', 'images');
const LIB_VIDEOS_DIR    = path.join(UPLOADS_ROOT, 'library', 'videos');
const LIB_AUDIO_DIR     = path.join(UPLOADS_ROOT, 'library', 'audio');

[IMAGE_DIR, AUDIO_DIR, VIDEO_DIR, PROFILES_DIR, MUSIC_DIR, LIB_IMAGES_DIR, LIB_VIDEOS_DIR, LIB_AUDIO_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Shared filename generator ─────────────────────────────────────────────────
function uniqueFilename(originalname) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return unique + path.extname(originalname).toLowerCase();
}

// ── 1. Mood-space upload (images + audios) ────────────────────────────────────
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

const moodSpaceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'images') cb(null, IMAGE_DIR);
    else if (file.fieldname === 'audios') cb(null, AUDIO_DIR);
    else cb(null, VIDEO_DIR); // 'videos' field
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
  if (file.fieldname === 'videos' && !ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
    return cb(new Error('Only mp4, webm, and mov video files are allowed'));
  }
  cb(null, true);
}

const moodSpace = multer({
  storage: moodSpaceStorage,
  fileFilter: moodSpaceFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB — covers large video files
}).fields([
  { name: 'images', maxCount: 5 },
  { name: 'audios', maxCount: 3 },
  { name: 'videos', maxCount: 3 },
]);

// ── 2. Profile photo upload ───────────────────────────────────────────────────
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
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('photo');

// ── 3. Background music upload ────────────────────────────────────────────────
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

// ── 4. Personal media library upload (image / video / audio) ─────────────────
// Routes files to the appropriate subfolder based on detected MIME type.
const libraryStorage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/'))      cb(null, LIB_IMAGES_DIR);
    else if (file.mimetype.startsWith('video/')) cb(null, LIB_VIDEOS_DIR);
    else if (file.mimetype.startsWith('audio/')) cb(null, LIB_AUDIO_DIR);
    else cb(new Error('Unsupported file type'));
  },
  filename: (_req, file, cb) => cb(null, uniqueFilename(file.originalname)),
});

function libraryFilter(_req, file, cb) {
  const ok =
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('audio/') ||
    ['video/mp4', 'video/webm', 'video/quicktime'].includes(file.mimetype);
  if (!ok) {
    return cb(new Error('Unsupported file type. Allowed: jpg, png, webp, mp3, wav, ogg, mp4, webm.'));
  }
  cb(null, true);
}

const libraryUpload = multer({
  storage: libraryStorage,
  fileFilter: libraryFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max (for video)
}).single('file');

module.exports = { moodSpace, profilePhoto, music, libraryUpload };
