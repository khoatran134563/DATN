import React from 'react';

const categoryStyleMap = {
  theory: {
    label: 'Lý thuyết',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
  },
  video: {
    label: 'Video minh họa',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-600',
  },
  exercise: {
    label: 'Bài tập',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
  },
  'virtual-lab': {
    label: 'Thí nghiệm 3D',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
  },
};

const getProgressIcon = (categoryId) => {
  if (categoryId === 'video') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }

  if (categoryId === 'exercise') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    );
  }

  if (categoryId === 'virtual-lab') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }

  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
};

const StudentProgressHome = ({
  progressSummary,
  onOpenProgressTopic,
}) => {
  const {
    totalTopics = 0,
    completedTopics = 0,
    remainingTopics = 0,
    percent = 0,
    continueItems = [],
  } = progressSummary || {};

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light text-blue-900 mb-2">Tiến độ học tập</h1>
        <p className="text-gray-500">
          Theo dõi tiến độ các chương Hóa học và tiếp tục bài học đang dở
        </p>
      </div>

      <div className="bg-[#1e3a8a] rounded-2xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 relative z-10">Tổng quan tiến độ</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">{percent}%</div>
            <div className="text-sm text-blue-200 mt-1">Tổng hoàn thành</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">
              {completedTopics}/{totalTopics}
            </div>
            <div className="text-sm text-blue-200 mt-1">Chủ đề đã xong</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-4xl font-bold">{remainingTopics}</div>
            <div className="text-sm text-blue-200 mt-1">Chủ đề còn lại</div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-800 rounded-full opacity-50 blur-2xl"></div>
      </div>

      <div className="mb-4 border-l-4 border-green-500 pl-4">
        <h2 className="text-2xl font-bold text-blue-900">Tiếp tục học</h2>
      </div>

      {continueItems.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="font-bold text-blue-900 text-lg">Bạn đã hoàn thành tất cả nội dung hiện có.</h3>
          <p className="text-sm text-gray-500 mt-2">
            Khi có bài học mới, hệ thống sẽ tự động hiển thị tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {continueItems.map((item) => {
            const style = categoryStyleMap[item.categoryId] || categoryStyleMap.theory;

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
                onClick={() => onOpenProgressTopic(item)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${style.iconBg} ${style.iconText}`}>
                    {getProgressIcon(item.categoryId)}
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-900 text-lg group-hover:text-blue-600 transition">
                      {item.isLastOpened ? 'Tiếp tục: ' : 'Tiếp theo: '}
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      {item.lessonTitle}
                    </p>

                    <span className={`${style.bg} ${style.text} text-xs px-2 py-1 rounded font-medium`}>
                      {style.label}
                    </span>
                  </div>
                </div>

                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentProgressHome;