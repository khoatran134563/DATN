import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import

const StandardPost = ({ post }) => {
  const navigate = useNavigate(); // 2. Khai báo

  return (
    <div 
      // 3. Thêm onClick
      onClick={() => navigate(`/forum/post/${post.id}`)}
      className="bg-white p-4 h-full flex flex-col border-b sm:border-b-0 sm:border border-gray-100 sm:rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
    >
      
      <div className="flex-grow">
        <div className="text-[#9f224e] font-bold text-[11px] mb-1 uppercase tracking-wide">
          {post.category}
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 truncate">
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-2">
          {post.excerpt}
        </p>
      </div>

      <div className="flex justify-between items-end mt-1 pt-2 border-t border-gray-50">
        <div className="flex flex-col">
             <span className="font-sans text-gray-700 text-sm font-semibold">
                {post.author}
            </span>
            <span className="text-[10px] text-gray-400 font-sans">
                {post.date} • {post.comments} thảo luận
            </span>
        </div>

        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${post.avatarColor} shadow-sm overflow-hidden`}>
          {post.avatar}
        </div>
      </div>
    </div>
  );
};

export default StandardPost;