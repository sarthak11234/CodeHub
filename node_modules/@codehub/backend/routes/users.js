const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authMiddleware } = require('../middleware/auth');

router.get('/me', authMiddleware, usersController.getProfile);
router.get('/progress', authMiddleware, usersController.getProgress);

module.exports = router;
