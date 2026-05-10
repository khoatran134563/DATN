import React from 'react';

const Lesson_HangSo = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Hằng số cân bằng của phản ứng thuận nghịch</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* --- Phần 1: Biểu thức hằng số cân bằng --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Biểu thức hằng số cân bằng</h2>
        
        {/* Dẫn dắt từ ví dụ SGK */}
        <div className="mb-4 text-gray-700">
          <p>Xét phản ứng thuận nghịch tổng quát:</p>
          <div className="font-mono text-lg mt-2 mb-4 font-medium text-center text-blue-900 bg-gray-50 p-3 rounded border border-gray-200">
             aA + bB <span className="text-xl font-bold mx-2">⇌</span> cC + dD
          </div>
        </div>

        {/* Box Công thức Kc - Dùng màu nổi bật (Vàng/Cam) */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6 shadow-sm">
          <p className="font-semibold text-yellow-900 mb-2">Khi phản ứng ở trạng thái cân bằng, ta có:</p>
          
          {/* Công thức Toán học */}
          <div className="flex justify-center items-center my-4">
            <span className="font-bold text-2xl text-blue-900 italic mr-3">K<sub>C</sub> = </span>
            <div className="flex flex-col items-center">
                <div className="border-b-2 border-gray-800 px-2 pb-1 text-xl font-serif">
                    [C]<sup>c</sup> . [D]<sup>d</sup>
                </div>
                <div className="pt-1 text-xl font-serif">
                    [A]<sup>a</sup> . [B]<sup>b</sup>
                </div>
            </div>
          </div>

          <div className="text-sm text-gray-700 mt-4 space-y-1 border-t border-yellow-200 pt-3">
            <p><span className="font-bold">[A], [B], [C], [D]:</span> Nồng độ mol của các chất ở trạng thái cân bằng.</p>
            <p><span className="font-bold">a, b, c, d:</span> Hệ số tỉ lượng các chất trong phương trình hóa học.</p>
            <p><span className="font-bold">K<sub>C</sub>:</span> Hằng số cân bằng (chỉ phụ thuộc vào nhiệt độ).</p>
          </div>
        </div>

        {/* Chú ý quan trọng - SGK Trang 9 */}
        <div className="bg-red-50 p-4 rounded-l-4 border-l-4 border-red-500 text-gray-700">
            <p className="font-bold text-red-700 mb-1">⚠️ Chú ý:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Chất rắn không xuất hiện trong biểu thức hằng số cân bằng.</li>
                <li>Ví dụ: C<sub>(s)</sub> + CO<sub>2(g)</sub> ⇌ 2CO<sub>(g)</sub> <br/> 
                    <span className="ml-6">⇒ Biểu thức là: <strong>K<sub>C</sub> = [CO]<sup>2</sup> / [CO<sub>2</sub>]</strong> (Không tính C).</span>
                </li>
            </ul>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* --- Phần 2: Ý nghĩa của hằng số cân bằng --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Ý nghĩa của hằng số cân bằng</h2>
        
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <p className="mb-3">
            Hằng số cân bằng <strong>K<sub>C</sub></strong> là đại lượng đặc trưng cho độ diễn biến của phản ứng:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2 text-xl">↑</span>
                <span>
                    <strong>K<sub>C</sub> càng lớn:</strong> Phản ứng thuận diễn ra mạnh, hỗn hợp cân bằng chứa nhiều chất sản phẩm.
                </span>
            </li>
            <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">↓</span>
                <span>
                    <strong>K<sub>C</sub> càng nhỏ:</strong> Phản ứng thuận diễn ra yếu, hỗn hợp cân bằng chứa nhiều chất tham gia.
                </span>
            </li>
          </ul>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* --- Phần 3: Ví dụ áp dụng (Lấy từ SGK bài SO2) --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">III. Ví dụ áp dụng</h2>
        
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
            <p className="font-semibold text-gray-800 mb-2">Bài tập:</p>
            <p className="mb-3">Viết biểu thức tính hằng số cân bằng K<sub>C</sub> cho phản ứng sau:</p>
            
            <div className="font-mono text-lg text-center text-purple-900 bg-purple-50 p-2 rounded mb-4">
                2SO<sub>2</sub>(g) + O<sub>2</sub>(g) <span className="font-bold mx-2">⇌</span> 2SO<sub>3</sub>(g)
            </div>

            <div className="mt-4">
                <p className="font-semibold text-green-700 underline mb-2">Lời giải:</p>
                <div className="flex items-center ml-4">
                    <span className="font-bold text-xl text-gray-800 italic mr-3">K<sub>C</sub> = </span>
                    <div className="flex flex-col items-center">
                        <div className="border-b-2 border-gray-600 px-2 pb-1 text-lg">
                            [SO<sub>3</sub>]<sup>2</sup>
                        </div>
                        <div className="pt-1 text-lg">
                            [SO<sub>2</sub>]<sup>2</sup> . [O<sub>2</sub>]
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      
    </div>
  );
};

export default Lesson_HangSo;