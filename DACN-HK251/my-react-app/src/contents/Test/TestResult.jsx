// src/contents/Test/TestResult.jsx
import React from 'react';

const TestResult = ({ score, numQuestions, selectedLevel, onRestart, onBack }) => {
  const totalScore = score * 2; // Giả sử thang điểm tùy ý
  const percentage = (score / numQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full relative overflow-hidden h-full animate-scale-up">
      <style>{`
          @keyframes firework {
              0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
              50% { width: 0.5rem; opacity: 1; }
              100% { width: var(--finalSize); opacity: 0; }
          }
      `}</style>
      
      {percentage > 50 && (
          <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping delay-100"></div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
          </div>
      )}

      <div className="bg-white rounded-[40px] p-8 md:p-12 w-full max-w-md text-center shadow-2xl relative z-10 border border-gray-100">
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br ${selectedLevel.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
              <span className="text-4xl">🏆</span>
          </div>

          <h2 className="mt-10 text-3xl font-black text-gray-800 mb-2">Hoàn Thành!</h2>
          <p className="text-gray-500 mb-6">Bạn đã hoàn thành thử thách <span className={`font-bold ${selectedLevel.text}`}>{selectedLevel.name}</span></p>

          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                  <span className="text-gray-500 font-medium">Số câu đúng</span>
                  <span className="text-xl font-bold text-green-600">{score}/{numQuestions}</span>
              </div>
              <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Tổng điểm</span>
                  <span className="text-3xl font-black text-blue-600">{Math.round(percentage)}%</span>
              </div>
          </div>

          <div className="space-y-3">
              <button 
                  onClick={onRestart}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
              >
                  Làm bài khác
              </button>
              <button 
                  onClick={onBack} 
                  className="w-full py-3.5 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-bold transition-colors"
              >
                  Quay lại menu
              </button>
          </div>
      </div>
    </div>
  );
};

export default TestResult;