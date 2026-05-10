import React from 'react';

const QuizInfo = ({ info, setInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên bài tập */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
            Tên bài tập <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={info.title}
            onChange={handleChange}
            placeholder="VD: Kiểm tra 15 phút - Chương Sự điện li"
            className="w-full text-lg font-bold border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 transition-colors placeholder-gray-300"
          />
        </div>

        {/* Chủ đề / thư mục - nhập tự do */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Chủ đề / thư mục
          </label>

          <input
            type="text"
            name="topic"
            value={info.topic}
            onChange={handleChange}
            placeholder="VD: Sự điện li, Axit - Bazơ, Kiểm tra 15 phút..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          />
        </div>

        {/* Thời gian làm bài */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Thời gian làm bài (phút)
          </label>

          <input
            type="number"
            name="duration"
            value={info.duration}
            onChange={handleChange}
            placeholder="VD: 45"
            min="1"
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          />
        </div>

        {/* Hạn nộp */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Hạn nộp
          </label>

          <input
            type="datetime-local"
            name="deadline"
            value={info.deadline}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;