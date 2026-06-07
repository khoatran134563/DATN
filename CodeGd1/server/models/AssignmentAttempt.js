const mongoose = require('mongoose');

const ClassAssignmentAttemptSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },

    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassAssignment',
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    answers: {
      type: Map,
      of: String,
      default: {},
    },

    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ['in_progress', 'submitted'],
      default: 'in_progress',
    },

    score: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
    },

    correctCount: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

ClassAssignmentAttemptSchema.index(
  { classroomId: 1, assignmentId: 1, studentId: 1 },
  { unique: true }
);

module.exports = mongoose.model('ClassAssignmentAttempt', ClassAssignmentAttemptSchema);