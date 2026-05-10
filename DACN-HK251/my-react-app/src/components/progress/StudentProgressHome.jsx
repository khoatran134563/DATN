import React from 'react';

const StudentProgressHome = ({ currentUser, onOpenTheory, onOpenVideo }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light text-blue-900 mb-2">Tiến độ học tập</h1>
        <p className="text-gray-500">
          Theo dõi tiến độ các chương Hóa học và tiếp tục bài học dang dở
        </p>
      </div>

      <div className="bg-[#1e3a8a] rounded-2xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 relative z-10">Tổng quan tiến độ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">0%</div>
            <div className="text-sm text-blue-200 mt-1">Tổng hoàn thành</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">0/21</div>
            <div className="text-sm text-blue-200 mt-1">Chủ đề đã xong</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">21</div>
            <div className="text-sm text-blue-200 mt-1">Chủ đề còn lại</div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-800 rounded-full opacity-50 blur-2xl"></div>
      </div>

      <div className="mb-4 border-l-4 border-green-500 pl-4">
        <h2 className="text-2xl font-bold text-blue-900">Tiếp tục học</h2>
      </div>

      <div className="space-y-4">
        <div
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          onClick={onOpenTheory}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg group-hover:text-blue-600 transition">
                Tiếp theo: Hằng số cân bằng của phản ứng thuận nghịch
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Tiếp tục với Bài 1: Khái niệm về cân bằng hóa học
              </p>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                Lý thuyết
              </span>
            </div>
          </div>
          <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          onClick={onOpenVideo}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg group-hover:text-blue-600 transition">
                Xem ngay: Thí nghiệm cân bằng hóa học
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Hoàn thành Video Bài 1: Cân bằng hóa học
              </p>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-medium">
                Video minh họa
              </span>
            </div>
          </div>
          <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressHome;