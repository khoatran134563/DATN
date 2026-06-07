const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Question = require('../models/Question');
const ForumPost = require('../models/ForumPost');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại.' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập trang quản trị.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' });
  }
};

const getStartOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const getLast7Days = () => {
  const days = [];
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    days.push({
      key: getStartOfDay(date).toISOString().slice(0, 10),
      name: labels[date.getDay()],
      date,
    });
  }

  return days;
};

const getChapterFromQuizId = (quizId = '') => {
  const prefix = String(quizId).split('_')[0];

  if (['cbhh', 'tddn'].includes(prefix)) return 'Chương 1';

  return 'Khác';
};

const getLevelFromQuizId = (quizId = '') => {
  if (String(quizId).endsWith('nbth')) return 'nbth';
  if (String(quizId).endsWith('vdvdc')) return 'vdvdc';
  return 'other';
};

const buildQuestionDistribution = (questions) => {
  const chapterOrder = [
    'Chương 1',
    'Chương 2',
    'Chương 3',
    'Chương 4',
    'Chương 5',
    'Chương 6',
  ];

  const distribution = chapterOrder.map((chapter) => ({
    chapter,
    nbth: 0,
    vdvdc: 0,
    other: 0,
    total: 0,
  }));

  const getRow = (chapter) => {
    let row = distribution.find((item) => item.chapter === chapter);

    if (!row) {
      row = {
        chapter,
        nbth: 0,
        vdvdc: 0,
        other: 0,
        total: 0,
      };
      distribution.push(row);
    }

    return row;
  };

  questions.forEach((question) => {
    const chapter = getChapterFromQuizId(question.quiz_id);
    const level = getLevelFromQuizId(question.quiz_id);
    const row = getRow(chapter);

    row[level] += 1;
    row.total += 1;
  });

  return distribution;
};

// ===============================
// DASHBOARD STATS
// ===============================
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalQuestions,
      pendingForumPosts,
      activeForumPosts,
      questions,
      recentUsers,
      recentPosts,
    ] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      ForumPost.countDocuments({ status: 'pending' }),
      ForumPost.countDocuments({ status: 'active' }),
      Question.find().select('quiz_id createdAt').lean(),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('fullName role email createdAt status')
        .lean(),
      ForumPost.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title authorName authorRole status createdAt')
        .lean(),
    ]);

    const last7Days = getLast7Days();

    const userCreatedFrom = getStartOfDay(last7Days[0].date);
    const usersIn7Days = await User.find({
      createdAt: { $gte: userCreatedFrom },
    })
      .select('createdAt')
      .lean();

    const userChart = last7Days.map((day) => {
      const count = usersIn7Days.filter((user) => {
        const key = getStartOfDay(user.createdAt).toISOString().slice(0, 10);
        return key === day.key;
      }).length;

      return {
        name: day.name,
        users: count,
      };
    });

    const recentActivities = [
      ...recentUsers.map((user) => ({
        id: String(user._id),
        type: 'user',
        title: `${user.fullName} vừa đăng ký tài khoản`,
        subtitle:
          user.role === 'teacher'
            ? 'Tài khoản giáo viên'
            : user.role === 'student'
              ? 'Tài khoản học sinh'
              : 'Tài khoản quản trị',
        createdAt: user.createdAt,
      })),
      ...recentPosts.map((post) => ({
        id: String(post._id),
        type: 'forum',
        title: `${post.authorName} đã tạo bài viết forum`,
        subtitle: `${post.title} · ${
          post.status === 'pending'
            ? 'Chờ duyệt'
            : post.status === 'active'
              ? 'Đã duyệt'
              : post.status === 'rejected'
                ? 'Từ chối'
                : 'Đã ẩn'
        }`,
        createdAt: post.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    res.json({
      totalUsers,
      totalQuestions,
      pendingForumPosts,
      activeForumPosts,
      userChart,
      questionDistribution: buildQuestionDistribution(questions),
      recentActivities,
    });
  } catch (error) {
    console.error('GET ADMIN STATS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thống kê quản trị.' });
  }
});

// ===============================
// USER MANAGEMENT
// ===============================
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select('-password -resetPasswordTokenHash -resetPasswordExpires')
      .lean();

    res.json({
      users: users.map((user) => ({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status || 'active',
        school: user.school || '',
        className: user.className || '',
        province: user.province || '',
        dob: user.dob || '',
        bio: user.bio || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  } catch (error) {
    console.error('GET ADMIN USERS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng.' });
  }
});

router.patch('/users/:userId/status', verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'locked'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái tài khoản không hợp lệ.' });
    }

    if (String(req.user._id) === String(userId)) {
      return res.status(400).json({ message: 'Admin không thể tự khóa tài khoản đang đăng nhập.' });
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản cần cập nhật.' });
    }

    targetUser.status = status;
    await targetUser.save();

    res.json({
      message: status === 'locked'
        ? 'Đã khóa tài khoản thành công.'
        : 'Đã mở khóa tài khoản thành công.',
      user: {
        id: targetUser._id,
        fullName: targetUser.fullName,
        email: targetUser.email,
        role: targetUser.role,
        status: targetUser.status || 'active',
        school: targetUser.school || '',
        className: targetUser.className || '',
        province: targetUser.province || '',
        dob: targetUser.dob || '',
        bio: targetUser.bio || '',
        createdAt: targetUser.createdAt,
        updatedAt: targetUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('UPDATE USER STATUS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái tài khoản.' });
  }
});

module.exports = router;