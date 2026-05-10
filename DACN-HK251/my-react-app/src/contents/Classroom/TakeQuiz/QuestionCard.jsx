import React from 'react';

const QuestionCard = ({ question, index, userAnswer, onAnswer, isReviewMode = false }) => {
  const handleAnswer = (questionId, value) => {
    if (isReviewMode) return;
    onAnswer(questionId, value);
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-36 bg-gray-50 p-4 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start gap-2">
          <div>
            <span className="font-bold text-blue-900 text-sm block">Câu {index + 1}</span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                userAnswer ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {userAnswer ? 'Đã làm' : 'Chưa làm'}
            </span>
          </div>

          <div className="text-[10px] font-bold text-gray-500 mt-0 md:mt-2">
            {Number(question.score || 1).toFixed(2)} điểm
          </div>
        </div>

        {isReviewMode && (
          <div className="mt-4 text-[11px] font-bold text-green-600 bg-green-50 border border-green-100 rounded-lg px-2 py-1">
            Chỉ xem lại
          </div>
        )}
      </div>

      <div className="flex-1 p-5">
        <div className="mb-4 text-gray-800 text-sm font-medium leading-relaxed">
          {question.text}
          {question.subText && (
            <p className="text-xs text-gray-500 font-normal mt-1 italic border-l-2 border-gray-300 pl-2">
              {question.subText}
            </p>
          )}
        </div>

        {question.type === 'multiple-choice' && (
          <div className="space-y-2">
            {(question.options || []).map((opt, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-2.5 rounded border transition-all group ${
                  isReviewMode ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
                } ${
                  userAnswer === opt
                    ? 'bg-blue-50 border-blue-200'
                    : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="relative flex items-center shrink-0">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    className="peer sr-only"
                    checked={userAnswer === opt}
                    disabled={isReviewMode}
                    onChange={() => handleAnswer(question.id, opt)}
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      userAnswer === opt
                        ? 'border-blue-600'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}
                  >
                    {userAnswer === opt && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                </div>

                <span className={`text-sm ${userAnswer === opt ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'fill-in' && (
          <div className="mt-4 p-3 bg-blue-50/30 rounded border border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-bold text-blue-900 text-xs shrink-0">Trả lời:</span>
              <input
                type="text"
                className={`w-full border border-gray-300 rounded px-3 py-1.5 text-sm ${
                  isReviewMode
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'focus:outline-none focus:border-blue-500'
                }`}
                placeholder="Nhập đáp án..."
                value={userAnswer || ''}
                disabled={isReviewMode}
                onChange={(e) => handleAnswer(question.id, e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;