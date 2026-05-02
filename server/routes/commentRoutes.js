const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const optionalAuth = require('../middleware/optionalAuth');
const controller = require('../controllers/commentController');

router.get('/:atmosphereId',  optionalAuth, controller.list);
router.post('/:atmosphereId', auth,         controller.create);

module.exports = router;
