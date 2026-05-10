const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  quiz_id: String,
  question_text: String,
  options: [String],
  correct_index: Number,
  explanation: String
});

module.exports = mongoose.model('Question', QuestionSchema);