const validateRegisterInput = (data) => {
  if (!data.role) return { valid: false, field: 'role' };
  if (!['student', 'teacher'].includes(data.role)) {
    return { valid: false, field: 'role' };
  }

  if (!data.fullName || !data.fullName.trim()) {
    return { valid: false, field: 'fullName' };
  }

  if (!data.school || !data.school.trim()) {
    return { valid: false, field: 'school' };
  }

  if (!data.dob) {
    return { valid: false, field: 'dob' };
  }

  if (!data.province || !data.province.trim()) {
    return { valid: false, field: 'province' };
  }

  if (!data.email || !data.email.trim()) {
    return { valid: false, field: 'email' };
  }

  if (!data.email.includes('@')) {
    return { valid: false, field: 'email' };
  }

  if (!data.password || data.password.length < 6) {
    return { valid: false, field: 'password' };
  }

  return { valid: true, field: null };
};

describe('Unit Test - Auth Register Validation Logic', () => {
  const validPayload = {
    role: 'student',
    fullName: 'Nguyễn Văn A',
    school: 'THPT ABC',
    className: '11A1',
    dob: '2008-01-01',
    province: 'TP.HCM',
    email: 'student@test.com',
    password: 'Password123',
  };

  test('Dữ liệu đăng ký hợp lệ thì trả về valid true', () => {
    const result = validateRegisterInput(validPayload);

    expect(result).toEqual({
      valid: true,
      field: null,
    });
  });

  test('Thiếu role thì không hợp lệ', () => {
    const result = validateRegisterInput({
      ...validPayload,
      role: '',
    });

    expect(result).toEqual({
      valid: false,
      field: 'role',
    });
  });

  test('Role admin không được phép đăng ký từ form thường', () => {
    const result = validateRegisterInput({
      ...validPayload,
      role: 'admin',
    });

    expect(result).toEqual({
      valid: false,
      field: 'role',
    });
  });

  test('Thiếu họ tên thì không hợp lệ', () => {
    const result = validateRegisterInput({
      ...validPayload,
      fullName: '',
    });

    expect(result).toEqual({
      valid: false,
      field: 'fullName',
    });
  });

  test('Email sai định dạng thì không hợp lệ', () => {
    const result = validateRegisterInput({
      ...validPayload,
      email: 'student-test.com',
    });

    expect(result).toEqual({
      valid: false,
      field: 'email',
    });
  });

  test('Mật khẩu dưới 6 ký tự thì không hợp lệ', () => {
    const result = validateRegisterInput({
      ...validPayload,
      password: '123',
    });

    expect(result).toEqual({
      valid: false,
      field: 'password',
    });
  });
});