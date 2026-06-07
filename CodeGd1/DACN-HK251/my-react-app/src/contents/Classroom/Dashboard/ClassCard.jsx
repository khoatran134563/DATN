import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classInfo, userRole, activeTab, onToggleHidden }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!classInfo) return null;

  const handleCardClick = () => {
    if (userRole === 'teacher' && activeTab === 'pending') {
      navigate(`/classroom/${classInfo.id}`, {
        state: { activeTab: 'people' },
      });
      return;
    }

    navigate(`/classroom/${classInfo.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col sm:flex-row items-center bg-white border-b border-gray-100 py-3 px-4 hover:bg-gray-50 transition-all cursor-pointer gap-4"
    >
      <div className="w-full sm:w-36 h-20 shrink-0 rounded-lg overflow-hidden relative shadow-sm border border-gray-100">
        <img
          src={classInfo.thumbnail || 'https://via.placeholder.com/300x200'}
          alt="Thumbnail"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {classInfo.name}
          </h3>

          {userRole === 'teacher' && classInfo.pendingStudentsCount > 0 && !classInfo.isHidden && (
            <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {classInfo.pendingStudentsCount} chờ duyệt
            </span>
          )}

          {classInfo.isHidden && (
            <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Đã ẩn
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium flex-wrap">
          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">
            {classInfo.code}
          </span>
          <span className="hidden sm:inline-block text-gray-300">•</span>
          <span className="hidden sm:inline-block truncate hover:text-gray-700">
            {classInfo.teacher}
          </span>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-4 w-[35%] text-center text-sm text-gray-600 font-medium">
        <div>{classInfo.studentCount}</div>
        <div>{classInfo.lessonCount}</div>
        <div>{classInfo.assignmentCount}</div>
        <div>{classInfo.docCount}</div>
      </div>

      <div className="absolute top-3 right-3 sm:static" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden animate-fade-in">
              <button
                onClick={() => {
                  onToggleHidden(classInfo);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {classInfo.isHidden ? 'Khôi phục lớp' : 'Ẩn lớp'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;