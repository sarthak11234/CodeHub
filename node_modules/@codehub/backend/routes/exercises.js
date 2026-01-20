const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercisesController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getExerciseById);
router.post('/', authMiddleware, adminMiddleware, exercisesController.createExercise);
router.put('/:id', authMiddleware, adminMiddleware, exercisesController.updateExercise);
router.delete('/:id', authMiddleware, adminMiddleware, exercisesController.deleteExercise);

module.exports = router;
