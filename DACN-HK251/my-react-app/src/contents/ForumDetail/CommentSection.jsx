import React, { useState } from 'react';

const CommentItem = ({ comment, isReply = false }) => (
  <div className={`flex gap-3 mb-6 ${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
    {/* Avatar */}
    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${comment.avatarColor}`}>
      {comment.avatar}
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-gray-900 text-base">{comment.user}</span>
        {comment.isAuthor && (
            <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Tác giả
            </span>
        )}
      </div>
      
      <p className="text-gray-700 text-base leading-relaxed mb-2">
        {comment.content}
      </p>

      {/* Actions: Thích, Trả lời, Thời gian */}
      <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            Thích {comment.likes > 0 && <span>({comment.likes})</span>}
        </button>
        <button className="hover:text-blue-600 transition-colors">
            Trả lời
        </button>
        <span className="text-gray-400 font-normal">{comment.time}</span>
      </div>
    </div>
  </div>
);

const CommentSection = ({ comments, totalCount }) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-b-xl shadow-sm mt-1">
      {/* Header: Ý kiến (18) */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900">
            Ý kiến <span className="text-gray-500 font-normal">({totalCount})</span>
        </h3>
      </div>

      {/* Input Area */}
      <div className="mb-8">
        <div className="relative">
            <textarea 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 focus:outline-none focus:border-blue-300 focus:bg-white transition-all resize-none h-24"
                placeholder="Chia sẻ ý kiến của bạn"
            ></textarea>
            <div className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </div>
      </div>

      {/* Tabs: Quan tâm nhất / Mới nhất */}
      <div className="flex gap-6 mb-6 text-sm font-bold border-b border-gray-100">
        <button className="text-[#9f224e] border-b-2 border-[#9f224e] pb-2">Quan tâm nhất</button>
        <button className="text-gray-500 hover:text-gray-800 pb-2 transition-colors">Mới nhất</button>
      </div>

      {/* Comment List */}
      <div>
        {comments.map((comment) => (
            <div key={comment.id}>
                {/* Comment chính */}
                <CommentItem comment={comment} />
                
                {/* Comment trả lời (nếu có) */}
                {comment.replies && comment.replies.map(reply => (
                    <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
            </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;