import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import cái này

const FeaturedPost = ({ post }) => {
  const navigate = useNavigate(); // 2. Khai báo hàm chuyển trang

  return (
    <div 
      // 3. Thêm sự kiện onClick để chuyển hướng khi bấm
      onClick={() => navigate(`/forum/post/${post.id}`)}
      className="md:col-span-2 md:row-span-2 group relative bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer border border-gray-200"
    >
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        <img 
          src={post.image} 
          alt="Featured" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>
      
      <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wide">
        Tiêu điểm
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-300">
          <span className="font-bold text-orange-400 uppercase tracking-wider">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h2 className="text-2xl font-black mb-2 leading-tight group-hover:text-blue-300 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-200 text-sm line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
};

export default FeaturedPost;