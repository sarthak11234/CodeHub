const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  progress: { type: mongoose.Schema.Types.Mixed, default: {} },
  notes: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);
