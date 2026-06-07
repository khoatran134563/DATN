import React from 'react';

const VIDEO_SRC = 'https://www.youtube.com/embed/DnGTkhzlJG8'; 

const Video_Ammonia_TinhTanTrongNuoc = () => {
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
          Tính tan của ammonia trong nước
        </h1>
        <p className="text-gray-500 mt-2">
          Bài 4: Ammonia và một số hợp chất ammonium
        </p>
      </div>

      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video flex items-center justify-center text-white">
        {VIDEO_SRC ? (
          <iframe
            width="100%"
            height="100%"
            src={VIDEO_SRC}
            title="Tính tan của ammonia trong nước"
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
          <h3 className="text-xl font-bold text-blue-900 mb-4">Nội dung thí nghiệm</h3>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">1. Mục đích</p>
              <p className="text-gray-600 text-sm leading-6">
                Minh họa khả năng tan nhiều trong nước của khí ammonia.
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
              <p className="font-bold text-pink-800 mb-2">2. Hiện tượng</p>
              <p className="text-gray-600 text-sm leading-6">
                Nước có phenolphthalein bị hút vào bình và chuyển sang màu hồng.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">3. Kết luận</p>
              <p className="text-gray-600 text-sm leading-6">
                NH₃ tan nhiều trong nước và tạo môi trường base yếu.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
          <h4 className="font-bold text-yellow-800 mb-2">📝 Ghi nhớ</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. Dung dịch có tính base nên làm phenolphthalein chuyển màu hồng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_Ammonia_TinhTanTrongNuoc;