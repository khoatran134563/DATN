import React from 'react';

const Video_AnhHuongNongDo = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Ảnh hưởng của nồng độ đến cân bằng</h1>
        <p className="text-gray-500 mt-2">Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/3SNUMFnaEMc" 
          title="Thí nghiệm ảnh hưởng nồng độ đến cân bằng Chromate" 
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
               Video thí nghiệm về sự chuyển dịch cân bằng giữa ion Chromate (CrO<sub>4</sub><sup>2-</sup>) và Dichromate (Cr<sub>2</sub>O<sub>7</sub><sup>2-</sup>):
             </p>
             
             <div className="bg-blue-50 p-3 rounded-lg text-center font-mono text-sm md:text-base mb-4 font-bold text-blue-900">
                2CrO<sub>4</sub><sup>2-</sup> (Vàng) + 2H<sup>+</sup> ⇌ Cr<sub>2</sub>O<sub>7</sub><sup>2-</sup> (Da cam) + H<sub>2</sub>O
             </div>

             <ul className="list-disc list-inside space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <li>
                 <strong>Ban đầu:</strong> Dung dịch K<sub>2</sub>CrO<sub>4</sub> có màu <span className="text-yellow-600 font-bold">Vàng</span> đặc trưng.
               </li>
               <li>
                 <strong>Thêm axit H<sub>2</sub>SO<sub>4</sub> (Tăng nồng độ H<sup>+</sup>):</strong> <br/>
                 Cân bằng chuyển dịch theo chiều thuận (làm giảm H<sup>+</sup>) &rarr; Dung dịch chuyển sang màu <span className="text-orange-600 font-bold">Da cam</span>.
               </li>
               <li>
                 <strong>Thêm kiềm NaOH (Giảm nồng độ H<sup>+</sup>):</strong> <br/>
                 OH<sup>-</sup> trung hòa H<sup>+</sup> làm giảm nồng độ H<sup>+</sup>. Cân bằng chuyển dịch theo chiều nghịch (tạo thêm H<sup>+</sup>) &rarr; Dung dịch quay lại màu <span className="text-yellow-600 font-bold">Vàng</span>.
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
             Khi <strong>tăng nồng độ</strong> một chất, cân bằng chuyển dịch theo chiều làm <strong>giảm nồng độ</strong> chất đó (và ngược lại).
             <br/><br/>
             Ví dụ trong video: 
             <br/>- Tăng H<sup>+</sup> &rarr; Chạy theo chiều làm mất H<sup>+</sup> (Chiều thuận).
           </p>
           <button className="mt-4 w-full py-2 bg-yellow-200 text-yellow-800 rounded font-semibold text-sm hover:bg-yellow-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_AnhHuongNongDo;