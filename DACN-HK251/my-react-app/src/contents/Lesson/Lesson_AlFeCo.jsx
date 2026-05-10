import React from 'react';

const Lesson_AlFeCo = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Ý nghĩa thực tiễn cân bằng của ion Al³⁺, Fe³⁺ và CO₃²⁻</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* --- Phần 1: Cân bằng của ion Al3+, Fe3+ (Phèn chua) --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Cân bằng của ion Al³⁺, Fe³⁺ trong xử lý nước</h2>
        
        <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex-1">
                <h3 className="font-bold text-purple-900 text-lg mb-2">1. Phèn chua và Phèn sắt</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>
                        <strong>Phèn chua (Phèn nhôm - kali):</strong> <br/>
                        <span className="font-mono bg-purple-50 px-2 py-1 rounded text-sm ml-4 inline-block mt-1">
                            K<sub>2</sub>SO<sub>4</sub>·Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>·24H<sub>2</sub>O
                        </span>
                    </li>
                    <li>
                        <strong>Phèn sắt:</strong> <br/>
                        <span className="font-mono bg-purple-50 px-2 py-1 rounded text-sm ml-4 inline-block mt-1">
                            (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>·Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>·24H<sub>2</sub>O
                        </span>
                    </li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-bold text-blue-900 mb-2">🧪 Cơ chế làm trong nước:</p>
                    <p className="text-sm text-gray-700 mb-2">
                        Các ion Al<sup>3+</sup>, Fe<sup>3+</sup> dễ bị thủy phân trong nước tạo thành các hydroxide không tan <strong>(dạng keo)</strong>.
                    </p>
                    {/* Phương trình thủy phân */}
                    <div className="text-center font-mono text-lg text-blue-800 font-bold bg-white p-2 rounded border border-blue-200">
                        M<sup>3+</sup> + 3H<sub>2</sub>O ⇌ M(OH)<sub>3</sub>↓ + 3H<sup>+</sup>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">
                        (Trong đó M là Al hoặc Fe. Kết tủa dạng keo này sẽ kéo theo các chất bẩn lơ lửng trong nước lắng xuống).
                    </p>
                </div>
            </div>

            {/* Hình ảnh minh họa */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
                
                <img 
                    src="/phenchua.jpg" 
                    alt="Phèn chua" 
                    className="w-full h-48 object-cover rounded-lg shadow-md border border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-2 italic">Hình: Tinh thể Phèn chua</p>
                
                <div className="mt-4 bg-yellow-50 p-3 rounded border border-yellow-200 w-full text-sm">
                    <span className="font-bold text-yellow-800">⚠️ Lưu ý:</span> 
                    <p className="mt-1">Quá trình thủy phân này tạo ra ion <strong>H<sup>+</sup></strong>, nên làm cho nước có <strong>môi trường Acid</strong>.</p>
                </div>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 2: Cân bằng của ion CO3 2- (Hồ bơi) --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Cân bằng của ion CO₃²⁻ trong xử lý nước hồ bơi</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* Vấn đề thực tế */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-teal-700 mb-2 flex items-center gap-2">
                    <span>🏊</span> Tiêu chuẩn nước hồ bơi
                </h3>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    Một hồ bơi đạt chuẩn khi có độ pH từ <strong>7,2 đến 7,8</strong>.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="text-red-500">❌</span>
                        {/* ĐÃ SỬA LỖI: Thay dấu < thành &lt; */}
                        <span>Nếu pH quá thấp (<strong>&lt; 7</strong>): Gây kích ứng da, mắt cho người bơi, ăn mòn thiết bị.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500">✅</span>
                        <span>Giải pháp: Dùng <strong>Soda (Na<sub>2</sub>CO<sub>3</sub>)</strong> để tăng pH.</span>
                    </li>
                </ul>
            </div>

            {/* Giải thích hóa học */}
            <div className="bg-teal-50 p-5 rounded-xl border border-teal-200 shadow-sm">
                <h3 className="font-bold text-teal-900 mb-2">🧪 Giải thích:</h3>
                <p className="text-gray-700 text-sm mb-3">
                    Ion CO<sub>3</sub><sup>2-</sup> trong Soda bị thủy phân tạo ra ion <strong>OH<sup>-</sup></strong> (môi trường Base), giúp trung hòa axit và tăng độ pH của nước.
                </p>
                
                {/* Phương trình thủy phân */}
                <div className="text-center font-mono text-lg text-teal-800 font-bold bg-white p-3 rounded border border-teal-200">
                    CO<sub>3</sub><sup>2-</sup> + H<sub>2</sub>O ⇌ HCO<sub>3</sub><sup>-</sup> + OH<sup>-</sup>
                </div>
                
                <div className="mt-3 flex justify-center">
                    <span className="bg-white text-teal-800 px-3 py-1 rounded-full text-xs font-bold border border-teal-200 shadow-sm">
                        Môi trường Base (Kiềm)
                    </span>
                </div>
            </div>
        </div>
      </section>

      {/* Video minh họa */}
      <section className="mt-8">
         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📺</span>
                Video minh họa: Tác dụng làm trong nước của phèn chua
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/TRBUGjRL6HI" 
                    title="Thí nghiệm làm trong nước bằng phèn chua" 
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

export default Lesson_AlFeCo;