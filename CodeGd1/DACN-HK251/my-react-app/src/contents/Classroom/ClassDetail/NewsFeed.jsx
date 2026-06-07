import React, { useEffect, useMemo, useRef, useState } from 'react';
import { API_BASE } from '../../../config/api';

const Newsfeed = ({
  classId,
  classInfo,
  isTeacher,
  posts = [],
  announcements = [],
  assignments = [],
  onReloadPosts,
  onReloadAnnouncements,
  setActiveTab,
}) => {
  const [feedText, setFeedText] = useState('');
  const [feedImage, setFeedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState('');

  const fileInputRef = useRef(null);

  const [localPosts, setLocalPosts] = useState(posts || []);
  const [openCommentPostIds, setOpenCommentPostIds] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentErrors, setCommentErrors] = useState({});
  const [submittingCommentPostId, setSubmittingCommentPostId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementError, setAnnouncementError] = useState('');
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLocalPosts(posts || []);
  }, [posts]);

  const upcomingAssignments = useMemo(() => {
    const now = new Date();

    return (assignments || [])
      .filter((item) => {
        if (!item.deadlineRaw) return false;
        if (item.isSubmitted && !isTeacher) return false;

        const deadline = new Date(item.deadlineRaw);
        return deadline >= now;
      })
      .sort((a, b) => new Date(a.deadlineRaw) - new Date(b.deadlineRaw))
      .slice(0, 3);
  }, [assignments, isTeacher]);

  const formatDeadlineLabel = (deadlineRaw) => {
    if (!deadlineRaw) return 'Không có hạn chót';

    const deadline = new Date(deadlineRaw);
    const now = new Date();

    const sameDay =
      deadline.getDate() === now.getDate() &&
      deadline.getMonth() === now.getMonth() &&
      deadline.getFullYear() === now.getFullYear();

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const isTomorrow =
      deadline.getDate() === tomorrow.getDate() &&
      deadline.getMonth() === tomorrow.getMonth() &&
      deadline.getFullYear() === tomorrow.getFullYear();

    const timeText = deadline.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (sameDay) return `Hết hạn: ${timeText} hôm nay`;
    if (isTomorrow) return `Hết hạn: ${timeText} ngày mai`;

    return `Hết hạn: ${deadline.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}`;
  };

  const getDeadlineDay = (deadlineRaw) => {
    if (!deadlineRaw) return '--';
    return String(new Date(deadlineRaw).getDate()).padStart(2, '0');
  };

  const readImageAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPostError('Vui lòng chọn đúng file hình ảnh.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPostError('Ảnh không nên vượt quá 2MB.');
      return;
    }

    try {
      const imageUrl = await readImageAsDataUrl(file);
      setFeedImage(imageUrl);
      setPostError('');
    } catch (error) {
      setPostError('Không thể đọc file ảnh.');
    }
  };

  const handlePostFeed = async () => {
    if (!feedText.trim() && !feedImage) return;

    try {
      setIsPosting(true);
      setPostError('');

      const response = await fetch(`${API_BASE}/api/classrooms/${classId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: feedText,
          image: feedImage || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPostError(data.message || 'Không thể đăng bài.');
        return;
      }

      setFeedText('');
      setFeedImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      if (data.post) {
        setLocalPosts((prevPosts) => [data.post, ...prevPosts]);
      } else if (onReloadPosts) {
        await onReloadPosts();
      }
    } catch (error) {
      setPostError('Không thể kết nối tới server backend.');
    } finally {
      setIsPosting(false);
    }
  };

  const toggleComments = (postId) => {
    setOpenCommentPostIds((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      }

      return [...prev, postId];
    });
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));

    setCommentErrors((prev) => ({
      ...prev,
      [postId]: '',
    }));
  };

  const handleSubmitComment = async (postId) => {
    const content = commentInputs[postId]?.trim();

    if (!content) return;

    try {
      setSubmittingCommentPostId(postId);

      const response = await fetch(
        `${API_BASE}/api/classrooms/${classId}/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setCommentErrors((prev) => ({
          ...prev,
          [postId]: data.message || 'Không thể gửi bình luận.',
        }));
        return;
      }

      const newComment = data.comment;

      setLocalPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (String(post.id) !== String(postId)) return post;

          return {
            ...post,
            commentsList: [...(post.commentsList || []), newComment],
          };
        })
      );

      setCommentInputs((prev) => ({
        ...prev,
        [postId]: '',
      }));

      setCommentErrors((prev) => ({
        ...prev,
        [postId]: '',
      }));

      setOpenCommentPostIds((prev) =>
        prev.includes(postId) ? prev : [...prev, postId]
      );
    } catch (error) {
      setCommentErrors((prev) => ({
        ...prev,
        [postId]: 'Không thể kết nối tới server backend.',
      }));
    } finally {
      setSubmittingCommentPostId(null);
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!announcementContent.trim()) return;

    try {
      setIsCreatingAnnouncement(true);
      setAnnouncementError('');

      const response = await fetch(`${API_BASE}/api/classrooms/${classId}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: announcementContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAnnouncementError(data.message || 'Không thể tạo thông báo.');
        return;
      }

      setAnnouncementContent('');
      setIsModalOpen(false);

      if (onReloadAnnouncements) {
        await onReloadAnnouncements();
      }
    } catch (error) {
      setAnnouncementError('Không thể kết nối tới server backend.');
    } finally {
      setIsCreatingAnnouncement(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
              {isTeacher ? 'GV' : 'HS'}
            </div>

            <div className="flex-1">
              <input
                type="text"
                placeholder="Nhập nội dung thảo luận với lớp học..."
                className="w-full h-10 px-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-blue-500 transition"
                value={feedText}
                onChange={(e) => {
                  setFeedText(e.target.value);
                  setPostError('');
                }}
              />
            </div>
          </div>

          {feedImage && (
            <div className="mb-3 ml-14 relative inline-block">
              <img
                src={feedImage}
                alt="Preview"
                className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
              />

              <button
                onClick={() => setFeedImage(null)}
                className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-black"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {postError && (
            <p className="ml-14 mb-3 text-sm text-red-500 font-medium">
              {postError}
            </p>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-50 ml-14">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Thêm hình ảnh
            </button>

            <button
              onClick={handlePostFeed}
              disabled={(!feedText.trim() && !feedImage) || isPosting}
              className={`px-6 py-2 text-white font-bold text-sm rounded-lg transition shadow-sm ${
                (feedText.trim() || feedImage) && !isPosting
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isPosting ? 'Đang đăng...' : 'Đăng tin'}
            </button>
          </div>
        </div>

        {localPosts.length > 0 ? (
          localPosts.map((post) => {
            const isCommentsOpen = openCommentPostIds.includes(post.id);

            return (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        post.authorRole === 'teacher' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    >
                      {post.avatar}
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                      <span className="text-xs text-gray-500">{post.time}</span>
                    </div>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600">...</button>
                </div>

                {post.content && (
                  <p className="text-gray-800 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {post.content}
                  </p>
                )}

                {post.image && (
                  <div className="mb-4">
                    {post.image && (
                      <div className="mb-4">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="rounded-lg max-h-80 max-w-full object-contain border border-gray-100"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 border-t border-gray-50 pt-3">
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 text-sm font-bold transition hover:text-blue-600 ${
                      isCommentsOpen ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {post.commentsList?.length || 0} bình luận
                  </button>
                </div>

                {isCommentsOpen && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
                    {post.commentsList?.length > 0 && (
                      <div className="space-y-3">
                        {post.commentsList.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                comment.authorRole === 'teacher'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {comment.avatar}
                            </div>

                            <div className="bg-gray-50 rounded-2xl px-4 py-2 max-w-[85%]">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-xs text-gray-900">
                                  {comment.author}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {comment.time}
                                </span>
                              </div>

                              <p className="text-sm text-gray-800 whitespace-pre-line">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {commentErrors[post.id] && (
                      <p className="text-sm text-red-500 font-medium">
                        {commentErrors[post.id]}
                      </p>
                    )}

                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
                        {isTeacher ? 'T' : 'S'}
                      </div>

                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Viết bình luận..."
                          className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-500 transition"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSubmitComment(post.id);
                            }
                          }}
                        />

                        <button
                          onClick={() => handleSubmitComment(post.id)}
                          disabled={
                            !commentInputs[post.id]?.trim() ||
                            submittingCommentPostId === post.id
                          }
                          className="absolute right-2 top-1.5 text-blue-600 hover:bg-blue-50 p-1 rounded-full disabled:text-gray-300 transition"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-400">
            Chưa có bài đăng nào trong lớp học này.
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Thông báo từ giáo viên</h3>

          {isTeacher && (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setAnnouncementError('');
              }}
              className="w-full flex items-center justify-center gap-2 mb-4 py-2 border-2 border-blue-100 text-blue-600 font-bold text-sm rounded-lg hover:bg-blue-50 hover:border-blue-200 transition active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tạo thông báo
            </button>
          )}

          {announcements.length > 0 ? (
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 relative group animate-fade-in"
                >
                  <p className="text-sm text-gray-800 font-medium mb-1 whitespace-pre-line">
                    {ann.content}
                  </p>
                  <span className="text-[10px] text-gray-400 block text-right">
                    {ann.time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                alt="Empty"
                className="w-16 h-16 opacity-50 mb-3 grayscale"
              />
              <p className="text-xs text-gray-400 px-4">Chưa có thông báo nào.</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Bài tập sắp đến hạn</h3>

            <button
              onClick={() => setActiveTab && setActiveTab('classwork')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Xem tất cả
            </button>
          </div>

          {upcomingAssignments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAssignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => setActiveTab && setActiveTab('classwork')}
                  className="w-full bg-red-50 rounded-lg p-3 border border-red-100 flex gap-3 items-center text-left hover:bg-red-100/60 transition"
                >
                  <div className="bg-white text-red-600 font-bold rounded px-2 py-1 text-xs text-center border border-red-100 shrink-0">
                    <div>NGÀY</div>
                    <div className="text-lg">{getDeadlineDay(assignment.deadlineRaw)}</div>
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">
                      {assignment.title}
                    </h4>
                    <p className="text-xs text-red-500 font-medium">
                      {formatDeadlineLabel(assignment.deadlineRaw)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 text-xs text-gray-400">
              Không có bài tập sắp đến hạn.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-5 animate-scale-up">
            <h3 className="text-base font-bold text-gray-800 mb-3">Thông báo ngắn</h3>

            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 min-h-[100px] resize-none mb-3"
              placeholder="Ví dụ: Ngày mai nghỉ học nhé..."
              value={announcementContent}
              onChange={(e) => {
                setAnnouncementContent(e.target.value);
                setAnnouncementError('');
              }}
              autoFocus
            />

            {announcementError && (
              <p className="text-sm text-red-500 font-medium mb-3">
                {announcementError}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setAnnouncementError('');
                }}
                className="px-3 py-2 bg-gray-100 text-gray-600 font-bold text-xs rounded-lg hover:bg-gray-200 transition"
              >
                Hủy
              </button>

              <button
                onClick={handleCreateAnnouncement}
                disabled={!announcementContent.trim() || isCreatingAnnouncement}
                className={`px-3 py-2 text-white font-bold text-xs rounded-lg transition shadow-sm ${
                  announcementContent.trim() && !isCreatingAnnouncement
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isCreatingAnnouncement ? 'Đang đăng...' : 'Đăng ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsfeed;