import React, { useMemo, useState } from 'react';

import { API_BASE } from '../../../config/api';
const People = ({
  classId,
  teacher,
  students = [],
  pendingStudents = [],
  isTeacher,
  onReloadMembers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessingId, setIsProcessingId] = useState(null);

  const token = localStorage.getItem('token');

  const normalizeText = (value = '') => {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  const keyword = normalizeText(searchTerm);

  const teacherRow = teacher
    ? {
        id: teacher.id || 'teacher',
        name: teacher.name || 'Giáo viên',
        school: teacher.school || 'THPT ChemLearn',
        className: teacher.className || 'GV',
        role: 'teacher',
      }
    : null;

  const studentRows = students.map((student) => ({
    ...student,
    role: 'student',
  }));

  const allMembers = useMemo(() => {
    const result = [];

    if (teacherRow) {
      result.push(teacherRow);
    }

    result.push(...studentRows);

    return result;
  }, [teacher, students]);

  const filteredMembers = allMembers.filter((member) => {
    if (!keyword) return true;

    const target = normalizeText(
      [
        member.name,
        member.school,
        member.className,
        member.role === 'teacher' ? 'giáo viên giao vien teacher gv' : 'học sinh hoc sinh student hs',
      ].join(' ')
    );

    return target.includes(keyword);
  });

  const handleApproveStudent = async (membershipId) => {
    if (!classId || !membershipId) return;

    try {
      setIsProcessingId(membershipId);

      const response = await fetch(
        `${API_BASE}/api/classrooms/${classId}/members/${membershipId}/approve`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể duyệt học sinh.');
        return;
      }

      if (onReloadMembers) {
        await onReloadMembers();
      }
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsProcessingId(null);
    }
  };

  const handleRejectStudent = async (membershipId) => {
    if (!classId || !membershipId) return;

    const ok = window.confirm('Bạn có chắc muốn từ chối yêu cầu tham gia lớp này?');
    if (!ok) return;

    try {
      setIsProcessingId(membershipId);

      const response = await fetch(
        `${API_BASE}/api/classrooms/${classId}/members/${membershipId}/reject`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể từ chối học sinh.');
        return;
      }

      if (onReloadMembers) {
        await onReloadMembers();
      }
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {isTeacher && pendingStudents.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
          <div className="p-6 border-b border-yellow-100 bg-yellow-50/70">
            <h3 className="text-lg font-black text-gray-900">
              Học sinh chờ duyệt ({pendingStudents.length})
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Những học sinh này đã nhập mã lớp và đang chờ giáo viên phê duyệt.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {pendingStudents.map((student) => (
              <div
                key={student.membershipId}
                className="flex items-center px-6 py-4 hover:bg-yellow-50/40 transition-colors"
              >
                <div className="flex-1 flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {student.name?.charAt(0)?.toUpperCase() || 'H'}
                  </div>

                  <div className="min-w-0">
                    <span className="font-bold text-gray-900 block truncate">
                      {student.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {student.school || 'Chưa có trường'} • {student.className || 'Chưa có lớp'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApproveStudent(student.membershipId)}
                    disabled={isProcessingId === student.membershipId}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition disabled:opacity-60"
                  >
                    Duyệt
                  </button>

                  <button
                    onClick={() => handleRejectStudent(student.membershipId)}
                    disabled={isProcessingId === student.membershipId}
                    className="px-4 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm font-bold rounded-lg transition disabled:opacity-60"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-black text-gray-900">
            Thành viên lớp học ({allMembers.length})
          </h3>
        </div>

        <div className="p-6 pb-3">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>

            <input
              type="text"
              className="block w-full pl-12 pr-10 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="Tìm theo tên, trường, lớp hoặc vai trò..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700"
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          {searchTerm && (
            <p className="text-xs text-gray-400 mt-2">
              Tìm thấy {filteredMembers.length} / {allMembers.length} thành viên
            </p>
          )}
        </div>

        <div className="w-full">
          <div className="flex items-center px-6 py-3 bg-gray-50 border-y border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="flex-1 flex items-center gap-1">
              Họ và tên
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>

            <div className="w-1/3 hidden md:block">Trường</div>
            <div className="w-24 text-center hidden md:block">Lớp</div>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {filteredMembers.map((member) => {
                const isTeacherRow = member.role === 'teacher';

                return (
                  <div
                    key={`${member.role}-${member.id}`}
                    className={`flex items-center px-6 py-4 transition-colors cursor-default ${
                      isTeacherRow ? 'hover:bg-blue-50/30' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-1 flex items-center gap-4 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-transform ${
                          isTeacherRow
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'border border-gray-300 bg-white text-gray-500'
                        }`}
                      >
                        {member.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>

                      <div className="min-w-0">
                        <span className="font-bold text-gray-900 block truncate">
                          {member.name}
                        </span>

                        {isTeacherRow && (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                            Giáo viên
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-1/3 hidden md:block text-sm text-gray-600 truncate pr-4">
                      {member.school || 'Chưa cập nhật'}
                    </div>

                    <div className="w-24 text-center hidden md:block text-sm font-bold text-gray-900">
                      {isTeacherRow ? 'GV' : member.className || '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-14">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                🔎
              </div>
              <p className="text-gray-500 font-bold">Không tìm thấy thành viên nào.</p>
              <p className="text-gray-400 text-sm mt-1">
                Thử tìm bằng tên, trường, lớp hoặc vai trò khác.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;