const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: String,
  problem: String,
  starterCode: String,
  testCases: [String],
  solution: String
});

module.exports = mongoose.model('Exercise', exerciseSchema);
