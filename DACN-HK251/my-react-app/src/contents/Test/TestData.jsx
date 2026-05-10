// src/contents/Test/TestData.jsx
import React from 'react';

// --- CẤU HÌNH 3 MỨC ĐỘ CHÍNH ---
export const LEVELS = [
  { 
    id: 'nbth',  // Khớp với đuôi id trong database (ví dụ: cbhh_nbth)
    name: 'Khởi động', 
    sub: 'Mức NB - TH', 
    desc: 'Ôn tập định nghĩa & lý thuyết cơ bản.', 
    color: 'from-green-400 to-emerald-600', 
    text: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    id: 'vdvdc', // Khớp với đuôi id trong database (ví dụ: cbhh_vdvdc)
    name: 'Thử thách', 
    sub: 'Mức VD - VDC', 
    desc: 'Giải quyết bài tập tính toán & nâng cao.', 
    color: 'from-orange-400 to-red-600', 
    text: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    id: 'mixed', 
    name: 'Thi Thử Tổng Hợp', 
    sub: 'Ngẫu nhiên', 
    desc: 'Trộn lẫn câu hỏi từ tất cả mức độ.', 
    color: 'from-blue-500 via-indigo-500 to-purple-600', 
    text: 'text-white',
    bg: 'bg-white',
    border: 'border-purple-200',
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
];

// Dữ liệu mẫu (chỉ dùng khi API lỗi hoặc loading)
export const MOCK_QUESTIONS = [];