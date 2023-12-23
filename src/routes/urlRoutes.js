const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/shorten', authMiddleware.authenticate, urlController.shorten);
router.get('/:shortUrl', urlController.redirect);

module.exports = router;
