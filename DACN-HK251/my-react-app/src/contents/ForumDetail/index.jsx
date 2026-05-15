import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import PostContent from './PostContent';
import CommentSection from './CommentSection';
import { API_BASE } from '../../config/api';

const ForumDetail = () => {
  const navigate = useNavigate();
  const { id, postId } = useParams();

  const currentPostId = postId || id;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPostDetail = async () => {
    try {
      setIsLoadingPost(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/forum/posts/${currentPostId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Không thể tải bài viết forum.');
        setPost(null);
        return;
      }

      setPost(data.post);
    } catch (error) {
      console.error('FETCH FORUM POST DETAIL ERROR =', error);
      setErrorMessage('Không thể kết nối đến server backend.');
      setPost(null);
    } finally {
      setIsLoadingPost(false);
    }
  };

  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/forum/posts/${currentPostId}/comments`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setComments([]);
        return;
      }

      setComments(data.comments || []);
    } catch (error) {
      console.error('FETCH FORUM COMMENTS ERROR =', error);
      setComments([]);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    if (!currentPostId) {
      navigate('/forum');
      return;
    }

    fetchPostDetail();
    fetchComments();
  }, [currentPostId]);

  const handleCommentCreated = (newComment) => {
    setComments((prev) => [...prev, newComment]);

    setPost((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        commentsCount: Number(prev.commentsCount || 0) + 1,
      };
    });
  };

  return (
    <div className="flex h-screen bg-[#f7f7f7] overflow-hidden">
      <Header />

      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-4 pb-20">

          <div className="mb-6">
            <button
              onClick={() => navigate('/forum')}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại diễn đàn
            </button>
          </div>

          {isLoadingPost && (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">
              Đang tải bài viết...
            </div>
          )}

          {!isLoadingPost && errorMessage && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
              <p className="text-red-600 font-bold mb-4">{errorMessage}</p>
              <button
                onClick={() => navigate('/forum')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg"
              >
                Quay lại diễn đàn
              </button>
            </div>
          )}

          {!isLoadingPost && !errorMessage && post && (
            <>
              <PostContent post={post} />

              <CommentSection
                postId={currentPostId}
                comments={comments}
                totalCount={post.commentsCount || comments.length}
                isLoading={isLoadingComments}
                onCommentCreated={handleCommentCreated}
              />
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForumDetail;