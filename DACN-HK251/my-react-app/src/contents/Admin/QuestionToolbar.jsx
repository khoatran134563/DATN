import React from 'react';

const QuestionToolbar = ({ 
  searchTerm, setSearchTerm, 
  filterChapter, setFilterChapter, 
  filterLevel, setFilterLevel, 
  onAdd,
  totalCount,      // <--- Nhận props
  filteredCount    // <--- Nhận props
}) => {
  return (
    <div className="mb-6 px-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Title & Counter */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
            Ngân hàng câu hỏi
          </h2>
          {/* HIỂN THỊ SỐ LƯỢNG KẾT QUẢ Ở ĐÂY */}
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            Hiển thị 
            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {filteredCount}
            </span> 
            / {totalCount} câu hỏi
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
          >
            <option value="All">Tất cả chương</option>
            <option value="Chương 1">Chương 1</option>
          </select>

          <select
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="All">Tất cả mức độ</option>
            <option value="NB - TH">NB - TH</option>
            <option value="VD - VDC">VD - VDC</option>
          </select>

          <button
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 whitespace-nowrap shrink-0 ml-auto lg:ml-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionToolbar;