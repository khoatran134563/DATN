const mongoose = require('mongoose');

const ClassPostSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: { type: String, required: true, trim: true },
    authorRole: {
      type: String,
      enum: ['teacher', 'student'],
      required: true,
    },
    content: { type: String, default: '', trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassPost', ClassPostSchema);