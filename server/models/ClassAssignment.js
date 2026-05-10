const mongoose = require('mongoose');

const AssignmentQuestionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['multiple-choice', 'fill-in'],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  { _id: true }
);

const ClassAssignmentSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    createdByName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      default: 'Chưa phân loại',
      trim: true,
    },


    deadline: {
      type: Date,
      default: null,
    },

    durationMinutes: {
      type: Number,
      default: 15,
      min: 1,
    },

    questions: {
      type: [AssignmentQuestionSchema],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'Bài tập phải có ít nhất 1 câu hỏi.',
      },
    },

    status: {
      type: String,
      enum: ['active', 'hidden'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassAssignment', ClassAssignmentSchema);