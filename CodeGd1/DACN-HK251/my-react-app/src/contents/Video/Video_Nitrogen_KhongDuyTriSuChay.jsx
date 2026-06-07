import React from 'react';

const Video_Nitrogen_KhongDuyTriSuChay = () => {
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
          Nitrogen không duy trì sự cháy
        </h1>
        <p className="text-gray-500 mt-2">
          Bài 3: Đơn chất nitrogen
        </p>
      </div>

      <div className="bg-black rounded-xl overflow-hidden shadow-2xl w-full aspect-video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/zTJT47iebko?start=1"
          title="Thí nghiệm nitrogen không duy trì sự cháy"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
                Quan sát hiện tượng để chứng minh khí nitrogen không duy trì sự cháy.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="font-bold text-gray-800 mb-2">2. Hiện tượng</p>
              <p className="text-gray-600 text-sm leading-6">
                Khi đưa ngọn nến đang cháy vào bình chứa khí nitrogen, ngọn nến bị tắt.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <p className="font-bold text-green-800 mb-2">3. Kết luận</p>
              <p className="text-gray-600 text-sm leading-6">
                Nitrogen là khí khá trơ ở điều kiện thường và không duy trì sự cháy.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 h-fit">
          <h4 className="font-bold text-yellow-800 mb-2">📝 Ghi nhớ</h4>
          <p className="text-sm text-yellow-700 leading-relaxed">
            Không khí có khoảng 78% nitrogen, nhưng nitrogen không giúp vật cháy.
            Sự cháy cần oxygen để duy trì.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video_Nitrogen_KhongDuyTriSuChay;