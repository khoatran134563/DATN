import React, { useEffect, useState } from 'react';

const QuestionPalette = ({
  totalQuestions,
  currentQuestion,
  answers,
  onSelectQuestion,
  timeLeft,
  onSubmit,
  isFinished = false,
}) => {
  const formatTimeVietnamese = (seconds) => {
    const safeSeconds = Math.max(0, Number(seconds || 0));
    const m = Math.floor(safeSeconds / 60);
    const s = safeSeconds % 60;
    return `${m} phút ${s} giây`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-full max-h-[400px]">
      <div className={`${isFinished ? 'bg-gray-600' : 'bg-[#1976D2]'} p-3 text-white shrink-0 text-center`}>
        <div className="text-[10px] font-medium opacity-80 uppercase">
          {isFinished ? 'Trạng thái' : 'Thời gian còn lại'}
        </div>
        <div className="text-base font-bold tracking-wide">
          {isFinished ? 'Đã hoàn thành' : formatTimeVietnamese(timeLeft)}
        </div>
      </div>

      <div className="flex-1 bg-white p-3 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-700 text-xs">Danh sách câu</h3>
          <span className="text-[10px] text-gray-400">
            {Object.keys(answers || {}).length}/{totalQuestions}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const questionNumber = index + 1;
            const questionKey = String(questionNumber);
            const isAnswered =
              answers?.[questionKey] !== undefined &&
              answers?.[questionKey] !== '';

            const isCurrent = currentQuestion === index;

            return (
              <button
                key={index}
                onClick={() => onSelectQuestion(index)}
                className={`h-7 w-full rounded border text-xs font-bold transition-all relative flex items-center justify-center
                  ${
                    isCurrent
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-gray-200 text-gray-600 hover:border-blue-400'
                  }
                  ${isAnswered && !isCurrent ? 'bg-gray-100 text-gray-800 border-gray-300' : ''}
                `}
              >
                {questionNumber}
                {isAnswered && <div className="absolute bottom-0.5 w-2.5 h-[2px] bg-gray-400 rounded-full"></div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-100 shrink-0">
        <button
          onClick={onSubmit}
          disabled={isFinished}
          className={`w-full font-bold py-2 rounded-md text-xs transition shadow-sm ${
            isFinished
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#1976D2] hover:bg-blue-700 text-white'
          }`}
        >
          {isFinished ? 'Đã nộp bài' : 'Nộp bài thi'}
        </button>
      </div>
    </div>
  );
};

export default QuestionPalette;