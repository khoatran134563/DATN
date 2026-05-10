import React from 'react';
import Header from '../../components/Header';
import { FORUM_POSTS } from './data';
import FeaturedPost from './FeaturedPost';
import StandardPost from './StandardPost';
import './styles.css';
import { useNavigate } from 'react-router-dom'; // Đã import đúng

import { useAuth } from '../../context/AuthContext';

const ForumScreen = () => {
  const [latestPost, ...otherPosts] = FORUM_POSTS;

  const { userRole } = useAuth();
  
  // 1. KHAI BÁO BIẾN navigate (Bro thiếu dòng này)
  const navigate = useNavigate(); 

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <Header />
      
      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <div className="w-full lg:w-3/5 mx-auto px-4 pb-20">
          
          <div className="flex justify-between items-center mb-5 animate-fade-in">
            <h1 className="text-xl font-bold text-blue-900">
                Diễn đàn thảo luận
            </h1>

            {/* Kiểm tra userRole */}
            {userRole === 'teacher' && (
                <button 
                    // 2. THÊM SỰ KIỆN CLICK ĐỂ CHUYỂN TRANG
                    onClick={() => navigate('/forum/create')} 
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md transition-transform active:scale-95 flex items-center gap-2"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Đăng bài mới
                </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] animate-fade-in-up">
            <FeaturedPost post={latestPost} />
            {otherPosts.map((post) => (
                <StandardPost key={post.id} post={post} />
            ))}
          </div>
          
          <div className="mt-8 text-center animate-fade-in">
              <button className="px-6 py-2 text-xs font-bold text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition shadow-sm">
                  Xem các bài cũ hơn
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForumScreen;