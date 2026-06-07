const {
  FORUM_STATUSES,
  canPublicViewPost,
  canTeacherEditPost,
  canAdminApprovePost,
  approvePost,
  rejectPost,
  hidePost,
} = require('../../utils/forumStatusLogic');

describe('Unit Test - Forum Status Logic', () => {
  test('Danh sách trạng thái forum có đủ 4 trạng thái chính', () => {
    expect(FORUM_STATUSES).toEqual(['pending', 'active', 'rejected', 'hidden']);
  });

  test('Public chỉ xem được bài viết active', () => {
    expect(canPublicViewPost({ status: 'active' })).toBe(true);
    expect(canPublicViewPost({ status: 'pending' })).toBe(false);
    expect(canPublicViewPost({ status: 'rejected' })).toBe(false);
    expect(canPublicViewPost({ status: 'hidden' })).toBe(false);
  });

  test('Giáo viên chỉ sửa được bài của bản thân', () => {
    const post = { authorId: 'teacher01', status: 'pending' };

    expect(canTeacherEditPost(post, 'teacher01')).toBe(true);
    expect(canTeacherEditPost(post, 'teacher02')).toBe(false);
  });

  test('Giáo viên không sửa được bài đã bị ẩn', () => {
    const post = { authorId: 'teacher01', status: 'hidden' };

    expect(canTeacherEditPost(post, 'teacher01')).toBe(false);
  });

  test('Admin chỉ duyệt được bài pending', () => {
    expect(canAdminApprovePost({ status: 'pending' })).toBe(true);
    expect(canAdminApprovePost({ status: 'active' })).toBe(false);
  });

  test('Duyệt bài pending thì chuyển sang active', () => {
    const result = approvePost({
      title: 'Bài viết mẫu',
      status: 'pending',
      rejectionReason: 'Nội dung chưa đạt',
    });

    expect(result.success).toBe(true);
    expect(result.post.status).toBe('active');
    expect(result.post.rejectionReason).toBe('');
  });

  test('Không duyệt được bài không ở trạng thái pending', () => {
    const result = approvePost({ status: 'active' });

    expect(result.success).toBe(false);
  });

  test('Từ chối bài pending thì chuyển sang rejected và lưu lý do', () => {
    const result = rejectPost({ status: 'pending' }, 'Trùng nội dung');

    expect(result.success).toBe(true);
    expect(result.post.status).toBe('rejected');
    expect(result.post.rejectionReason).toBe('Trùng nội dung');
  });

  test('Không từ chối bài nếu thiếu lý do', () => {
    const result = rejectPost({ status: 'pending' }, '');

    expect(result.success).toBe(false);
    expect(result.error).toBe('Cần nhập lý do từ chối.');
  });

  test('Không từ chối bài đã active', () => {
    const result = rejectPost({ status: 'active' }, 'Không phù hợp');

    expect(result.success).toBe(false);
  });

  test('Ẩn bài active thì chuyển sang hidden', () => {
    const result = hidePost({ status: 'active' });

    expect(result.success).toBe(true);
    expect(result.post.status).toBe('hidden');
  });

  test('Không ẩn bài chưa được duyệt', () => {
    const result = hidePost({ status: 'pending' });

    expect(result.success).toBe(false);
  });
});