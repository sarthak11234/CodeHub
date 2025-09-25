require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const topicRoutes = require('./routes/topics');
const exerciseRoutes = require('./routes/exercises');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
