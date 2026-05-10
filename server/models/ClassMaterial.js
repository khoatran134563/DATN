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
      enum: ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'XLS', 'XLSX', 'TXT', 'OTHER'],
      default: 'OTHER',
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassMaterial', ClassMaterialSchema);