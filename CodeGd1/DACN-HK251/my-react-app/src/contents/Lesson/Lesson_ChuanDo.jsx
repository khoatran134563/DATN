import React from 'react';

const Lesson_ChuanDo = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Chuẩn độ Acid - Base</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* --- Phần 1: Nguyên tắc chuẩn độ --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Nguyên tắc chuẩn độ</h2>
        
        {/* Box Định nghĩa */}
        <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400 shadow-sm mb-4">
            <h3 className="font-bold text-yellow-900 text-lg mb-2">Định nghĩa:</h3>
            <p className="text-gray-800 leading-relaxed">
                <strong>Chuẩn độ acid - base</strong> là phương pháp được sử dụng để xác định nồng độ của một dung dịch acid (hoặc base) bằng một dung dịch base (hoặc acid) đã biết chính xác nồng độ (gọi là <em>dung dịch chuẩn</em>).
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-gray-200">
                <p className="font-bold text-purple-700 mb-1">🎯 Điểm tương đương:</p>
                <p className="text-sm text-gray-600">Là thời điểm mà hai chất phản ứng vừa đủ với nhau.</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
                <p className="font-bold text-pink-600 mb-1">🎨 Chất chỉ thị:</p>
                <p className="text-sm text-gray-600">Dùng để nhận biết điểm tương đương thông qua sự đổi màu (VD: Phenolphthalein).</p>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 2: Thực hành thí nghiệm --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Thực hành chuẩn độ</h2>
        <p className="mb-4 text-gray-700 italic">
            <strong>Bài toán:</strong> Chuẩn độ dung dịch NaOH (chưa biết nồng độ) bằng dung dịch chuẩn HCl 0,1 M.
        </p>

        {/* Dụng cụ và Hóa chất */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm">
            <ul className="list-disc list-inside space-y-1">
                <li><strong>Dụng cụ:</strong> Burette 25 mL, Pipette 10 mL, bình tam giác 100 mL, giá đỡ.</li>
                <li><strong>Hóa chất:</strong> Dung dịch HCl 0,10 M (chuẩn), dung dịch NaOH cần xác định, phenolphthalein.</li>
            </ul>
        </div>

        {/* Các bước tiến hành (Timeline vertical) */}
        <div className="space-y-4 relative border-l-2 border-blue-200 ml-4 pl-6 pb-2">
            
            {/* Bước 1 */}
            <div className="relative">
                <span className="absolute -left-[33px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <h4 className="font-bold text-blue-800">Chuẩn bị Burette (Chứa NaOH)</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Cho dung dịch <strong>NaOH</strong> vào burette, chỉnh về vạch 0. (Đây là dung dịch cần tìm nồng độ).
                </p>
            </div>

            {/* Bước 2 */}
            <div className="relative">
                <span className="absolute -left-[33px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <h4 className="font-bold text-blue-800">Chuẩn bị Bình tam giác (Chứa HCl)</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Dùng pipette lấy <strong>10,00 mL HCl 0,1 M</strong> cho vào bình tam giác. Thêm 1-2 giọt <em>phenolphthalein</em>.
                    <br/>
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">Hiện tượng: Dung dịch không màu (do Acid).</span>
                </p>
            </div>

            {/* Bước 3 */}
            <div className="relative">
                <span className="absolute -left-[33px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <h4 className="font-bold text-blue-800">Tiến hành chuẩn độ</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Mở khóa burette nhỏ từ từ NaOH xuống bình tam giác, lắc đều.
                    <br/>
                    Dừng lại khi dung dịch chuyển sang <strong>màu hồng nhạt</strong> bền trong 30 giây.
                </p>
                            </div>

            {/* Bước 4 & 5 */}
            <div className="relative">
                <span className="absolute -left-[33px] top-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <h4 className="font-bold text-blue-800">Đọc kết quả</h4>
                <p className="text-gray-600 text-sm mt-1">
                    Đọc thể tích NaOH đã dùng trên burette. Lặp lại 3 lần lấy trung bình.
                </p>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 3: Tính toán kết quả --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">III. Công thức tính nồng độ</h2>
        
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
            <p className="mb-4 text-gray-700 font-medium">Nồng độ mol của dung dịch NaOH được tính theo công thức:</p>
            
            <div className="inline-block bg-white p-4 rounded-lg shadow-md border border-green-300">
                <div className="text-2xl font-serif font-bold text-green-800 flex items-center gap-2">
                    <span>C<sub>NaOH</sub> = </span>
                    <div className="flex flex-col text-center">
                        <span className="border-b-2 border-green-800 pb-1 px-2">V<sub>HCl</sub> &times; C<sub>HCl</sub></span>
                        <span className="pt-1">V<sub>NaOH</sub></span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-left text-sm text-gray-600 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <p>• <strong>C<sub>NaOH</sub></strong>: Nồng độ NaOH cần tìm (M).</p>
                <p>• <strong>V<sub>NaOH</sub></strong>: Thể tích NaOH tiêu tốn (Lấy từ burette).</p>
                <p>• <strong>C<sub>HCl</sub></strong>: Nồng độ HCl chuẩn (0,1 M).</p>
                <p>• <strong>V<sub>HCl</sub></strong>: Thể tích HCl ban đầu (10 mL).</p>
            </div>
        </div>
      </section>

      {/* Video minh họa */}
      <section className="mt-8">
         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📺</span>
                Video minh họa: Kỹ thuật chuẩn độ Acid - Base
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/34fd06rhrRo" 
                    title="Titration Experiment" 
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

export default Lesson_ChuanDo;