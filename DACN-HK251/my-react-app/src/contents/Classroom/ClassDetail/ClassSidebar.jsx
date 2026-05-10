import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { API_BASE } from '../../../config/api';



const ClassSidebar = ({ classData, teacher, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MENU_ITEMS = [
    { id: 'stream', label: 'Bảng tin', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'people', label: 'Thành viên', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'classwork', label: 'Bài tập', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'documents', label: 'Tài liệu', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' }
  ];

  const teacherName = teacher?.name || classData.teacher || 'Giáo viên';
  const token = localStorage.getItem('token');
  const isTeacher = userRole === 'teacher';

  const handleConfirmAction = async () => {
    try {
      setIsSubmitting(true);

      const endpoint = isTeacher
        ? `${API_BASE}/api/classrooms/${classData.id}`
        : `${API_BASE}/api/classrooms/${classData.id}/leave`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể thực hiện thao tác này.');
        return;
      }

      alert(data.message || (isTeacher ? 'Đã xóa lớp học.' : 'Đã rời khỏi lớp.'));
      setShowConfirmModal(false);
      navigate('/classroom');
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-[280px] bg-white border-r border-gray-100 h-full flex flex-col shrink-0">
        <div className="p-6 pb-4">
          <h2 className="font-bold text-gray-800 text-lg leading-snug mb-2 line-clamp-2">
            {classData.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Mã lớp:</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-mono font-bold">
              {classData.code}
            </span>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-bold shadow-sm">
            {teacherName.charAt(0)}
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium mb-0.5">Giáo viên</div>
            <div className="text-sm font-bold text-gray-800 truncate max-w-[150px]">
              {teacherName}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <svg
                className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isTeacher ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              )}
            </svg>
            {isTeacher ? 'Xóa lớp học' : 'Rời khỏi lớp'}
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-up">
            <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 ${
              isTeacher ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {isTeacher ? '🗑️' : '🚪'}
            </div>

            <h3 className="text-xl font-bold text-center text-gray-900 mb-3">
              {isTeacher ? 'Xóa lớp học?' : 'Rời khỏi lớp?'}
            </h3>

            <p className="text-sm text-gray-500 text-center leading-6 mb-6">
              {isTeacher
                ? 'Bạn có chắc muốn xóa lớp học này không? Hành động này sẽ xóa toàn bộ thành viên và dữ liệu của lớp học.'
                : 'Bạn có chắc muốn rời khỏi lớp học này không? Sau khi rời lớp, bạn sẽ không thể xem các thông tin của lớp học nữa.'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
              >
                Hủy
              </button>

              <button
                onClick={handleConfirmAction}
                disabled={isSubmitting}
                className={`flex-1 py-3 rounded-xl text-white font-bold transition ${
                  isTeacher
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-amber-500 hover:bg-amber-600'
                } disabled:opacity-60`}
              >
                {isSubmitting
                  ? 'Đang xử lý...'
                  : isTeacher
                  ? 'Xóa lớp'
                  : 'Rời lớp'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassSidebar;