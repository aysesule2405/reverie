const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const c = require('../controllers/communityController');

// Public feed — optionalAuth lets logged-in users receive isLiked/isSaved state
router.get('/spaces',     optionalAuth, c.listSpaces);
router.get('/spaces/:id', optionalAuth, c.getSpace);

// Saved inspirations — requires login
router.get('/saved', auth, c.getSaved);

// Like and save toggles — require login
router.post('/spaces/:id/like', auth, c.toggleLike);
router.post('/spaces/:id/save', auth, c.toggleSave);

// Comments — public listing (optionalAuth), protected write/delete
router.post('/spaces/:id/comments',              auth, c.addComment);
router.delete('/spaces/:id/comments/:commentId', auth, c.deleteComment);

module.exports = router;
