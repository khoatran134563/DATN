import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ClassCard from './ClassCard';
import CreateClassModal from './CreateClassModal';
import JoinClassModal from './JoinClassModal';

import { API_BASE } from '../../../config/api';
const Dashboard = () => {
  const { userRole } = useAuth();

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [searchText, setSearchText] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('your-class');

  const token = localStorage.getItem('token');

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      setPageError('');

      const response = await fetch(`${API_BASE}/api/classrooms/my-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setPageError(data.message || 'Không thể tải danh sách lớp học.');
        return;
      }

      setClasses(data.classes || []);
    } catch (error) {
      setPageError('Không thể kết nối tới server backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchClasses();
    } else {
      setIsLoading(false);
      setPageError('Bạn chưa đăng nhập.');
    }
  }, [token]);

  const handleCreateClass = async (newClass) => {
    try {
      const response = await fetch(`${API_BASE}/api/classrooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newClass.name,
          requiresApproval: newClass.requiresApproval,
          thumbnail: newClass.cover || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể tạo lớp học.');
        return;
      }

      setIsCreateModalOpen(false);
      await fetchClasses();
      alert('Tạo lớp học thành công!');
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    }
  };

  const handleJoinClass = async (code) => {
    try {
      const response = await fetch(`${API_BASE}/api/classrooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Không thể tham gia lớp.',
        };
      }

      await fetchClasses();

      return {
        success: true,
        message: data.message || 'Tham gia lớp thành công!',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Không thể kết nối tới server backend.',
      };
    }
  };

  const handleToggleHidden = async (classInfo) => {
    try {
      const endpoint = classInfo.isHidden ? 'unhide' : 'hide';

      const response = await fetch(`${API_BASE}/api/classrooms/${classInfo.id}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể cập nhật trạng thái ẩn lớp.');
        return;
      }

      await fetchClasses();
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    }
  };

  const handleAddClassClick = () => {
    if (userRole === 'teacher') {
      setIsCreateModalOpen(true);
    } else {
      setIsJoinModalOpen(true);
    }
  };

  const tabCounts = useMemo(() => {
    if (userRole === 'teacher') {
      return {
        yourClass: classes.filter((cls) => cls.joinStatus === 'approved' && !cls.isHidden).length,
        pending: classes.filter(
          (cls) =>
            cls.joinStatus === 'approved' &&
            !cls.isHidden &&
            cls.pendingStudentsCount > 0
        ).length,
        hidden: classes.filter((cls) => cls.joinStatus === 'approved' && cls.isHidden).length,
      };
    }

    return {
      yourClass: classes.filter((cls) => cls.joinStatus === 'approved' && !cls.isHidden).length,
      pending: classes.filter((cls) => cls.joinStatus === 'pending').length,
      hidden: classes.filter((cls) => cls.joinStatus === 'approved' && cls.isHidden).length,
    };
  }, [classes, userRole]);

  const filteredClasses = useMemo(() => {
    let result = [...classes];

    if (userRole === 'teacher') {
      if (activeTab === 'your-class') {
        result = result.filter((cls) => cls.joinStatus === 'approved' && !cls.isHidden);
      } else if (activeTab === 'pending') {
        result = result.filter(
          (cls) =>
            cls.joinStatus === 'approved' &&
            !cls.isHidden &&
            cls.pendingStudentsCount > 0
        );
      } else if (activeTab === 'hidden') {
        result = result.filter((cls) => cls.joinStatus === 'approved' && cls.isHidden);
      }
    } else {
      if (activeTab === 'your-class') {
        result = result.filter((cls) => cls.joinStatus === 'approved' && !cls.isHidden);
      } else if (activeTab === 'pending') {
        result = result.filter((cls) => cls.joinStatus === 'pending');
      } else if (activeTab === 'hidden') {
        result = result.filter((cls) => cls.joinStatus === 'approved' && cls.isHidden);
      }
    }

    if (searchText.trim()) {
      const keyword = searchText.trim().toLowerCase();
      result = result.filter(
        (cls) =>
          cls.name?.toLowerCase().includes(keyword) ||
          cls.code?.toLowerCase().includes(keyword) ||
          cls.teacher?.toLowerCase().includes(keyword)
      );
    }

    return result;
  }, [classes, activeTab, searchText, userRole]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 mb-4 gap-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('your-class')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'your-class' ? 'border-blue-600 text-blue-800 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Lớp của bạn{' '}
            <span className="ml-1 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">
              {tabCounts.yourClass}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pending' ? 'border-blue-600 text-blue-800' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Lớp đang chờ{' '}
            <span className="ml-1 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">
              {tabCounts.pending}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hidden')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'hidden' ? 'border-blue-600 text-blue-800' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Lớp đã ẩn{' '}
            <span className="ml-1 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full">
              {tabCounts.hidden}
            </span>
          </button>
        </div>

        <div className="pb-2 sm:pb-0">
          <button
            onClick={handleAddClassClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {userRole === 'teacher' ? 'Tạo lớp học' : 'Thêm lớp học'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm lớp học..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none bg-white shadow-sm cursor-pointer hover:border-gray-400">
            <option>Sắp xếp: Mới nhất</option>
            <option>Sắp xếp: Tên A-Z</option>
          </select>
        </div>
      </div>

      {pageError && (
        <div className="mb-4 text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {pageError}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="hidden md:flex items-center bg-gray-50 border-b border-gray-200 py-3 px-4 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider gap-4">
          <div className="w-36 shrink-0"></div>
          <div className="flex-1 pr-4">Tên lớp</div>
          <div className="w-[35%] grid grid-cols-4 text-center">
            <div>Học sinh</div>
            <div>Bài giảng</div>
            <div>Bài tập</div>
            <div>Tài liệu</div>
          </div>
          <div className="w-8"></div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-sm text-gray-400">Đang tải lớp học...</div>
        ) : filteredClasses.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredClasses.map((cls) => (
              <ClassCard
                key={cls.id}
                classInfo={cls}
                userRole={userRole}
                activeTab={activeTab}
                onToggleHidden={handleToggleHidden}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Chưa có lớp học nào.</p>
          </div>
        )}
      </div>

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateClass}
      />

      <JoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinClass}
      />
    </div>
  );
};

export default Dashboard;