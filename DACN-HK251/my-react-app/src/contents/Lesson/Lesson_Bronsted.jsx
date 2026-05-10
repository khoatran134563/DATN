import React from 'react';

const Lesson_Bronsted = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Thuyết Brønsted – Lowry về acid – base</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* --- Phần 1: Tìm hiểu thuyết Brønsted – Lowry --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Khái niệm Acid và Base</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Ví dụ 1: HCl (Acid) */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-purple-900 mb-2 border-b border-gray-100 pb-2">
                    1. Xét phản ứng của HCl trong nước:
                </h3>
                <div className="text-center my-4 font-mono text-lg">
                    HCl + H<sub>2</sub>O <span className="font-bold text-xl">→</span> H<sub>3</sub>O<sup>+</sup> + Cl<sup>-</sup>
                </div>
                <div className="bg-purple-50 p-3 rounded text-sm text-gray-700">
                    <p><strong>Phân tích:</strong></p>
                    <ul className="list-disc list-inside mt-1">
                        <li>HCl đã <strong>nhường (cho)</strong> 1 proton (H<sup>+</sup>) cho H<sub>2</sub>O.</li>
                        <li>&rarr; HCl đóng vai trò là <strong>acid</strong>.</li>
                    </ul>
                </div>
            </div>

            {/* Ví dụ 2: NH3 (Base) */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-purple-900 mb-2 border-b border-gray-100 pb-2">
                    2. Xét phản ứng của NH<sub>3</sub> trong nước:
                </h3>
                <div className="text-center my-4 font-mono text-lg">
                    NH<sub>3</sub> + H<sub>2</sub>O <span className="font-bold text-xl">⇌</span> NH<sub>4</sub><sup>+</sup> + OH<sup>-</sup>
                </div>
                <div className="bg-purple-50 p-3 rounded text-sm text-gray-700">
                    <p><strong>Phân tích:</strong></p>
                    <ul className="list-disc list-inside mt-1">
                        <li>NH<sub>3</sub> đã <strong>nhận</strong> 1 proton (H<sup>+</sup>) từ H<sub>2</sub>O.</li>
                        <li>&rarr; NH<sub>3</sub> đóng vai trò là <strong>base</strong>.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Box Định nghĩa (Màu vàng giống sách GK) */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 shadow-sm relative">
            <div className="absolute -top-3 -left-3 bg-yellow-400 text-white p-2 rounded-full shadow-md">
                💡
            </div>
            <h3 className="font-bold text-yellow-900 text-lg mb-2 ml-2">Định nghĩa Thuyết Brønsted – Lowry:</h3>
            <ul className="space-y-3 ml-2 text-gray-800 font-medium text-lg">
                <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">Acid:</span>
                    <span>Là chất <strong>cho proton</strong> (H<sup>+</sup>).</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">Base:</span>
                    <span>Là chất <strong>nhận proton</strong> (H<sup>+</sup>).</span>
                </li>
            </ul>
            <p className="mt-3 text-sm text-gray-500 italic ml-2">
                * Acid và base có thể là phân tử hoặc ion.
            </p>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 2: Chất lưỡng tính --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Chất lưỡng tính</h2>
        <p className="mb-4 text-gray-600">
            Xét ion HCO<sub>3</sub><sup>-</sup> trong dung dịch NaHCO<sub>3</sub>:
        </p>

        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm space-y-4">
            {/* Trường hợp 1: Cho H+ */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-3 rounded border border-blue-100">
                <div className="font-mono text-lg font-bold text-red-700">
                    HCO<sub>3</sub><sup>-</sup> + H<sub>2</sub>O ⇌ H<sub>3</sub>O<sup>+</sup> + CO<sub>3</sub><sup>2-</sup>
                </div>
                <div className="text-sm text-gray-600">
                    &rarr; HCO<sub>3</sub><sup>-</sup> <strong>cho H<sup>+</sup></strong> (vai trò Acid).
                </div>
            </div>

            {/* Trường hợp 2: Nhận H+ */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-3 rounded border border-blue-100">
                <div className="font-mono text-lg font-bold text-blue-700">
                    HCO<sub>3</sub><sup>-</sup> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> + OH<sup>-</sup>
                </div>
                <div className="text-sm text-gray-600">
                    &rarr; HCO<sub>3</sub><sup>-</sup> <strong>nhận H<sup>+</sup></strong> (vai trò Base).
                </div>
            </div>
        </div>

        {/* Kết luận chất lưỡng tính */}
        <div className="mt-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500 text-gray-800">
            <p>
                <strong>Kết luận:</strong> Ion HCO<sub>3</sub><sup>-</sup> vừa có thể cho proton (H<sup>+</sup>), vừa có thể nhận proton. 
                Ta gọi đó là <strong>chất lưỡng tính</strong>.
            </p>
        </div>
      </section>

      {/* Video minh họa (Nếu có) */}
      <section className="mt-8">
         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📺</span>
                Video minh họa: Phản ứng acid - base
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                {/* Bro có thể thay video khác nếu muốn, tui để tạm video minh họa cơ chế H+ */}
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/GyVuMJD4_Is" 
                    title="Acid Base Theory" 
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

export default Lesson_Bronsted;