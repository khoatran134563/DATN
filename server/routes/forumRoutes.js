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

// ===============================
// FORUM POSTS
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
    });

    res.status(201).json({
      message: 'Đăng bài forum thành công!',
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