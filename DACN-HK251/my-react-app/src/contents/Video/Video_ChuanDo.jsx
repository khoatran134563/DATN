import React from 'react';

const Video_ChuanDo = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Chuẩn độ acid - base</h1>
        <p className="text-gray-500 mt-2">Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/34fd06rhrRo" 
          title="Thí nghiệm Chuẩn độ Acid - Base" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Phần tóm tắt nội dung video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Cột chính */}
        <div className="md:col-span-2">
           <h3 className="text-xl font-bold text-blue-900 mb-4">Quy trình thí nghiệm</h3>
           <div className="prose text-gray-600">
             <p className="mb-4">
               Video hướng dẫn kỹ thuật chuẩn độ để xác định nồng độ dung dịch NaOH (Base) bằng dung dịch chuẩn HCl (Acid).
             </p>
             
             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <p className="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">Hóa chất & Dụng cụ:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Burette:</strong> Chứa dung dịch chuẩn HCl.</li>
                    <li><strong>Bình tam giác (Erlenmeyer):</strong> Chứa dung dịch NaOH cần xác định nồng độ.</li>
                    <li><strong>Chất chỉ thị:</strong> Phenolphthalein.</li>
                </ul>
             </div>

             <ul className="list-decimal list-inside space-y-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
               <li>
                 Cho NaOH vào bình tam giác, thêm vài giọt Phenolphthalein &rarr; Dung dịch có màu <span className="text-pink-600 font-bold">Hồng</span>.
               </li>
               <li>
                 Mở khóa Burette, nhỏ từ từ từng giọt HCl xuống bình tam giác, vừa nhỏ vừa lắc đều.
               </li>
               <li>
                 <strong>Phản ứng xảy ra:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">HCl + NaOH &rarr; NaCl + H<sub>2</sub>O</span>
               </li>
               <li>
                 Khi dung dịch chuyển từ màu hồng sang <span className="text-gray-500 font-bold">không màu</span> (hoặc hồng rất nhạt) thì dừng lại. Đây là điểm tương đương.
               </li>
             </ul>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-red-50 p-5 rounded-xl border border-red-100 h-fit">
           <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
             ⚡ Lưu ý kỹ thuật
           </h4>
           <div className="text-sm text-red-700 space-y-3 leading-relaxed">
             <p>
                <strong>Tay thao tác:</strong> Tay trái vòng qua khóa Burette để điều chỉnh giọt, tay phải cầm cổ bình tam giác để lắc.
             </p>
             <p>
                <strong>Điểm dừng chuẩn độ:</strong> Phải dừng ngay khi màu sắc vừa thay đổi bền vững (khoảng 30 giây không đổi lại màu cũ).
             </p>
           </div>
           <button className="mt-4 w-full py-2 bg-red-200 text-red-800 rounded font-semibold text-sm hover:bg-red-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_ChuanDo;