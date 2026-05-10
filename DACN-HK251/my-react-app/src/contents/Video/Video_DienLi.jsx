import React from 'react';

const Video_DienLi = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">Chất điện li mạnh, chất điện li yếu</h1>
        <p className="text-gray-500 mt-2">Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* KHUNG VIDEO CHÍNH */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed/kpwarr1srBA" 
          title="Thí nghiệm so sánh tính dẫn điện HCl và CH3COOH" 
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
               Video so sánh khả năng dẫn điện của hai dung dịch axit có cùng nồng độ: <strong>HCl</strong> (Acid mạnh) và <strong>CH<sub>3</sub>COOH</strong> (Acid yếu).
             </p>
             
             <ul className="list-disc list-inside space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <li>
                 <div className="mb-2"><strong>Cốc 1: Dung dịch HCl</strong></div>
                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Hiện tượng</span> Đèn sáng <strong className="text-green-600">rất mạnh</strong>.
                 <p className="text-sm mt-1 ml-4 italic">
                    &rarr; HCl là chất điện li mạnh, phân li hoàn toàn ra rất nhiều ion.<br/>
                    <code>HCl &rarr; H<sup>+</sup> + Cl<sup>-</sup></code>
                 </p>
               </li>
               
               <li className="border-t border-gray-200 pt-4">
                 <div className="mb-2"><strong>Cốc 2: Dung dịch CH<sub>3</sub>COOH</strong></div>
                 <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Hiện tượng</span> Đèn sáng <strong className="text-yellow-600">mờ (yếu)</strong>.
                 <p className="text-sm mt-1 ml-4 italic">
                    &rarr; CH<sub>3</sub>COOH là chất điện li yếu, chỉ phân li một phần nhỏ ra ion.<br/>
                    <code>CH<sub>3</sub>COOH ⇌ CH<sub>3</sub>COO<sup>-</sup> + H<sup>+</sup></code>
                 </p>
               </li>
             </ul>
           </div>
        </div>

        {/* Cột phụ (Ghi chú) */}
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 h-fit">
           <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
             💡 Kết luận
           </h4>
           <p className="text-sm text-blue-700 leading-relaxed">
             Độ sáng của bóng đèn tỉ lệ thuận với <strong>nồng độ ion</strong> trong dung dịch.
             <br/><br/>
             - Càng nhiều ion &rarr; Dẫn điện càng tốt &rarr; Đèn càng sáng.
             <br/>
             - Ít ion &rarr; Dẫn điện kém &rarr; Đèn sáng mờ.
           </p>
           <button className="mt-4 w-full py-2 bg-blue-200 text-blue-800 rounded font-semibold text-sm hover:bg-blue-300 transition">
             Thêm vào ghi chú
           </button>
        </div>
      </div>

    </div>
  );
};

export default Video_DienLi;