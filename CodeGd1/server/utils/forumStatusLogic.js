const FORUM_STATUSES = ['pending', 'active', 'rejected', 'hidden'];

const canPublicViewPost = (post = {}) => {
  return post.status === 'active';
};

const canTeacherEditPost = (post = {}, teacherId) => {
  return String(post.authorId) === String(teacherId) && post.status !== 'hidden';
};

const canAdminApprovePost = (post = {}) => {
  return post.status === 'pending';
};

const approvePost = (post = {}) => {
  if (!canAdminApprovePost(post)) {
    return {
      success: false,
      error: 'Chỉ bài viết đang chờ duyệt mới có thể được duyệt.',
    };
  }

  return {
    success: true,
    post: {
      ...post,
      status: 'active',
      rejectionReason: '',
    },
  };
};

const rejectPost = (post = {}, reason = '') => {
  if (post.status !== 'pending') {
    return {
      success: false,
      error: 'Chỉ bài viết đang chờ duyệt mới có thể bị từ chối.',
    };
  }

  if (!reason || !reason.trim()) {
    return {
      success: false,
      error: 'Cần nhập lý do từ chối.',
    };
  }

  return {
    success: true,
    post: {
      ...post,
      status: 'rejected',
      rejectionReason: reason.trim(),
    },
  };
};

const hidePost = (post = {}) => {
  if (post.status !== 'active') {
    return {
      success: false,
      error: 'Chỉ bài viết đã duyệt mới có thể bị ẩn.',
    };
  }

  return {
    success: true,
    post: {
      ...post,
      status: 'hidden',
    },
  };
};

module.exports = {
  FORUM_STATUSES,
  canPublicViewPost,
  canTeacherEditPost,
  canAdminApprovePost,
  approvePost,
  rejectPost,
  hidePost,
};