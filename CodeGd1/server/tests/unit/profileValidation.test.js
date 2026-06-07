const {
  normalizeProfilePayload,
  validateProfilePayload,
  getDisplayRole,
} = require('../../utils/profileValidation');



describe('Unit Test - Profile Normalization', () => {
  test('Chuẩn hóa dữ liệu profile bằng cách trim khoảng trắng', () => {
    const result = normalizeProfilePayload({
      fullName: ' Trần Đăng Khoa ',
      school: ' THPT Trịnh Hoài Đức ',
      className: ' 11A2 ',
      dob: '2009-05-05',
      province: ' Lạng Sơn ',
      bio: ' Giáo viên Hóa học ',
    });

    expect(result).toEqual({
      fullName: 'Trần Đăng Khoa',
      school: 'THPT Trịnh Hoài Đức',
      className: '11A2',
      dob: '2009-05-05',
      province: 'Lạng Sơn',
      bio: 'Giáo viên Hóa học',
    });
  });

  test('Nếu bio không có thì trả về chuỗi rỗng', () => {
    const result = normalizeProfilePayload({
      fullName: 'A',
      school: 'B',
      dob: '2009-05-05',
      province: 'C',
    });

    expect(result.bio).toBe('');
  });
});

describe('Unit Test - Profile Validation', () => {
  const validProfile = {
    fullName: 'Trần Đăng Khoa',
    school: 'THPT Trịnh Hoài Đức',
    className: '11A2',
    dob: '2009-05-05',
    province: 'Lạng Sơn',
    bio: '',
  };

  test('Profile hợp lệ thì không báo lỗi', () => {
    expect(validateProfilePayload(validProfile)).toBe(null);
  });

  test('Thiếu họ tên thì báo lỗi', () => {
    expect(validateProfilePayload({ ...validProfile, fullName: '' })).toBe(
      'Họ và tên không được để trống.'
    );
  });

  test('Thiếu trường học thì báo lỗi', () => {
    expect(validateProfilePayload({ ...validProfile, school: '' })).toBe(
      'Đơn vị công tác / Trường không được để trống.'
    );
  });

  test('Thiếu ngày sinh thì báo lỗi', () => {
    expect(validateProfilePayload({ ...validProfile, dob: '' })).toBe(
      'Ngày sinh không được để trống.'
    );
  });

  test('Ngày sinh sai định dạng thì báo lỗi', () => {
    expect(validateProfilePayload({ ...validProfile, dob: 'abc' })).toBe(
      'Ngày sinh không hợp lệ.'
    );
  });

  test('Thiếu tỉnh thành thì báo lỗi', () => {
    expect(validateProfilePayload({ ...validProfile, province: '' })).toBe(
      'Tỉnh / Thành phố không được để trống.'
    );
  });
});

describe('Unit Test - User Role Display', () => {
  test('Hiển thị đúng vai trò học sinh', () => {
    expect(getDisplayRole('student')).toBe('Học sinh');
  });

  test('Hiển thị đúng vai trò giáo viên', () => {
    expect(getDisplayRole('teacher')).toBe('Giáo viên');
  });

  test('Hiển thị đúng vai trò admin', () => {
    expect(getDisplayRole('admin')).toBe('Quản trị viên');
  });

  test('Role lạ thì hiển thị Người dùng', () => {
    expect(getDisplayRole('guest')).toBe('Người dùng');
  });
});