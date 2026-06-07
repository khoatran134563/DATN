const mongoose = require('mongoose');

const ClassMemberSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    fullName: { type: String, required: true, trim: true },
    school: { type: String, default: '' },
    className: { type: String, default: '' },

    role: {
      type: String,
      enum: ['teacher', 'student'],
      required: true,
    },

    joinStatus: {
      type: String,
      enum: ['approved', 'pending'],
      default: 'approved',
    },

    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ClassMemberSchema.index({ classroomId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('ClassMember', ClassMemberSchema);