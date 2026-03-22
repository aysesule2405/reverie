const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/favoriteController');

router.get('/', auth, controller.list);
router.post('/:atmosphereId', auth, controller.add);
router.delete('/:atmosphereId', auth, controller.remove);

module.exports = router;
