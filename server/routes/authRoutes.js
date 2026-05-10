const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const { sendResetPasswordEmail } = require('../config/mailer');

const JWT_SECRET = process.env.JWT_SECRET;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { role, fullName, school, className, dob, province, email, password } = req.body;

    if (!role) {
      return res.status(400).json({ field: 'role', message: 'Vui lòng chọn vai trò!' });
    }

    if (!['student', 'teacher'].includes(role)) {
      return res.status(403).json({ field: 'role', message: 'Không được phép tạo tài khoản này!' });
    }

    if (!fullName?.trim()) {
      return res.status(400).json({ field: 'fullName', message: 'Vui lòng nhập họ tên!' });
    }

    if (!school?.trim()) {
      return res.status(400).json({ field: 'school', message: 'Vui lòng nhập tên trường!' });
    }

    if (role === 'student' && !className?.trim()) {
      return res.status(400).json({ field: 'className', message: 'Học sinh phải nhập lớp!' });
    }

    if (!dob) {
      return res.status(400).json({ field: 'dob', message: 'Vui lòng chọn ngày sinh!' });
    }

    if (!province?.trim()) {
      return res.status(400).json({ field: 'province', message: 'Vui lòng chọn tỉnh/thành phố!' });
    }

    if (!email?.trim()) {
      return res.status(400).json({ field: 'email', message: 'Vui lòng nhập email!' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ field: 'email', message: 'Email không đúng định dạng!' });
    }

    if (!password) {
      return res.status(400).json({ field: 'password', message: 'Vui lòng nhập mật khẩu!' });
    }

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        field: 'password',
        message: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số!'
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ field: 'email', message: 'Email này đã được sử dụng!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      role,
      fullName: fullName.trim(),
      school: school.trim(),
      className: role === 'student' ? className.trim() : '',
      dob,
      province: province.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: `Đăng ký tài khoản ${role === 'teacher' ? 'giáo viên' : 'học sinh'} thành công!`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký tài khoản.' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ field: 'email', message: 'Vui lòng nhập email!' });
    }

    if (!password) {
      return res.status(400).json({ field: 'password', message: 'Vui lòng nhập mật khẩu!' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ field: 'email', message: 'Email không tồn tại trong hệ thống!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ field: 'password', message: 'Mật khẩu không đúng!' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        fullName: user.fullName,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        school: user.school || '',
        className: user.className || '',
        dob: user.dob || '',
        province: user.province || ''
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ field: 'email', message: 'Vui lòng nhập email!' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ field: 'email', message: 'Email không tồn tại trong hệ thống!' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    await sendResetPasswordEmail({
      to: user.email,
      fullName: user.fullName,
      resetLink,
    });

    res.json({ message: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.' });
  } catch (error) {
    console.error('FORGOT PASSWORD ERROR =', error);
    res.status(500).json({ message: 'Không thể gửi email đặt lại mật khẩu.' });
  }
});

// RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password) {
      return res.status(400).json({ field: 'password', message: 'Vui lòng nhập mật khẩu mới.' });
    }

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        field: 'password',
        message: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số!'
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({ field: 'confirmPassword', message: 'Vui lòng xác nhận mật khẩu mới.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ field: 'confirmPassword', message: 'Mật khẩu xác nhận không khớp!' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordTokenHash = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({ message: 'Đặt lại mật khẩu thành công. Bạn có thể đăng nhập lại.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể đặt lại mật khẩu.' });
  }
});

module.exports = router;