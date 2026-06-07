const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

jest.mock('../../models/User', () => ({
  findById: jest.fn(),
}));

jest.mock('../../models/ForumPost', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
}));

jest.mock('../../models/ForumComment', () => ({
  find: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
}));

jest.mock('jsonwebtoken');

const User = require('../../models/User');
const ForumPost = require('../../models/ForumPost');
const ForumComment = require('../../models/ForumComment');
const forumRoutes = require('../../routes/forumRoutes');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/forum', forumRoutes);
  return app;
};

const mockTeacher = {
  _id: 'teacher-id',
  fullName: 'Trần Đăng Khoa',
  role: 'teacher',
  email: 'teacher@test.com',
};

const mockAdmin = {
  _id: 'admin-id',
  fullName: 'Admin',
  role: 'admin',
  email: 'admin@test.com',
};

const mockStudent = {
  _id: 'student-id',
  fullName: 'Nguyễn Văn A',
  role: 'student',
  email: 'student@test.com',
};

const makePost = (overrides = {}) => ({
  _id: 'post-1',
  title: 'Phương pháp cân bằng phản ứng oxi hóa khử',
  category: 'Mẹo giải nhanh',
  summary: 'Tóm tắt bài viết',
  content: 'Nội dung chi tiết của bài viết forum.',
  image: '',
  authorId: 'teacher-id',
  authorName: 'Trần Đăng Khoa',
  authorRole: 'teacher',
  status: 'active',
  rejectedReason: '',
  reviewedBy: null,
  reviewedAt: null,
  viewCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  save: jest.fn().mockResolvedValue(true),
  ...overrides,
});

const makeComment = (overrides = {}) => ({
  _id: 'comment-1',
  postId: 'post-1',
  parentCommentId: null,
  authorId: 'student-id',
  authorName: 'Nguyễn Văn A',
  authorRole: 'student',
  content: 'Em đã hiểu bài này hơn rồi ạ.',
  likeCount: 0,
  status: 'active',
  createdAt: new Date(),
  ...overrides,
});

const mockFindLean = (modelFindMock, data) => {
  modelFindMock.mockReturnValue({
    sort: jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue(data),
    }),
  });
};

const mockFindOneLean = (data) => {
  ForumPost.findOne.mockReturnValue({
    lean: jest.fn().mockResolvedValue(data),
  });
};

const mockFindByIdLean = (data) => {
  ForumPost.findById.mockReturnValue({
    lean: jest.fn().mockResolvedValue(data),
  });
};

const mockCommentFindLean = (data) => {
  ForumComment.find.mockReturnValue({
    sort: jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue(data),
    }),
  });
};

const authAs = (role = 'teacher') => {
  jwt.verify.mockReturnValue({
    userId: `${role}-id`,
    role,
  });

  const userMap = {
    teacher: mockTeacher,
    admin: mockAdmin,
    student: mockStudent,
  };

  User.findById.mockReturnValue({
    select: jest.fn().mockResolvedValue(userMap[role]),
  });

  return 'Bearer mock-token';
};

describe('Integration Test - Forum Routes', () => {
  let app;

  beforeEach(() => {
    app = createApp();
    jest.clearAllMocks();

    ForumComment.aggregate.mockResolvedValue([]);
    ForumComment.countDocuments.mockResolvedValue(0);
    ForumPost.countDocuments.mockResolvedValue(0);
  });

  // ===============================
  // AUTH MIDDLEWARE
  // ===============================

  test('GET /api/forum/posts - không có token thì trả về 401', async () => {
    const res = await request(app).get('/api/forum/posts');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Bạn chưa đăng nhập!');
  });

  test('GET /api/forum/posts - token không hợp lệ thì trả về 401', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const res = await request(app)
      .get('/api/forum/posts')
      .set('Authorization', 'Bearer invalid-token');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token không hợp lệ hoặc đã hết hạn!');
  });

  test('GET /api/forum/posts - token hợp lệ nhưng user không tồn tại thì trả về 401', async () => {
    jwt.verify.mockReturnValue({ userId: 'missing-user-id' });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const res = await request(app)
      .get('/api/forum/posts')
      .set('Authorization', 'Bearer mock-token');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Tài khoản không tồn tại!');
  });

  // ===============================
  // PUBLIC FORUM POSTS
  // ===============================

  test('GET /api/forum/posts - trả về danh sách bài viết public', async () => {
    const token = authAs('teacher');
    const posts = [makePost()];

    mockFindLean(ForumPost.find, posts);
    ForumComment.aggregate.mockResolvedValue([
      { _id: 'post-1', count: 3 },
    ]);

    const res = await request(app)
      .get('/api/forum/posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.find).toHaveBeenCalledWith({ status: 'active' });
    expect(res.body.posts).toHaveLength(1);
    expect(res.body.posts[0].commentsCount).toBe(3);
  });

  test('GET /api/forum/posts - không có bài viết thì trả về mảng rỗng', async () => {
    const token = authAs('student');

    mockFindLean(ForumPost.find, []);

    const res = await request(app)
      .get('/api/forum/posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.posts).toEqual([]);
  });

  test('GET /api/forum/posts - lỗi database thì trả về 500', async () => {
    const token = authAs('teacher');

    ForumPost.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('DB error')),
      }),
    });

    const res = await request(app)
      .get('/api/forum/posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy danh sách bài viết forum.');
  });

  test('POST /api/forum/posts - giáo viên tạo bài viết thì trạng thái pending', async () => {
    const token = authAs('teacher');

    ForumPost.create.mockResolvedValue(
      makePost({
        status: 'pending',
        title: 'Tổng hợp bài tập cân bằng hóa học',
        category: 'Tài liệu học tập',
      })
    );

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: 'Tổng hợp bài tập cân bằng hóa học',
        category: 'Tài liệu học tập',
        summary: 'Tài liệu ôn tập chương 1',
        content: 'Nội dung chi tiết...',
      });

    expect(res.statusCode).toBe(201);
    expect(ForumPost.create).toHaveBeenCalledWith(
      expect.objectContaining({
        authorId: mockTeacher._id,
        authorName: mockTeacher.fullName,
        authorRole: 'teacher',
        status: 'pending',
      })
    );
    expect(res.body.message).toBe('Bài viết đã được gửi và đang chờ quản trị viên duyệt.');
  });

  test('POST /api/forum/posts - admin tạo bài viết thì trạng thái active', async () => {
    const token = authAs('admin');

    ForumPost.create.mockResolvedValue(
      makePost({
        authorId: mockAdmin._id,
        authorName: mockAdmin.fullName,
        authorRole: 'admin',
        status: 'active',
      })
    );

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: 'Thông báo hệ thống',
        category: 'Thông báo chung',
        content: 'Nội dung thông báo',
      });

    expect(res.statusCode).toBe(201);
    expect(ForumPost.create).toHaveBeenCalledWith(
      expect.objectContaining({
        authorId: mockAdmin._id,
        authorRole: 'admin',
        status: 'active',
      })
    );
    expect(res.body.message).toBe('Đăng bài forum thành công!');
  });

  test('POST /api/forum/posts - học sinh không được đăng bài forum', async () => {
    const token = authAs('student');

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: 'Bài viết của học sinh',
        content: 'Nội dung...',
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Chỉ giáo viên mới được đăng bài forum!');
  });

  test('POST /api/forum/posts - thiếu tiêu đề thì trả về 400', async () => {
    const token = authAs('teacher');

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: '',
        content: 'Nội dung hợp lệ',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Vui lòng nhập tiêu đề bài viết.');
  });

  test('POST /api/forum/posts - thiếu nội dung thì trả về 400', async () => {
    const token = authAs('teacher');

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: 'Tiêu đề hợp lệ',
        content: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Vui lòng nhập nội dung bài viết.');
  });

  test('POST /api/forum/posts - lỗi database khi tạo bài thì trả về 500', async () => {
    const token = authAs('teacher');
    ForumPost.create.mockRejectedValue(new Error('Create post error'));

    const res = await request(app)
      .post('/api/forum/posts')
      .set('Authorization', token)
      .send({
        title: 'Tiêu đề hợp lệ',
        content: 'Nội dung hợp lệ',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi tạo bài viết forum.');
  });

  test('GET /api/forum/posts/:postId - xem chi tiết bài public và tăng viewCount', async () => {
    const token = authAs('student');
    const post = makePost({ viewCount: 5 });

    ForumPost.findOne.mockResolvedValue(post);
    ForumComment.countDocuments.mockResolvedValue(2);

    const res = await request(app)
      .get('/api/forum/posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.findOne).toHaveBeenCalledWith({
      _id: 'post-1',
      status: 'active',
    });
    expect(post.viewCount).toBe(6);
    expect(post.save).toHaveBeenCalled();
    expect(res.body.post.commentsCount).toBe(2);
  });

  test('GET /api/forum/posts/:postId - không tìm thấy bài public thì trả về 404', async () => {
    const token = authAs('student');
    ForumPost.findOne.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/forum/posts/not-found')
      .set('Authorization', token);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết forum.');
  });

  test('GET /api/forum/posts/:postId - lỗi database thì trả về 500', async () => {
    const token = authAs('student');
    ForumPost.findOne.mockRejectedValue(new Error('Detail DB error'));

    const res = await request(app)
      .get('/api/forum/posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy chi tiết bài viết forum.');
  });

  // ===============================
  // COMMENTS
  // ===============================

  test('GET /api/forum/posts/:postId/comments - trả về danh sách bình luận', async () => {
    const token = authAs('student');

    mockFindOneLean(makePost());
    mockCommentFindLean([
      makeComment(),
      makeComment({
        _id: 'comment-2',
        authorName: 'Giáo viên A',
        authorRole: 'teacher',
        content: 'Cô bổ sung thêm ý này.',
      }),
    ]);

    const res = await request(app)
      .get('/api/forum/posts/post-1/comments')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.comments).toHaveLength(2);
    expect(res.body.comments[0].content).toBe('Em đã hiểu bài này hơn rồi ạ.');
  });

  test('GET /api/forum/posts/:postId/comments - bài viết không tồn tại thì trả về 404', async () => {
    const token = authAs('student');

    mockFindOneLean(null);

    const res = await request(app)
      .get('/api/forum/posts/post-404/comments')
      .set('Authorization', token);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết forum.');
  });

  test('GET /api/forum/posts/:postId/comments - lỗi database thì trả về 500', async () => {
    const token = authAs('student');

    ForumPost.findOne.mockReturnValue({
      lean: jest.fn().mockRejectedValue(new Error('Comment list error')),
    });

    const res = await request(app)
      .get('/api/forum/posts/post-1/comments')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy bình luận forum.');
  });

  test('POST /api/forum/posts/:postId/comments - học sinh bình luận thành công', async () => {
    const token = authAs('student');

    mockFindOneLean(makePost());
    ForumComment.create.mockResolvedValue(makeComment());

    const res = await request(app)
      .post('/api/forum/posts/post-1/comments')
      .set('Authorization', token)
      .send({
        content: 'Em cảm ơn thầy ạ.',
      });

    expect(res.statusCode).toBe(201);
    expect(ForumComment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        postId: 'post-1',
        authorId: mockStudent._id,
        authorRole: 'student',
        content: 'Em cảm ơn thầy ạ.',
        parentCommentId: null,
      })
    );
    expect(res.body.message).toBe('Bình luận thành công!');
  });

  test('POST /api/forum/posts/:postId/comments - bình luận phản hồi có parentCommentId', async () => {
    const token = authAs('teacher');

    mockFindOneLean(makePost());
    ForumComment.create.mockResolvedValue(
      makeComment({
        parentCommentId: 'parent-comment-id',
        authorId: mockTeacher._id,
        authorName: mockTeacher.fullName,
        authorRole: 'teacher',
        content: 'Thầy phản hồi thêm.',
      })
    );

    const res = await request(app)
      .post('/api/forum/posts/post-1/comments')
      .set('Authorization', token)
      .send({
        content: 'Thầy phản hồi thêm.',
        parentCommentId: 'parent-comment-id',
      });

    expect(res.statusCode).toBe(201);
    expect(ForumComment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        parentCommentId: 'parent-comment-id',
      })
    );
  });

  test('POST /api/forum/posts/:postId/comments - bài viết không tồn tại thì trả về 404', async () => {
    const token = authAs('student');

    mockFindOneLean(null);

    const res = await request(app)
      .post('/api/forum/posts/post-404/comments')
      .set('Authorization', token)
      .send({
        content: 'Bình luận',
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết forum.');
  });

  test('POST /api/forum/posts/:postId/comments - nội dung rỗng thì trả về 400', async () => {
    const token = authAs('student');

    mockFindOneLean(makePost());

    const res = await request(app)
      .post('/api/forum/posts/post-1/comments')
      .set('Authorization', token)
      .send({
        content: '',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Vui lòng nhập nội dung bình luận.');
  });

  test('POST /api/forum/posts/:postId/comments - lỗi database thì trả về 500', async () => {
    const token = authAs('student');

    mockFindOneLean(makePost());
    ForumComment.create.mockRejectedValue(new Error('Create comment error'));

    const res = await request(app)
      .post('/api/forum/posts/post-1/comments')
      .set('Authorization', token)
      .send({
        content: 'Bình luận hợp lệ',
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi tạo bình luận forum.');
  });

  // ===============================
  // ADMIN FORUM
  // ===============================

  test('GET /api/forum/admin/posts - admin xem danh sách bài chờ duyệt', async () => {
    const token = authAs('admin');

    mockFindLean(ForumPost.find, [
      makePost({
        status: 'pending',
        title: 'Bài viết chờ duyệt',
      }),
    ]);

    ForumComment.aggregate.mockResolvedValue([
      { _id: 'post-1', count: 2 },
    ]);

    ForumPost.countDocuments
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(4);

    const res = await request(app)
      .get('/api/forum/admin/posts?status=pending')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.find).toHaveBeenCalledWith({ status: 'pending' });
    expect(res.body.posts).toHaveLength(1);
    expect(res.body.posts[0].commentsCount).toBe(2);
    expect(res.body.counts.pending).toBe(1);
    expect(res.body.counts.hidden).toBe(4);
  });

  test('GET /api/forum/admin/posts - status all thì lấy tất cả bài', async () => {
    const token = authAs('admin');

    mockFindLean(ForumPost.find, [
      makePost({ status: 'pending' }),
      makePost({ _id: 'post-2', status: 'active' }),
    ]);

    const res = await request(app)
      .get('/api/forum/admin/posts?status=all')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.find).toHaveBeenCalledWith({});
    expect(res.body.posts).toHaveLength(2);
  });

  test('GET /api/forum/admin/posts - status không hợp lệ thì trả về 400', async () => {
    const token = authAs('admin');

    const res = await request(app)
      .get('/api/forum/admin/posts?status=deleted')
      .set('Authorization', token);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Trạng thái bài viết không hợp lệ.');
  });

  test('GET /api/forum/admin/posts - teacher không được truy cập trang quản trị forum', async () => {
    const token = authAs('teacher');

    const res = await request(app)
      .get('/api/forum/admin/posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Bạn không có quyền quản trị forum.');
  });

  test('GET /api/forum/admin/posts - lỗi database thì trả về 500', async () => {
    const token = authAs('admin');

    ForumPost.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Admin list error')),
      }),
    });

    const res = await request(app)
      .get('/api/forum/admin/posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy danh sách bài viết quản trị.');
  });

  test('GET /api/forum/admin/posts/:postId - admin xem chi tiết bài viết', async () => {
    const token = authAs('admin');

    mockFindByIdLean(makePost({ status: 'pending' }));
    ForumComment.countDocuments.mockResolvedValue(5);

    const res = await request(app)
      .get('/api/forum/admin/posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.post.id).toBe('post-1');
    expect(res.body.post.commentsCount).toBe(5);
  });

  test('GET /api/forum/admin/posts/:postId - không tìm thấy bài viết thì trả về 404', async () => {
    const token = authAs('admin');

    mockFindByIdLean(null);

    const res = await request(app)
      .get('/api/forum/admin/posts/post-404')
      .set('Authorization', token);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết.');
  });

  test('GET /api/forum/admin/posts/:postId - lỗi database thì trả về 500', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockReturnValue({
      lean: jest.fn().mockRejectedValue(new Error('Admin detail error')),
    });

    const res = await request(app)
      .get('/api/forum/admin/posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy chi tiết bài viết quản trị.');
  });

  test('PATCH /api/forum/admin/posts/:postId/approve - admin duyệt bài thành công', async () => {
    const token = authAs('admin');
    const post = makePost({ status: 'pending', rejectedReason: 'Lý do cũ' });

    ForumPost.findById.mockResolvedValue(post);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/approve')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(post.status).toBe('active');
    expect(post.rejectedReason).toBe('');
    expect(post.reviewedBy).toBe(mockAdmin._id);
    expect(post.save).toHaveBeenCalled();
    expect(res.body.message).toBe('Đã duyệt bài viết thành công.');
  });

  test('PATCH /api/forum/admin/posts/:postId/approve - không tìm thấy bài thì trả về 404', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockResolvedValue(null);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-404/approve')
      .set('Authorization', token);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết cần duyệt.');
  });

  test('PATCH /api/forum/admin/posts/:postId/approve - lỗi database thì trả về 500', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockRejectedValue(new Error('Approve error'));

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/approve')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi duyệt bài viết.');
  });

  test('PATCH /api/forum/admin/posts/:postId/reject - admin từ chối bài với lý do nhập vào', async () => {
    const token = authAs('admin');
    const post = makePost({ status: 'pending' });

    ForumPost.findById.mockResolvedValue(post);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/reject')
      .set('Authorization', token)
      .send({
        reason: 'Bài viết bị trùng nội dung.',
      });

    expect(res.statusCode).toBe(200);
    expect(post.status).toBe('rejected');
    expect(post.rejectedReason).toBe('Bài viết bị trùng nội dung.');
    expect(post.reviewedBy).toBe(mockAdmin._id);
    expect(post.save).toHaveBeenCalled();
  });

  test('PATCH /api/forum/admin/posts/:postId/reject - thiếu lý do thì dùng lý do mặc định', async () => {
    const token = authAs('admin');
    const post = makePost({ status: 'pending' });

    ForumPost.findById.mockResolvedValue(post);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/reject')
      .set('Authorization', token)
      .send({ reason: '' });

    expect(res.statusCode).toBe(200);
    expect(post.rejectedReason).toBe('Bài viết chưa đạt yêu cầu đăng tải.');
  });

  test('PATCH /api/forum/admin/posts/:postId/reject - không tìm thấy bài thì trả về 404', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockResolvedValue(null);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-404/reject')
      .set('Authorization', token)
      .send({ reason: 'Không phù hợp' });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết cần từ chối.');
  });

  test('PATCH /api/forum/admin/posts/:postId/reject - lỗi database thì trả về 500', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockRejectedValue(new Error('Reject error'));

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/reject')
      .set('Authorization', token)
      .send({ reason: 'Không phù hợp' });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi từ chối bài viết.');
  });

  test('PATCH /api/forum/admin/posts/:postId/hide - admin ẩn bài thành công', async () => {
    const token = authAs('admin');
    const post = makePost({ status: 'active' });

    ForumPost.findById.mockResolvedValue(post);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/hide')
      .set('Authorization', token)
      .send({
        reason: 'Ẩn bài do cần kiểm tra lại.',
      });

    expect(res.statusCode).toBe(200);
    expect(post.status).toBe('hidden');
    expect(post.rejectedReason).toBe('Ẩn bài do cần kiểm tra lại.');
    expect(post.reviewedBy).toBe(mockAdmin._id);
    expect(post.save).toHaveBeenCalled();
  });

  test('PATCH /api/forum/admin/posts/:postId/hide - thiếu lý do thì dùng lý do mặc định', async () => {
    const token = authAs('admin');
    const post = makePost({ status: 'active' });

    ForumPost.findById.mockResolvedValue(post);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/hide')
      .set('Authorization', token)
      .send({ reason: '' });

    expect(res.statusCode).toBe(200);
    expect(post.rejectedReason).toBe('Bài viết đã được ẩn bởi quản trị viên.');
  });

  test('PATCH /api/forum/admin/posts/:postId/hide - không tìm thấy bài thì trả về 404', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockResolvedValue(null);

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-404/hide')
      .set('Authorization', token)
      .send({ reason: 'Ẩn bài' });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết cần ẩn.');
  });

  test('PATCH /api/forum/admin/posts/:postId/hide - lỗi database thì trả về 500', async () => {
    const token = authAs('admin');

    ForumPost.findById.mockRejectedValue(new Error('Hide error'));

    const res = await request(app)
      .patch('/api/forum/admin/posts/post-1/hide')
      .set('Authorization', token)
      .send({ reason: 'Ẩn bài' });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi ẩn bài viết.');
  });

  // ===============================
  // TEACHER MY POSTS
  // ===============================

  test('GET /api/forum/my-posts - giáo viên xem trạng thái bài viết của chính mình', async () => {
    const token = authAs('teacher');

    mockFindLean(ForumPost.find, [
      makePost({
        status: 'pending',
        authorId: mockTeacher._id,
      }),
    ]);

    ForumComment.aggregate.mockResolvedValue([
      { _id: 'post-1', count: 1 },
    ]);

    ForumPost.countDocuments
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(4);

    const res = await request(app)
      .get('/api/forum/my-posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.find).toHaveBeenCalledWith({ authorId: mockTeacher._id });
    expect(res.body.posts).toHaveLength(1);
    expect(res.body.counts.all).toBe(10);
    expect(res.body.counts.rejected).toBe(3);
  });

  test('GET /api/forum/my-posts - lọc theo status rejected', async () => {
    const token = authAs('teacher');

    mockFindLean(ForumPost.find, [
      makePost({
        status: 'rejected',
        authorId: mockTeacher._id,
        rejectedReason: 'Bị trùng nội dung',
      }),
    ]);

    const res = await request(app)
      .get('/api/forum/my-posts?status=rejected')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.find).toHaveBeenCalledWith({
      authorId: mockTeacher._id,
      status: 'rejected',
    });
    expect(res.body.posts[0].status).toBe('rejected');
  });

  test('GET /api/forum/my-posts - học sinh không được xem trạng thái bài đăng giáo viên', async () => {
    const token = authAs('student');

    const res = await request(app)
      .get('/api/forum/my-posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Chỉ giáo viên mới được xem trạng thái bài đăng của mình.');
  });

  test('GET /api/forum/my-posts - status không hợp lệ thì trả về 400', async () => {
    const token = authAs('teacher');

    const res = await request(app)
      .get('/api/forum/my-posts?status=deleted')
      .set('Authorization', token);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Trạng thái bài viết không hợp lệ.');
  });

  test('GET /api/forum/my-posts - lỗi database thì trả về 500', async () => {
    const token = authAs('teacher');

    ForumPost.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('My posts error')),
      }),
    });

    const res = await request(app)
      .get('/api/forum/my-posts')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy trạng thái bài đăng.');
  });

  test('GET /api/forum/my-posts/:postId - giáo viên xem chi tiết bài của mình', async () => {
    const token = authAs('teacher');

    mockFindOneLean(
      makePost({
        authorId: mockTeacher._id,
        status: 'pending',
      })
    );

    ForumComment.countDocuments.mockResolvedValue(2);

    const res = await request(app)
      .get('/api/forum/my-posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(ForumPost.findOne).toHaveBeenCalledWith({
      _id: 'post-1',
      authorId: mockTeacher._id,
    });
    expect(res.body.post.commentsCount).toBe(2);
  });

  test('GET /api/forum/my-posts/:postId - học sinh không được xem', async () => {
    const token = authAs('student');

    const res = await request(app)
      .get('/api/forum/my-posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Chỉ giáo viên mới được xem trạng thái bài đăng của mình.');
  });

  test('GET /api/forum/my-posts/:postId - không tìm thấy bài hoặc không có quyền xem', async () => {
    const token = authAs('teacher');

    mockFindOneLean(null);

    const res = await request(app)
      .get('/api/forum/my-posts/post-404')
      .set('Authorization', token);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Không tìm thấy bài viết hoặc bạn không có quyền xem bài viết này.');
  });

  test('GET /api/forum/my-posts/:postId - lỗi database thì trả về 500', async () => {
    const token = authAs('teacher');

    ForumPost.findOne.mockReturnValue({
      lean: jest.fn().mockRejectedValue(new Error('My detail error')),
    });

    const res = await request(app)
      .get('/api/forum/my-posts/post-1')
      .set('Authorization', token);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Lỗi server khi lấy chi tiết bài đăng.');
  });
});