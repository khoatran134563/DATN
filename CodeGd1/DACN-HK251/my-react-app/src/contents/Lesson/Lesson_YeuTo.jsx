import React from 'react';

const Lesson_YeuTo = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Các yếu tố ảnh hưởng đến cân bằng hóa học</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 1: Khái niệm về cân bằng hóa học</p>
      </div>

      {/* --- Mở đầu: Nguyên lý Le Chatelier --- */}
      <section>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            🌟 Nguyên lý Le Chatelier (Lơ Sa-tơ-li-ê)
          </h2>
          <p className="text-lg leading-relaxed font-medium">
            "Một phản ứng thuận nghịch đang ở trạng thái cân bằng khi chịu một tác động từ bên ngoài như biến đổi <strong>nồng độ, áp suất, nhiệt độ</strong> thì cân bằng sẽ chuyển dịch theo chiều làm <strong>giảm tác động đó</strong>."
          </p>
        </div>
        <p className="mt-3 text-gray-600 italic text-center">
          (Hiểu đơn giản: Bạn tác động thế nào, hệ sẽ phản kháng lại để "chống đối" bạn).
        </p>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 1: Ảnh hưởng của NHIỆT ĐỘ --- */}
      <section>
        <h2 className="text-2xl font-bold text-red-700 mb-4 border-l-4 border-red-500 pl-3">I. Ảnh hưởng của nhiệt độ</h2>
        
        {/* Ví dụ thí nghiệm NO2 */}
        <div className="bg-red-50 p-5 rounded-lg border border-red-100 mb-4">
            <h3 className="font-bold text-red-900 mb-2">1. Thí nghiệm với khí NO<sub>2</sub>:</h3>
            <div className="font-mono text-lg bg-white p-3 rounded border border-red-200 text-gray-800 mb-3 flex flex-col md:flex-row items-center justify-center gap-4">
                
                {/* Nhóm 1: 2NO2 + Chú thích */}
                <div className="flex flex-col items-center">
                    <span>2NO<sub>2</sub>(g)</span>
                    <span className="text-xs text-red-600 font-bold mt-1">(Nâu đỏ)</span>
                </div>

                {/* Mũi tên */}
                <div className="text-xl font-bold">⇌</div>

                {/* Nhóm 2: N2O4 + Chú thích */}
                <div className="flex flex-col items-center">
                    <span>N<sub>2</sub>O<sub>4</sub>(g)</span>
                    <span className="text-xs text-gray-400 font-bold mt-1">(Không màu)</span>
                </div>

                {/* Delta H */}
                <span className="ml-4 text-sm font-sans text-gray-500 border-l pl-4 border-gray-300">
                    (&Delta;<sub>r</sub>H<sup>0</sup><sub>298</sub> = -58 kJ &lt; 0)
                </span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>&Delta;<sub>r</sub>H &lt; 0:</strong> Phản ứng thuận là <strong>tỏa nhiệt</strong>.</li>
                <li><strong>Tăng nhiệt độ</strong> (Ngâm nước nóng): Màu nâu đỏ đậm lên &rarr; Cân bằng chuyển dịch theo chiều nghịch (chiều thu nhiệt).</li>
                <li><strong>Giảm nhiệt độ</strong> (Ngâm nước đá): Màu nâu đỏ nhạt đi &rarr; Cân bằng chuyển dịch theo chiều thuận (chiều tỏa nhiệt).</li>
            </ul>
        </div>

        {/* Quy tắc chốt lại */}
        <div className="bg-white border-l-4 border-red-500 p-4 shadow-sm">
            <p className="font-bold text-gray-800 mb-2">📌 Quy tắc:</p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">Tăng nhiệt</span>
                    <span>&rarr; Chuyển dịch theo chiều <strong>thu nhiệt</strong> (&Delta;<sub>r</sub>H &gt; 0).</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">Giảm nhiệt</span>
                    <span>&rarr; Chuyển dịch theo chiều <strong>tỏa nhiệt</strong> (&Delta;<sub>r</sub>H &lt; 0).</span>
                </li>
            </ul>
            <p className="mt-2 text-sm text-gray-500 italic">("Tăng thu - Giảm tỏa")</p>
        </div>
        
        {/* Ví dụ thực tế (Sản xuất vôi) */}
        <div className="mt-4 p-4 border border-dashed border-gray-300 rounded bg-gray-50">
            <p className="font-bold text-gray-700">Ví dụ thực tế: Sản xuất vôi</p>
            <p className="font-mono text-sm mt-1 text-center">
                CaCO<sub>3</sub>(s) <span className="font-bold">⇌</span> CaO(s) + CO<sub>2</sub>(g) 
                <span className="ml-2">(&Delta;<sub>r</sub>H &gt; 0: Thu nhiệt)</span>
            </p>
            <p className="text-sm mt-2">
                &rarr; Để nâng cao hiệu suất (tạo nhiều CaO), cần <strong>tăng nhiệt độ</strong> (nung nóng).
            </p>
        </div>
      </section>

      {/* --- Phần 2: Ảnh hưởng của ÁP SUẤT --- */}
      <section>
        <h2 className="text-2xl font-bold text-purple-700 mb-4 border-l-4 border-purple-500 pl-3">II. Ảnh hưởng của áp suất</h2>
        
        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 mb-4">
            <p className="mb-2">Xét lại hệ cân bằng trong xilanh kín:</p>
            <div className="font-mono text-lg text-center bg-white p-3 rounded border border-purple-200 text-gray-800 mb-3">
                2NO<sub>2</sub>(g) <span className="mx-2 font-bold text-xl">⇌</span> N<sub>2</sub>O<sub>4</sub>(g)
                <div className="flex justify-center gap-16 text-xs mt-1 font-sans font-bold">
                    <span className="text-purple-600">2 mol khí</span>
                    <span className="text-purple-600">1 mol khí</span>
                </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Tăng áp suất</strong> (Đẩy pit-tông): Thể tích giảm, màu nâu nhạt dần &rarr; Chuyển dịch theo chiều làm giảm số mol khí (Chiều thuận).</li>
                <li><strong>Giảm áp suất</strong> (Kéo pit-tông): Thể tích tăng, màu nâu đậm dần &rarr; Chuyển dịch theo chiều làm tăng số mol khí (Chiều nghịch).</li>
            </ul>
        </div>

        {/* Quy tắc chốt lại */}
        <div className="bg-white border-l-4 border-purple-500 p-4 shadow-sm">
            <p className="font-bold text-gray-800 mb-2">📌 Quy tắc:</p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-bold">Tăng áp suất</span>
                    <span>&rarr; Chuyển dịch theo chiều làm <strong>giảm</strong> số mol khí.</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-bold">Giảm áp suất</span>
                    <span>&rarr; Chuyển dịch theo chiều làm <strong>tăng</strong> số mol khí.</span>
                </li>
            </ul>
        </div>

        {/* Lưu ý quan trọng */}
        <div className="mt-4 bg-yellow-50 p-3 rounded border border-yellow-200 text-sm text-yellow-800 flex gap-2">
            <span className="text-xl">⚠️</span>
            <p>Nếu tổng hệ số tỉ lượng của chất khí ở hai vế bằng nhau (số mol khí không đổi) hoặc trong hệ không có chất khí &rarr; Áp suất <strong>không</strong> ảnh hưởng đến cân bằng.</p>
        </div>
      </section>

      {/* --- Phần 3: Ảnh hưởng của NỒNG ĐỘ --- */}
      <section>
        <h2 className="text-2xl font-bold text-green-700 mb-4 border-l-4 border-green-500 pl-3">III. Ảnh hưởng của nồng độ</h2>
        
        <div className="bg-green-50 p-5 rounded-lg border border-green-100 mb-4">
            <p className="mb-2">Xét hệ cân bằng trong bình kín:</p>
            <div className="font-mono text-lg text-center bg-white p-3 rounded border border-green-200 text-gray-800 mb-3">
                C(s) + CO<sub>2</sub>(g) <span className="mx-2 font-bold text-xl">⇌</span> 2CO(g)
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Thổi thêm CO<sub>2</sub> (Tăng nồng độ chất tham gia):</strong> Cân bằng chuyển dịch theo chiều thuận (để tiêu thụ bớt CO<sub>2</sub>).</li>
                <li><strong>Lấy bớt CO ra (Giảm nồng độ sản phẩm):</strong> Cân bằng chuyển dịch theo chiều thuận (để tạo thêm CO bù vào).</li>
            </ul>
        </div>

        {/* Quy tắc chốt lại */}
        <div className="bg-white border-l-4 border-green-500 p-4 shadow-sm">
            <p className="font-bold text-gray-800 mb-2">📌 Quy tắc:</p>
            <ul className="space-y-2">
                <li className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">Tăng nồng độ</span>
                    <span>(một chất) &rarr; Chuyển dịch theo chiều làm <strong>giảm</strong> nồng độ chất đó.</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">Giảm nồng độ</span>
                    <span>(một chất) &rarr; Chuyển dịch theo chiều làm <strong>tăng</strong> nồng độ chất đó.</span>
                </li>
            </ul>
        </div>
        <p className="mt-2 text-sm text-gray-500 italic ml-4">
            * Lưu ý: Việc thêm/bớt chất rắn (như C trong ví dụ trên) không làm ảnh hưởng đến cân bằng.
        </p>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 4: Vai trò của CHẤT XÚC TÁC --- */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-gray-500 pl-3">IV. Vai trò của chất xúc tác</h2>
        <div className="bg-gray-100 p-5 rounded-xl text-center">
            <div className="text-5xl mb-3">⚡</div>
            <p className="text-lg font-medium text-gray-800">
                Chất xúc tác <span className="text-red-600 font-bold uppercase">KHÔNG</span> làm chuyển dịch cân bằng hóa học.
            </p>
            <p className="text-gray-600 mt-2">
                Nó chỉ làm tăng tốc độ phản ứng thuận và phản ứng nghịch như nhau, giúp hệ <strong>nhanh chóng đạt tới trạng thái cân bằng</strong> hơn thôi.
            </p>
        </div>
      </section>

      {/* --- Phần 5: Ý nghĩa thực tiễn (Hang động) --- */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-blue-800 mb-3">V. Ý nghĩa thực tiễn</h2>
        <div className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
             <div className="md:w-1/3">
                <img 
                    src="/thachnhu.jpg" 
                    alt="Thạch nhũ hang động" 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                />
             </div>
             <div className="md:w-2/3">
                <h3 className="font-bold text-lg text-gray-800">Sự hình thành thạch nhũ và xâm thực</h3>
                <p className="text-gray-600 mt-2 text-sm">
                    Trong các hang động đá vôi, xảy ra quá trình thuận nghịch:
                </p>
                <div className="font-mono text-center bg-blue-50 p-2 my-3 rounded border border-blue-100 text-blue-900 font-bold text-sm md:text-base">
                    CaCO<sub>3</sub>(s) + H<sub>2</sub>O(l) + CO<sub>2</sub>(aq) ⇌ Ca(HCO<sub>3</sub>)<sub>2</sub>(aq)
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li><strong>Chiều thuận:</strong> Sự xâm thực của nước mưa vào đá vôi (tạo hang động).</li>
                    <li><strong>Chiều nghịch:</strong> Sự hình thành thạch nhũ, măng đá (khi nước nhỏ xuống, CO<sub>2</sub> bay hơi).</li>
                </ul>
             </div>
        </div>
      </section>

    </div>
  );
};

export default Lesson_YeuTo;