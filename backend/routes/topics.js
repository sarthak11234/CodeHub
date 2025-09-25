const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', topicsController.getAllTopics);
router.get('/:id', topicsController.getTopicById);
router.post('/', authMiddleware, adminMiddleware, topicsController.createTopic);
router.put('/:id', authMiddleware, adminMiddleware, topicsController.updateTopic);
router.delete('/:id', authMiddleware, adminMiddleware, topicsController.deleteTopic);

module.exports = router;
