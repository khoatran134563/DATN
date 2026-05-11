const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter(req, file, cb) {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Chỉ hỗ trợ JPG, PNG, WEBP, GIF hoặc PDF.'));
    }

    cb(null, true);
  },
});

const uploadBufferToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    stream.end(fileBuffer);
  });
};

router.post('/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file cần upload.' });
    }

    const folder = req.body.folder || 'chemlearn';

    const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder,
      resource_type: resourceType,
    });

    return res.status(201).json({
      message: 'Upload file thành công.',
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        bytes: result.bytes,
        originalName: req.file.originalname,
      },
    });
  } catch (error) {
    console.error('UPLOAD CLOUDINARY ERROR =', error);

    return res.status(500).json({
      message: error.message || 'Không thể upload file lên Cloudinary.',
    });
  }
});

module.exports = router;