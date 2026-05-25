const normalizeProfilePayload = (body = {}) => {
  return {
    fullName: String(body.fullName || '').trim(),
    school: String(body.school || '').trim(),
    className: String(body.className || '').trim(),
    dob: body.dob || '',
    province: String(body.province || '').trim(),
    bio: String(body.bio || '').trim(),
  };
};

const validateProfilePayload = (payload = {}) => {
  if (!payload.fullName) return 'Họ và tên không được để trống.';
  if (!payload.school) return 'Đơn vị công tác / Trường không được để trống.';
  if (!payload.dob) return 'Ngày sinh không được để trống.';
  if (!payload.province) return 'Tỉnh / Thành phố không được để trống.';

  const dob = new Date(payload.dob);
  if (Number.isNaN(dob.getTime())) return 'Ngày sinh không hợp lệ.';

  return null;
};

const getDisplayRole = (role) => {
  if (role === 'student') return 'Học sinh';
  if (role === 'teacher') return 'Giáo viên';
  if (role === 'admin') return 'Quản trị viên';
  return 'Người dùng';
};

module.exports = {
  normalizeProfilePayload,
  validateProfilePayload,
  getDisplayRole,
};