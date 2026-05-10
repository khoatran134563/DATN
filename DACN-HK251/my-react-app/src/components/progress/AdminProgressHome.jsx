import React from 'react';
import { Link } from 'react-router-dom';

const AdminProgressHome = ({ currentUser }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light text-blue-900 mb-2">Bảng điều khiển quản trị</h1>
        <p className="text-gray-500">
          Theo dõi hệ thống và truy cập nhanh các khu vực quản trị
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 relative z-10">
          Xin chào {currentUser?.fullName || 'Administrator'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">128</div>
            <div className="text-sm text-purple-100 mt-1">Người dùng hệ thống</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">12</div>
            <div className="text-sm text-purple-100 mt-1">Bài forum chờ duyệt</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">340</div>
            <div className="text-sm text-purple-100 mt-1">Câu hỏi ngân hàng đề</div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-900 rounded-full opacity-40 blur-2xl"></div>
      </div>

      <div className="mb-4 border-l-4 border-purple-500 pl-4">
        <h2 className="text-2xl font-bold text-blue-900">Quản trị nhanh</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/admin/dashboard"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition group"
        >
          <h3 className="font-bold text-blue-900 text-lg group-hover:text-purple-700 transition">
            Dashboard
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Xem tổng quan toàn bộ hoạt động hệ thống.
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition group"
        >
          <h3 className="font-bold text-blue-900 text-lg group-hover:text-purple-700 transition">
            Người dùng
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Quản lý học sinh, giáo viên và tài khoản.
          </p>
        </Link>

        <Link
          to="/admin/forum-approval"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition group"
        >
          <h3 className="font-bold text-blue-900 text-lg group-hover:text-purple-700 transition">
            Duyệt forum
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Kiểm tra và duyệt bài viết trước khi hiển thị.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminProgressHome;