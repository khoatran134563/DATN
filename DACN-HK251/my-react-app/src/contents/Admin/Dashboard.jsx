import React from 'react';
import { useNavigate } from "react-router-dom";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';

// --- DATA GIẢ LẬP CHO BIỂU ĐỒ ---
const dataVisits = [
  { name: 'T2', users: 0 },
  { name: 'T3', users: 0 },
  { name: 'T4', users: 0 },
  { name: 'T5', users: 0 },
  { name: 'T6', users: 0 },
  { name: 'T7', users: 0 },
  { name: 'CN', users: 0 },
];

// 6 chương, chỉ chương 1 có dữ liệu (4 mức độ), còn lại = 0
const rawQuestions = [
  { chapter: 'Chương 1', nhanBiet: 40, thongHieu: 33, vanDung: 143, vdCao: 71 },
  { chapter: 'Chương 2', nhanBiet: 0, thongHieu: 0, vanDung: 0, vdCao: 0 },
  { chapter: 'Chương 3', nhanBiet: 0, thongHieu: 0, vanDung: 0, vdCao: 0 },
  { chapter: 'Chương 4', nhanBiet: 0, thongHieu: 0, vanDung: 0, vdCao: 0 },
  { chapter: 'Chương 5', nhanBiet: 0, thongHieu: 0, vanDung: 0, vdCao: 0 },
  { chapter: 'Chương 6', nhanBiet: 0, thongHieu: 0, vanDung: 0, vdCao: 0 },
];

// Tính toán total để hiển thị
const dataQuestionsGrouped = rawQuestions.map((d) => ({
  ...d,
  total: (d.nhanBiet || 0) + (d.thongHieu || 0) + (d.vanDung || 0) + (d.vdCao || 0),
}));

// --- COMPONENT TUỲ CHỈNH CHO NHÃN TRỤC X (Hiển thị tên chương + Tổng) ---
const CustomXAxisTick = ({ x, y, payload }) => {
  // Tìm data của chương hiện tại dựa vào tên chương (payload.value)
  const dataItem = dataQuestionsGrouped.find(item => item.chapter === payload.value);
  const total = dataItem?.total || 0;

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Tên chương */}
      <text x={0} y={0} dy={12} textAnchor="middle" fill="#4B5563" fontSize={12} fontWeight={600}>
        {payload.value}
      </text>
      {/* Tổng số câu (chỉ hiện nếu > 0 cho đỡ rác), tô màu xanh nổi bật */}
      {total > 0 && (
         <text x={0} y={0} dy={28} textAnchor="middle" fill="#2563EB" fontSize={11} fontWeight={800}>
          ({total} câu)
         </text>
      )}
    </g>
  );
};


// Tooltip tuỳ chỉnh cho biểu đồ cột ghép
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid rgba(229,231,235,0.9)',
        borderRadius: 12,
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        padding: '12px 16px',
        minWidth: 220,
      }}
    >
      <div style={{ fontWeight: 800, color: '#111827', marginBottom: 8, borderBottom: '1px solid #f3f4f6', paddingBottom: 4 }}>
        {label}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color }}></span>
              <span style={{ color: '#4B5563', fontWeight: 600 }}>{entry.name}</span>
            </div>
            <span style={{ fontWeight: 800, color: '#111827' }}>{entry.value}</span>
          </div>
        ))}
        
        {/* Phần hiển thị Tổng cộng trong tooltip */}
        <div style={{ borderTop: '1px solid #E5E7EB', marginTop: 4, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 800 }}>Tổng cộng</span>
          <span style={{ fontSize: 14, color: '#2563EB', fontWeight: 900 }}>
             {payload.reduce((sum, item) => sum + (item.value || 0), 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 h-full flex flex-col gap-8">
      {/* 1. Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
        <p className="text-gray-500 text-sm mt-1">Chào mừng Admin quay trở lại! Đây là báo cáo hôm nay.</p>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div 
        onClick={() => navigate("/admin/users")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/admin/users")}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200 transform hover:scale-105 transition duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Tổng thành viên</p>
              <h3 className="text-3xl font-bold">2</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-100">
            <span className="bg-white/20 px-1.5 py-0.5 rounded mr-2">↗ 100%</span>
            <span>So với tháng trước</span>
          </div>
        </div>

        {/* Card 2 */}
        <div 
        onClick={() => navigate("/admin/question-bank")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/admin/question-bank")}
        className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-200 transform hover:scale-105 transition duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Câu hỏi trong kho</p>
              <h3 className="text-3xl font-bold">287</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-purple-100">
            <span className="bg-white/20 px-1.5 py-0.5 rounded mr-2">+ 0</span>
            <span>Mới thêm tuần này</span>
          </div>
        </div>

        {/* Card 3 */}
        <div 
        onClick={() => navigate("/admin/forum-approval")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/admin/forum-approval")}
        className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg shadow-orange-200 transform hover:scale-105 transition duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm font-medium mb-1">Forum chờ duyệt</p>
              <h3 className="text-3xl font-bold">3</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-orange-100">
            <span className="text-white font-bold bg-white/20 px-2 py-0.5 rounded-full animate-pulse">Cần xử lý ngay</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 text-white shadow-lg shadow-emerald-200 transform hover:scale-105 transition duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 text-sm font-medium mb-1">Đang truy cập</p>
              <h3 className="text-3xl font-bold">0</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-100">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
            <span>Hệ thống ổn định</span>
          </div>
        </div>
      </div>

      {/* 3. CHARTS SECTION */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Line chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[380px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Lưu lượng truy cập (7 ngày qua)</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataVisits} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF2F7" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(59,130,246,0.06)' }}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid rgba(229,231,235,0.9)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Người dùng"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grouped bar chart (Đã sửa theo ý bro) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[360px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Phân bố câu hỏi theo chương & mức độ</h3>

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataQuestionsGrouped}
                // Tăng margin bottom để có chỗ cho nhãn trục X 2 dòng
                margin={{ top: 30, right: 20, left: 0, bottom: 20 }}
                barGap={2}
                barSize={18}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF2F7" />
                {/* Sử dụng Custom Tick cho XAxis */}
                <XAxis 
                  dataKey="chapter" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomXAxisTick />} 
                  height={50} // Tăng chiều cao khu vực trục X
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(59,130,246,0.04)' }} content={<CustomTooltip />} />

                <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" />

                {/* Đã XÓA LabelList ở đây */}
                <Bar dataKey="nhanBiet" name="Nhận biết" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="thongHieu" name="Thông hiểu" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vanDung" name="Vận dụng" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vdCao" name="Vận dụng cao" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>

            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITIES */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Hoạt động mới nhất</h3>
          <button className="text-sm text-blue-600 font-bold hover:underline">Xem tất cả</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                {i === 1 ? '🎓' : i === 2 ? '📝' : '👤'}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">Nguyễn Văn A</span>{' '}
                  {i === 1
                    ? 'đã đăng bài viết mới vào Forum'
                    : i === 2
                    ? 'vừa nộp bài kiểm tra 15 phút'
                    : 'vừa đăng ký tài khoản mới'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{i * 5} phút trước</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;