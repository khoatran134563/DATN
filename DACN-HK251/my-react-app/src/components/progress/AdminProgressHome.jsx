import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../../config/api';

const getAuthToken = () => {
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('authToken') ||
    localStorage.getItem('accessToken') ||
    ''
  );
};

const formatNumber = (value) => {
  const number = Number(value || 0);
  return number.toLocaleString('vi-VN');
};

const AdminProgressHome = ({ currentUser }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingForumPosts: 0,
    totalQuestions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAdminStats = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const token = getAuthToken();

      const response = await fetch(`${API_BASE}/api/admin/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Không thể tải thống kê quản trị.');
      }

      setStats({
        totalUsers: data.totalUsers || 0,
        pendingForumPosts: data.pendingForumPosts || 0,
        totalQuestions: data.totalQuestions || 0,
      });
    } catch (error) {
      console.error('FETCH ADMIN PROGRESS STATS ERROR =', error);
      setErrorMessage(error.message || 'Không thể tải thống kê quản trị.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminStats();
  }, [fetchAdminStats]);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light text-blue-900 mb-2">
          Bảng điều khiển quản trị
        </h1>
        <p className="text-gray-500">
          Theo dõi hệ thống và truy cập nhanh các khu vực quản trị
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 relative z-10">
          <h2 className="text-xl font-semibold">
            Xin chào {currentUser?.fullName || 'Administrator'}
          </h2>

          <button
            type="button"
            onClick={fetchAdminStats}
            disabled={loading}
            className="self-start md:self-auto bg-white/15 hover:bg-white/25 border border-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>

        {errorMessage && (
          <div className="relative z-10 mb-5 bg-red-500/20 border border-red-200/30 text-red-50 px-4 py-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">
              {loading ? '...' : formatNumber(stats.totalUsers)}
            </div>
            <div className="text-sm text-purple-100 mt-1">
              Người dùng hệ thống
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">
              {loading ? '...' : formatNumber(stats.pendingForumPosts)}
            </div>
            <div className="text-sm text-purple-100 mt-1">
              Bài forum chờ duyệt
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">
              {loading ? '...' : formatNumber(stats.totalQuestions)}
            </div>
            <div className="text-sm text-purple-100 mt-1">
              Câu hỏi ngân hàng đề
            </div>
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