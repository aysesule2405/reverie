const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { profilePhoto, music } = require('../middleware/upload');
const c = require('../controllers/profileController');

// All profile routes require a valid JWT
router.get('/',             auth,                    c.getProfile);
router.put('/',             auth,                    c.updateProfile);
router.post('/photo',       auth, profilePhoto,      c.uploadPhoto);
router.post('/music',       auth, music,             c.uploadMusic);
router.delete('/music',     auth,                    c.deleteMusic);

module.exports = router;
