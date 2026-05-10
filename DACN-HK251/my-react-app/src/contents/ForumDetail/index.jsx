import React from 'react';
import Header from '../../components/Header';
import PostContent from './PostContent';
import CommentSection from './CommentSection';
import { POST_DETAIL, COMMENTS } from './data';

const ForumDetail = () => {
  return (
    <div className="flex h-screen bg-[#f7f7f7] overflow-hidden">
      <Header />
      
      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        {/* Container giới hạn độ rộng giống báo chí (khoảng 800px - 900px là đẹp nhất để đọc) */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          
          {/* Nút quay lại */}
          <div className="mb-6">
             <button 
                onClick={() => window.history.back()} 
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-sm"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Quay lại diễn đàn
             </button>
          </div>

          {/* Phần nội dung chính */}
          <PostContent post={POST_DETAIL} />

          {/* Phần bình luận */}
          <CommentSection comments={COMMENTS} totalCount={POST_DETAIL.commentsCount} />

        </div>
      </div>
    </div>
  );
};

export default ForumDetail;