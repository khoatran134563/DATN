import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FeaturedPost from './FeaturedPost';
import StandardPost from './StandardPost';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_BASE } from '../../config/api';

const ForumScreen = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchForumPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/forum/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Không thể tải danh sách bài viết forum.');
        setPosts([]);
        return;
      }

      setPosts(data.posts || []);
    } catch (error) {
      console.error('FETCH FORUM POSTS ERROR =', error);
      setErrorMessage('Không thể kết nối đến server backend.');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const [latestPost, ...otherPosts] = posts;

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <Header />

      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <div className="w-full lg:w-3/5 mx-auto px-4 pb-20">

          <div className="flex justify-between items-center mb-5 animate-fade-in">
            <h1 className="text-xl font-bold text-blue-900">
              Diễn đàn thảo luận
            </h1>

            {userRole === 'teacher' && (
              <button
                onClick={() => navigate('/forum/create')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Đăng bài mới
              </button>
            )}
          </div>

          {isLoading && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500 animate-fade-in">
              Đang tải danh sách bài viết...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-center animate-fade-in">
              <p className="text-sm text-red-600 font-bold mb-3">{errorMessage}</p>
              <button
                onClick={fetchForumPosts}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg"
              >
                Tải lại
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && posts.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-400 animate-fade-in">
              <p className="font-bold text-gray-600 mb-1">Chưa có bài viết forum nào.</p>
              <p className="text-sm">Giáo viên có thể đăng bài viết đầu tiên cho diễn đàn.</p>
            </div>
          )}

          {!isLoading && !errorMessage && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] animate-fade-in-up">
                {latestPost && <FeaturedPost post={latestPost} />}

                {otherPosts.map((post) => (
                  <StandardPost key={post.id} post={post} />
                ))}
              </div>

              {posts.length >= 9 && (
                <div className="mt-8 text-center animate-fade-in">
                  <button className="px-6 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition shadow-sm">
                    Xem các bài cũ hơn
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForumScreen;