const mongoose = require('mongoose');

const ClassMaterialSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    uploaderName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    fileType: {
      type: String,
      default: 'PDF',
    },

    postedDate: {
      type: String,
      default: '',
    },

    size: {
      type: String,
      default: '',
    },

    fileUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassMaterial', ClassMaterialSchema);