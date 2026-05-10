const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    subject: { type: String, default: 'Hóa học' },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacherName: { type: String, required: true, trim: true },

    thumbnail: { type: String, default: '' },
    requiresApproval: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['active', 'hidden'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Classroom', ClassroomSchema);