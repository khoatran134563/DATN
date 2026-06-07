import React from 'react';

const VIDEO_SRC = 'https://www.youtube.com/embed/d_kbooVQJSY'; // Dán link embed YouTube vào đây

const Video_H2SO4_LoangKimLoai = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-3 text-purple-600 mb-2">
          <span className="text-xl">🎬</span>
          <span className="font-bold uppercase tracking-wider text-sm">
            Video Minh Họa Thí Nghiệm
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Sulfuric acid loãng tác dụng với kim loại
        </h1>
        <p className="text-gray-500 mt-2">
          Bài 7: Sulfuric acid và muối sulfate
        </p>
      </div>

      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video flex items-center justify-center text-white">
        {VIDEO_SRC ? (
          <iframe
            width="100%"
            height="100%"
            src={VIDEO_SRC}
            title="Sulfuric acid loãng tác dụng với kim loại"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <span>Video đang cập nhật</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Nội dung thí nghiệm
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">1. Mục đích</p>
              <p className="text-gray-600 text-sm leading-6">
                Minh họa tính acid của dung dịch sulfuric acid loãng khi tác dụng với kim loại hoạt động.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-bold text-gray-800 mb-2">2. Hiện tượng</p>
              <p className="text-gray-600 text-sm leading-6">
                Với kim loại hoạt động như Zn, có khí thoát ra. Với Cu ở điều kiện thường, phản ứng không xảy ra rõ rệt.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">3. Phương trình minh họa</p>
              <p className="font-mono text-gray-700 text-sm">
                Zn + H₂SO₄ → ZnSO₄ + H₂↑
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
          <h4 className="font-bold text-yellow-800 mb-2">📝 Ghi nhớ</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            H₂SO₄ loãng có tính acid mạnh, phản ứng với kim loại đứng trước hydrogen trong dãy hoạt động hóa học.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_H2SO4_LoangKimLoai;