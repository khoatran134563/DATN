import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitModal = ({
  isOpen,
  score,
  totalScore,
  correctCount,
  totalQuestions,
  onClose,
  isPreview,
  classId,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackToClass = () => {
    navigate(`/classroom/${classId || 1}`, {
      state: { activeTab: 'classwork' },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm text-center transform transition-all animate-scale-up">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
            isPreview ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
          }`}
        >
          {isPreview ? (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          ) : (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <h2 className="text-2xl font-black text-gray-800 mb-2">
          {isPreview ? 'Hoàn thành làm thử!' : 'Nộp bài thành công!'}
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          {isPreview
            ? 'Dưới đây là kết quả kiểm tra đáp án của bạn. Kết quả này KHÔNG ĐƯỢC LƯU.'
            : 'Hệ thống đã ghi nhận kết quả của bạn. Bài làm đã được khóa.'}
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
            <span className="text-gray-600 text-sm font-medium">Điểm kiểm tra</span>
            <span className={`text-xl font-bold ${isPreview ? 'text-gray-800' : 'text-blue-600'}`}>
              {Number(score || 0).toFixed(2)} / {Number(totalScore || 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">Số câu đúng</span>
            <span className="text-gray-800 font-bold">
              {correctCount || 0} / {totalQuestions || 0}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition text-sm"
          >
            Xem lại bài
          </button>

          <button
            onClick={handleBackToClass}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-sm shadow-md shadow-blue-200"
          >
            {isPreview ? 'Về trang quản lý' : 'Về lớp học'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;