import React from 'react';

const VIDEO_SRC = 'https://www.youtube.com/embed/b-YhferbBFk'; // Dán link embed YouTube về phú dưỡng vào đây

const Video_PhuDuong = () => {
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
          Hiện tượng phú dưỡng
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
            title="Hiện tượng phú dưỡng"
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
                Minh họa hiện tượng ao hồ nhận quá nhiều chất dinh dưỡng, làm tảo phát triển mạnh.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">2. Hiện tượng</p>
              <p className="text-gray-600 text-sm leading-6">
                Tảo phát triển nhanh tạo lớp màu xanh trên mặt nước, làm giảm ánh sáng và giảm lượng oxygen hòa tan.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <p className="font-bold text-red-800 mb-2">3. Hậu quả</p>
              <p className="text-gray-600 text-sm leading-6">
                Khi oxygen trong nước giảm, sinh vật thủy sinh có thể bị ảnh hưởng nghiêm trọng.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
          <h4 className="font-bold text-yellow-800 mb-2">📝 Ghi nhớ</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            Phú dưỡng thường liên quan đến lượng chất dinh dưỡng dư thừa như nitrate, phosphate trong môi trường nước.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_PhuDuong;