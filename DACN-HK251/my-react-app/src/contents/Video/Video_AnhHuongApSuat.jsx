import React from 'react';

const Video_AnhHuongApSuat = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Ảnh hưởng của áp suất đến cân bằng</h1>
        <p className="text-gray-500 mt-2">Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/c69qnA0Bpqo" 
          title="Thí nghiệm ảnh hưởng áp suất đến cân bằng NO2" 
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
             
             {/* Giai đoạn 1: Điều chế */}
             <div className="mb-4 bg-orange-50 p-3 rounded border border-orange-200">
                <p className="font-bold text-orange-800 mb-1">1. Điều chế khí NO<sub>2</sub>:</p>
                <p className="text-sm mb-2">Cho đồng (Cu) tác dụng với Acid Nitric đặc (HNO<sub>3</sub>).</p>
                <div className="text-center font-mono text-xs md:text-sm font-bold text-gray-800 bg-white p-2 rounded">
                    Cu + 4HNO<sub>3</sub> &rarr; Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO<sub>2</sub>&uarr; + 2H<sub>2</sub>O
                </div>
             </div>

             {/* Giai đoạn 2: Thí nghiệm áp suất */}
             <p className="mb-2 font-bold text-blue-900">2. Khảo sát ảnh hưởng của áp suất:</p>
             <ul className="list-disc list-inside space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <li>
                 <strong>Hệ cân bằng:</strong> <br/>
                 <span className="font-mono ml-4 font-bold">2NO<sub>2</sub>(g) <span className="text-red-500">(Nâu đỏ)</span> ⇌ N<sub>2</sub>O<sub>4</sub>(g) <span className="text-gray-400">(Không màu)</span></span>
               </li>
               <li>
                 <strong>Thao tác:</strong> Nén nhanh pit-tông của xilanh (Tăng áp suất).
               </li>
               <li>
                 <strong>Hiện tượng:</strong> Màu nâu đỏ <strong>đậm lên đột ngột</strong>.
                 <br/>
                 <span className="text-sm italic text-gray-500 ml-4">
                    (Lý do: Khi nén, thể tích giảm làm nồng độ khí tăng vọt &rarr; Màu đậm).
                 </span>
               </li>
               <li>
                 <strong>Kết quả cân bằng:</strong> Sau đó cân bằng chuyển dịch theo chiều thuận (tạo N<sub>2</sub>O<sub>4</sub>) để làm giảm số mol khí, chống lại sự tăng áp suất.
               </li>
             </ul>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
           <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
             📝 Quy tắc cần nhớ
           </h4>
           <p className="text-sm text-yellow-700 leading-relaxed">
             Khi <strong>tăng áp suất</strong>, cân bằng chuyển dịch theo chiều làm <strong>giảm số mol khí</strong>.
             <br/><br/>
             Ngược lại: Giảm áp suất &rarr; Chuyển dịch theo chiều tăng số mol khí.
           </p>
           
           <div className="mt-4 p-3 bg-white rounded border border-yellow-200 text-xs text-gray-600">
                <strong>Ví dụ trong bài:</strong><br/>
                Vế trái: 2 mol khí<br/>
                Vế phải: 1 mol khí<br/>
                &rarr; Tăng áp suất sẽ chạy sang phải (1 mol).
           </div>

           <button className="mt-4 w-full py-2 bg-yellow-200 text-yellow-800 rounded font-semibold text-sm hover:bg-yellow-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_AnhHuongApSuat;