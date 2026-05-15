import React, { useState } from 'react';
import { API_BASE } from '../../config/api';

const CommentItem = ({ comment, isReply = false }) => (
  <div className={`flex gap-3 mb-6 ${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${comment.avatarColor || 'bg-blue-500'}`}>
      {comment.avatar || 'U'}
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-gray-900 text-base">
          {comment.user || comment.author || 'Người dùng'}
        </span>

        {(comment.authorRole === 'teacher' || comment.isAuthor) && (
          <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Giáo viên
          </span>
        )}

        {comment.authorRole === 'admin' && (
          <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Admin
          </span>
        )}
      </div>

      <p className="text-gray-700 text-base leading-relaxed mb-2 whitespace-pre-line">
        {comment.content}
      </p>

      <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
        <button type="button" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Thích {comment.likeCount > 0 && <span>({comment.likeCount})</span>}
        </button>

        <span className="text-gray-400 font-normal">
          {comment.time || 'Vừa xong'}
        </span>
      </div>
    </div>
  </div>
);

const CommentSection = ({
  postId,
  comments,
  totalCount,
  isLoading = false,
  onCommentCreated,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('Bạn cần đăng nhập để bình luận.');
        return;
      }

      const response = await fetch(`${API_BASE}/api/forum/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Không thể gửi bình luận.');
        return;
      }

      setNewComment('');
      onCommentCreated?.(data.comment);
    } catch (error) {
      console.error('CREATE FORUM COMMENT ERROR =', error);
      setErrorMessage('Không thể kết nối đến server backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-b-xl shadow-sm mt-1">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Ý kiến <span className="text-gray-500 font-normal">({totalCount || 0})</span>
        </h3>
      </div>

      <div className="mb-8">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 pr-28 text-gray-700 focus:outline-none focus:border-blue-300 focus:bg-white transition-all resize-none h-24 disabled:opacity-70"
            placeholder="Chia sẻ ý kiến của bạn"
          />

          <button
            type="button"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="absolute bottom-3 right-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>

        {errorMessage && (
          <p className="mt-2 text-xs text-red-500 font-bold">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex gap-6 mb-6 text-sm font-bold border-b border-gray-100">
        <button className="text-[#9f224e] border-b-2 border-[#9f224e] pb-2">
          Mới nhất
        </button>
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 py-6">
          Đang tải bình luận...
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <div className="text-center text-gray-400 py-6">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận.
        </div>
      )}

      {!isLoading && comments.length > 0 && (
        <div>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;