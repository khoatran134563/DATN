import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../../config/api';

const Classwork = ({
  classroomId,
  assignments = [],
  isTeacher,
  isDocumentView = false,
  onReloadDocuments,
  onReloadAssignments,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeFolder, setActiveFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(assignments);
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0] || null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdatingAssignment, setIsUpdatingAssignment] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    topic: '',
    deadline: '',
    durationMinutes: '',
  });

  const token = localStorage.getItem('token');

  const getItemTopic = (item) => {
    return item?.topic?.trim() || 'Chưa phân loại';
  };

  const topicNames = Array.from(
    new Set(
      (items || [])
        .map((item) => getItemTopic(item))
        .filter(Boolean)
    )
  );

  const folders = [
    {
      id: 'all',
      name: isDocumentView ? 'Tất cả tài liệu' : 'Tất cả bài tập',
    },
    ...topicNames.map((topic) => ({
      id: topic,
      name: topic,
    })),
  ];

  useEffect(() => {
    setItems(assignments || []);

    if (assignments?.length > 0) {
      setSelectedAssignment((prev) => {
        const stillExists = assignments.find((item) => item.id === prev?.id);
        return stillExists || assignments[0];
      });
    } else {
      setSelectedAssignment(null);
    }
  }, [assignments]);

  useEffect(() => {
    if (activeFolder === 'all') return;

    const folderStillExists = folders.some((folder) => folder.id === activeFolder);

    if (!folderStillExists) {
      setActiveFolder('all');
    }
  }, [activeFolder, folders]);

  const getAssignmentStatus = (assignment) => {
    if (!assignment?.deadlineRaw) return 'active';

    const now = new Date();
    const deadline = new Date(assignment.deadlineRaw);

    return now <= deadline ? 'active' : 'expired';
  };

  const getTopicLabel = (topic) => {
    return topic?.trim() || 'Chưa phân loại';
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const itemTopic = getItemTopic(item);
    const matchFolder = activeFolder === 'all' || itemTopic === activeFolder;

    return matchSearch && matchFolder;
  });

  const getFolderCount = (folderId) => {
    if (folderId === 'all') return items.length;

    return items.filter((item) => getItemTopic(item) === folderId).length;
  };

  const toDatetimeLocalValue = (value) => {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(date.getTime() - offsetMs);

    return localDate.toISOString().slice(0, 16);
  };

  const handlePreviewQuiz = () => {
    if (!selectedAssignment) return;
    navigate(`/classroom/${classroomId}/quiz/${selectedAssignment.id}?mode=preview`);
  };

  const openEditAssignmentModal = () => {
    if (!selectedAssignment) return;

    setEditForm({
      title: selectedAssignment.title || '',
      topic: selectedAssignment.topic || '',
      deadline: toDatetimeLocalValue(selectedAssignment.deadlineRaw),
      durationMinutes: String(
        selectedAssignment.duration ||
        selectedAssignment.durationMinutes ||
        15
      ),
    });

    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAssignmentSettings = async () => {
    if (!selectedAssignment || !classroomId) return;

    if (!editForm.title.trim()) {
      alert('Vui lòng nhập tên bài tập!');
      return;
    }

    if (!editForm.durationMinutes || Number(editForm.durationMinutes) <= 0) {
      alert('Vui lòng nhập thời lượng làm bài hợp lệ!');
      return;
    }

    try {
      setIsUpdatingAssignment(true);

      const response = await fetch(
        `${API_BASE}/api/classrooms/${classroomId}/assignments/${selectedAssignment.id}/settings`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editForm.title.trim(),
            topic: editForm.topic.trim() || 'Chưa phân loại',
            deadline: editForm.deadline || null,
            durationMinutes: Number(editForm.durationMinutes),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể cập nhật bài tập.');
        return;
      }

      setIsEditModalOpen(false);

      if (onReloadAssignments) {
        await onReloadAssignments();
      }

      alert(data.message || 'Cập nhật thông tin bài tập thành công!');
    } catch (error) {
      console.error('UPDATE ASSIGNMENT SETTINGS ERROR =', error);
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsUpdatingAssignment(false);
    }
  };

  const handleDeleteAssignment = async () => {
    if (!selectedAssignment || !classroomId) return;

    const ok = window.confirm(
      `Bạn có chắc muốn xóa bài tập "${selectedAssignment.title}" không?\n\nToàn bộ bài làm đã nộp của học sinh cũng sẽ bị xóa.`
    );

    if (!ok) return;

    try {
      const response = await fetch(
        `${API_BASE}/api/classrooms/${classroomId}/assignments/${selectedAssignment.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể xóa bài tập.');
        return;
      }

      alert(data.message || 'Đã xóa bài tập thành công.');
      setSelectedAssignment(null);

      if (onReloadAssignments) {
        await onReloadAssignments();
      }
    } catch (error) {
      console.error('DELETE ASSIGNMENT ERROR =', error);
      alert('Không thể kết nối tới server backend.');
    }
  };

  const handleViewSubmissions = async () => {
    if (!selectedAssignment || !classroomId) return;

    try {
      setIsLoadingSubmissions(true);

      const response = await fetch(
        `${API_BASE}/api/classrooms/${classroomId}/assignments/${selectedAssignment.id}/attempts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể lấy danh sách nộp bài.');
        return;
      }

      setSubmissions(data.attempts || []);
      setIsSubmissionsOpen(true);
    } catch (error) {
      console.error('GET SUBMISSIONS ERROR =', error);
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const detectFileType = (filename = '') => {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.pdf')) return 'PDF';
    if (lower.endsWith('.docx')) return 'DOCX';
    if (lower.endsWith('.doc')) return 'DOC';
    if (lower.endsWith('.pptx')) return 'PPTX';
    if (lower.endsWith('.ppt')) return 'PPT';
    if (lower.endsWith('.xlsx')) return 'XLSX';
    if (lower.endsWith('.xls')) return 'XLS';
    if (lower.endsWith('.txt')) return 'TXT';
    return 'OTHER';
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !classroomId) return;

    try {
      setIsUploading(true);

      const fileUrl = await readFileAsDataUrl(file);
      const size = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      const fileType = detectFileType(file.name);

      const response = await fetch(`${API_BASE}/api/classrooms/${classroomId}/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: file.name,
          fileType,
          fileUrl,
          size,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể tải tài liệu lên.');
        return;
      }

      if (onReloadDocuments) {
        await onReloadDocuments();
      }
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleViewDocument = (item) => {
    navigate(`/classroom/${classroomId}/document/${item.id}`, {
      state: {
        fileUrl: item.fileUrl,
        title: item.title,
        fileType: item.fileType || 'PDF',
        postedDate: item.postedDate,
      },
    });
  };

  const handleDeleteDoc = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài liệu này?')) return;

    try {
      const response = await fetch(
        `${API_BASE}/api/classrooms/${classroomId}/materials/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể xóa tài liệu.');
        return;
      }

      setOpenMenuId(null);

      if (onReloadDocuments) {
        await onReloadDocuments();
      }
    } catch (error) {
      alert('Không thể kết nối tới server backend.');
    }
  };

  const handleDownloadDoc = (item) => {
    if (!item.fileUrl) {
      alert('Không tìm thấy file để tải xuống.');
      return;
    }

    const link = document.createElement('a');
    link.href = item.fileUrl;
    link.download = item.title || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setOpenMenuId(null);
  };

  const renderFolderList = () => (
    <div className="flex-1 overflow-y-auto py-2">
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => setActiveFolder(folder.id)}
          className={`w-full text-left px-4 py-3 font-medium flex items-center gap-3 border-l-4 transition-all ${
            activeFolder === folder.id
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-transparent text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg
            className={`w-5 h-5 ${activeFolder === folder.id ? 'text-blue-500' : 'text-gray-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>

          <span className="flex-1 truncate">{folder.name}</span>

          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeFolder === folder.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {getFolderCount(folder.id)}
          </span>
        </button>
      ))}
    </div>
  );

  if (!isDocumentView) {
    const status = selectedAssignment ? getAssignmentStatus(selectedAssignment) : null;

    return (
      <>
        <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans text-sm">
          <div className="w-64 border-r border-gray-200 flex flex-col shrink-0 bg-white">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-700">Thư mục</span>
              <svg className="w-4 h-4 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>

            {renderFolderList()}
          </div>

          <div className="flex-1 border-r border-gray-200 flex flex-col min-w-[320px]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select className="bg-white border border-gray-200 text-gray-600 rounded-lg px-3 py-2 outline-none cursor-pointer hover:border-gray-400">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                </select>

                {isTeacher && (
                  <button
                    onClick={() => navigate(`/classroom/${classroomId}/create-quiz`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 mr-3 rounded-lg font-bold text-sm flex items-center gap-2 transition shadow-md whitespace-nowrap active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tạo bài tập
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const itemStatus = getAssignmentStatus(item);

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedAssignment(item)}
                      className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-blue-50/30 transition-colors flex gap-4 items-start ${
                        selectedAssignment?.id === item.id ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                        <span className="font-bold text-blue-600">W</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold mb-1 truncate ${selectedAssignment?.id === item.id ? 'text-blue-700' : 'text-gray-800'}`}>
                          {item.title}
                        </h4>

                        <p className="text-xs text-gray-400 mb-2">
                          {getTopicLabel(item.topic)} • {item.questionCount || 0} câu
                        </p>

                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1 relative overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${isTeacher ? 'bg-green-500' : 'bg-gray-300'}`}
                            style={{ width: isTeacher ? '45%' : '0%' }}
                          ></div>
                        </div>

                        {isTeacher && (
                          <p className="text-[10px] text-green-600 font-bold mt-1">
                            {item.submittedCount || 0} học sinh đã nộp bài
                          </p>
                        )}
                      </div>

                      {!isTeacher && (
                        <div className="shrink-0">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              item.isSubmitted
                                ? 'text-green-600 bg-green-50'
                                : itemStatus === 'active'
                                  ? 'text-red-500 bg-red-50'
                                  : 'text-gray-500 bg-gray-100'
                            }`}
                          >
                            {item.isSubmitted ? 'Đã nộp' : itemStatus === 'active' ? 'Chưa làm' : 'Hết hạn'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <p>Chưa có bài tập nào trong thư mục này.</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-[350px] bg-white flex flex-col shrink-0 border-l border-gray-200">
            {selectedAssignment ? (
              <>
                <div className="p-6 flex-1 overflow-y-auto">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 leading-snug">
                    {selectedAssignment.title}
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Loại</span>
                      <span className="font-bold text-gray-900">Bài tập lớp học</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Chủ đề</span>
                      <span className="font-bold text-gray-900 text-right">
                        {getTopicLabel(selectedAssignment.topic)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Ngày tạo</span>
                      <span className="font-bold text-gray-900">
                        {selectedAssignment.postedDate || 'Không rõ'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Thời lượng</span>
                      <span className="font-bold text-gray-900">
                        {Number(selectedAssignment.duration || selectedAssignment.durationMinutes || 15)} phút
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Hạn chót</span>
                      <span className="font-bold text-gray-900 block text-right">
                        {selectedAssignment.deadline || 'Không giới hạn'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-gray-500">Số câu</span>
                      <span className="font-bold text-gray-900">
                        {selectedAssignment.questionCount || 0}
                      </span>
                    </div>

                    {isTeacher && (
                      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2 text-xs uppercase">
                          Thống kê nộp bài
                        </h4>

                        <div className="flex justify-between text-sm mb-1">
                          <span>Đã nộp:</span>
                          <span className="font-bold text-green-600">
                            {selectedAssignment.submittedCount || 0}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>Tổng điểm:</span>
                          <span className="font-bold text-blue-700">
                            {Number(selectedAssignment.totalScore || selectedAssignment.questionCount || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    {!isTeacher && selectedAssignment.isSubmitted && (
                      <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2 text-xs uppercase">
                          Kết quả của bạn
                        </h4>

                        <div className="flex justify-between text-sm">
                          <span>Điểm:</span>
                          <span className="font-bold text-green-700">
                            {Number(selectedAssignment.myScore || 0).toFixed(2)}
                            {' '}
                            /
                            {' '}
                            {Number(selectedAssignment.myTotalScore || selectedAssignment.totalScore || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  {isTeacher ? (
                    <div className="space-y-3">
                      <button
                        onClick={handlePreviewQuiz}
                        className="w-full bg-white border-2 border-blue-100 text-blue-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Làm thử bài tập
                      </button>

                      <button
                        onClick={handleViewSubmissions}
                        disabled={isLoadingSubmissions}
                        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2.5 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6m0 0l-3-3m3 3l-3 3M5 5h8a2 2 0 012 2v2M5 5a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                        {isLoadingSubmissions ? 'Đang tải...' : 'Xem danh sách nộp bài'}
                      </button>

                      <div className="flex gap-3">
                        <button
                          onClick={openEditAssignmentModal}
                          className="flex-1 bg-white border border-blue-200 text-blue-600 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Sửa
                        </button>

                        <button
                          onClick={handleDeleteAssignment}
                          className="flex-1 bg-white border border-red-200 text-red-600 font-bold py-2.5 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    selectedAssignment.isSubmitted ? (
                      <button
                        onClick={() => navigate(`/classroom/${classroomId}/quiz/${selectedAssignment.id}`)}
                        className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-between group"
                      >
                        <span>Xem lại bài đã nộp</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    ) : status === 'active' ? (
                      <button
                        onClick={() => navigate(`/classroom/${classroomId}/quiz/${selectedAssignment.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex items-center justify-between group"
                      >
                        <span>Bắt đầu làm bài</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    ) : (
                      <button className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed transition">
                        Đã hết thời gian
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Chọn bài tập để xem chi tiết
              </div>
            )}
          </div>
        </div>

        {isSubmissionsOpen && (
          <div className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Danh sách nộp bài
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedAssignment?.title}
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmissionsOpen(false)}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {submissions.length > 0 ? (
                  <div className="overflow-x-auto border border-gray-100 rounded-xl">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-500">
                        <tr className="text-left">
                          <th className="py-3 px-4 font-bold">Học sinh</th>
                          <th className="py-3 px-4 font-bold">Trạng thái</th>
                          <th className="py-3 px-4 font-bold text-center">Điểm</th>
                          <th className="py-3 px-4 font-bold text-center">Số câu đúng</th>
                          <th className="py-3 px-4 font-bold">Thời gian nộp</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {submissions.map((item) => (
                          <tr key={String(item.studentId)} className="hover:bg-blue-50/30 transition">
                            <td className="py-3 px-4">
                              <div className="font-bold text-gray-800">
                                {item.studentName || 'Không rõ tên'}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item.school || 'Chưa có trường'} • {item.className || 'Chưa có lớp'}
                              </div>
                            </td>

                            <td className="py-3 px-4">
                              <span
                                className={`text-xs font-bold px-2 py-1 rounded-full ${
                                  item.status === 'submitted'
                                    ? 'bg-green-50 text-green-700'
                                    : item.status === 'in_progress'
                                      ? 'bg-yellow-50 text-yellow-700'
                                      : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {item.status === 'submitted'
                                  ? 'Đã nộp'
                                  : item.status === 'in_progress'
                                    ? 'Đang làm'
                                    : 'Chưa làm'}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-center">
                              <span className="font-black text-blue-600">
                                {Number(item.score || 0).toFixed(2)}
                              </span>
                              <span className="text-gray-400">
                                {' '} / {Number(item.totalScore || 0).toFixed(2)}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-center font-bold text-gray-700">
                              {item.correctCount || 0} / {item.totalQuestions || 0}
                            </td>

                            <td className="py-3 px-4 text-gray-600">
                              {item.submittedAt
                                ? new Date(item.submittedAt).toLocaleString('vi-VN')
                                : 'Chưa nộp'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                      📭
                    </div>
                    <p className="text-gray-500 font-bold">
                      Chưa có dữ liệu nộp bài.
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Khi học sinh tham gia hoặc nộp bài, danh sách sẽ hiển thị tại đây.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 z-[260] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Sửa thông tin bài tập
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Chỉ chỉnh thông tin quản lý, không thay đổi câu hỏi và đáp án.
                  </p>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tên bài tập <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditFormChange}
                    placeholder="VD: Kiểm tra 15 phút - Chương Sự điện li"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Chủ đề / thư mục
                  </label>

                  <input
                    type="text"
                    name="topic"
                    value={editForm.topic}
                    onChange={handleEditFormChange}
                    placeholder="VD: Sự điện li, Axit - Bazơ, Kiểm tra chương 1..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Hạn chót
                    </label>

                    <input
                      type="datetime-local"
                      name="deadline"
                      value={editForm.deadline}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Thời lượng làm bài (phút)
                    </label>

                    <input
                      type="number"
                      name="durationMinutes"
                      value={editForm.durationMinutes}
                      onChange={handleEditFormChange}
                      min="1"
                      placeholder="VD: 15"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-800 leading-relaxed">
                  <span className="font-bold">Lưu ý:</span> phần sửa này không thay đổi nội dung câu hỏi,
                  đáp án đúng, điểm câu hỏi hoặc bài làm đã nộp của học sinh.
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition"
                >
                  Hủy
                </button>

                <button
                  onClick={handleUpdateAssignmentSettings}
                  disabled={isUpdatingAssignment}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-100 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUpdatingAssignment ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans text-sm">
      <div className="w-64 border-r border-gray-200 flex flex-col shrink-0 bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-gray-700 text-sm">Thư mục</span>
          <svg className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>

        {renderFolderList()}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select className="appearance-none bg-white border border-gray-200 text-gray-600 rounded-lg px-3 py-2.5 outline-none cursor-pointer hover:border-gray-400 focus:border-blue-500">
              <option>Sắp xếp...</option>
              <option>Mới nhất</option>
            </select>

            {isTeacher && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={isUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 ml-2 rounded-lg font-bold text-sm flex items-center gap-2 transition shadow-md whitespace-nowrap active:scale-95 disabled:opacity-60"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16" />
                  </svg>
                  {isUploading ? 'Đang tải...' : 'Tải tài liệu'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-2" onClick={() => setOpenMenuId(null)}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleViewDocument(item)}
                className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-50 last:border-0 relative"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 shrink-0">
                    {item.fileType === 'DOCX' || item.fileType === 'DOC' ? (
                      <svg className="w-full h-full text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                    ) : (
                      <svg className="w-full h-full text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5v1.5H19v2h-1.5V7h2V7zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" /></svg>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-blue-600 mb-1">
                      {item.title}
                    </h4>
                    <div className="hidden sm:block text-xs text-gray-400 truncate">
                      {getTopicLabel(item.topic)} • {item.fileType || 'PDF'} • {item.size || 'Chưa rõ dung lượng'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 ml-4 relative">
                  {isTeacher ? (
                    <div className="text-sm text-gray-500 font-medium">{item.postedDate}</div>
                  ) : (
                    <div className="text-right text-xs text-gray-500">
                      <div className="mb-0.5">{item.uploaderName || 'Giáo viên'}</div>
                      <div>{item.postedDate}</div>
                    </div>
                  )}

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.id ? null : item.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1.5 rounded-full transition"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-0 top-8 w-36 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden animate-fade-in">
                        {isTeacher ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDoc(item.id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa tài liệu
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadDoc(item);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16" />
                            </svg>
                            Tải xuống
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p>Chưa có tài liệu nào trong thư mục này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classwork;