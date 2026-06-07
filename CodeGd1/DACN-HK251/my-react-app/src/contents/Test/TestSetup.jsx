// src/contents/Test/TestSetup.jsx
import React from 'react';

const QUESTION_OPTIONS = [5, 10, 15, 20];
const TIME_OPTIONS = [0, 5, 10, 15, 20, 25];

const TestSetup = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
  levels,
  selectedLevel,
  setSelectedLevel,
  numQuestions,
  setNumQuestions,
  timeLimit,
  setTimeLimit,
  onStart,
}) => {
  const timeLabel = timeLimit === 0 ? 'Không giới hạn' : `${timeLimit} phút`;

  const handleChapterChange = (e) => {
    const chapter = chapters.find((item) => item.id === e.target.value);
    if (chapter) {
      setSelectedChapter(chapter);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 pt-1 pb-8">
        

        {/* 1. Chọn chương */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-7 rounded-full bg-blue-900"></span>
            <h2 className="text-xl font-black text-slate-800">
              1. Chọn chương ôn tập
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
              <div>
                <label className="block text-sm font-black text-slate-700 mb-3">
                  Chương
                </label>

                <select
                  value={selectedChapter.id}
                  onChange={handleChapterChange}
                  className="w-full h-13 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10"
                >
                  {chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.name}: {chapter.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Nội dung đang chọn
                </p>
                <p className="mt-2 text-base font-black text-slate-900">
                  {selectedChapter.name}: {selectedChapter.title}
                </p>
                <p className="mt-2 text-sm text-slate-500 leading-6">
                  {selectedChapter.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Chọn mức độ */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-7 rounded-full bg-blue-900"></span>
            <h2 className="text-xl font-black text-slate-800">
              2. Chọn mức độ câu hỏi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {levels.map((level) => {
              const isSelected = selectedLevel.id === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? `bg-white ${level.activeBorder} shadow-md ring-2 ring-slate-900/5`
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        isSelected ? level.activeBg : level.bg
                      } ${level.text}`}
                    >
                      {level.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-slate-900">
                          {level.name}
                        </h3>
                        <span className="text-[11px] font-black uppercase tracking-wide rounded-full bg-slate-100 text-slate-500 px-2 py-1">
                          {level.badge}
                        </span>
                      </div>

                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                        {level.sub}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {level.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Cài đặt bài thi */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-7 rounded-full bg-blue-900"></span>
            <h2 className="text-xl font-black text-slate-800">
              3. Cài đặt bài thi
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Số câu */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <label className="text-sm font-black text-slate-700">
                    Số lượng câu hỏi
                  </label>
                  <span className="text-sm font-bold text-slate-500">
                    {numQuestions} câu
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {QUESTION_OPTIONS.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumQuestions(num)}
                      className={`h-12 rounded-xl text-sm font-black transition-all ${
                        numQuestions === num
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thời gian */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <label className="text-sm font-black text-slate-700">
                    Thời gian làm bài
                  </label>
                  <span className="text-sm font-bold text-slate-500">
                    {timeLabel}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {TIME_OPTIONS.map((minute) => {
                    const isSelected = timeLimit === minute;

                    return (
                      <button
                        key={minute}
                        type="button"
                        onClick={() => setTimeLimit(minute)}
                        className={`h-12 rounded-xl text-sm font-black transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {minute === 0 ? 'Tự do' : `${minute}p`}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-slate-400 mt-3 leading-5">
                  {timeLimit === 0
                    ? 'Không giới hạn thời gian. Học sinh có thể làm bài theo tốc độ cá nhân.'
                    : `Hệ thống sẽ đếm ngược và tự động nộp bài sau ${timeLimit} phút.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Xác nhận */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-7 rounded-full bg-blue-900"></span>
            <h2 className="text-xl font-black text-slate-800">
              4. Xác nhận đề kiểm tra
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Chương
                </p>
                <p className="mt-2 text-sm font-black text-slate-800">
                  {selectedChapter.name}
                </p>
                <p className="text-sm text-slate-500">{selectedChapter.title}</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Mức độ
                </p>
                <p className="mt-2 text-sm font-black text-slate-800">
                  {selectedLevel.name}
                </p>
                <p className="text-sm text-slate-500">{selectedLevel.sub}</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Số câu
                </p>
                <p className="mt-2 text-sm font-black text-slate-800">
                  {numQuestions} câu
                </p>
                <p className="text-sm text-slate-500">Chọn ngẫu nhiên</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Thời gian
                </p>
                <p className="mt-2 text-sm font-black text-slate-800">
                  {timeLabel}
                </p>
                <p className="text-sm text-slate-500">
                  {timeLimit === 0 ? 'Không tự nộp' : 'Tự động nộp'}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={onStart}
                className="px-9 py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-base font-black shadow-sm transition-all active:scale-[0.98]"
              >
                Bắt đầu làm bài
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestSetup;