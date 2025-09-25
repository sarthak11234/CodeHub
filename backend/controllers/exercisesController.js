const Exercise = require('../models/Exercise');

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createExercise = async (req, res) => {
  const exercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    duration: req.body.duration,
    // ...other fields...
  });

  try {
    const savedExercise = await exercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) return res.status(404).json({ message: 'Exercise not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};