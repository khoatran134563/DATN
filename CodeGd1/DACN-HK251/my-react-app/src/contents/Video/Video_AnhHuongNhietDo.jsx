import React from 'react';

const Video_AnhHuongNhietDo = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Ảnh hưởng của nhiệt độ đến cân bằng</h1>
        <p className="text-gray-500 mt-2">Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/6ihArvsCamA" 
          title="Thí nghiệm ảnh hưởng nhiệt độ đến cân bằng NO2" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Phần tóm tắt nội dung video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Cột chính */}
        <div className="md:col-span-2">
           <h3 className="text-xl font-bold text-blue-900 mb-4">Nội dung chính trong video</h3>
           <div className="prose text-gray-600">
             <p className="mb-4">
               Video so sánh trực tiếp sự chuyển dịch cân bằng của 3 ống nghiệm chứa khí NO<sub>2</sub> (màu nâu đỏ) ở 3 điều kiện nhiệt độ khác nhau:
             </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <li>
                 <strong>Ống ở giữa (Nhiệt độ thường):</strong> Dùng làm mốc so sánh màu.
               </li>
               <li>
                 <strong>Ống ngâm nước đá (Lạnh):</strong> Màu nâu đỏ <strong>nhạt dần</strong> &rarr; Cân bằng chuyển dịch theo chiều tỏa nhiệt (chiều thuận tạo N<sub>2</sub>O<sub>4</sub> không màu).
               </li>
               <li>
                 <strong>Ống ngâm nước nóng (Sôi):</strong> Màu nâu đỏ <strong>đậm lên</strong> rõ rệt &rarr; Cân bằng chuyển dịch theo chiều thu nhiệt (chiều nghịch tạo thêm NO<sub>2</sub>).
               </li>
             </ul>
             <p className="mt-4 text-sm italic">
               &rarr; Kết luận: Khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều thu nhiệt. Khi giảm nhiệt độ, cân bằng chuyển dịch theo chiều tỏa nhiệt.
             </p>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
           <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
             📝 Mẹo ghi nhớ
           </h4>
           <p className="text-sm text-yellow-700 leading-relaxed">
             Hãy nhớ câu thần chú: <strong>"Tăng thu - Giảm tỏa"</strong>.
             <br/><br/>
             - Nóng lên (Tăng) &rarr; Thu nhiệt (Đậm màu).
             <br/>
             - Lạnh đi (Giảm) &rarr; Tỏa nhiệt (Nhạt màu).
           </p>
           <button className="mt-4 w-full py-2 bg-yellow-200 text-yellow-800 rounded font-semibold text-sm hover:bg-yellow-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_AnhHuongNhietDo;