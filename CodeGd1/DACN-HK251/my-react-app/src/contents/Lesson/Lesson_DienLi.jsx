import React from 'react';

const Lesson_DienLi = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-800 pb-10">
      {/* Tiêu đề bài học */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Sự điện li, chất điện li, chất không điện li</h1>
        <p className="text-gray-500 mt-2">Chương 1 - Bài 2: Cân bằng trong dung dịch nước</p>
      </div>

      {/* --- Phần 1: Hiện tượng điện li --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">I. Hiện tượng điện li</h2>
        
        {/* Thí nghiệm dẫn điện */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-purple-900 mb-2 border-b border-gray-100 pb-2">
                🧪 Thí nghiệm khảo sát tính dẫn điện
            </h3>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Placeholder ảnh mô phỏng thí nghiệm */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img 
                        src="/dandien.png" 
                        alt="Bộ dụng cụ thử tính dẫn điện" 
                        className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2 italic text-center">
                        Hình 2.1: Bộ dụng cụ thử tính dẫn điện
                    </p>
                </div>
                
                <div className="flex-1 space-y-2 text-gray-700">
                    <ul className="list-disc list-inside ml-2 bg-purple-50 p-3 rounded">
                        <li><strong>Nước cất:</strong> Đèn <span className="text-red-500 font-bold">không sáng</span> (Không dẫn điện).</li>
                        <li><strong>Dung dịch Saccharose (Đường):</strong> Đèn <span className="text-red-500 font-bold">không sáng</span> (Không dẫn điện).</li>
                        <li><strong>Dung dịch Sodium chloride (Muối ăn):</strong> Đèn <span className="text-green-600 font-bold">sáng</span> (Dẫn điện).</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Box Định nghĩa */}
        <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <h3 className="font-bold text-blue-900 text-lg mb-2">📌 Kết luận:</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-800">
                <li><strong>Chất điện li:</strong> Là chất khi tan trong nước phân li ra các ion (dẫn điện). <br/>
                    <span className="text-sm text-gray-600 ml-6">(Ví dụ: Axit, bazơ, muối).</span>
                </li>
                <li><strong>Chất không điện li:</strong> Là chất khi tan trong nước <strong>không</strong> phân li ra ion (không dẫn điện). <br/>
                    <span className="text-sm text-gray-600 ml-6">(Ví dụ: Đường saccharose, ethanol...).</span>
                </li>
                <li><strong>Sự điện li:</strong> Là quá trình phân li các chất trong nước tạo thành các ion.</li>
            </ul>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 2: Cơ chế --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">II. Nguyên nhân tính dẫn điện của dung dịch</h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="mb-2">
                Nước (H<sub>2</sub>O) là dung môi phân cực. Khi hòa tan một chất điện li (ví dụ NaCl):
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
                <li>Các phân tử nước bao quanh và tách các ion Na<sup>+</sup> và Cl<sup>-</sup> ra khỏi tinh thể.</li>
                <li>Các ion này chuyển động tự do trong dung dịch &rarr; Dẫn điện.</li>
            </ul>
            {/* Phương trình điện li đơn giản */}
            <div className="mt-3 text-center bg-white p-2 rounded font-mono text-lg text-blue-900 font-bold border border-blue-100">
                NaCl &rarr; Na<sup>+</sup> + Cl<sup>-</sup>
            </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* --- Phần 3: Phân loại chất điện li --- */}
      <section>
        <h2 className="text-xl font-bold text-blue-800 mb-3">III. Phân loại chất điện li</h2>
        <p className="mb-4 text-gray-600">Dựa vào khả năng phân li thành ion, ta chia thành 2 loại:</p>

        <div className="grid md:grid-cols-2 gap-6">
            
            {/* 1. Chất điện li MẠNH */}
            <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-600 text-white p-2 rounded-lg text-xl font-bold">⚡⚡</span>
                    <h3 className="text-xl font-bold text-green-900">1. Chất điện li mạnh</h3>
                </div>
                <p className="text-gray-700 mb-3 flex-1">
                    Là chất khi tan trong nước, các phân tử hòa tan <strong>đều phân li hoàn toàn</strong> ra ion.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4 bg-white p-3 rounded border border-green-100">
                    <li><strong>Axit mạnh:</strong> HCl, HNO<sub>3</sub>, H<sub>2</sub>SO<sub>4</sub>...</li>
                    <li><strong>Bazơ mạnh:</strong> NaOH, KOH, Ba(OH)<sub>2</sub>...</li>
                    <li><strong>Hầu hết các muối tan.</strong></li>
                </ul>
                <div className="mt-auto">
                    <p className="text-xs font-bold text-green-800 uppercase mb-1">Biểu diễn:</p>
                    <div className="bg-white p-3 rounded text-center font-mono text-green-900 border border-green-200">
                        HCl <span className="font-bold text-xl mx-2">&rarr;</span> H<sup>+</sup> + Cl<sup>-</sup>
                        <p className="text-xs text-gray-400 mt-1">(Mũi tên một chiều)</p>
                    </div>
                </div>
            </div>

            {/* 2. Chất điện li YẾU */}
            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-yellow-500 text-white p-2 rounded-lg text-xl font-bold">⚡</span>
                    <h3 className="text-xl font-bold text-yellow-900">2. Chất điện li yếu</h3>
                </div>
                <p className="text-gray-700 mb-3 flex-1">
                    Là chất khi tan trong nước chỉ có <strong>một phần số phân tử</strong> hòa tan phân li ra ion, phần còn lại vẫn tồn tại dưới dạng phân tử.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4 bg-white p-3 rounded border border-yellow-100">
                    <li><strong>Axit yếu:</strong> CH<sub>3</sub>COOH, HF, H<sub>2</sub>CO<sub>3</sub>...</li>
                    <li><strong>Bazơ yếu:</strong> Mg(OH)<sub>2</sub>...</li>
                </ul>
                <div className="mt-auto">
                    <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Biểu diễn:</p>
                    <div className="bg-white p-3 rounded text-center font-mono text-yellow-900 border border-yellow-200">
                        CH<sub>3</sub>COOH <span className="font-bold text-xl mx-2">⇌</span> CH<sub>3</sub>COO<sup>-</sup> + H<sup>+</sup>
                        <p className="text-xs text-gray-400 mt-1">(Mũi tên hai chiều thuận nghịch)</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Video minh họa */}
      <section className="mt-8">
         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>📺</span>
                Video minh họa: So sánh độ sáng đèn của chất điện li mạnh và yếu
            </p>
            <div className="w-full h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/kpwarr1srBA" 
                    title="Thí nghiệm tính dẫn điện của dung dịch" 
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

export default Lesson_DienLi;