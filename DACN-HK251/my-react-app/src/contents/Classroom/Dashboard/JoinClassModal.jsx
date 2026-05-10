import React, { useEffect, useState } from 'react';

const JoinClassModal = ({ isOpen, onClose, onJoin }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setErrorMessage('');
      setSuccessMessage('');
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setErrorMessage('Vui lòng nhập mã lớp!');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const result = await onJoin(code.toUpperCase());

      if (result?.success) {
        setSuccessMessage(result.message || 'Tham gia lớp thành công!');
        setCode('');

        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(result?.message || 'Không thể tham gia lớp.');
      }
    } catch (error) {
      setErrorMessage('Có lỗi xảy ra khi tham gia lớp.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-up p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Tham gia lớp bằng mã lớp</h3>
        <p className="text-gray-500 mb-8">
          Mã lớp gồm 6 ký tự, được giáo viên lớp đó cung cấp
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            maxLength={6}
            placeholder="Nhập mã lớp"
            className={`w-full px-4 py-4 text-center text-2xl font-bold tracking-[0.3em] border-2 rounded-xl outline-none transition mb-4 uppercase placeholder:text-gray-300 placeholder:tracking-normal placeholder:font-normal placeholder:text-base ${
              errorMessage
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100'
            }`}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setErrorMessage('');
              setSuccessMessage('');
            }}
          />

          {errorMessage && (
            <p className="text-sm text-red-500 font-medium mb-3">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 font-medium mb-3">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 text-base font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-all active:scale-95 mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang kiểm tra...' : 'Tìm lớp'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition mx-auto hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quay lại danh sách lớp
        </button>
      </div>
    </div>
  );
};

export default JoinClassModal;