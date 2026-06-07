const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    quiz_id: {
      type: String,
      required: true,
      trim: true,
    },
    question_text: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length >= 2 && value.every((item) => String(item).trim());
        },
        message: 'Câu hỏi phải có ít nhất 2 đáp án hợp lệ.',
      },
    },
    correct_index: {
      type: Number,
      required: true,
      min: 0,
    },
    explanation: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);