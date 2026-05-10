import React from 'react';

const PostContent = ({ post }) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-t-xl shadow-sm border-b border-gray-100">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-sm">
        <span className="text-[#9f224e] font-bold uppercase tracking-wide mb-2 md:mb-0">
          {post.category}
        </span>
        <span className="text-gray-500 font-sans">
          {post.date}
        </span>
      </div>

      {/* 2. Tiêu đề lớn - Dùng font-sans để không lỗi tiếng Việt */}
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight font-sans">
        {post.title}
      </h1>

      {/* 3. Mô tả ngắn (Sapo) */}
      <p className="text-lg md:text-xl font-semibold text-gray-700 mb-6 leading-relaxed font-sans">
        {post.description}
      </p>

      {/* 4. Nội dung chi tiết - Dùng font-sans */}
      <div className="text-lg text-gray-800 leading-8 text-justify font-sans">
        {post.content.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 5. Tên tác giả */}
      <div className="mt-8 flex justify-end">
        <div className="text-right">
            <p className="text-xl font-bold text-gray-900 font-sans">{post.author}</p>
            <p className="text-sm text-gray-500 font-sans">Giáo viên Hóa</p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;