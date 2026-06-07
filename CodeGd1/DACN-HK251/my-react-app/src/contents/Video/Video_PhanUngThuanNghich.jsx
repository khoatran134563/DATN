import React from 'react';

const Video_PhanUngThuanNghich = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Phản ứng thuận nghịch</h1>
        <p className="text-gray-500 mt-2">Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* KHUNG VIDEO CHÍNH (Tỉ lệ 16:9 chuẩn YouTube) */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/vABsNUzd0Rw" 
          title="Thí nghiệm cân bằng NO2 và N2O4" 
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
               Video thực hiện thí nghiệm về sự chuyển dịch cân bằng của khí Nitrogen dioxide (NO<sub>2</sub>) dưới tác động của nhiệt độ. Bạn sẽ quan sát được:
             </p>
             <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <li>
                 <strong>Màu sắc đặc trưng:</strong> Khí NO<sub>2</sub> có màu nâu đỏ, còn khí N<sub>2</sub>O<sub>4</sub> không màu.
               </li>
               <li>
                 {/* Đã sửa lỗi mũi tên ở đây */}
                 <strong>Khi ngâm vào nước đá (Lạnh):</strong> Màu nâu đỏ nhạt dần &rarr; Cân bằng chuyển dịch theo chiều tạo ra N<sub>2</sub>O<sub>4</sub> (chiều thuận).
               </li>
               <li>
                 {/* Đã sửa lỗi mũi tên ở đây */}
                 <strong>Khi ngâm vào nước nóng:</strong> Màu nâu đỏ đậm lên &rarr; Cân bằng chuyển dịch theo chiều tạo ra NO<sub>2</sub> (chiều nghịch).
               </li>
             </ul>
             {/* Đã sửa lỗi mũi tên ở đây */}
             <p className="mt-4 text-sm italic">
               &rarr; Điều này chứng minh phản ứng xảy ra theo hai chiều trái ngược nhau (Thuận nghịch).
             </p>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
           <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
             📝 Lưu ý quan trọng
           </h4>
           <p className="text-sm text-yellow-700 leading-relaxed">
             Hãy chú ý sự thay đổi <strong>độ đậm nhạt</strong> của màu nâu đỏ trong ống nghiệm. 
             <br/><br/>
             Khi màu sắc không đổi nữa, hệ đã đạt <strong>trạng thái cân bằng</strong> (tốc độ thuận = tốc độ nghịch).
           </p>
           <button className="mt-4 w-full py-2 bg-yellow-200 text-yellow-800 rounded font-semibold text-sm hover:bg-yellow-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_PhanUngThuanNghich;