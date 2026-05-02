const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const { moodSpace: upload } = require('../middleware/upload');
const controller = require('../controllers/atmosphereController');

// Timeline — must be declared before /:id so Express doesn't treat "timeline" as an id
router.get('/timeline', auth, controller.timeline);

// Read routes use optional auth so that:
//   - Public spaces are visible to everyone
//   - Private spaces are visible to their owner (token present + matches)
//   - mine=true listing works for logged-in users
router.get('/',    optionalAuth, controller.list);
router.get('/:id', optionalAuth, controller.get);

// Write routes require a valid token
router.post('/',      auth, upload, controller.create);
router.put('/:id',    auth, upload, controller.update);
router.delete('/:id', auth,         controller.remove);

module.exports = router;
