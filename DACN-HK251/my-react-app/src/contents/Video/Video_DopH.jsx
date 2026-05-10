import React from 'react';

const Video_DopH = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      
      {/* Header bài học */}
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-3 text-purple-600 mb-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <span className="font-bold uppercase tracking-wider text-sm">Video Bài Giảng</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Đo độ pH bằng chất chỉ thị Acid - Base</h1>
        <p className="text-gray-500 mt-2">Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/Ht0wbsmT3Ns" 
          title="Thí nghiệm Đo pH bằng Quỳ tím và Phenolphthalein" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Phần tóm tắt nội dung video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Cột chính */}
        <div className="md:col-span-2">
           <h3 className="text-xl font-bold text-blue-900 mb-4">Kết quả thí nghiệm</h3>
           <div className="prose text-gray-600">
             <p className="mb-4">
               Video tiến hành kiểm tra tính Acid/Base của 5 dung dịch: <strong>HCl, CH<sub>3</sub>COOH, H<sub>2</sub>O, NH<sub>3</sub>, NaOH</strong> bằng hai chất chỉ thị màu.
             </p>
             
             {/* Phần 1: Quỳ tím */}
             <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                <h4 className="font-bold text-purple-800 mb-2 border-b border-purple-200 pb-1">1. Với giấy Quỳ tím:</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <span className="font-semibold">Hóa Đỏ:</span> Các dung dịch Acid (HCl, CH<sub>3</sub>COOH).
                    </li>
                    <li>
                        <span className="font-semibold">Hóa Xanh:</span> Các dung dịch Base (NaOH, NH<sub>3</sub>).
                    </li>
                    <li>
                        <span className="font-semibold">Không đổi màu:</span> Nước cất (H<sub>2</sub>O - môi trường trung tính).
                    </li>
                </ul>
             </div>

             {/* Phần 2: Phenolphthalein */}
             <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-bold text-pink-800 mb-2 border-b border-pink-200 pb-1">2. Với dung dịch Phenolphthalein:</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <span className="font-semibold text-pink-600">Hóa Hồng:</span> Chỉ các dung dịch Base (NaOH, NH<sub>3</sub>).
                    </li>
                    <li>
                        <span className="font-semibold text-gray-500">Không màu:</span> Các dung dịch Acid và Trung tính (HCl, CH<sub>3</sub>COOH, H<sub>2</sub>O).
                    </li>
                </ul>
             </div>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 h-fit">
           <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
             💡 Nhận xét quan trọng
           </h4>
           <div className="text-sm text-blue-700 space-y-3">
             <p>
                <strong>Quỳ tím:</strong> Phân biệt được cả 3 môi trường (Acid, Base và Trung tính).
             </p>
             <p>
                <strong>Phenolphthalein:</strong> Chỉ dùng để nhận biết môi trường <strong>Base (Kiềm)</strong>. Nó không đổi màu trong môi trường Acid.
             </p>
           </div>
           <button className="mt-4 w-full py-2 bg-blue-200 text-blue-800 rounded font-semibold text-sm hover:bg-blue-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_DopH;