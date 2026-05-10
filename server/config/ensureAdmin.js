const bcrypt = require('bcryptjs');
const User = require('../models/User');

const ensureAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFullName = process.env.ADMIN_FULLNAME || 'ChemLearn Admin';

    if (!adminEmail || !adminPassword) {
      console.log('⚠️ Chưa cấu hình ADMIN_EMAIL hoặc ADMIN_PASSWORD, bỏ qua tạo admin.');
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`👑 Tài khoản admin đã tồn tại: ${adminEmail}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      role: 'admin',
      fullName: adminFullName,
      school: 'ChemLearn System',
      className: '',
      dob: new Date('2000-01-01'),
      province: 'TP. Hồ Chí Minh',
      email: adminEmail,
      password: hashedPassword
    });

    console.log(`👑 Đã tạo sẵn tài khoản admin: ${adminEmail}`);
  } catch (error) {
    console.error('❌ Lỗi tạo admin mặc định:', error);
  }
};

module.exports = ensureAdmin;