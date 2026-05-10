const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true
  },
  fullName: { type: String, required: true },
  school: { type: String, required: true },
  className: { type: String },
  dob: { type: Date, required: true },
  province: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },

  resetPasswordTokenHash: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);