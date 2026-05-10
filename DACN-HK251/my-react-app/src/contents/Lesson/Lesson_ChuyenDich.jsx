import React from 'react';

const Lesson_ChuyenDich = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Sự chuyển dịch cân bằng hóa học</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* --- Phần 1: Thí nghiệm nghiên cứu (SGK) --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Thí nghiệm nghiên cứu ảnh hưởng của nhiệt độ</h2>
        <p className="text-gray-600 mb-4 italic">Quan sát các thí nghiệm sau để rút ra khái niệm về sự chuyển dịch cân bằng.</p>

        {/* Thí nghiệm 1: NO2 và N2O4 */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-purple-900 mb-2 border-b border-gray-100 pb-2">
                🧪 Thí nghiệm 1: Cân bằng của khí NO<sub>2</sub> và N<sub>2</sub>O<sub>4</sub>
            </h3>
            
            {/* Phương trình phản ứng */}
            <div className="bg-purple-50 p-3 rounded-lg text-center my-3 font-mono text-lg">
                2NO<sub>2</sub>(g) <span className="mx-2 font-bold text-xl">⇌</span> N<sub>2</sub>O<sub>4</sub>(g)
                <div className="flex justify-center gap-8 text-sm mt-1">
                    <span className="text-red-700 font-semibold">(nâu đỏ)</span>
                    <span className="text-gray-500 font-semibold">(không màu)</span>
                </div>
            </div>

            <div className="space-y-2 text-gray-700">
                <p><strong>Cách tiến hành:</strong> Chuẩn bị 3 bình khí NO<sub>2</sub> giống nhau.</p>
                <ul className="list-disc list-inside ml-2 bg-gray-50 p-3 rounded">
                    <li><strong>Bình 1:</strong> Để ở nhiệt độ thường (đối chứng).</li>
                    <li><strong>Bình 2:</strong> Ngâm vào cốc <span className="text-blue-600 font-bold">nước đá</span> → Màu nhạt dần (chuyển dịch theo chiều thuận).</li>
                    <li><strong>Bình 3:</strong> Ngâm vào cốc <span className="text-red-600 font-bold">nước nóng</span> → Màu đậm lên (chuyển dịch theo chiều nghịch).</li>
                </ul>
            </div>
        </div>

        {/* Thí nghiệm 2: Thủy phân Sodium acetate */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-pink-900 mb-2 border-b border-gray-100 pb-2">
                🧪 Thí nghiệm 2: Phản ứng thủy phân Sodium acetate
            </h3>
            
            {/* Phương trình phản ứng */}
            <div className="bg-pink-50 p-3 rounded-lg text-center my-3 font-mono text-sm md:text-base">
                CH<sub>3</sub>COONa(aq) + H<sub>2</sub>O(l) <span className="mx-2 font-bold text-xl">⇌</span> CH<sub>3</sub>COOH(aq) + NaOH(aq)
            </div>

            <div className="space-y-2 text-gray-700">
                <p><strong>Hiện tượng:</strong> Dung dịch có thêm vài giọt <em>phenolphthalein</em> (chất chỉ thị màu).</p>
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <div className="flex-1 bg-gray-50 p-3 rounded border border-gray-200">
                        <span className="font-bold block mb-1">Bình thường:</span>
                        Dung dịch có màu hồng nhạt (do tạo ra NaOH có môi trường kiềm).
                    </div>
                    <div className="flex-1 bg-red-50 p-3 rounded border border-red-100">
                        <span className="font-bold text-red-700 block mb-1">Khi đun nóng:</span>
                        Dung dịch chuyển sang <span className="font-bold text-pink-600">màu hồng đậm hơn</span>.
                        <p className="text-sm text-gray-500 mt-1">→ Cân bằng chuyển dịch theo chiều thuận (tạo thêm NaOH).</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* --- Phần 2: Định nghĩa (Chốt lại vấn đề) --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Khái niệm sự chuyển dịch cân bằng</h2>
        
        {/* Box Định nghĩa (Màu vàng giống sách) */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🔄</div>
            <div>
                <h3 className="font-bold text-yellow-900 text-lg uppercase mb-1">Định nghĩa</h3>
                <p className="text-gray-800 text-lg font-medium leading-relaxed">
                    Sự chuyển dịch cân bằng hóa học là sự dịch chuyển từ <span className="text-blue-700 bg-blue-50 px-1 rounded">trạng thái cân bằng này</span> sang <span className="text-green-700 bg-green-50 px-1 rounded">trạng thái cân bằng khác</span> do tác động của các yếu tố bên ngoài.
                </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-600">
            Các yếu tố bên ngoài thường làm chuyển dịch cân bằng bao gồm: 
            <span className="font-bold text-gray-800"> Nồng độ, Nhiệt độ, Áp suất</span>. (Sẽ tìm hiểu kỹ ở bài sau).
        </p>
      </section>

      {/* Video minh họa (Tái sử dụng video NO2 vì nó là thí nghiệm 1) */}
      <section className="mt-8">
         <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Xem lại thí nghiệm 1:
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/vABsNUzd0Rw" 
                    title="Thí nghiệm NO2" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                ></iframe>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Lesson_ChuyenDich;