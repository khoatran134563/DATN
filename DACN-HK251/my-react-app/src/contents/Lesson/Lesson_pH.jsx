import React from 'react';

const Lesson_pH = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Khái niệm pH. Chất chỉ thị acid – base</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* --- Phần 1: Khái niệm pH --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Khái niệm pH</h2>
        
        {/* Tích số ion của nước */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <p className="mb-2">Nước là chất điện li rất yếu:</p>
            <div className="text-center font-mono text-lg text-blue-900 font-bold mb-2">
                H<sub>2</sub>O ⇌ H<sup>+</sup> + OH<sup>-</sup>
            </div>
            <p className="text-sm text-gray-700">
                Ở 25°C, tích số ion của nước là hằng số: <br/>
                <span className="font-bold ml-4">K<sub>w</sub> = [H<sup>+</sup>].[OH<sup>-</sup>] = 10<sup>-14</sup></span>
            </p>
        </div>

        {/* Quy đổi nồng độ H+ ra môi trường */}
        <div className="grid md:grid-cols-3 gap-4 text-center text-sm mb-6">
            <div className="bg-red-50 p-3 rounded border border-red-200">
                <p className="font-bold text-red-700">Môi trường Acid</p>
                <p className="mt-1">[H<sup>+</sup>] &gt; 10<sup>-7</sup> M</p>
                <p className="text-xs text-gray-500">(pH &lt; 7)</p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="font-bold text-green-700">Môi trường Trung tính</p>
                <p className="mt-1">[H<sup>+</sup>] = 10<sup>-7</sup> M</p>
                <p className="text-xs text-gray-500">(pH = 7)</p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <p className="font-bold text-purple-700">Môi trường Base</p>
                <p className="mt-1">[H<sup>+</sup>] &lt; 10<sup>-7</sup> M</p>
                <p className="text-xs text-gray-500">(pH &gt; 7)</p>
            </div>
        </div>

        {/* Công thức tính pH */}
        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-sm">
            <h3 className="font-bold text-yellow-900 text-lg mb-2">🔢 Công thức tính pH:</h3>
            <div className="text-center my-3">
                <span className="text-2xl font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded border border-yellow-200">
                    pH = -lg[H<sup>+</sup>]
                </span>
            </div>
            <p className="text-sm text-gray-600 italic text-center">
                (Nếu [H<sup>+</sup>] = 10<sup>-a</sup> thì pH = a)
            </p>
        </div>

        {/* Thang pH (Mô phỏng hình 2.6 SGK) */}
        <div className="mt-6">
            <p className="font-bold text-gray-700 mb-2">Thang pH:</p>
            <div className="h-12 w-full rounded-lg overflow-hidden flex text-xs font-bold text-white shadow-md">
                <div className="flex-1 bg-red-600 flex items-center justify-center">1</div>
                <div className="flex-1 bg-red-500 flex items-center justify-center">2</div>
                <div className="flex-1 bg-orange-500 flex items-center justify-center">3</div>
                <div className="flex-1 bg-orange-400 flex items-center justify-center">4</div>
                <div className="flex-1 bg-yellow-400 flex items-center justify-center">5</div>
                <div className="flex-1 bg-yellow-300 flex items-center justify-center">6</div>
                <div className="flex-1 bg-green-500 flex items-center justify-center">7</div>
                <div className="flex-1 bg-green-400 flex items-center justify-center">8</div>
                <div className="flex-1 bg-blue-400 flex items-center justify-center">9</div>
                <div className="flex-1 bg-blue-500 flex items-center justify-center">10</div>
                <div className="flex-1 bg-blue-600 flex items-center justify-center">11</div>
                <div className="flex-1 bg-indigo-600 flex items-center justify-center">12</div>
                <div className="flex-1 bg-purple-600 flex items-center justify-center">13</div>
                <div className="flex-1 bg-purple-800 flex items-center justify-center">14</div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1 px-2">
                <span>Acid mạnh</span>
                <span>Trung tính</span>
                <span>Base mạnh</span>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 2: Ý nghĩa thực tiễn --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Ý nghĩa của pH trong thực tiễn</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* Trong cơ thể người */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-pink-600 mb-2 flex items-center gap-2">
                    <span>🫀</span> Trong cơ thể người
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li><strong>Máu:</strong> pH ổn định khoảng 7.35 - 7.45.</li>
                    <li><strong>Dạ dày:</strong> pH khoảng 1.5 - 3.5 (môi trường axit mạnh để tiêu hóa thức ăn).</li>
                    <li>Sự thay đổi pH đột ngột sẽ ảnh hưởng xấu đến sức khỏe.</li>
                </ul>
            </div>

            {/* Trong đời sống & sản xuất */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                    <span>🌱</span> Trong đời sống & sản xuất
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li><strong>Nông nghiệp:</strong> pH đất ảnh hưởng đến sự phát triển của cây trồng. Đất chua (pH &lt; 7) cần khử chua bằng vôi (CaO).</li>
                    <li><strong>Nước sinh hoạt:</strong> Cần có pH trong khoảng 6.5 - 8.5 (TCVN).</li>
                </ul>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 3: Chất chỉ thị Acid - Base --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">III. Chất chỉ thị Acid - Base</h2>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
            <p className="mb-2 font-medium">Chất chỉ thị là chất có màu sắc biến đổi phụ thuộc vào giá trị pH của dung dịch.</p>
        </div>

        {/* Bảng màu chỉ thị (Mô phỏng Hình 2.8) */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 border-b">Chất chỉ thị</th>
                        <th className="px-4 py-3 border-b bg-red-50 text-red-700">Môi trường Acid</th>
                        <th className="px-4 py-3 border-b bg-green-50 text-green-700">Trung tính</th>
                        <th className="px-4 py-3 border-b bg-blue-50 text-blue-700">Môi trường Base</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium">Quỳ tím</td>
                        <td className="px-4 py-3 text-red-600 font-bold">Hóa Đỏ</td>
                        <td className="px-4 py-3 text-purple-600">Tím</td>
                        <td className="px-4 py-3 text-blue-600 font-bold">Hóa Xanh</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-4 py-3 font-medium">Phenolphthalein</td>
                        <td className="px-4 py-3 text-gray-400">Không màu</td>
                        <td className="px-4 py-3 text-gray-400">Không màu</td>
                        <td className="px-4 py-3 text-pink-500 font-bold">Hóa Hồng</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      {/* Video minh họa */}
      <section className="mt-8">
         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📺</span>
                Video minh họa: Sự đổi màu của chất chỉ thị trong các môi trường
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/Ht0wbsmT3Ns" 
                    title="Thí nghiệm chất chỉ thị màu" 
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

export default Lesson_pH;