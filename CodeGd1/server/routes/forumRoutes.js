const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const ForumPost = require('../models/ForumPost');
const ForumComment = require('../models/ForumComment');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ===============================
// AUTH MIDDLEWARE
// ===============================
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('AUTH FORUM ERROR =', error);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền quản trị forum.' });
  }

  next();
};

// ===============================
// HELPERS
// ===============================
const formatRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} giờ trước`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return 'Hôm qua';
  if (diffDay < 7) return `${diffDay} ngày trước`;

  return new Date(date).toLocaleDateString('vi-VN');
};

const formatFullDate = (date) => {
  return new Date(date).toLocaleString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getAvatarColor = (role) => {
  if (role === 'teacher') return 'bg-emerald-500';
  if (role === 'admin') return 'bg-purple-500';
  return 'bg-blue-500';
};

const buildPostListItem = (post, commentCount = 0) => ({
  id: post._id,
  title: post.title,
  category: post.category,
  excerpt: post.summary || post.content?.slice(0, 160) || '',
  content: post.content || '',
  image:
    post.image ||
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
  author: post.authorName,
  authorRole: post.authorRole,
  avatar: post.authorName?.charAt(0)?.toUpperCase() || 'U',
  avatarColor: getAvatarColor(post.authorRole),
  date: formatRelativeTime(post.createdAt),
  comments: commentCount,
  commentsCount: commentCount,
  createdAt: post.createdAt,
});

const buildPostDetail = (post, commentCount = 0) => ({
  id: post._id,
  title: post.title,
  category: post.category,
  summary: post.summary || '',
  excerpt: post.summary || post.content?.slice(0, 160) || '',
  content: post.content || '',
  image: post.image || '',
  author: post.authorName,
  authorRole: post.authorRole,
  avatar: post.authorName?.charAt(0)?.toUpperCase() || 'U',
  avatarColor: getAvatarColor(post.authorRole),
  date: formatFullDate(post.createdAt),
  time: formatRelativeTime(post.createdAt),
  comments: commentCount,
  commentsCount: commentCount,
  viewCount: post.viewCount || 0,
  createdAt: post.createdAt,
});

const buildAdminPostItem = (post, commentCount = 0) => ({
  id: post._id,
  title: post.title,
  category: post.category,
  summary: post.summary || '',
  excerpt: post.summary || post.content?.slice(0, 180) || '',
  content: post.content || '',
  image: post.image || '',
  author: post.authorName,
  authorRole: post.authorRole,
  avatar: post.authorName?.charAt(0)?.toUpperCase() || 'U',
  avatarColor: getAvatarColor(post.authorRole),
  status: post.status,
  rejectedReason: post.rejectedReason || '',
  reviewedBy: post.reviewedBy || null,
  reviewedAt: post.reviewedAt || null,
  viewCount: post.viewCount || 0,
  comments: commentCount,
  commentsCount: commentCount,
  date: formatRelativeTime(post.createdAt),
  fullDate: formatFullDate(post.createdAt),
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

const buildMyPostItem = (post, commentCount = 0) => ({
  id: post._id,
  title: post.title,
  category: post.category,
  summary: post.summary || '',
  excerpt: post.summary || post.content?.slice(0, 180) || '',
  content: post.content || '',
  image: post.image || '',
  author: post.authorName,
  authorRole: post.authorRole,
  avatar: post.authorName?.charAt(0)?.toUpperCase() || 'U',
  avatarColor: getAvatarColor(post.authorRole),
  status: post.status || 'pending',
  rejectedReason: post.rejectedReason || '',
  reviewedAt: post.reviewedAt || null,
  viewCount: post.viewCount || 0,
  comments: commentCount,
  commentsCount: commentCount,
  date: formatRelativeTime(post.createdAt),
  fullDate: formatFullDate(post.createdAt),
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

// ===============================
// ADMIN FORUM ROUTES
// Đặt trước /posts/:postId để tránh bị Express hiểu nhầm admin là postId
// ===============================

router.get('/admin/posts', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status = 'pending' } = req.query;

    const allowedStatuses = ['pending', 'active', 'rejected', 'hidden', 'all'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái bài viết không hợp lệ.' });
    }

    const query = status === 'all' ? {} : { status };

    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 })
      .lean();

    const postIds = posts.map((post) => post._id);

    const commentCounts = await ForumComment.aggregate([
      {
        $match: {
          postId: { $in: postIds },
          status: 'active',
        },
      },
      {
        $group: {
          _id: '$postId',
          count: { $sum: 1 },
        },
      },
    ]);

    const commentCountMap = {};
    commentCounts.forEach((item) => {
      commentCountMap[String(item._id)] = item.count;
    });

    const counts = {
      pending: await ForumPost.countDocuments({ status: 'pending' }),
      active: await ForumPost.countDocuments({ status: 'active' }),
      rejected: await ForumPost.countDocuments({ status: 'rejected' }),
      hidden: await ForumPost.countDocuments({ status: 'hidden' }),
    };

    res.json({
      posts: posts.map((post) =>
        buildAdminPostItem(post, commentCountMap[String(post._id)] || 0)
      ),
      counts,
    });
  } catch (error) {
    console.error('GET ADMIN FORUM POSTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách bài viết quản trị.' });
  }
});

router.get('/admin/posts/:postId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findById(postId).lean();

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
    }

    const commentCount = await ForumComment.countDocuments({
      postId,
      status: 'active',
    });

    res.json({
      post: buildAdminPostItem(post, commentCount),
    });
  } catch (error) {
    console.error('GET ADMIN FORUM POST DETAIL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy chi tiết bài viết quản trị.' });
  }
});

router.patch('/admin/posts/:postId/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết cần duyệt.' });
    }

    post.status = 'active';
    post.rejectedReason = '';
    post.reviewedBy = req.user._id;
    post.reviewedAt = new Date();

    await post.save();

    res.json({
      message: 'Đã duyệt bài viết thành công.',
      post: buildAdminPostItem(post, 0),
    });
  } catch (error) {
    console.error('APPROVE FORUM POST ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi duyệt bài viết.' });
  }
});

router.patch('/admin/posts/:postId/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { reason } = req.body;

    const post = await ForumPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết cần từ chối.' });
    }

    post.status = 'rejected';
    post.rejectedReason = reason?.trim() || 'Bài viết chưa đạt yêu cầu đăng tải.';
    post.reviewedBy = req.user._id;
    post.reviewedAt = new Date();

    await post.save();

    res.json({
      message: 'Đã từ chối bài viết.',
      post: buildAdminPostItem(post, 0),
    });
  } catch (error) {
    console.error('REJECT FORUM POST ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi từ chối bài viết.' });
  }
});

router.patch('/admin/posts/:postId/hide', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { reason } = req.body;

    const post = await ForumPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết cần ẩn.' });
    }

    post.status = 'hidden';
    post.rejectedReason = reason?.trim() || 'Bài viết đã được ẩn bởi quản trị viên.';
    post.reviewedBy = req.user._id;
    post.reviewedAt = new Date();

    await post.save();

    res.json({
      message: 'Đã ẩn bài viết.',
      post: buildAdminPostItem(post, 0),
    });
  } catch (error) {
    console.error('HIDE FORUM POST ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi ẩn bài viết.' });
  }
});



// ===============================
// TEACHER OWN POSTS
// Giáo viên xem trạng thái các bài viết của chính mình
// ===============================

router.get('/my-posts', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({
        message: 'Chỉ giáo viên mới được xem trạng thái bài đăng của mình.',
      });
    }

    const { status = 'all' } = req.query;

    const allowedStatuses = ['all', 'pending', 'active', 'rejected', 'hidden'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Trạng thái bài viết không hợp lệ.',
      });
    }

    const baseQuery = {
      authorId: user._id,
    };

    const query = status === 'all'
      ? baseQuery
      : {
          ...baseQuery,
          status,
        };

    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 })
      .lean();

    const postIds = posts.map((post) => post._id);

    const commentCounts = await ForumComment.aggregate([
      {
        $match: {
          postId: { $in: postIds },
          status: 'active',
        },
      },
      {
        $group: {
          _id: '$postId',
          count: { $sum: 1 },
        },
      },
    ]);

    const commentCountMap = {};
    commentCounts.forEach((item) => {
      commentCountMap[String(item._id)] = item.count;
    });

    const [pending, active, rejected, hidden] = await Promise.all([
      ForumPost.countDocuments({ ...baseQuery, status: 'pending' }),
      ForumPost.countDocuments({ ...baseQuery, status: 'active' }),
      ForumPost.countDocuments({ ...baseQuery, status: 'rejected' }),
      ForumPost.countDocuments({ ...baseQuery, status: 'hidden' }),
    ]);

    res.json({
      posts: posts.map((post) =>
        buildMyPostItem(post, commentCountMap[String(post._id)] || 0)
      ),
      counts: {
        all: pending + active + rejected + hidden,
        pending,
        active,
        rejected,
        hidden,
      },
    });
  } catch (error) {
    console.error('GET MY FORUM POSTS ERROR =', error);
    res.status(500).json({
      message: 'Lỗi server khi lấy trạng thái bài đăng.',
    });
  }
});

router.get('/my-posts/:postId', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({
        message: 'Chỉ giáo viên mới được xem trạng thái bài đăng của mình.',
      });
    }

    const { postId } = req.params;

    const post = await ForumPost.findOne({
      _id: postId,
      authorId: user._id,
    }).lean();

    if (!post) {
      return res.status(404).json({
        message: 'Không tìm thấy bài viết hoặc bạn không có quyền xem bài viết này.',
      });
    }

    const commentCount = await ForumComment.countDocuments({
      postId,
      status: 'active',
    });

    res.json({
      post: buildMyPostItem(post, commentCount),
    });
  } catch (error) {
    console.error('GET MY FORUM POST DETAIL ERROR =', error);
    res.status(500).json({
      message: 'Lỗi server khi lấy chi tiết bài đăng.',
    });
  }
});

// ===============================
// FORUM POSTS CÔNG KHAI
// ===============================

// Lấy danh sách bài viết forum
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await ForumPost.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .lean();

    const postIds = posts.map((post) => post._id);

    const commentCounts = await ForumComment.aggregate([
      {
        $match: {
          postId: { $in: postIds },
          status: 'active',
        },
      },
      {
        $group: {
          _id: '$postId',
          count: { $sum: 1 },
        },
      },
    ]);

    const commentCountMap = {};
    commentCounts.forEach((item) => {
      commentCountMap[String(item._id)] = item.count;
    });

    res.json({
      posts: posts.map((post) =>
        buildPostListItem(post, commentCountMap[String(post._id)] || 0)
      ),
    });
  } catch (error) {
    console.error('GET FORUM POSTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách bài viết forum.' });
  }
});

// Tạo bài viết forum mới - chỉ giáo viên/admin
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'teacher' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được đăng bài forum!' });
    }

    const { title, category, summary, content, image } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập tiêu đề bài viết.' });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập nội dung bài viết.' });
    }

    const newPost = await ForumPost.create({
      authorId: user._id,
      authorName: user.fullName,
      authorRole: user.role === 'admin' ? 'admin' : 'teacher',
      category: category?.trim() || 'Thông báo chung',
      title: title.trim(),
      summary: summary?.trim() || '',
      content: content.trim(),
      image: image || '',
      status: user.role === 'admin' ? 'active' : 'pending',
    });

    res.status(201).json({
      message:
        user.role === 'admin'
          ? 'Đăng bài forum thành công!'
          : 'Bài viết đã được gửi và đang chờ quản trị viên duyệt.',
      post: buildPostDetail(newPost, 0),
    });
  } catch (error) {
    console.error('CREATE FORUM POST ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tạo bài viết forum.' });
  }
});

// Lấy chi tiết bài viết forum
router.get('/posts/:postId', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findOne({
      _id: postId,
      status: 'active',
    });

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết forum.' });
    }

    post.viewCount = Number(post.viewCount || 0) + 1;
    await post.save();

    const commentCount = await ForumComment.countDocuments({
      postId,
      status: 'active',
    });

    res.json({
      post: buildPostDetail(post, commentCount),
    });
  } catch (error) {
    console.error('GET FORUM POST DETAIL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy chi tiết bài viết forum.' });
  }
});

// ===============================
// FORUM COMMENTS
// ===============================

// Lấy bình luận của bài viết
router.get('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findOne({
      _id: postId,
      status: 'active',
    }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết forum.' });
    }

    const comments = await ForumComment.find({
      postId,
      status: 'active',
    })
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      comments: comments.map((comment) => ({
        id: comment._id,
        postId: comment.postId,
        parentCommentId: comment.parentCommentId,
        author: comment.authorName,
        authorRole: comment.authorRole,
        avatar: comment.authorName?.charAt(0)?.toUpperCase() || 'U',
        avatarColor: getAvatarColor(comment.authorRole),
        content: comment.content,
        likeCount: comment.likeCount || 0,
        time: formatRelativeTime(comment.createdAt),
        createdAt: comment.createdAt,
      })),
    });
  } catch (error) {
    console.error('GET FORUM COMMENTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy bình luận forum.' });
  }
});

// Tạo bình luận - học sinh/giáo viên/admin đều được
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const user = req.user;
    const { content, parentCommentId } = req.body;

    const post = await ForumPost.findOne({
      _id: postId,
      status: 'active',
    }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết forum.' });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập nội dung bình luận.' });
    }

    const newComment = await ForumComment.create({
      postId,
      authorId: user._id,
      authorName: user.fullName,
      authorRole: user.role,
      content: content.trim(),
      parentCommentId: parentCommentId || null,
    });

    res.status(201).json({
      message: 'Bình luận thành công!',
      comment: {
        id: newComment._id,
        postId: newComment.postId,
        parentCommentId: newComment.parentCommentId,
        author: newComment.authorName,
        authorRole: newComment.authorRole,
        avatar: newComment.authorName?.charAt(0)?.toUpperCase() || 'U',
        avatarColor: getAvatarColor(newComment.authorRole),
        content: newComment.content,
        likeCount: newComment.likeCount || 0,
        time: 'Vừa xong',
        createdAt: newComment.createdAt,
      },
    });
  } catch (error) {
    console.error('CREATE FORUM COMMENT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tạo bình luận forum.' });
  }
});

module.exports = router;