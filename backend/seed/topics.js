const mongoose = require('mongoose');
const Topic = require('../models/Topic');

const topics = [
  {
    title: 'HTML Tags',
    description: 'Basic building blocks of web pages.',
    examples: ['<h1>Hello World</h1>', '<p>This is a paragraph.</p>'],
    videoURL: 'https://www.youtube.com/embed/UB1O30fR-EE'
  },
  {
    title: 'CSS Selectors',
    description: 'Select and style HTML elements.',
    examples: ['p { color: red; }', '.container { margin: 0 auto; }'],
    videoURL: 'https://www.youtube.com/embed/yfoY53QXEnI'
  },
  {
    title: 'JS Closures',
    description: 'Functions with preserved scope.',
    examples: ['function outer() { let x = 1; function inner() { return x; } return inner; }'],
    videoURL: 'https://www.youtube.com/embed/1JsJx1x35c0'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Topic.deleteMany({});
    await Topic.insertMany(topics);
    console.log('Sample topics seeded');
    process.exit();
  })
  .catch(err => console.error(err));
