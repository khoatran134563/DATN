import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../../config/api';

const ROLE_META = {
  admin: {
    label: 'Quản trị viên',
    badge: 'bg-purple-100 text-purple-700 border-purple-200',
    avatar: 'bg-purple-500',
  },
  teacher: {
    label: 'Giáo viên',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    avatar: 'bg-indigo-500',
  },
  student: {
    label: 'Học sinh',
    badge: 'bg-blue-100 text-blue-700 border-blue-200',
    avatar: 'bg-blue-500',
  },
};

const STATUS_META = {
  active: {
    label: 'Hoạt động',
    dot: 'bg-green-500',
    text: 'text-green-600',
  },
  locked: {
    label: 'Đã khóa',
    dot: 'bg-red-500',
    text: 'text-red-600',
  },
};

const formatDate = (date) => {
  if (!date) return 'Chưa cập nhật';

  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách người dùng.');
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (error) {
      console.error('FETCH USERS ERROR =', error);
      alert(error.message || 'Lỗi tải danh sách người dùng.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchKeyword =
        !keyword ||
        user.fullName?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.school?.toLowerCase().includes(keyword) ||
        user.province?.toLowerCase().includes(keyword);

      const matchRole = filterRole === 'all' || user.role === filterRole;
      const matchStatus = filterStatus === 'all' || (user.status || 'active') === filterStatus;

      return matchKeyword && matchRole && matchStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => (user.status || 'active') === 'active').length;
  const lockedUsers = users.filter((user) => user.status === 'locked').length;

  const toggleStatus = async (user) => {
    const currentStatus = user.status || 'active';
    const nextStatus = currentStatus === 'active' ? 'locked' : 'active';

    const confirmed = window.confirm(
      nextStatus === 'locked'
        ? `Khóa tài khoản "${user.fullName}"? Người dùng này sẽ không thể đăng nhập.`
        : `Mở khóa tài khoản "${user.fullName}"?`
    );

    if (!confirmed) return;

    setActionLoadingId(user.id);

    try {
      const response = await fetch(`${API_BASE}/api/admin/users/${user.id}/status`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Cập nhật trạng thái tài khoản thất bại.');
      }

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item.id === user.id ? { ...item, status: data.user.status } : item
        )
      );
    } catch (error) {
      console.error('UPDATE USER STATUS ERROR =', error);
      alert(error.message || 'Lỗi cập nhật trạng thái tài khoản.');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col bg-gray-50">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
          
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-[280px]">
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="student">Học sinh</option>
            <option value="teacher">Giáo viên</option>
            <option value="admin">Quản trị viên</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="locked">Đã khóa</option>
          </select>

          <button
            onClick={fetchUsers}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 font-semibold">Tổng tài khoản</p>
          <p className="text-3xl font-black text-gray-900 mt-2">{totalUsers}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 font-semibold">Đang hoạt động</p>
          <p className="text-3xl font-black text-green-600 mt-2">{activeUsers}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500 font-semibold">Đã khóa</p>
          <p className="text-3xl font-black text-red-600 mt-2">{lockedUsers}</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">Họ và tên</th>
                  <th className="p-4">Vai trò</th>
                  <th className="p-4">Thông tin</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày tạo</th>
                  <th className="p-4 text-right">Hành động</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                {filteredUsers.map((user) => {
                  const roleMeta = ROLE_META[user.role] || ROLE_META.student;
                  const status = user.status || 'active';
                  const statusMeta = STATUS_META[status] || STATUS_META.active;
                  const isActionLoading = actionLoadingId === user.id;

                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${roleMeta.avatar}`}>
                            {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>

                          <div>
                            <div className="font-bold text-gray-900">{user.fullName}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase border ${roleMeta.badge}`}>
                          {roleMeta.label}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="text-xs text-gray-600 leading-5">
                          <div>
                            <span className="font-bold">Trường:</span> {user.school || 'Chưa cập nhật'}
                          </div>

                          {user.role === 'student' && (
                            <div>
                              <span className="font-bold">Lớp:</span> {user.className || 'Chưa cập nhật'}
                            </div>
                          )}

                          <div>
                            <span className="font-bold">Tỉnh/TP:</span> {user.province || 'Chưa cập nhật'}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${statusMeta.text}`}>
                          <span className={`w-2 h-2 rounded-full ${statusMeta.dot}`} />
                          {statusMeta.label}
                        </span>
                      </td>

                      <td className="p-4 text-xs text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="p-4 text-right">
                        {user.role === 'admin' ? (
                          <span className="text-xs text-gray-400 font-semibold">
                            Không thao tác
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleStatus(user)}
                            disabled={isActionLoading}
                            className={`text-xs font-bold px-3 py-2 rounded-lg transition border disabled:opacity-50 ${
                              status === 'active'
                                ? 'border-red-200 text-red-600 hover:bg-red-50'
                                : 'border-green-200 text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {isActionLoading
                              ? 'Đang xử lý...'
                              : status === 'active'
                                ? 'Khóa tài khoản'
                                : 'Mở khóa'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                Không tìm thấy người dùng phù hợp.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;