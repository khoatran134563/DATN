const mongoose = require('mongoose');

const ClassCommentSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassPost',
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    authorRole: {
      type: String,
      enum: ['teacher', 'student'],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

ClassCommentSchema.index({ classroomId: 1, postId: 1, createdAt: 1 });

module.exports = mongoose.model('ClassComment', ClassCommentSchema);