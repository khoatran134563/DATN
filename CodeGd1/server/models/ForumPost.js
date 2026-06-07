const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema(
  {
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
      enum: ['teacher', 'admin'],
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Thông báo chung',
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      default: '',
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'active', 'rejected', 'hidden'],
      default: 'pending',
    },

    rejectedReason: {
      type: String,
      default: '',
      trim: true,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ForumPost', ForumPostSchema);