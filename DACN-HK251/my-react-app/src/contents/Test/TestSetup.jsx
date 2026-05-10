// src/contents/Test/TestSetup.jsx
import React from 'react';
import { LEVELS } from './TestData';

const TestSetup = ({ 
  selectedLevel, 
  setSelectedLevel, 
  numQuestions, 
  setNumQuestions, 
  timeLimit,      
  setTimeLimit,   
  onStart 
}) => {
  return (
    <div className="flex flex-col items-center animate-fade-in pb-10">
      
      {/* HEADER (Giữ nguyên) */}
      <div className="w-full bg-white border-b border-gray-200 py-6 px-8 mb-8 sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                  <h1 className="text-2xl font-black text-blue-900">Trung Tâm Luyện Thi</h1>
                  <p className="text-gray-500 text-sm">Chọn chế độ và thử thách bản thân</p>
              </div>
              <div className="relative group">
                  <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 cursor-pointer hover:border-blue-400 transition-colors">
                      <span className="bg-blue-100 p-2 rounded-lg text-blue-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      </span>
                      <div className="text-left">
                          <p className="text-xs text-blue-500 font-bold uppercase">Nội dung ôn tập</p>
                          <p className="text-sm font-bold text-gray-800">Chương 1: Cân bằng hóa học</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="w-full max-w-4xl px-4">
          
          {/* 1. CHỌN CHẾ ĐỘ */}
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span> 1. Chọn chế độ thử thách
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {LEVELS.slice(0, 2).map((level) => (
                  <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level)}
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-start gap-3 group text-left
                          ${selectedLevel && selectedLevel.id === level.id 
                              ? `bg-white ${level.border} ring-2 ring-offset-2 ring-${level.color.split('-')[1]}-400 shadow-xl scale-[1.02]` 
                              : 'bg-white border-transparent hover:border-gray-200 hover:shadow-md'}`}
                  >
                      <div className={`p-3 rounded-xl ${level.bg} ${level.text} transition-transform group-hover:scale-110`}>
                          {level.icon}
                      </div>
                      <div>
                          <h3 className={`font-bold text-lg ${selectedLevel && selectedLevel.id === level.id ? level.text : 'text-gray-800'}`}>{level.name}</h3>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{level.sub}</span>
                          <p className="text-xs text-gray-500 mt-1">{level.desc}</p>
                      </div>
                  </button>
              ))}
          </div>

          <button
              onClick={() => setSelectedLevel(LEVELS[2])}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden mb-10
                  ${selectedLevel && selectedLevel.id === 'mixed' 
                      ? 'border-purple-300 ring-2 ring-offset-2 ring-purple-400 shadow-xl scale-[1.01]' 
                      : 'border-transparent hover:shadow-lg'}`}
          >
              <div className={`absolute inset-0 bg-gradient-to-r ${LEVELS[2].color} opacity-90 transition-opacity`}></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              
              <div className="relative z-10 flex items-center gap-5">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner">
                      {LEVELS[2].icon}
                  </div>
                  <div className="text-left text-white">
                      <h3 className="font-black text-xl md:text-2xl uppercase tracking-wide">{LEVELS[2].name}</h3>
                      <p className="text-purple-100 text-sm md:text-base opacity-90">{LEVELS[2].desc}</p>
                  </div>
              </div>
          </button>

          {/* 2. CÀI ĐẶT BÀI THI */}
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-600 rounded-full"></span> 2. Cài đặt bài thi
          </h2>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 flex flex-col md:flex-row gap-8 items-start">
              
              {/* Chọn số lượng câu */}
              <div className="flex-1 w-full">
                  <label className="block text-sm font-bold text-gray-500 mb-3">Số lượng câu hỏi</label>
                  <div className="flex flex-wrap gap-3">
                      {[5, 10, 15, 20].map(num => (
                          <button
                              key={num}
                              onClick={() => setNumQuestions(num)}
                              className={`flex-1 min-w-[70px] py-2.5 rounded-xl font-bold transition-all text-sm
                                  ${numQuestions === num 
                                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-600 ring-offset-1' 
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          >
                              {num} câu
                          </button>
                      ))}
                  </div>
              </div>

              <div className="w-px h-24 bg-gray-200 hidden md:block"></div>

              {/* THANH TRƯỢT THỜI GIAN (ĐÃ FIX LỖI) */}
              <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-bold text-gray-500">Thời gian làm bài</label>
                      <span className={`text-sm font-bold px-3 py-1 rounded-lg ${timeLimit === 0 ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
                          {timeLimit === 0 ? "Không giới hạn" : `${timeLimit} phút`}
                      </span>
                  </div>

                  <div className="flex items-center gap-4">
                      {/* Nút Tự do */}
                      <button
                          onClick={() => setTimeLimit(0)}
                          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap
                              ${timeLimit === 0 
                                  ? 'bg-gray-800 text-white shadow-lg' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                          Tự do
                      </button>

                      {/* Thanh Slider - ĐÃ BỎ DISABLED */}
                      <div className="relative flex-1 h-12 flex items-center group">
                          {/* Track */}
                          <input 
                              type="range" 
                              min="5" 
                              max="25" 
                              step="5" 
                              value={timeLimit === 0 ? 5 : timeLimit} 
                              onChange={(e) => setTimeLimit(Number(e.target.value))}
                              // Đã xóa thuộc tính disabled để user luôn kéo được
                              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 transition-all
                                  ${timeLimit === 0 ? 'grayscale opacity-60 hover:opacity-100 hover:grayscale-0' : 'opacity-100'}`}
                          />
                          
                          {/* Marks (Các điểm dừng) */}
                          <div className="absolute top-8 left-0 w-full flex justify-between px-1 text-xs font-medium text-gray-400 pointer-events-none">
                              <span>5p</span>
                              <span>10p</span>
                              <span>15p</span>
                              <span>20p</span>
                              <span>25p</span>
                          </div>
                      </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-6 italic">
                    {timeLimit === 0 ? "Bạn có thể làm bài thoải mái mà không bị áp lực thời gian." : `Hệ thống đếm ngược và tự động nộp bài sau ${timeLimit} phút.`}
                  </p>
              </div>
          </div>

          {/* START BUTTON */}
          <div className="flex justify-center pb-10">
              <button
                  onClick={onStart}
                  className={`group relative px-10 py-4 bg-gradient-to-r ${selectedLevel ? selectedLevel.color : 'from-gray-400 to-gray-500'} text-white font-black text-xl rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 skew-x-12 -ml-4"></div>
                  <span className="relative flex items-center gap-3">
                      BẮT ĐẦU LÀM BÀI
                  </span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default TestSetup;