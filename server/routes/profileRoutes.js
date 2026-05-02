const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { profilePhoto, music } = require('../middleware/upload');
const c = require('../controllers/profileController');

// Profile
router.get('/',                   auth,             c.getProfile);
router.put('/',                   auth,             c.updateProfile);
router.post('/photo',             auth, profilePhoto, c.uploadPhoto);

// Music playlist
router.get('/music',              auth,             c.getMusicPlaylist);
router.post('/music/upload',      auth, music,      c.uploadMusicTrack);
router.post('/music/link',        auth,             c.linkMusicTrack);
router.put('/music/active',       auth,             c.setActiveTrack);
router.put('/music/settings',     auth,             c.updateMusicSettings);
router.delete('/music/:trackId',  auth,             c.deleteTrack);

module.exports = router;
