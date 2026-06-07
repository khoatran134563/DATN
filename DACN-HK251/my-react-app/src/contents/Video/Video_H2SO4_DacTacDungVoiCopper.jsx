import React from 'react';

const VIDEO_SRC = 'https://www.youtube.com/embed/iDZM0tzGuoQ'; 

const Video_H2SO4_DacTacDungVoiCopper = () => {
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
          Sulfuric acid đặc tác dụng với copper
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
            title="Sulfuric acid đặc tác dụng với copper"
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
                Minh họa tính oxi hóa mạnh của sulfuric acid đặc, nóng.
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <p className="font-bold text-orange-800 mb-2">2. Hiện tượng</p>
              <p className="text-gray-600 text-sm leading-6">
                Copper phản ứng với sulfuric acid đặc, nóng tạo dung dịch muối copper(II) sulfate và khí sulfur dioxide.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">3. Phương trình</p>
              <p className="font-mono text-gray-700 text-sm">
                Cu + 2H₂SO₄ đặc → CuSO₄ + SO₂↑ + 2H₂O
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-100 h-fit">
          <h4 className="font-bold text-red-800 mb-2">⚠️ Lưu ý an toàn</h4>
          <p className="text-sm text-red-700 leading-relaxed">
            Thí nghiệm với H₂SO₄ đặc và khí SO₂ cần được thực hiện trong điều kiện phòng thí nghiệm có kiểm soát.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_H2SO4_DacTacDungVoiCopper;