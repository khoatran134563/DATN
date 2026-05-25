// src/contents/Test/TestPlaying.jsx
import React, { useEffect, useState } from 'react';

const SUBSCRIPT_MAP = {
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  '+': '₊',
  '-': '₋',
};

const SUPERSCRIPT_MAP = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  '+': '⁺',
  '-': '⁻',
};

const toSubscript = (value = '') =>
  String(value)
    .split('')
    .map((char) => SUBSCRIPT_MAP[char] || char)
    .join('');

const toSuperscript = (value = '') =>
  String(value)
    .split('')
    .map((char) => SUPERSCRIPT_MAP[char] || char)
    .join('');

const normalizeChemText = (value = '') => {
  if (value === null || value === undefined) return '';

  return String(value)
    // Bỏ dấu $ của inline LaTeX: $H_2O$ -> H_2O
    .replace(/\$/g, '')

    // Xử lý fraction trước khi xóa dấu backslash
    // \frac{0,2}{0,2} -> (0,2)/(0,2)
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')

    // \text{M} hoặc \mathrm{M} -> M
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\mathrm\{([^}]+)\}/g, '$1')

    // Một số lệnh LaTeX hay dùng trong dữ liệu câu hỏi
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\to/g, '→')
    .replace(/\\leftrightarrow/g, '⇌')
    .replace(/\\rightleftharpoons/g, '⇌')
    .replace(/\\downarrow/g, '↓')
    .replace(/\\uparrow/g, '↑')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\degree/g, '°')
    .replace(/\\circ/g, '°')
    .replace(/\\ /g, ' ')

    // Dọn một số dấu escape dư
    .replace(/\\,/g, ' ')
    .replace(/\\/g, '')

    // Subscript dạng _{...}: SO_{4} -> SO₄
    .replace(/_\{([^}]+)\}/g, (_, group) => toSubscript(group))

    // Subscript dạng _2: H_2O -> H₂O
    .replace(/_([0-9+\-]+)/g, (_, group) => toSubscript(group))

    // Superscript dạng ^{...}: SO_4^{2-} -> SO₄²⁻
    .replace(/\^\{([^}]+)\}/g, (_, group) => toSuperscript(group))

    // Superscript dạng ^- hoặc ^2: OH^- -> OH⁻
    .replace(/\^([0-9+\-]+)/g, (_, group) => toSuperscript(group))

    // Dọn dấu ngoặc nhọn còn sót lại nếu có
    .replace(/[{}]/g, '')

    // Dọn khoảng trắng bị lặp
    .replace(/[ \t]+/g, ' ');
};

const ChemText = ({ text, className = '' }) => {
  const normalized = normalizeChemText(text);

  return (
    <span className={`whitespace-pre-line ${className}`}>
      {normalized}
    </span>
  );
};

const TestPlaying = ({
  questions,
  numQuestions,
  selectedLevel,
  timeLimit,
  onFinish,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [localScore, setLocalScore] = useState(0);

  // State đếm ngược thời gian, đổi ra giây
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  const question = questions[currentQIndex % questions.length];
  const progress = (currentQIndex / numQuestions) * 100;

  // --- LOGIC ĐẾM NGƯỢC ---
  useEffect(() => {
    if (timeLimit === 0) return;

    if (timeLeft <= 0) {
      alert('⏰ Hết giờ làm bài! Hệ thống sẽ tự động nộp bài.');

      let finalScore = localScore;

      if (selectedAns === question.correct_index && !isChecked) {
        finalScore += 1;
      }

      onFinish(finalScore);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    timeLimit,
    localScore,
    selectedAns,
    question.correct_index,
    isChecked,
    onFinish,
  ]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- LOGIC TRẢ LỜI ---
  const handleAnswerClick = (index) => {
    if (isChecked) return;
    setSelectedAns(index);
  };

  const handleCheck = () => {
    if (selectedAns === null) return;

    setIsChecked(true);

    if (selectedAns === question.correct_index) {
      setLocalScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < numQuestions) {
      setCurrentQIndex((prev) => prev + 1);
      setIsChecked(false);
      setSelectedAns(null);
    } else {
      onFinish(localScore);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full animate-slide-up">
      {/* Header Info */}
      <div className="w-full max-w-3xl mb-4 flex items-center justify-between text-slate-600 font-bold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="text-sm uppercase tracking-wider">
            {selectedLevel.name}
          </span>
        </div>

        {/* ĐỒNG HỒ ĐẾM NGƯỢC */}
        {timeLimit > 0 && (
          <div
            className={`px-4 py-1 rounded-full border-2 font-mono text-lg flex items-center gap-2 ${
              timeLeft < 60
                ? 'border-red-500 text-red-600 bg-red-50 animate-pulse'
                : 'border-blue-200 text-blue-700 bg-blue-50'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatTime(timeLeft)}
          </div>
        )}

        <span>
          Câu {currentQIndex + 1}/{numQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-900 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Card Câu Hỏi */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 relative z-10 leading-relaxed">
          <ChemText text={question.question_text} />
        </h2>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          {question.options.map((opt, idx) => {
            let bgClass =
              'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50';
            let textClass = 'text-slate-700';
            let icon = (
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 mr-4 shadow-sm flex-shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
            );

            if (isChecked) {
              if (idx === question.correct_index) {
                bgClass = 'bg-green-50 border-green-500 shadow-md';
                textClass = 'text-green-800 font-bold';
                icon = (
                  <span className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                    ✓
                  </span>
                );
              } else if (idx === selectedAns) {
                bgClass = 'bg-red-50 border-red-500';
                textClass = 'text-red-800';
                icon = (
                  <span className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                    ✕
                  </span>
                );
              } else {
                bgClass = 'opacity-50 grayscale border-slate-200 bg-slate-50';
              }
            } else if (selectedAns === idx) {
              bgClass = 'bg-blue-50 border-blue-500 ring-1 ring-blue-500';
              textClass = 'text-blue-800 font-semibold';
              icon = (
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerClick(idx)}
                disabled={isChecked}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center ${bgClass}`}
              >
                {icon}
                <ChemText text={opt} className={`text-lg ${textClass}`} />
              </button>
            );
          })}
        </div>

        {isChecked && question.explanation && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-yellow-700 font-bold">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Giải thích chi tiết:
            </div>

            <p className="text-sm text-yellow-800 leading-relaxed">
              <ChemText text={question.explanation} />
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={selectedAns === null}
              className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
                selectedAns !== null
                  ? 'bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-500/20 hover:scale-105'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center gap-2 animate-bounce-short"
            >
              {currentQIndex + 1 === numQuestions
                ? 'Xem kết quả'
                : 'Câu tiếp theo'}{' '}
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPlaying;