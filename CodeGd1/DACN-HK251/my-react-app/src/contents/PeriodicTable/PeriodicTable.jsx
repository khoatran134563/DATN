import React, { useState, useEffect } from 'react';
import { categoryColors } from './PeriodicData'; // Chỉ import màu sắc

import { API_BASE } from '../../config/api';
const PeriodicTable = () => {
  // State lưu danh sách nguyên tố từ API
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- GỌI API LẤY DỮ LIỆU ---
  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/elements`);
        const data = await response.json();
        setElements(data);
        if (data.length > 0) setSelectedElement(data[0]); // Mặc định chọn Hydrogen
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải bảng tuần hoàn:", error);
        setLoading(false);
      }
    };
    fetchElements();
  }, []);

  const getGridColumn = (el) => el.group;

  const categories = [
    { key: 'nonmetal', label: 'Phi kim' },
    { key: 'noble-gas', label: 'Khí hiếm' },
    { key: 'alkali-metal', label: 'Kim loại kiềm' },
    { key: 'alkaline-earth', label: 'Kiềm thổ' },
    { key: 'metalloid', label: 'Á kim' },
    { key: 'halogen', label: 'Halogen' },
    { key: 'transition', label: 'Kim loại chuyển tiếp' },
    { key: 'post-transition', label: 'Kim loại yếu' },
    { key: 'lanthanide', label: 'Lantan' },
    { key: 'actinide', label: 'Actini' },
    { key: 'unknown', label: 'Đặc tính không xác định' },
  ];

  const isMatch = (el) => {
    if (!searchTerm) return true;
    const lowerTerm = searchTerm.toLowerCase();
    return (
      el.name.toLowerCase().includes(lowerTerm) ||
      el.symbol.toLowerCase().includes(lowerTerm) ||
      el.number.toString().includes(lowerTerm)
    );
  };

  const matchedElements = elements.filter(isMatch);
  const isSingleResult = matchedElements.length === 1;
  const singleResultNumber = isSingleResult ? matchedElements[0].number : null;

  if (loading) return <div className="h-full flex items-center justify-center text-blue-600 font-bold animate-pulse">⏳ Đang tải dữ liệu hóa học...</div>;

  return (
    <div className="relative h-full flex flex-col animate-fade-in overflow-hidden bg-gray-50">
      <style>{`
        @keyframes spinCard {
          0%   { transform: scale(0.1) rotateY(0deg);   opacity: 0; }
          60%  { transform: scale(1.1) rotateY(190deg); opacity: 1; }
          100% { transform: scale(1)   rotateY(360deg); opacity: 1; }
        }
        @keyframes floatCard {
          0%   { transform: translate(-50%, -56%); }
          50%  { transform: translate(-50%, -62%); }
          100% { transform: translate(-50%, -56%); }
        }
        @keyframes hologramSweep {
          0%   { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
          10%  { opacity: 0.9; }
          50%  { transform: translateX(0%)     skewX(-18deg); opacity: 1; }
          90%  { opacity: 0.9; }
          100% { transform: translateX(160%)  skewX(-18deg); opacity: 0; }
        }
        .golden-texture {
          background-image: linear-gradient(to bottom right, #b38728, #fbf5b7, #bf953f, #fcf6ba, #aa771c);
          text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
        }
        .golden-card-float {
          transform: translate(-50%, -56%);
          animation: floatCard 3s ease-in-out 0.8s infinite;
          transform-style: preserve-3d;
        }
        .hologram-glow { position: relative; overflow: hidden; }
        .hologram-glow::before {
          content: ''; position: absolute; top: -60%; left: -160%; width: 120%; height: 220%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%);
          mix-blend-mode: screen; filter: blur(2px); pointer-events: none;
          animation: hologramSweep 1.8s linear 0.4s infinite;
        }
      `}</style>

      {/* Header */}
      <div className="mb-2 pb-3 px-4 pt-3 bg-white rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Bảng Tuần Hoàn Hóa Học</h1>
          <p className="text-xs text-gray-500 mt-0.5">Dữ liệu 118 nguyên tố chuẩn quốc tế</p>
        </div>
        <div className="flex items-center gap-3 pr-2">
          <img src="/mendeleev.webp" alt="Mendeleev" className="w-28 h-auto rounded-lg shadow-md border" />
          <div className="text-sm text-gray-700 leading-tight">
            <p className="font-bold text-gray-900">Dmitri Mendeleev</p>
            <p>(1834 — 1907)</p>
            <p className="text-xs italic text-gray-500">Cha đẻ của Bảng tuần hoàn</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-2 h-full overflow-hidden p-1 relative">
        
        {/* --- GRID TABLE --- */}
        <div className="flex-1 flex flex-col min-w-0 relative z-0">
          <div className="grid gap-px w-full h-full max-h-[80vh]" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: 'repeat(10, 1fr)' }}>
            
            {/* Search Bar */}
            <div style={{ gridColumn: '3 / 13', gridRow: '2 / 3' }} className="flex items-center justify-center px-6 z-10 ml-2">
              <div className={`relative group w-full shadow-md rounded-full transition-all duration-300 ${isSingleResult ? 'scale-105' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className={`h-4 w-4 transition-colors ${isSingleResult ? 'text-yellow-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input
                  type="text"
                  className={`block w-full pl-6 pr-4 py-2 border rounded-full text-sm leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-400 focus:outline-none transition-all ${isSingleResult ? 'border-yellow-500 ring-2 ring-yellow-300 text-yellow-900 font-bold shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                  placeholder="Tìm kiếm (VD: Gold, Ag, 79)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Render Elements */}
            {elements.map((el) => {
              const matched = isMatch(el);
              const isTheOne = isSingleResult && el.number === singleResultNumber;
              const normalClasses = `relative rounded-lg cursor-pointer border-[0.5px] transition-all duration-300 flex flex-col items-center justify-center h-full w-full select-none overflow-hidden p-[1px] ${categoryColors[el.category] || 'bg-gray-200 text-gray-900'} ${selectedElement?.number === el.number ? 'ring-2 ring-blue-600 z-20 scale-110 shadow-lg' : 'hover:z-10 hover:scale-110'} ${matched ? 'opacity-100' : 'opacity-5 grayscale'}`;
              
              if (isTheOne) {
                return (
                  <div key={el.number} className="absolute top-[35%] left-1/2 z-[100] w-[20%] aspect-[3/4] golden-card-float">
                    <div className="w-full h-full rounded-xl border-[4px] border-[#fcf6ba] golden-texture hologram-glow text-[#5c4d1f] shadow-[0_0_40px_10px_rgba(250,204,21,0.8)] flex flex-col items-center justify-between p-3 cursor-pointer select-none animate-[spinCard_0.8s_ease-out_forwards]" onClick={() => setSelectedElement(el)}>
                      <div className="w-full h-full flex flex-col justify-between text-center relative z-10">
                        <div className="flex justify-between w-full items-center px-1 opacity-90"><span className="text-lg lg:text-xl font-extrabold">{el.number}</span><span className="text-xs font-bold">{el.mass}</span></div>
                        <div className="flex-1 flex items-center justify-center"><span className="text-6xl lg:text-7xl font-black leading-none drop-shadow-md">{el.symbol}</span></div>
                        <div className="w-full pb-1"><span className="text-sm lg:text-base font-bold uppercase tracking-wider leading-tight block w-full truncate">{el.name}</span></div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={el.number} onClick={() => setSelectedElement(el)} className={normalClasses} style={{ gridColumn: getGridColumn(el), gridRow: el.period }}>
                  <span className="absolute top-[1px] left-[2px] text-[8px] font-bold opacity-70 leading-none">{el.number}</span>
                  <span className="text-xs sm:text-sm md:text-base font-extrabold leading-none mt-1">{el.symbol}</span>
                  <span className="text-[6px] sm:text-[7px] font-medium leading-none opacity-90 truncate max-w-full px-0.5 pb-0.5">{el.name}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className={`mt-2 p-2 bg-white rounded-lg border border-gray-200 shadow-sm transition-opacity duration-300 ${isSingleResult ? 'opacity-20' : 'opacity-100'}`}>
            <div className="grid grid-cols-5 gap-1 text-[9px]">
              {categories.map((cat) => (
                <div key={cat.key} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-sm border ${categoryColors[cat.key]}`}></div>
                  <span className="text-gray-600 font-medium truncate">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- INFO PANEL --- */}
        <div className={`w-full lg:w-72 bg-white shadow-xl border-l border-gray-200 h-full overflow-y-auto z-30 p-4 custom-scrollbar rounded-2xl flex-shrink-0 transition-all duration-500 ${isSingleResult ? 'blur-sm grayscale opacity-50 pointer-events-none' : ''}`}>
          {selectedElement ? (
            <div className="flex flex-col items-center animate-fade-in">
              <div className={`w-24 h-24 flex flex-col justify-center items-center rounded-xl border-4 shadow-md mb-3 ${categoryColors[selectedElement.category]}`}>
                <span className="text-base font-bold opacity-80">{selectedElement.number}</span>
                <span className="text-4xl font-extrabold">{selectedElement.symbol}</span>
                <span className="text-[10px] font-medium mt-1">{selectedElement.mass}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedElement.name}</h2>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[9px] font-bold uppercase tracking-wide mb-4 border border-gray-200">
                {categories.find(c => c.key === selectedElement.category)?.label || selectedElement.category}
              </span>

              <div className="w-full space-y-3">
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 text-center">
                  <p className="text-[9px] text-blue-600 font-bold uppercase mb-1">Cấu hình Electron</p>
                  <p className="font-mono text-sm font-bold text-blue-900 tracking-wide">{selectedElement.config}</p>
                </div>

                <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-gray-800 font-bold text-[10px] uppercase mb-2 border-b pb-1">Thông số vật lý</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[10px]">
                    <div><p className="text-gray-500">Nguyên tử khối</p><p className="font-semibold">{selectedElement.mass}</p></div>
                    <div><p className="text-gray-500">Độ âm điện</p><p className="font-semibold">{selectedElement.electronegativity || "-"}</p></div>
                    <div><p className="text-gray-500">Nóng chảy</p><p className="font-semibold">{selectedElement.melt || "-"}</p></div>
                    <div><p className="text-gray-500">Sôi</p><p className="font-semibold">{selectedElement.boil || "-"}</p></div>
                    <div className="col-span-2"><p className="text-gray-500">Số Oxi hóa</p><p className="font-semibold text-blue-700">{selectedElement.oxidation || "-"}</p></div>
                  </div>
                </div>

                <div className="bg-orange-50 p-2 rounded-lg border border-orange-100">
                  <h3 className="text-orange-800 font-bold text-[10px] uppercase mb-2 border-b border-orange-200 pb-1 flex items-center gap-1"><span>📜</span> Lịch sử khám phá</h3>
                  <div className="text-[10px] space-y-1">
                    <div><span className="text-gray-500">Năm phát hiện:</span> <span className="font-bold text-gray-900">{selectedElement.discover ? selectedElement.discover.split('(')[0].trim() : "?"}</span></div>
                    <div><span className="text-gray-500">Người phát hiện:</span> <span className="font-bold text-gray-900">{selectedElement.discover && selectedElement.discover.includes('(') ? selectedElement.discover.match(/\(([^)]+)\)/)[1] : "Thời cổ đại"}</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <h3 className="text-gray-700 font-bold text-[10px] uppercase mb-1 border-b border-gray-300 pb-1">Giới thiệu</h3>
                  <p className="text-[10px] text-gray-700 italic leading-relaxed text-justify">"{selectedElement.summary}"</p>
                </div>

                <a href={`https://vi.wikipedia.org/wiki/${selectedElement.name}`} target="_blank" rel="noreferrer" className="block w-full py-2 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm">Xem Wikipedia →</a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm"><p>Chọn nguyên tố để xem</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;