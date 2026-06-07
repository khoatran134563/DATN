import React from 'react';

const ClassHeader = ({ data, isTeacher }) => {
  return (
    <div className={`relative w-full h-48 ${data.cover} rounded-xl p-6 md:p-8 flex flex-col justify-end text-white shadow-md overflow-hidden mb-6`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-black mb-2">{data.name}</h1>
        <p className="text-lg font-medium opacity-90">{data.section}</p>
        
        {/* Mã lớp chỉ hiện cho giáo viên hoặc người trong lớp */}
        <div className="mt-4 flex items-center gap-2">
            <span className="text-xs uppercase font-bold bg-black/20 px-2 py-1 rounded">Mã lớp:</span>
            <span className="font-mono font-bold text-lg tracking-wider">{data.code}</span>
            {isTeacher && (
                <button 
                    className="p-1 hover:bg-white/20 rounded transition"
                    title="Sao chép"
                    onClick={() => navigator.clipboard.writeText(data.code)}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;