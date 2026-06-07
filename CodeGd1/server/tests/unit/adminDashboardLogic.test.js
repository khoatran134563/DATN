const {
  countUsersByRole,
  countQuestionsByLevel,
  countForumByStatus,
} = require('../../utils/adminDashboardLogic');



describe('Unit Test - Admin Dashboard User Statistics', () => {
  test('Đếm đúng tổng số người dùng theo vai trò', () => {
    const users = [
      { role: 'student' },
      { role: 'student' },
      { role: 'teacher' },
      { role: 'admin' },
    ];

    expect(countUsersByRole(users)).toEqual({
      total: 4,
      students: 2,
      teachers: 1,
      admins: 1,
    });
  });

  test('Danh sách người dùng rỗng thì tất cả chỉ số bằng 0', () => {
    expect(countUsersByRole([])).toEqual({
      total: 0,
      students: 0,
      teachers: 0,
      admins: 0,
    });
  });
});

describe('Unit Test - Admin Dashboard Question Statistics', () => {
  test('Đếm đúng số câu hỏi theo mức độ', () => {
    const questions = [
      { quiz_id: 'cbhh_nbth' },
      { quiz_id: 'tddn_nbth' },
      { quiz_id: 'cbhh_vdvdc' },
      { quiz_id: 'tddn_vdvdc' },
      { quiz_id: 'unknown' },
    ];

    expect(countQuestionsByLevel(questions)).toEqual({
      total: 5,
      nbth: 2,
      vdvdc: 2,
      other: 1,
    });
  });

  test('Câu hỏi thiếu quiz_id thì được tính vào other', () => {
    const questions = [{}, { quiz_id: null }];

    expect(countQuestionsByLevel(questions)).toEqual({
      total: 2,
      nbth: 0,
      vdvdc: 0,
      other: 2,
    });
  });
});

describe('Unit Test - Admin Dashboard Forum Statistics', () => {
  test('Đếm đúng bài forum theo trạng thái', () => {
    const posts = [
      { status: 'pending' },
      { status: 'active' },
      { status: 'active' },
      { status: 'rejected' },
      { status: 'hidden' },
    ];

    expect(countForumByStatus(posts)).toEqual({
      total: 5,
      pending: 1,
      active: 2,
      rejected: 1,
      hidden: 1,
    });
  });

  test('Danh sách forum rỗng thì tất cả chỉ số bằng 0', () => {
    expect(countForumByStatus([])).toEqual({
      total: 0,
      pending: 0,
      active: 0,
      rejected: 0,
      hidden: 0,
    });
  });
});