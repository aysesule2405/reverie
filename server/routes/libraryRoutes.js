const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { libraryUpload } = require('../middleware/upload');
const c = require('../controllers/libraryController');

// All routes require authentication — library is private per user
router.get('/',          auth,                c.list);
router.get('/:id',       auth,                c.getOne);
router.post('/upload',   auth, libraryUpload, c.upload);
router.post('/link',     auth,                c.link);
router.put('/:id',       auth,                c.update);
router.delete('/:id',    auth,                c.remove);

module.exports = router;
