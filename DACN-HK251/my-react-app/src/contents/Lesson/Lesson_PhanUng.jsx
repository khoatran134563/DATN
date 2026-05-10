import React from 'react';

const Lesson_PhanUng = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Phản ứng một chiều, phản ứng thuận nghịch và cân bằng hóa học</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* --- Phần 1: Phản ứng một chiều --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Phản ứng một chiều</h2>
        
        {/* Box Định nghĩa */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
          <p><strong>Định nghĩa:</strong> Là phản ứng hóa học chỉ xảy ra theo một chiều từ chất tham gia tạo thành sản phẩm (trong điều kiện xác định).</p>
        </div>
        
        <p className="mb-2">Trong phương trình hóa học, ta dùng mũi tên một chiều (<span className="font-bold text-xl">→</span>) để chỉ chiều phản ứng.</p>
        
        {/* Ví dụ minh họa */}
        <div className="mt-4 bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="font-semibold text-gray-700">Ví dụ:</p>
          <p className="mt-1">Nhiệt phân thuốc tím (KMnO<sub>4</sub>):</p>
          
          {/* Phương trình hóa học 1 chiều có điều kiện nhiệt độ */}
          <div className="font-mono text-lg mt-2 font-medium text-blue-900 flex flex-wrap items-center gap-2">
            <span>2KMnO<sub>4</sub></span>
            <div className="flex flex-col items-center mx-1">
                <span className="text-xs text-red-500 mb-[-5px]">t°</span>
                <span className="text-red-500 font-bold text-xl">→</span>
            </div>
            <span>K<sub>2</sub>MnO<sub>4</sub> + MnO<sub>2</sub> + O<sub>2</sub>↑</span>
          </div>

          <p className="text-sm text-gray-500 mt-2 italic">
            (Dù đun nóng, các chất sản phẩm không thể tác dụng lại với nhau để tạo thành chất ban đầu).
          </p>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* --- Phần 2: Phản ứng thuận nghịch --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Phản ứng thuận nghịch</h2>
        
        {/* Box Định nghĩa */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
          <p><strong>Định nghĩa:</strong> Là phản ứng xảy ra theo hai chiều trái ngược nhau trong cùng điều kiện xác định.</p>
        </div>
        
        <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
          <li>Chiều từ trái sang phải là <strong>chiều thuận</strong>.</li>
          <li>Chiều từ phải sang trái là <strong>chiều nghịch</strong>.</li>
        </ul>
        <p className="mt-3">Phương trình hóa học dùng mũi tên hai chiều (<span className="font-bold text-xl">⇌</span>).</p>

        {/* Ví dụ minh họa */}
        <div className="mt-4 bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="font-semibold text-gray-700">Ví dụ:</p>
          <p className="mt-1">Phản ứng giữa Clorine và nước:</p>
          <p className="font-mono text-lg mt-2 font-medium text-green-900">
            Cl<sub>2</sub>(g) + H<sub>2</sub>O(l) <span className="text-green-600 font-bold text-xl mx-2">⇌</span> HCl(aq) + HClO(aq)
          </p>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* --- Phần 3: Cân bằng hóa học --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">III. Cân bằng hóa học</h2>
        
        {/* Box Định nghĩa */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-4">
          <p><strong>Trạng thái cân bằng:</strong> Là trạng thái của phản ứng thuận nghịch khi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch.</p>
          
          {/* Công thức vận tốc */}
          <p className="mt-3 text-center font-bold text-xl text-orange-700 bg-white py-2 rounded border border-orange-200 w-fit mx-auto px-6 shadow-sm">
            v<sub>thuận</sub> = v<sub>nghịch</sub>
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">Đặc điểm quan trọng:</p>
          <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
            <li>Là <strong>cân bằng động</strong> (các phản ứng thuận và nghịch vẫn tiếp tục xảy ra chứ không dừng lại).</li>
            <li>Nồng độ các chất (chất tham gia, sản phẩm) <strong>không đổi</strong> theo thời gian.</li>
          </ul>
        </div>

        {/* Ví dụ minh họa (CÓ SỬA ĐỔI THÊM ĐIỀU KIỆN) */}
        <div className="mt-4 bg-white p-4 rounded border border-gray-200 shadow-sm">
            <p className="font-semibold text-gray-700">Xét phản ứng tổng hợp Ammonia (SGK Hình 1.1):</p>
            
            {/* Phương trình thuận nghịch có điều kiện t, xt, p */}
            <div className="font-mono text-lg mt-2 font-medium text-purple-900 flex flex-wrap items-center justify-center gap-2">
                <span>N<sub>2</sub>(g) + 3H<sub>2</sub>(g)</span>
                
                <div className="flex flex-col items-center mx-1">
                    {/* Dòng điều kiện nhỏ xíu trên mũi tên */}
                    <span className="text-xs text-purple-600 mb-[-5px]">t°, xt, p</span>
                    {/* Mũi tên thuận nghịch */}
                    <span className="text-purple-600 font-bold text-xl">⇌</span>
                </div>

                <span>2NH<sub>3</sub>(g)</span>
            </div>

            <p className="text-sm text-gray-500 italic border-t pt-2 mt-2 text-center">
                * Tại thời điểm cân bằng, nồng độ của N<sub>2</sub>, H<sub>2</sub> và NH<sub>3</sub> giữ nguyên không đổi.
            </p>
        </div>
      </section>
      
      
      <hr className="my-6 border-gray-200" />

      {/* Video minh họa */}
      {/* Video minh họa */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-blue-800 mb-3">IV. Video minh họa thí nghiệm</h2>
        <div className="w-full h-[400px] md:h-[500px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-3xl">
           <iframe 
             width="100%" 
             height="100%" 
             src="https://www.youtube.com/embed/vABsNUzd0Rw" 
             // Dòng title này là để "ngầm" hiểu, không hiện ra ngoài
             title="Thí nghiệm cân bằng hóa học NO2 và N2O4" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
             allowFullScreen
           ></iframe>
        </div>
        
        {/* ĐÂY MỚI LÀ DÒNG CHÚ THÍCH HIỆN RA NGOÀI NÈ BRO */}
        <p className="text-center text-gray-500 mt-2 text-sm italic">
            Thí nghiệm: Ảnh hưởng của nhiệt độ đến cân bằng của khí NO<sub>2</sub> (nâu đỏ) và N<sub>2</sub>O<sub>4</sub> (không màu).
        </p>
      </section>
    </div>
  );
};

export default Lesson_PhanUng;