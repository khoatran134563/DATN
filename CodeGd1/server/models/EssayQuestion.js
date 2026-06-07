const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
  quiz_id: String,
  title: String,
  content: String,
  hints: [String],
  solution: String
});

module.exports = mongoose.model('EssayQuestion', EssaySchema);