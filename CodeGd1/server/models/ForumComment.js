const mongoose = require('mongoose');

const ForumCommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumPost',
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
      enum: ['student', 'teacher', 'admin'],
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumComment',
      default: null,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['active', 'hidden'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ForumComment', ForumCommentSchema);