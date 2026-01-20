const Topic = require('../models/Topic');

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTopic = async (req, res) => {
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
    if (!deletedTopic) return res.status(404).json({ message: 'Topic not found' });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};