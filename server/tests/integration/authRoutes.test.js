const express = require('express');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';
process.env.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const mockSave = jest.fn();

jest.mock('../../models/User', () => {
  const MockUser = jest.fn().mockImplementation((data) => ({
    _id: 'new-user-id',
    ...data,
    save: mockSave,
  }));

  MockUser.findOne = jest.fn();
  MockUser.findById = jest.fn();

  return MockUser;
});

jest.mock('../../config/mailer', () => ({
  sendResetPasswordEmail: jest.fn(),
}));

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const User = require('../../models/User');
const { sendResetPasswordEmail } = require('../../config/mailer');
const authRoutes = require('../../routes/authRoutes');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  return app;
};

const validStudentPayload = {
  role: 'student',
  fullName: 'Nguyễn Văn A',
  school: 'THPT Trịnh Hoài Đức',
  className: '11A1',
  dob: '2008-01-01',
  province: 'Bình Dương',
  email: 'student@test.com',
  password: 'Password123',
};

const validTeacherPayload = {
  role: 'teacher',
  fullName: 'Trần Đăng Khoa',
  school: 'THPT Trịnh Hoài Đức',
  className: '',
  dob: '2005-05-05',
  province: 'Lạng Sơn',
  email: 'teacher@test.com',
  password: 'Password123',
};

const makeUser = (overrides = {}) => ({
  _id: 'user-id',
  role: 'student',
  fullName: 'Nguyễn Văn A',
  school: 'THPT Trịnh Hoài Đức',
  className: '11A1',
  dob: '2008-01-01',
  province: 'Bình Dương',
  email: 'student@test.com',
  password: 'hashed-password',
  status: 'active',
  bio: '',
  resetPasswordTokenHash: null,
  resetPasswordExpires: null,
  save: jest.fn().mockResolvedValue(true),
  ...overrides,
});

describe('Integration Test - Auth Routes', () => {
  let app;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  beforeEach(() => {
    app = createApp();
    jest.clearAllMocks();

    mockSave.mockResolvedValue(true);
    bcrypt.genSalt.mockResolvedValue('mock-salt');
    bcrypt.hash.mockResolvedValue('hashed-password');
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mock-token');
    jwt.verify.mockReturnValue({
      userId: 'user-id',
      role: 'student',
    });
    sendResetPasswordEmail.mockResolvedValue(true);
  });

  // ===============================
  // REGISTER
  // ===============================

  test('POST /api/auth/register - thiếu role thì trả về 400', async () => {
    const { role, ...payload } = validStudentPayload;

    const res = await request(app)
      .post('/api/auth/register')
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('role');
    expect(res.body.message).toBe('Vui lòng chọn vai trò!');
  });

  test('POST /api/auth/register - role admin không được phép đăng ký', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validTeacherPayload,
        role: 'admin',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.field).toBe('role');
    expect(res.body.message).toBe('Không được phép tạo tài khoản này!');
  });

  test('POST /api/auth/register - thiếu họ tên thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        fullName: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('fullName');
  });

  test('POST /api/auth/register - thiếu trường học thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        school: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('school');
  });

  test('POST /api/auth/register - học sinh thiếu lớp thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        className: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('className');
  });

  test('POST /api/auth/register - giáo viên không cần nhập lớp vẫn đăng ký được', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/register')
      .send(validTeacherPayload);

    expect(res.statusCode).toBe(201);
    expect(User).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'teacher',
        className: '',
        email: 'teacher@test.com',
        status: 'active',
      })
    );
  });

  test('POST /api/auth/register - thiếu ngày sinh thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        dob: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('dob');
  });

  test('POST /api/auth/register - thiếu tỉnh thành thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        province: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('province');
  });

  test('POST /api/auth/register - thiếu email thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        email: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
  });

  test('POST /api/auth/register - email sai định dạng thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        email: 'email-sai-dinh-dang',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
    expect(res.body.message).toBe('Email không đúng định dạng!');
  });

  test('POST /api/auth/register - thiếu mật khẩu thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        password: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
  });

  test('POST /api/auth/register - mật khẩu yếu thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        password: '123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
  });

  test('POST /api/auth/register - email đã tồn tại thì trả về 400', async () => {
    User.findOne.mockResolvedValue(makeUser());

    const res = await request(app)
      .post('/api/auth/register')
      .send(validStudentPayload);

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
    expect(res.body.message).toBe('Email này đã được sử dụng!');
  });

  test('POST /api/auth/register - học sinh đăng ký thành công', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...validStudentPayload,
        email: '  STUDENT@TEST.COM  ',
        fullName: '  Nguyễn Văn A  ',
        school: '  THPT Trịnh Hoài Đức  ',
        className: '  11A1  ',
        province: '  Bình Dương  ',
      });

    expect(res.statusCode).toBe(201);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 'mock-salt');
    expect(User).toHaveBeenCalledWith(
      expect.objectContaining({
        role: 'student',
        fullName: 'Nguyễn Văn A',
        school: 'THPT Trịnh Hoài Đức',
        className: '11A1',
        province: 'Bình Dương',
        email: 'student@test.com',
        password: 'hashed-password',
        status: 'active',
      })
    );
    expect(mockSave).toHaveBeenCalled();
    expect(res.body.message).toBe('Đăng ký tài khoản học sinh thành công!');
  });

  test('POST /api/auth/register - lỗi server khi lưu tài khoản', async () => {
    User.findOne.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/api/auth/register')
      .send(validStudentPayload);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi đăng ký tài khoản.');
  });

  // ===============================
  // LOGIN
  // ===============================

  test('POST /api/auth/login - thiếu email thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        password: 'Password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
  });

  test('POST /api/auth/login - thiếu mật khẩu thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'student@test.com',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
  });

  test('POST /api/auth/login - email không tồn tại', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'notfound@test.com',
        password: 'Password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
    expect(res.body.message).toBe('Email không tồn tại trong hệ thống!');
  });

  test('POST /api/auth/login - tài khoản bị khóa', async () => {
    User.findOne.mockResolvedValue(
      makeUser({
        status: 'locked',
      })
    );

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'student@test.com',
        password: 'Password123',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.field).toBe('email');
    expect(res.body.message).toContain('Tài khoản của bạn đã bị khóa');
  });

  test('POST /api/auth/login - sai mật khẩu', async () => {
    User.findOne.mockResolvedValue(makeUser());
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'student@test.com',
        password: 'WrongPassword123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
    expect(res.body.message).toBe('Mật khẩu không đúng!');
  });

  test('POST /api/auth/login - đăng nhập thành công', async () => {
    const mockUser = makeUser({
      _id: 'teacher-id',
      fullName: 'Trần Đăng Khoa',
      email: 'teacher@test.com',
      role: 'teacher',
      school: 'THPT Trịnh Hoài Đức',
      className: '',
      dob: '2005-05-05',
      province: 'Lạng Sơn',
      bio: 'Giáo viên Hóa học',
    });

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('login-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: '  TEACHER@TEST.COM  ',
        password: 'Password123',
      });

    expect(res.statusCode).toBe(200);
    expect(User.findOne).toHaveBeenCalledWith({ email: 'teacher@test.com' });
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'teacher-id',
        fullName: 'Trần Đăng Khoa',
        role: 'teacher',
      }),
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    expect(res.body.token).toBe('login-token');
    expect(res.body.user.role).toBe('teacher');
    expect(res.body.user.bio).toBe('Giáo viên Hóa học');
  });

  test('POST /api/auth/login - lỗi server', async () => {
    User.findOne.mockRejectedValue(new Error('Login database error'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'student@test.com',
        password: 'Password123',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi đăng nhập.');
  });

  // ===============================
  // FORGOT PASSWORD
  // ===============================

  test('POST /api/auth/forgot-password - thiếu email thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
  });

  test('POST /api/auth/forgot-password - email không tồn tại', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'notfound@test.com',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('email');
  });

  test('POST /api/auth/forgot-password - tài khoản bị khóa', async () => {
    User.findOne.mockResolvedValue(
      makeUser({
        status: 'locked',
      })
    );

    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'student@test.com',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toContain('Tài khoản của bạn đã bị khóa');
  });

  test('POST /api/auth/forgot-password - gửi email reset mật khẩu thành công', async () => {
    const mockUser = makeUser({
      email: 'student@test.com',
      fullName: 'Nguyễn Văn A',
    });

    User.findOne.mockResolvedValue(mockUser);

    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: '  STUDENT@TEST.COM  ',
      });

    expect(res.statusCode).toBe(200);
    expect(User.findOne).toHaveBeenCalledWith({ email: 'student@test.com' });
    expect(mockUser.resetPasswordTokenHash).toBeTruthy();
    expect(mockUser.resetPasswordExpires).toBeInstanceOf(Date);
    expect(mockUser.save).toHaveBeenCalled();
    expect(sendResetPasswordEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'student@test.com',
        fullName: 'Nguyễn Văn A',
        resetLink: expect.stringContaining('/reset-password/'),
      })
    );
    expect(res.body.message).toBe('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
  });

  test('POST /api/auth/forgot-password - lỗi gửi email thì trả về 500', async () => {
    User.findOne.mockResolvedValue(makeUser());
    sendResetPasswordEmail.mockRejectedValue(new Error('Mail error'));

    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'student@test.com',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Không thể gửi email đặt lại mật khẩu.');
  });

  // ===============================
  // RESET PASSWORD
  // ===============================

  test('POST /api/auth/reset-password/:token - thiếu mật khẩu mới', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: '',
        confirmPassword: 'Password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
  });

  test('POST /api/auth/reset-password/:token - mật khẩu yếu', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: '123456',
        confirmPassword: '123456',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('password');
  });

  test('POST /api/auth/reset-password/:token - thiếu xác nhận mật khẩu', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'Password123',
        confirmPassword: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('confirmPassword');
  });

  test('POST /api/auth/reset-password/:token - xác nhận mật khẩu không khớp', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'Password123',
        confirmPassword: 'Password456',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('confirmPassword');
    expect(res.body.message).toBe('Mật khẩu xác nhận không khớp!');
  });

  test('POST /api/auth/reset-password/:token - token không hợp lệ hoặc hết hạn', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'Password123',
        confirmPassword: 'Password123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
  });

  test('POST /api/auth/reset-password/:token - tài khoản bị khóa', async () => {
    User.findOne.mockResolvedValue(
      makeUser({
        status: 'locked',
      })
    );

    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'Password123',
        confirmPassword: 'Password123',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toContain('Tài khoản của bạn đã bị khóa');
  });

  test('POST /api/auth/reset-password/:token - đặt lại mật khẩu thành công', async () => {
    const mockUser = makeUser({
      resetPasswordTokenHash: 'old-hash',
      resetPasswordExpires: new Date(Date.now() + 100000),
    });

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.hash.mockResolvedValue('new-hashed-password');

    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'NewPassword123',
        confirmPassword: 'NewPassword123',
      });

    expect(res.statusCode).toBe(200);
    expect(User.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        resetPasswordTokenHash: expect.any(String),
        resetPasswordExpires: expect.objectContaining({
          $gt: expect.any(Date),
        }),
      })
    );
    expect(mockUser.password).toBe('new-hashed-password');
    expect(mockUser.resetPasswordTokenHash).toBeNull();
    expect(mockUser.resetPasswordExpires).toBeNull();
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.body.message).toBe('Đặt lại mật khẩu thành công. Bạn có thể đăng nhập lại.');
  });

  test('POST /api/auth/reset-password/:token - lỗi server', async () => {
    User.findOne.mockRejectedValue(new Error('Reset database error'));

    const res = await request(app)
      .post('/api/auth/reset-password/raw-token')
      .send({
        password: 'Password123',
        confirmPassword: 'Password123',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Không thể đặt lại mật khẩu.');
  });

  // ===============================
  // UPDATE PROFILE
  // ===============================

  test('PUT /api/auth/profile - không có token thì trả về 401', async () => {
    const res = await request(app)
      .put('/api/auth/profile')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Bạn chưa đăng nhập.');
  });

  test('PUT /api/auth/profile - token sai hoặc hết hạn thì trả về 401', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer invalid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.');
  });

  test('PUT /api/auth/profile - user không tồn tại thì trả về 404', async () => {
    jwt.verify.mockReturnValue({
      userId: 'missing-user-id',
      role: 'student',
    });

    User.findById.mockResolvedValue(null);

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy tài khoản.');
  });

  test('PUT /api/auth/profile - tài khoản bị khóa thì trả về 403', async () => {
    User.findById.mockResolvedValue(
      makeUser({
        status: 'locked',
      })
    );

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Tài khoản của bạn đã bị khóa. Không thể cập nhật hồ sơ.');
  });

  test('PUT /api/auth/profile - admin không được cập nhật hồ sơ tại đây', async () => {
    User.findById.mockResolvedValue(
      makeUser({
        role: 'admin',
      })
    );

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Admin',
        school: 'ChemLearn',
        dob: '2000-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Tài khoản quản trị không cập nhật hồ sơ tại đây.');
  });

  test('PUT /api/auth/profile - thiếu họ tên thì trả về 400', async () => {
    User.findById.mockResolvedValue(makeUser());

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: '',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('fullName');
  });

  test('PUT /api/auth/profile - thiếu trường thì trả về 400', async () => {
    User.findById.mockResolvedValue(makeUser());

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: '',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('school');
  });

  test('PUT /api/auth/profile - học sinh thiếu lớp thì trả về 400', async () => {
    User.findById.mockResolvedValue(
      makeUser({
        role: 'student',
      })
    );

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('className');
  });

  test('PUT /api/auth/profile - thiếu ngày sinh thì trả về 400', async () => {
    User.findById.mockResolvedValue(makeUser());

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('dob');
  });

  test('PUT /api/auth/profile - thiếu tỉnh thành thì trả về 400', async () => {
    User.findById.mockResolvedValue(makeUser());

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.field).toBe('province');
  });

  test('PUT /api/auth/profile - học sinh cập nhật hồ sơ thành công', async () => {
    const mockUser = makeUser({
      role: 'student',
    });

    User.findById.mockResolvedValue(mockUser);

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: '  Nguyễn Văn B  ',
        school: '  THPT ABC  ',
        className: '  11A2  ',
        dob: '2008-02-02',
        province: '  Đồng Nai  ',
        bio: '  Học sinh yêu thích Hóa học  ',
      });

    expect(res.statusCode).toBe(200);
    expect(mockUser.fullName).toBe('Nguyễn Văn B');
    expect(mockUser.school).toBe('THPT ABC');
    expect(mockUser.className).toBe('11A2');
    expect(mockUser.province).toBe('Đồng Nai');
    expect(mockUser.bio).toBe('Học sinh yêu thích Hóa học');
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.body.message).toBe('Cập nhật hồ sơ thành công.');
    expect(res.body.user.fullName).toBe('Nguyễn Văn B');
  });

  test('PUT /api/auth/profile - giáo viên cập nhật hồ sơ thành công và className rỗng', async () => {
    const mockUser = makeUser({
      role: 'teacher',
      className: '12A1',
    });

    User.findById.mockResolvedValue(mockUser);

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Trần Đăng Khoa',
        school: 'THPT Trịnh Hoài Đức',
        className: '11A1',
        dob: '2005-05-05',
        province: 'Lạng Sơn',
        bio: '',
      });

    expect(res.statusCode).toBe(200);
    expect(mockUser.className).toBe('');
    expect(res.body.user.role).toBe('teacher');
  });

  test('PUT /api/auth/profile - lỗi server', async () => {
    User.findById.mockRejectedValue(new Error('Profile database error'));

    const res = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer valid-token')
      .send({
        fullName: 'Nguyễn Văn A',
        school: 'THPT ABC',
        className: '11A1',
        dob: '2008-01-01',
        province: 'TP.HCM',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi cập nhật hồ sơ.');
  });
});