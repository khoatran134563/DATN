import React from 'react';

const PostContent = ({ post }) => {
  if (!post) return null;

  const paragraphs = String(post.content || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="bg-white p-6 md:p-10 rounded-t-xl shadow-sm border-b border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-sm">
        <span className="text-[#9f224e] font-bold uppercase tracking-wide mb-2 md:mb-0">
          {post.category || 'THÔNG BÁO CHUNG'}
        </span>

        <span className="text-gray-500 font-sans">
          {post.date || post.time || 'Vừa xong'}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight font-sans">
        {post.title}
      </h1>

      {(post.summary || post.excerpt) && (
        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-6 leading-relaxed font-sans">
          {post.summary || post.excerpt}
        </p>
      )}

      {post.image && (
        <div className="mb-8 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <img
            src={post.image}
            alt={post.title || 'Ảnh bài viết'}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      <div className="text-lg text-gray-800 leading-8 text-justify font-sans whitespace-pre-line">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="mb-4">Bài viết chưa có nội dung.</p>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900 font-sans">
            {post.author || 'Giáo viên'}
          </p>
          <p className="text-sm text-gray-500 font-sans">
            {post.authorRole === 'admin' ? 'Quản trị viên' : 'Giáo viên Hóa'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostContent;