// src/contents/Test/TestData.jsx
import React from 'react';

// --- CẤU HÌNH CHƯƠNG ---
// quizPrefixes là phần đứng trước dấu "_" trong quiz_id.
// Ví dụ: cbhh_nbth => prefix là cbhh.
export const CHAPTERS = [
  {
    id: 'chapter-1',
    name: 'Chương 1',
    title: 'Cân bằng hóa học',
    desc: 'Khái niệm cân bằng hóa học và cân bằng trong dung dịch nước.',
    quizPrefixes: ['cbhh', 'tddn'],
  },
];

// --- CẤU HÌNH 3 MỨC ĐỘ CHÍNH ---
export const LEVELS = [
  {
    id: 'nbth',
    name: 'Nhận biết - Thông hiểu',
    sub: 'Mức NB - TH',
    desc: 'Kiểm tra khái niệm, định nghĩa và kiến thức nền tảng.',
    badge: 'Cơ bản',
    text: 'text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    activeBorder: 'border-blue-700',
    activeBg: 'bg-blue-50',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'vdvdc',
    name: 'Vận dụng - Vận dụng cao',
    sub: 'Mức VD - VDC',
    desc: 'Rèn luyện bài tập tính toán, suy luận và vận dụng kiến thức.',
    badge: 'Nâng cao',
    text: 'text-slate-800',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    activeBorder: 'border-slate-800',
    activeBg: 'bg-slate-50',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: 'mixed',
    name: 'Tổng hợp',
    sub: 'Trộn mức độ',
    desc: 'Trộn câu hỏi từ cả hai mức độ trong chương đã chọn.',
    badge: 'Ngẫu nhiên',
    text: 'text-indigo-800',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    activeBorder: 'border-indigo-700',
    activeBg: 'bg-indigo-50',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

// Dữ liệu mẫu (chỉ dùng khi API lỗi hoặc loading)
export const MOCK_QUESTIONS = [];