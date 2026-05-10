import React from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, value, label, sublabel }) => (
  <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-[0_12px_30px_rgba(16,185,129,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(6,182,212,0.18)]">
    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-cyan-50/40 pointer-events-none"></div>
    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-cyan-200/40 blur-2xl pointer-events-none"></div>

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{value}</div>
        <p className="mt-2 text-sm text-slate-500">{sublabel}</p>
      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-white shadow-lg shadow-cyan-500/25">
        {icon}
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ to, icon, title, desc }) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_40px_rgba(6,182,212,0.12)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 via-cyan-50/0 to-emerald-50/0 group-hover:from-cyan-50/70 group-hover:to-emerald-50/60 transition-all duration-300"></div>
    <div className="relative z-10 flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-cyan-700 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {desc}
        </p>
      </div>
    </div>
  </Link>
);

const TeacherProgressHome = ({ currentUser }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-tight text-slate-800">
          Trung tâm giảng dạy
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Theo dõi nhanh hoạt động lớp học và quản lý nội dung giảng dạy của bạn
        </p>
      </div>

      <div className="relative mb-10 overflow-hidden rounded-[28px] border border-cyan-200/60 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-8 text-white shadow-[0_25px_60px_rgba(20,184,166,0.28)]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/28 via-white/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-10 right-10 h-px bg-white/60 blur-sm pointer-events-none"></div>
        <div className="absolute -top-16 -left-10 h-40 w-40 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-black leading-tight">
              Xin chào {currentUser?.fullName || 'Giáo viên'}
            </h2>
            <p className="mt-4 max-w-2xl text-cyan-50/90 leading-7">
              Bạn có thể kiểm tra lớp học, quản lý bài viết trên forum và theo dõi hoạt động học tập trong một không gian trực quan hơn.
            </p>
          </div>

          <div className="rounded-3xl border border-white/30 bg-white/16 p-5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl shadow-inner">
                👩‍🏫
              </div>
              <div>
                <p className="text-sm text-cyan-50/80">Vai trò hiện tại</p>
                <p className="text-xl font-black">Giáo viên</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/12 p-3 text-center">
                <div className="text-lg font-black">4</div>
                <div className="text-xs text-cyan-50/80">Lớp phụ trách</div>
              </div>
              <div className="rounded-2xl bg-white/12 p-3 text-center">
                <div className="text-lg font-black">45</div>
                <div className="text-xs text-cyan-50/80">Học sinh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 border-l-4 border-cyan-500 pl-4">
        <h2 className="text-2xl font-bold text-slate-800">Tổng quan giảng dạy</h2>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          value="4"
          label="Lớp đang quản lý"
          sublabel="Các lớp đang hoạt động"
          icon={<span className="text-xl">🏫</span>}
        />
        <StatCard
          value="15"
          label="Bài viết đã tạo"
          sublabel="Bài đăng trên forum"
          icon={<span className="text-xl">📰</span>}
        />
        <StatCard
          value="8"
          label="Bài tập đang giao"
          sublabel="Bài tập cần theo dõi"
          icon={<span className="text-xl">📝</span>}
        />
      </div>

      <div className="mb-4 border-l-4 border-emerald-500 pl-4">
        <h2 className="text-2xl font-bold text-slate-800">Tác vụ nhanh</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <QuickActionCard
          to="/classroom"
          icon={<span className="text-xl">👩‍🏫</span>}
          title="Quản lý lớp học"
          desc="Xem lớp, học sinh, bài giảng, bài tập và tài liệu của từng lớp."
        />

        <QuickActionCard
          to="/forum"
          icon={<span className="text-xl">💬</span>}
          title="Hỗ trợ học sinh"
          desc="Trả lời câu hỏi, theo dõi thảo luận và đồng hành cùng học sinh."
        />
      </div>
    </div>
  );
};

export default TeacherProgressHome;