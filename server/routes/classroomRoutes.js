const express = require('express');
const jwt = require('jsonwebtoken');

const Classroom = require('../models/Classroom');
const ClassMember = require('../models/ClassMember');
const ClassPost = require('../models/ClassPost');
const ClassComment = require('../models/ClassComment');
const ClassAnnouncement = require('../models/ClassAnnouncement');
const ClassMaterial = require('../models/ClassMaterial');
const ClassAssignment = require('../models/ClassAssignment');
const ClassAssignmentAttempt = require('../models/AssignmentAttempt');
const User = require('../models/User');

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
    console.error('AUTH CLASSROOM ERROR =', error);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

// ===============================
// HELPERS
// ===============================
const generateClassCode = async () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  const makeCode = () => {
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  let code = makeCode();
  let exists = await Classroom.findOne({ code });

  while (exists) {
    code = makeCode();
    exists = await Classroom.findOne({ code });
  }

  return code;
};

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

const formatDateShort = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
  });
};

const formatDeadline = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

const normalizeAnswer = (value = '') => {
  return String(value).trim().toLowerCase();
};

const buildAttemptPayload = (attempt) => ({
  id: attempt._id,
  status: attempt.status,
  answers:
    attempt.answers instanceof Map
      ? Object.fromEntries(attempt.answers)
      : attempt.answers || {},
  startedAt: attempt.startedAt,
  submittedAt: attempt.submittedAt,
  score: attempt.score,
  totalScore: attempt.totalScore,
  correctCount: attempt.correctCount,
  totalQuestions: attempt.totalQuestions,
});

const buildResultPayload = (attempt) => ({
  score: attempt.score,
  totalScore: attempt.totalScore,
  correctCount: attempt.correctCount,
  totalQuestions: attempt.totalQuestions,
});

// ===============================
// CLASSROOM
// ===============================

// Tạo lớp học
router.post('/', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được tạo lớp học!' });
    }

    const { name, requiresApproval, thumbnail } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ field: 'name', message: 'Vui lòng nhập tên lớp học!' });
    }

    const code = await generateClassCode();

    const classroom = await Classroom.create({
      name: name.trim(),
      code,
      subject: 'Hóa học',
      teacherId: user._id,
      teacherName: user.fullName,
      thumbnail: thumbnail || '',
      requiresApproval: !!requiresApproval,
      status: 'active',
    });

    await ClassMember.create({
      classroomId: classroom._id,
      userId: user._id,
      fullName: user.fullName,
      school: user.school || '',
      className: user.className || '',
      role: 'teacher',
      joinStatus: 'approved',
      isHidden: false,
    });

    res.status(201).json({
      message: 'Tạo lớp học thành công!',
      classroom,
    });
  } catch (error) {
    console.error('CREATE CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tạo lớp học.' });
  }
});

// Lấy danh sách lớp theo user hiện tại
router.get('/my-classes', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const memberships = await ClassMember.find({ userId: user._id }).lean();
    const classroomIds = memberships.map((m) => m.classroomId);

    const classrooms = await Classroom.find({ _id: { $in: classroomIds } })
      .sort({ createdAt: -1 })
      .lean();

    const result = await Promise.all(
      classrooms.map(async (cls) => {
        const currentMembership = memberships.find(
          (m) => String(m.classroomId) === String(cls._id)
        );

        const approvedStudentsCount = await ClassMember.countDocuments({
          classroomId: cls._id,
          role: 'student',
          joinStatus: 'approved',
        });

        const pendingStudentsCount = await ClassMember.countDocuments({
          classroomId: cls._id,
          role: 'student',
          joinStatus: 'pending',
        });

        const assignmentCount = await ClassAssignment.countDocuments({
          classroomId: cls._id,
          status: 'active',
        });

        const docCount = await ClassMaterial.countDocuments({
          classroomId: cls._id,
        });

        return {
          id: cls._id,
          name: cls.name,
          code: cls.code,
          subject: cls.subject,
          teacher: cls.teacherName,
          teacherId: cls.teacherId,
          thumbnail:
            cls.thumbnail ||
            'https://img.freepik.com/free-vector/science-lab-objects-composition_23-2148488313.jpg',
          requiresApproval: cls.requiresApproval,
          status: cls.status,

          membershipRole: currentMembership?.role || null,
          joinStatus: currentMembership?.joinStatus || 'approved',
          isHidden: currentMembership?.isHidden || false,

          studentCount: approvedStudentsCount,
          pendingStudentsCount,
          lessonCount: 0,
          assignmentCount,
          docCount,

          createdAt: cls.createdAt,
        };
      })
    );

    res.json({ classes: result });
  } catch (error) {
    console.error('GET MY CLASSES ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách lớp học.' });
  }
});

// Tham gia lớp bằng mã code
router.post('/join', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Chỉ học sinh mới dùng chức năng tham gia lớp!' });
    }

    const { code } = req.body;

    if (!code?.trim()) {
      return res.status(400).json({ field: 'code', message: 'Vui lòng nhập mã lớp!' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const classroom = await Classroom.findOne({ code: normalizedCode });

    if (!classroom) {
      return res.status(404).json({ field: 'code', message: 'Không tìm thấy lớp học với mã này!' });
    }

    const existed = await ClassMember.findOne({
      classroomId: classroom._id,
      userId: user._id,
    });

    if (existed) {
      return res.status(400).json({ message: 'Bạn đã tham gia hoặc đang chờ duyệt vào lớp này rồi!' });
    }

    const joinStatus = classroom.requiresApproval ? 'pending' : 'approved';

    await ClassMember.create({
      classroomId: classroom._id,
      userId: user._id,
      fullName: user.fullName,
      school: user.school || '',
      className: user.className || '',
      role: 'student',
      joinStatus,
      isHidden: false,
    });

    return res.json({
      message:
        joinStatus === 'pending'
          ? 'Đã gửi yêu cầu tham gia lớp. Vui lòng chờ giáo viên phê duyệt!'
          : 'Tham gia lớp học thành công!',
    });
  } catch (error) {
    console.error('JOIN CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tham gia lớp.' });
  }
});

// Ẩn lớp khỏi dashboard của user hiện tại
router.patch('/:id/hide', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học trong danh sách của bạn!' });
    }

    membership.isHidden = true;
    await membership.save();

    res.json({ message: 'Đã ẩn lớp học khỏi dashboard.' });
  } catch (error) {
    console.error('HIDE CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi ẩn lớp học.' });
  }
});

// Hiện lại lớp đã ẩn
router.patch('/:id/unhide', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học trong danh sách của bạn!' });
    }

    membership.isHidden = false;
    await membership.save();

    res.json({ message: 'Đã khôi phục lớp học.' });
  } catch (error) {
    console.error('UNHIDE CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi khôi phục lớp học.' });
  }
});

// Lấy chi tiết 1 lớp
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không thuộc lớp học này!' });
    }

    const classroom = await Classroom.findById(id).lean();

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    const approvedStudentsCount = await ClassMember.countDocuments({
      classroomId: id,
      role: 'student',
      joinStatus: 'approved',
    });

    const assignmentCount = await ClassAssignment.countDocuments({
      classroomId: id,
      status: 'active',
    });

    const docCount = await ClassMaterial.countDocuments({
      classroomId: id,
    });

    res.json({
      classInfo: {
        id: classroom._id,
        name: classroom.name,
        code: classroom.code,
        subject: classroom.subject,
        teacher: classroom.teacherName,
        teacherId: classroom.teacherId,
        thumbnail:
          classroom.thumbnail ||
          'https://img.freepik.com/free-vector/science-lab-objects-composition_23-2148488313.jpg',
        requiresApproval: classroom.requiresApproval,
        status: classroom.status,
        studentCount: approvedStudentsCount,
        lessonCount: 0,
        assignmentCount,
        docCount,
        createdAt: classroom.createdAt,
      },
    });
  } catch (error) {
    console.error('GET CLASS DETAIL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy chi tiết lớp học.' });
  }
});

// Lấy danh sách thành viên lớp
router.get('/:id/members', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không thuộc lớp học này!' });
    }

    const members = await ClassMember.find({
      classroomId: id,
      joinStatus: 'approved',
    })
      .sort({ role: 1, fullName: 1 })
      .lean();

    const teacherMember = members.find((m) => m.role === 'teacher');
    const studentMembers = members.filter((m) => m.role === 'student');

    res.json({
      teacher: teacherMember
        ? {
            id: teacherMember.userId,
            name: teacherMember.fullName,
            school: teacherMember.school || '',
            className: teacherMember.className || '',
          }
        : null,
      students: studentMembers.map((m) => ({
        id: m.userId,
        name: m.fullName,
        school: m.school || '',
        className: m.className || '',
      })),
    });
  } catch (error) {
    console.error('GET CLASS MEMBERS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách thành viên.' });
  }
});

// Lấy học sinh chờ duyệt
router.get('/:id/pending-members', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Chỉ giáo viên lớp này mới xem được danh sách chờ duyệt!' });
    }

    const pendingMembers = await ClassMember.find({
      classroomId: id,
      role: 'student',
      joinStatus: 'pending',
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      pendingStudents: pendingMembers.map((m) => ({
        id: m.userId,
        membershipId: m._id,
        name: m.fullName,
        school: m.school || '',
        className: m.className || '',
        requestedAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error('GET PENDING MEMBERS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách chờ duyệt.' });
  }
});

// Duyệt học sinh
router.patch('/:id/members/:membershipId/approve', authMiddleware, async (req, res) => {
  try {
    const { id, membershipId } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Chỉ giáo viên lớp này mới có quyền phê duyệt!' });
    }

    const membership = await ClassMember.findOne({
      _id: membershipId,
      classroomId: id,
      role: 'student',
    });

    if (!membership) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu tham gia lớp!' });
    }

    membership.joinStatus = 'approved';
    membership.isHidden = false;
    await membership.save();

    res.json({ message: 'Đã duyệt học sinh vào lớp thành công!' });
  } catch (error) {
    console.error('APPROVE MEMBER ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi duyệt học sinh.' });
  }
});

// Từ chối học sinh
router.delete('/:id/members/:membershipId/reject', authMiddleware, async (req, res) => {
  try {
    const { id, membershipId } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Chỉ giáo viên lớp này mới có quyền từ chối!' });
    }

    const membership = await ClassMember.findOne({
      _id: membershipId,
      classroomId: id,
      role: 'student',
      joinStatus: 'pending',
    });

    if (!membership) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu chờ duyệt!' });
    }

    await ClassMember.deleteOne({ _id: membershipId });

    res.json({ message: 'Đã từ chối yêu cầu tham gia lớp.' });
  } catch (error) {
    console.error('REJECT MEMBER ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi từ chối học sinh.' });
  }
});

// Rời khỏi lớp
router.delete('/:id/leave', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Chỉ học sinh mới có thể rời khỏi lớp!' });
    }

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
    });

    if (!membership) {
      return res.status(404).json({ message: 'Bạn không thuộc lớp học này!' });
    }

    await ClassAssignmentAttempt.deleteMany({
      classroomId: id,
      studentId: user._id,
    });

    await ClassMember.deleteOne({ _id: membership._id });

    res.json({ message: 'Bạn đã rời khỏi lớp học.' });
  } catch (error) {
    console.error('LEAVE CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi rời khỏi lớp học.' });
  }
});

// Xóa lớp học
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới có quyền xóa lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    await ClassMember.deleteMany({ classroomId: id });
    await ClassPost.deleteMany({ classroomId: id });
    await ClassComment.deleteMany({ classroomId: id });
    await ClassAnnouncement.deleteMany({ classroomId: id });
    await ClassAssignmentAttempt.deleteMany({ classroomId: id });
    await ClassAssignment.deleteMany({ classroomId: id });
    await ClassMaterial.deleteMany({ classroomId: id });
    await Classroom.deleteOne({ _id: id });

    res.json({ message: 'Đã xóa lớp học thành công!' });
  } catch (error) {
    console.error('DELETE CLASS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi xóa lớp học.' });
  }
});

// ===============================
// CLASS POSTS
// ===============================

// Lấy bảng tin lớp
// Lấy bảng tin lớp
router.get('/:id/posts', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền xem bảng tin lớp này!' });
    }

    const posts = await ClassPost.find({ classroomId: id })
      .sort({ createdAt: -1 })
      .lean();

    const postIds = posts.map((post) => post._id);

    const comments = await ClassComment.find({
      classroomId: id,
      postId: { $in: postIds },
    })
      .sort({ createdAt: 1 })
      .lean();

    const commentsByPostId = {};

    comments.forEach((comment) => {
      const key = String(comment.postId);

      if (!commentsByPostId[key]) {
        commentsByPostId[key] = [];
      }

      commentsByPostId[key].push({
        id: comment._id,
        author: comment.authorName,
        authorRole: comment.authorRole,
        avatar: comment.authorName?.charAt(0)?.toUpperCase() || 'U',
        content: comment.content,
        time: formatRelativeTime(comment.createdAt),
        createdAt: comment.createdAt,
      });
    });

    res.json({
      posts: posts.map((post) => ({
        id: post._id,
        author: post.authorName,
        authorRole: post.authorRole,
        avatar: post.authorName?.charAt(0)?.toUpperCase() || 'U',
        time: formatRelativeTime(post.createdAt),
        content: post.content || '',
        image: post.image || null,
        commentsList: commentsByPostId[String(post._id)] || [],
      })),
    });
  } catch (error) {
    console.error('GET CLASS POSTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy bảng tin lớp.' });
  }
});

// Tạo bài đăng bảng tin
router.post('/:id/posts', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { content, image } = req.body;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền đăng bài trong lớp này!' });
    }

    if (!content?.trim() && !image) {
      return res.status(400).json({ message: 'Bài đăng phải có nội dung hoặc hình ảnh!' });
    }

    const newPost = await ClassPost.create({
      classroomId: id,
      authorId: user._id,
      authorName: user.fullName,
      authorRole: user.role === 'teacher' ? 'teacher' : 'student',
      content: content?.trim() || '',
      image: image || '',
    });

    res.status(201).json({
      message: 'Đăng bài thành công!',
      post: {
        id: newPost._id,
        author: newPost.authorName,
        authorRole: newPost.authorRole,
        avatar: newPost.authorName?.charAt(0)?.toUpperCase() || 'U',
        time: 'Vừa xong',
        content: newPost.content || '',
        image: newPost.image || null,
        commentsList: [],
      },
    });
  } catch (error) {
    console.error('CREATE CLASS POST ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi đăng bài lên bảng tin.' });
  }
});

// Tạo bình luận cho bài đăng
router.post('/:id/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { id, postId } = req.params;
    const user = req.user;
    const { content } = req.body;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền bình luận trong lớp này!' });
    }

    const post = await ClassPost.findOne({
      _id: postId,
      classroomId: id,
    });

    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng!' });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập nội dung bình luận!' });
    }

    const comment = await ClassComment.create({
      classroomId: id,
      postId,
      authorId: user._id,
      authorName: user.fullName,
      authorRole: user.role === 'teacher' ? 'teacher' : 'student',
      content: content.trim(),
    });

    res.status(201).json({
      message: 'Bình luận thành công!',
      comment: {
        id: comment._id,
        author: comment.authorName,
        authorRole: comment.authorRole,
        avatar: comment.authorName?.charAt(0)?.toUpperCase() || 'U',
        content: comment.content,
        time: 'Vừa xong',
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    console.error('CREATE CLASS COMMENT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi bình luận.' });
  }
});


// Lấy danh sách thông báo giáo viên
router.get('/:id/announcements', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền xem thông báo lớp này!' });
    }

    const announcements = await ClassAnnouncement.find({ classroomId: id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      announcements: announcements.map((item) => ({
        id: item._id,
        content: item.content,
        teacherName: item.teacherName,
        time: formatRelativeTime(item.createdAt),
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    console.error('GET CLASS ANNOUNCEMENTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông báo lớp học.' });
  }
});

// Tạo thông báo giáo viên
router.post('/:id/announcements', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { content } = req.body;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được tạo thông báo!' });
    }

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    if (!content?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập nội dung thông báo!' });
    }

    const announcement = await ClassAnnouncement.create({
      classroomId: id,
      teacherId: user._id,
      teacherName: user.fullName,
      content: content.trim(),
    });

    res.status(201).json({
      message: 'Tạo thông báo thành công!',
      announcement: {
        id: announcement._id,
        content: announcement.content,
        teacherName: announcement.teacherName,
        time: 'Vừa xong',
        createdAt: announcement.createdAt,
      },
    });
  } catch (error) {
    console.error('CREATE CLASS ANNOUNCEMENT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tạo thông báo.' });
  }
});

// ===============================
// CLASS MATERIALS
// ===============================

// Lấy danh sách tài liệu của lớp
router.get('/:id/materials', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền xem tài liệu của lớp này!' });
    }

    const materials = await ClassMaterial.find({ classroomId: id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      materials: materials.map((item) => ({
        id: item._id,
        title: item.title,
        type: 'material',
        fileType: item.fileType,
        postedDate: item.postedDate,
        size: item.size,
        fileUrl: item.fileUrl,
        uploaderName: item.uploaderName,
      })),
    });
  } catch (error) {
    console.error('GET CLASS MATERIALS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách tài liệu.' });
  }
});

// Upload tài liệu mới
router.post('/:id/materials', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { title, fileType, fileUrl, size } = req.body;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền tải tài liệu lên lớp này!' });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được tải tài liệu lên!' });
    }

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Thiếu tên tài liệu!' });
    }

    if (!fileUrl?.trim()) {
      return res.status(400).json({ message: 'Thiếu nội dung file!' });
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const postedDate = `${day} thg ${month}`;

    const material = await ClassMaterial.create({
      classroomId: id,
      uploadedBy: user._id,
      uploaderName: user.fullName,
      title: title.trim(),
      fileType: fileType || 'OTHER',
      fileUrl: fileUrl.trim(),
      size: size || '',
      postedDate,
    });

    res.status(201).json({
      message: 'Tải tài liệu lên thành công!',
      material: {
        id: material._id,
        title: material.title,
        type: 'material',
        fileType: material.fileType,
        postedDate: material.postedDate,
        size: material.size,
        fileUrl: material.fileUrl,
        uploaderName: material.uploaderName,
      },
    });
  } catch (error) {
    console.error('UPLOAD CLASS MATERIAL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi tải tài liệu lên.' });
  }
});

// Xóa tài liệu
router.delete('/:id/materials/:materialId', authMiddleware, async (req, res) => {
  try {
    const { id, materialId } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được xóa tài liệu!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const material = await ClassMaterial.findOne({
      _id: materialId,
      classroomId: id,
    });

    if (!material) {
      return res.status(404).json({ message: 'Không tìm thấy tài liệu!' });
    }

    await ClassMaterial.deleteOne({ _id: materialId });

    res.json({ message: 'Đã xóa tài liệu thành công!' });
  } catch (error) {
    console.error('DELETE CLASS MATERIAL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi xóa tài liệu.' });
  }
});
// ===============================
// CLASS ASSIGNMENTS
// ===============================

// Lấy danh sách bài tập của lớp
router.get('/:id/assignments', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền xem bài tập của lớp này!' });
    }

    const assignments = await ClassAssignment.find({
      classroomId: id,
      status: 'active',
    })
      .sort({ createdAt: -1 })
      .lean();

    const assignmentIds = assignments.map((assignment) => assignment._id);

    let submittedCountsMap = {};
    let studentAttemptsMap = {};

    if (assignmentIds.length > 0) {
      const submittedCounts = await ClassAssignmentAttempt.aggregate([
        {
          $match: {
            classroomId: assignments[0].classroomId,
            assignmentId: { $in: assignmentIds },
            status: 'submitted',
          },
        },
        {
          $group: {
            _id: '$assignmentId',
            count: { $sum: 1 },
          },
        },
      ]);

      submittedCounts.forEach((item) => {
        submittedCountsMap[String(item._id)] = item.count;
      });

      if (user.role === 'student') {
        const myAttempts = await ClassAssignmentAttempt.find({
          classroomId: id,
          assignmentId: { $in: assignmentIds },
          studentId: user._id,
        }).lean();

        myAttempts.forEach((attempt) => {
          studentAttemptsMap[String(attempt.assignmentId)] = attempt;
        });
      }
    }

    res.json({
      assignments: assignments.map((assignment) => {
        const attempt = studentAttemptsMap[String(assignment._id)];

        return {
          id: assignment._id,
          title: assignment.title,
          type: 'assignment',

          topic: assignment.topic || 'other',

          postedDate: formatDateShort(assignment.createdAt),
          deadline: formatDeadline(assignment.deadline),
          deadlineRaw: assignment.deadline,
          duration: assignment.durationMinutes,
          durationMinutes: assignment.durationMinutes,

          questionCount: assignment.questions?.length || 0,
          submittedCount: submittedCountsMap[String(assignment._id)] || 0,

          isSubmitted: attempt?.status === 'submitted',
          attemptStatus: attempt?.status || null,

          createdAt: assignment.createdAt,
        };
      }),
    });
  } catch (error) {
    console.error('GET CLASS ASSIGNMENTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách bài tập.' });
  }
});

// Lấy chi tiết 1 bài tập
router.get('/:id/assignments/:assignmentId', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không có quyền xem bài tập này!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
    }).lean();

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    res.json({
      assignment: {
        id: assignment._id,
        title: assignment.title,
        type: 'assignment',

        topic: assignment.topic || 'other',

        deadline: assignment.deadline,
        deadlineText: formatDeadline(assignment.deadline),
        duration: assignment.durationMinutes,
        durationMinutes: assignment.durationMinutes,

        questions: (assignment.questions || []).map((q, index) => ({
          id: q._id || index + 1,
          type: q.type,
          text: q.text,
          options: q.options || [],
          correctAnswer: user.role === 'teacher' ? q.correctAnswer : undefined,
          score: q.score || 1,
        })),

        createdAt: assignment.createdAt,
        postedDate: formatDateShort(assignment.createdAt),
      },
    });
  } catch (error) {
    console.error('GET CLASS ASSIGNMENT DETAIL ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy chi tiết bài tập.' });
  }
});

// Tạo bài tập mới
router.post('/:id/assignments', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được tạo bài tập!' });
    }

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const { title, topic, deadline, duration, durationMinutes, questions } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập tên bài tập!' });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Bài tập phải có ít nhất 1 câu hỏi!' });
    }

    const normalizedTopic = topic?.trim() || 'Chưa phân loại';
    const normalizedQuestions = questions.map((q, index) => {
      if (!q.text?.trim()) {
        throw new Error(`Câu ${index + 1} chưa có nội dung câu hỏi.`);
      }

      if (!q.correctAnswer?.trim()) {
        throw new Error(`Câu ${index + 1} chưa có đáp án đúng.`);
      }

      if (q.type === 'multiple-choice') {
        const options = Array.isArray(q.options)
          ? q.options.map((opt) => String(opt || '').trim()).filter(Boolean)
          : [];

        if (options.length < 2) {
          throw new Error(`Câu ${index + 1} phải có ít nhất 2 đáp án lựa chọn.`);
        }

        if (!options.includes(q.correctAnswer.trim())) {
          throw new Error(`Câu ${index + 1}: đáp án đúng phải nằm trong các lựa chọn.`);
        }

        return {
          type: 'multiple-choice',
          text: q.text.trim(),
          options,
          correctAnswer: q.correctAnswer.trim(),
          score: Number(q.score) || 1,
        };
      }

      if (q.type === 'fill-in') {
        return {
          type: 'fill-in',
          text: q.text.trim(),
          options: [],
          correctAnswer: q.correctAnswer.trim(),
          score: Number(q.score) || 1,
        };
      }

      throw new Error(`Câu ${index + 1} có loại câu hỏi không hợp lệ.`);
    });

    const assignment = await ClassAssignment.create({
      classroomId: id,
      createdBy: user._id,
      createdByName: user.fullName,

      title: title.trim(),
      topic: normalizedTopic,

      deadline: deadline || null,
      durationMinutes: Number(durationMinutes || duration) || 15,

      questions: normalizedQuestions,
      status: 'active',
    });

    res.status(201).json({
      message: 'Tạo bài tập thành công!',
      assignment: {
        id: assignment._id,
        title: assignment.title,
        type: 'assignment',

        topic: assignment.topic || 'other',

        postedDate: formatDateShort(assignment.createdAt),
        deadline: formatDeadline(assignment.deadline),
        deadlineRaw: assignment.deadline,
        duration: assignment.durationMinutes,
        durationMinutes: assignment.durationMinutes,

        questionCount: assignment.questions?.length || 0,
        submittedCount: 0,

        isSubmitted: false,
        attemptStatus: null,

        createdAt: assignment.createdAt,
      },
    });
  } catch (error) {
    console.error('CREATE CLASS ASSIGNMENT ERROR =', error);
    res.status(400).json({
      message: error.message || 'Lỗi server khi tạo bài tập.',
    });
  }
});

// Cập nhật bài tập
router.patch('/:id/assignments/:assignmentId', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được sửa bài tập!' });
    }

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    const submittedCount = await ClassAssignmentAttempt.countDocuments({
      classroomId: id,
      assignmentId,
      status: 'submitted',
    });

    if (submittedCount > 0) {
      return res.status(400).json({
        message: 'Bài tập đã có học sinh nộp bài, không nên sửa nội dung câu hỏi nữa.',
      });
    }

    const { title, topic, deadline, duration, durationMinutes, questions } = req.body;

    if (title !== undefined) {
      if (!title?.trim()) {
        return res.status(400).json({ message: 'Vui lòng nhập tên bài tập!' });
      }

      assignment.title = title.trim();
    }

    if (topic !== undefined) {
      assignment.topic = topic?.trim() || 'Chưa phân loại';
    }

    if (deadline !== undefined) {
      assignment.deadline = deadline || null;
    }

    if (duration !== undefined || durationMinutes !== undefined) {
      assignment.durationMinutes = Number(durationMinutes || duration) || 15;
    }

    if (questions !== undefined) {
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: 'Bài tập phải có ít nhất 1 câu hỏi!' });
      }

      assignment.questions = questions.map((q, index) => {
        if (!q.text?.trim()) {
          throw new Error(`Câu ${index + 1} chưa có nội dung câu hỏi.`);
        }

        if (!q.correctAnswer?.trim()) {
          throw new Error(`Câu ${index + 1} chưa có đáp án đúng.`);
        }

        if (q.type === 'multiple-choice') {
          const options = Array.isArray(q.options)
            ? q.options.map((opt) => String(opt || '').trim()).filter(Boolean)
            : [];

          if (options.length < 2) {
            throw new Error(`Câu ${index + 1} phải có ít nhất 2 đáp án lựa chọn.`);
          }

          if (!options.includes(q.correctAnswer.trim())) {
            throw new Error(`Câu ${index + 1}: đáp án đúng phải nằm trong các lựa chọn.`);
          }

          return {
            type: 'multiple-choice',
            text: q.text.trim(),
            options,
            correctAnswer: q.correctAnswer.trim(),
            score: Number(q.score) || 1,
          };
        }

        if (q.type === 'fill-in') {
          return {
            type: 'fill-in',
            text: q.text.trim(),
            options: [],
            correctAnswer: q.correctAnswer.trim(),
            score: Number(q.score) || 1,
          };
        }

        throw new Error(`Câu ${index + 1} có loại câu hỏi không hợp lệ.`);
      });
    }

    await assignment.save();

    res.json({
      message: 'Cập nhật bài tập thành công!',
      assignment: {
        id: assignment._id,
        title: assignment.title,
        type: 'assignment',

        topic: assignment.topic || 'other',

        postedDate: formatDateShort(assignment.createdAt),
        deadline: formatDeadline(assignment.deadline),
        deadlineRaw: assignment.deadline,
        duration: assignment.durationMinutes,
        durationMinutes: assignment.durationMinutes,

        questionCount: assignment.questions?.length || 0,
        submittedCount,

        createdAt: assignment.createdAt,
      },
    });
  } catch (error) {
    console.error('UPDATE CLASS ASSIGNMENT ERROR =', error);
    res.status(400).json({
      message: error.message || 'Lỗi server khi cập nhật bài tập.',
    });
  }
});

// Cập nhật thông tin quản lý bài tập
// Chỉ cho sửa: tiêu đề, chủ đề, hạn chót, thời lượng
router.patch('/:id/assignments/:assignmentId/settings', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được sửa bài tập!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    const { title, topic, deadline, durationMinutes } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập tên bài tập!' });
    }

    if (!durationMinutes || Number(durationMinutes) <= 0) {
      return res.status(400).json({ message: 'Thời lượng làm bài không hợp lệ!' });
    }

    assignment.title = title.trim();
    assignment.topic = topic?.trim() || 'Chưa phân loại';
    assignment.deadline = deadline || null;
    assignment.durationMinutes = Number(durationMinutes);

    await assignment.save();

    res.json({
      message: 'Cập nhật thông tin bài tập thành công!',
      assignment: {
        id: assignment._id,
        title: assignment.title,
        topic: assignment.topic,
        deadline: assignment.deadline,
        durationMinutes: assignment.durationMinutes,
      },
    });
  } catch (error) {
    console.error('UPDATE ASSIGNMENT SETTINGS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật thông tin bài tập.' });
  }
});


// Xóa bài tập
router.delete('/:id/assignments/:assignmentId', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới được xóa bài tập!' });
    }

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    await ClassAssignmentAttempt.deleteMany({
      classroomId: id,
      assignmentId,
    });

    await ClassAssignment.deleteOne({
      _id: assignmentId,
      classroomId: id,
    });

    res.json({ message: 'Đã xóa bài tập thành công!' });
  } catch (error) {
    console.error('DELETE CLASS ASSIGNMENT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi xóa bài tập.' });
  }
});

// Lấy danh sách bài nộp của 1 bài tập
router.get('/:id/assignments/:assignmentId/attempts', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Chỉ giáo viên mới xem được danh sách nộp bài!' });
    }

    const classroom = await Classroom.findById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học!' });
    }

    if (String(classroom.teacherId) !== String(user._id)) {
      return res.status(403).json({ message: 'Bạn không phải giáo viên sở hữu lớp này!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
    }).lean();

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    const approvedStudents = await ClassMember.find({
      classroomId: id,
      role: 'student',
      joinStatus: 'approved',
    })
      .sort({ fullName: 1 })
      .lean();

    const attempts = await ClassAssignmentAttempt.find({
      classroomId: id,
      assignmentId,
    }).lean();

    const attemptsMap = {};
    attempts.forEach((attempt) => {
      attemptsMap[String(attempt.studentId)] = attempt;
    });

    res.json({
      assignment: {
        id: assignment._id,
        title: assignment.title,
        duration: assignment.durationMinutes,
        deadline: formatDeadline(assignment.deadline),
        totalQuestions: assignment.questions?.length || 0,
      },
      attempts: approvedStudents.map((student) => {
        const attempt = attemptsMap[String(student.userId)];

        return {
          studentId: student.userId,
          studentName: student.fullName,
          school: student.school || '',
          className: student.className || '',
          status: attempt?.status || 'not_started',
          submittedAt: attempt?.submittedAt || null,
          submittedAtText: attempt?.submittedAt ? formatRelativeTime(attempt.submittedAt) : '',
          score: attempt?.score || 0,
          totalScore: attempt?.totalScore || 0,
          correctCount: attempt?.correctCount || 0,
          totalQuestions: attempt?.totalQuestions || assignment.questions?.length || 0,
        };
      }),
    });
  } catch (error) {
    console.error('GET ASSIGNMENT ATTEMPTS ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách nộp bài.' });
  }
});

// Học sinh bắt đầu / mở lại bài làm
router.post('/:id/assignments/:assignmentId/start', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Chỉ học sinh mới được làm bài!' });
    }

    const membership = await ClassMember.findOne({
      classroomId: id,
      userId: user._id,
      role: 'student',
      joinStatus: 'approved',
    });

    if (!membership) {
      return res.status(403).json({ message: 'Bạn không thuộc lớp học này hoặc chưa được duyệt!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
      status: 'active',
    }).lean();

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    let attempt = await ClassAssignmentAttempt.findOne({
      classroomId: id,
      assignmentId,
      studentId: user._id,
    });

    if (attempt?.status !== 'submitted') {
      if (assignment.deadline && new Date() > new Date(assignment.deadline)) {
        return res.status(400).json({ message: 'Bài tập đã hết hạn nộp!' });
      }
    }

    if (!attempt) {
      attempt = await ClassAssignmentAttempt.create({
        classroomId: id,
        assignmentId,
        studentId: user._id,
        studentName: user.fullName,
        answers: {},
        startedAt: new Date(),
        status: 'in_progress',
      });
    }

    res.json({
      assignment: {
        id: assignment._id,
        title: assignment.title,
        type: 'assignment',

        topic: assignment.topic || 'other',

        deadline: assignment.deadline,
        deadlineText: formatDeadline(assignment.deadline),
        duration: assignment.durationMinutes,
        durationMinutes: assignment.durationMinutes,

        questions: (assignment.questions || []).map((q, index) => ({
          id: q._id || index + 1,
          type: q.type,
          text: q.text,
          options: q.options || [],
          score: q.score || 1,
        })),

        createdAt: assignment.createdAt,
      },
      attempt: buildAttemptPayload(attempt),
    });
  } catch (error) {
    console.error('START ASSIGNMENT ATTEMPT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi bắt đầu bài làm.' });
  }
});

// Autosave bài làm
router.patch('/:id/assignments/:assignmentId/attempt', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;
    const { answers } = req.body;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Chỉ học sinh mới được lưu bài làm!' });
    }

    const attempt = await ClassAssignmentAttempt.findOne({
      classroomId: id,
      assignmentId,
      studentId: user._id,
    });

    if (!attempt) {
      return res.status(404).json({ message: 'Không tìm thấy bài làm đang thực hiện!' });
    }

    if (attempt.status === 'submitted') {
      return res.status(400).json({
        message: 'Bạn đã nộp bài này rồi!',
        attempt: buildAttemptPayload(attempt),
      });
    }

    attempt.answers = answers || {};
    await attempt.save();

    res.json({
      message: 'Đã lưu tạm bài làm.',
      attempt: buildAttemptPayload(attempt),
    });
  } catch (error) {
    console.error('AUTOSAVE ASSIGNMENT ATTEMPT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi lưu tạm bài làm.' });
  }
});

// Nộp bài
router.post('/:id/assignments/:assignmentId/submit', authMiddleware, async (req, res) => {
  try {
    const { id, assignmentId } = req.params;
    const user = req.user;
    const { answers } = req.body;

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Chỉ học sinh mới được nộp bài!' });
    }

    const assignment = await ClassAssignment.findOne({
      _id: assignmentId,
      classroomId: id,
      status: 'active',
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Không tìm thấy bài tập!' });
    }

    let attempt = await ClassAssignmentAttempt.findOne({
      classroomId: id,
      assignmentId,
      studentId: user._id,
    });

    if (!attempt) {
      attempt = await ClassAssignmentAttempt.create({
        classroomId: id,
        assignmentId,
        studentId: user._id,
        studentName: user.fullName,
        answers: {},
        startedAt: new Date(),
        status: 'in_progress',
      });
    }

    if (attempt.status === 'submitted') {
      return res.status(400).json({
        message: 'Bạn đã nộp bài này rồi!',
        attempt: buildAttemptPayload(attempt),
        result: buildResultPayload(attempt),
      });
    }

    const finalAnswers = answers || {};
    let score = 0;
    let totalScore = 0;
    let correctCount = 0;

    assignment.questions.forEach((question) => {
      const questionId = String(question._id);
      const questionScore = Number(question.score || 1);

      totalScore += questionScore;

      if (normalizeAnswer(finalAnswers[questionId]) === normalizeAnswer(question.correctAnswer)) {
        score += questionScore;
        correctCount += 1;
      }
    });

    attempt.answers = finalAnswers;
    attempt.status = 'submitted';
    attempt.submittedAt = new Date();
    attempt.score = score;
    attempt.totalScore = totalScore;
    attempt.correctCount = correctCount;
    attempt.totalQuestions = assignment.questions.length;

    await attempt.save();

    res.json({
      message: 'Nộp bài thành công!',
      attempt: buildAttemptPayload(attempt),
      result: buildResultPayload(attempt),
    });
  } catch (error) {
    console.error('SUBMIT ASSIGNMENT ATTEMPT ERROR =', error);
    res.status(500).json({ message: 'Lỗi server khi nộp bài.' });
  }
});

module.exports = router;
