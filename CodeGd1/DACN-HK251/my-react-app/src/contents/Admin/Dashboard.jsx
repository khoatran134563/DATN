import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config/api';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const defaultStats = {
  totalUsers: 0,
  totalQuestions: 0,
  pendingForumPosts: 0,
  activeForumPosts: 0,
  userChart: [
    { name: 'T2', users: 0 },
    { name: 'T3', users: 0 },
    { name: 'T4', users: 0 },
    { name: 'T5', users: 0 },
    { name: 'T6', users: 0 },
    { name: 'T7', users: 0 },
    { name: 'CN', users: 0 },
  ],
  questionDistribution: [
    { chapter: 'Chương 1', nbth: 0, vdvdc: 0, other: 0, total: 0 },
    { chapter: 'Chương 2', nbth: 0, vdvdc: 0, other: 0, total: 0 },
    { chapter: 'Chương 3', nbth: 0, vdvdc: 0, other: 0, total: 0 },
    { chapter: 'Chương 4', nbth: 0, vdvdc: 0, other: 0, total: 0 },
    { chapter: 'Chương 5', nbth: 0, vdvdc: 0, other: 0, total: 0 },
    { chapter: 'Chương 6', nbth: 0, vdvdc: 0, other: 0, total: 0 },
  ],
  recentActivities: [],
};

const CustomXAxisTick = ({ x, y, payload, data }) => {
  const dataItem = data.find((item) => item.chapter === payload.value);
  const total = dataItem?.total || 0;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="middle"
        fill="#4B5563"
        fontSize={12}
        fontWeight={600}
      >
        {payload.value}
      </text>

      {total > 0 && (
        <text
          x={0}
          y={0}
          dy={28}
          textAnchor="middle"
          fill="#2563EB"
          fontSize={11}
          fontWeight={800}
        >
          ({total} câu)
        </text>
      )}
    </g>
  );
};

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
      <div
        style={{
          fontWeight: 800,
          color: '#111827',
          marginBottom: 8,
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: 4,
        }}
      >
        {label}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 13,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                }}
              />
              <span style={{ color: '#4B5563', fontWeight: 600 }}>
                {entry.name}
              </span>
            </div>
            <span style={{ fontWeight: 800, color: '#111827' }}>
              {entry.value}
            </span>
          </div>
        ))}

        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            marginTop: 4,
            paddingTop: 8,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 800 }}>
            Tổng cộng
          </span>
          <span style={{ fontSize: 14, color: '#2563EB', fontWeight: 900 }}>
            {payload.reduce((sum, item) => sum + (item.value || 0), 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  className,
  onClick,
  badge,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && e.key === 'Enter') onClick();
      }}
      className={`${className} rounded-2xl p-5 text-white shadow-lg transform hover:scale-105 transition duration-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>

        <div className="bg-white/20 p-2 rounded-lg">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center text-xs text-white/80">
        {badge && (
          <span className="bg-white/20 px-1.5 py-0.5 rounded mr-2">
            {badge}
          </span>
        )}
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

const formatRelativeTime = (date) => {
  if (!date) return '';

  const now = new Date();
  const target = new Date(date);
  const diffMs = now - target;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} giờ trước`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay === 1) return 'Hôm qua';
  if (diffDay < 7) return `${diffDay} ngày trước`;

  return target.toLocaleDateString('vi-VN');
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải thống kê quản trị.');
      }

      setStats({
        ...defaultStats,
        ...data,
        userChart: data.userChart || defaultStats.userChart,
        questionDistribution:
          data.questionDistribution || defaultStats.questionDistribution,
        recentActivities: data.recentActivities || [],
      });
    } catch (error) {
      console.error('FETCH ADMIN STATS ERROR =', error);
      alert(error.message || 'Lỗi tải thống kê quản trị.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const questionDistribution = useMemo(() => {
    return stats.questionDistribution || defaultStats.questionDistribution;
  }, [stats.questionDistribution]);

  return (
    <div className="p-8 h-full flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Tổng quan hệ thống
            </h2>
            
          </div>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng thành viên"
          value={stats.totalUsers}
          subtitle="Tài khoản trong hệ thống"
          
          onClick={() => navigate('/admin/users')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <StatCard
          title="Câu hỏi trong kho"
          value={stats.totalQuestions}
          subtitle="Câu hỏi trắc nghiệm"
          
          onClick={() => navigate('/admin/question-bank')}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-200"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <StatCard
          title="Forum chờ duyệt"
          value={stats.pendingForumPosts}
          subtitle="Bài viết cần xử lý"
          badge={stats.pendingForumPosts > 0 ? 'Cần duyệt' : 'Ổn định'}
          onClick={() => navigate('/admin/forum-approval')}
          className="bg-gradient-to-br from-orange-400 to-pink-500 shadow-orange-200"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Bài forum hiển thị"
          value={stats.activeForumPosts}
          subtitle="Bài viết đang công khai"
          badge="Active"
          onClick={() => navigate('/admin/forum-approval')}
          className="bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-200"
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h8M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
          }
        />
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[380px]">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Tài khoản tạo mới trong 7 ngày qua
          </h3>
          

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.userChart} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
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
                  name="Tài khoản mới"
                  stroke="#2563EB"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[360px]">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Phân bố câu hỏi theo chương & mức độ
          </h3>
         

          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={questionDistribution}
                margin={{ top: 30, right: 20, left: 0, bottom: 20 }}
                barGap={4}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF2F7" />

                <XAxis
                  dataKey="chapter"
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomXAxisTick data={questionDistribution} />}
                  height={50}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  allowDecimals={false}
                />

                <Tooltip cursor={{ fill: 'rgba(59,130,246,0.04)' }} content={<CustomTooltip />} />

                <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" />

                <Bar dataKey="nbth" name="NB - TH" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vdvdc" name="VD - VDC" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="other" name="Khác" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Hoạt động mới nhất</h3>
            <p className="text-sm text-gray-500 mt-1">
              Gộp từ tài khoản mới và bài viết forum mới.
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {stats.recentActivities.length > 0 ? (
            stats.recentActivities.map((activity) => (
              <div key={`${activity.type}-${activity.id}`} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  {activity.type === 'forum' ? '📝' : '👤'}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-semibold">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.subtitle}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              Chưa có hoạt động mới.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;