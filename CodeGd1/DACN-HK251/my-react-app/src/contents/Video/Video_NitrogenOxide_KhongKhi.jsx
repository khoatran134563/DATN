import React from 'react';

const VIDEO_SRC = 'https://www.youtube.com/embed/XspUcSdfVNA'; // Dán link embed YouTube mô phỏng vào đây

const Video_NitrogenOxide_KhongKhi = () => {
  return (
    <div className="space-y-6 animate-fade-in text-gray-800">
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-3 text-purple-600 mb-2">
          <span className="text-xl">🎬</span>
          <span className="font-bold uppercase tracking-wider text-sm">
            Video Minh Họa Hiện Tượng
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Sự tạo thành nitrogen oxide trong không khí
        </h1>
        <p className="text-gray-500 mt-2">
          Bài 5: Một số hợp chất với oxygen của nitrogen
        </p>
      </div>

      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video flex items-center justify-center text-white">
        {VIDEO_SRC ? (
          <iframe
            width="100%"
            height="100%"
            src={VIDEO_SRC}
            title="Sự tạo thành nitrogen oxide trong không khí"
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
            Nội dung minh họa
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">1. Mục đích</p>
              <p className="text-gray-600 text-sm leading-6">
                Minh họa quá trình nitrogen trong không khí tạo oxide ở điều kiện nhiệt độ cao.
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <p className="font-bold text-orange-800 mb-2">2. Hiện tượng liên quan</p>
              <p className="text-gray-600 text-sm leading-6">
                Khi có sấm sét hoặc quá trình cháy ở nhiệt độ cao, N₂ và O₂ trong không khí có thể tạo NO, sau đó NO tiếp tục bị oxi hóa thành NO₂.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">3. Phương trình minh họa</p>
              <p className="font-mono text-gray-700 text-sm leading-7">
                N₂ + O₂ → 2NO<br />
                2NO + O₂ → 2NO₂
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
          <h4 className="font-bold text-yellow-800 mb-2">📝 Ghi nhớ</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            Nitrogen khá trơ ở điều kiện thường, nhưng ở nhiệt độ cao có thể phản ứng với oxygen tạo oxide của nitrogen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_NitrogenOxide_KhongKhi;