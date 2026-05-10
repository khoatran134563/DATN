import React from "react"

export default function GuideCard({
  loadedLabel,
  naohDrops,
  phenolDrops,
  status,
  description,
  instruction,
  turnedPink,
  onReset,
}) {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-md p-5">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Hướng dẫn thao tác</h2>

        <div className="space-y-3 text-sm text-slate-700 leading-6">
          <p>
            1. Bấm vào <span className="font-semibold">đầu bóp đỏ</span> của chai để nạp dung dịch.
          </p>
          <p>
            2. Kéo chai tới gần <span className="font-semibold">miệng ống nghiệm</span>.
          </p>
          <p>
            3. Nhấn giữ rồi thả ở đầu đỏ để nhỏ 1 giọt.
          </p>
          <p>
            4. Nhỏ <span className="font-semibold">NaOH trước</span>, sau đó nhỏ{" "}
            <span className="font-semibold">Phenolphthalein</span>.
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-200">
          <div className="text-sm text-slate-600">Gợi ý hiện tại</div>
          <div className="mt-1 text-sm font-medium text-slate-800">{instruction}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-5">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Trạng thái thí nghiệm</h2>

        <div className="space-y-2 text-sm text-slate-700">
          <div>
            <span className="font-semibold">Đang nạp:</span> {loadedLabel}
          </div>
          <div>
            <span className="font-semibold">Số giọt NaOH:</span> {naohDrops}
          </div>
          <div>
            <span className="font-semibold">Số giọt Phenolphthalein:</span> {phenolDrops}
          </div>
          <div>
            <span className="font-semibold">Hiện tượng:</span> {status}
          </div>
          <div>
            <span className="font-semibold">Màu xuất hiện:</span>{" "}
            {turnedPink ? "Đã chuyển hồng" : "Chưa chuyển hồng"}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-6">{description}</p>

        <button
          onClick={onReset}
          className="mt-5 w-full px-4 py-3 rounded-2xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition"
        >
          Reset thí nghiệm
        </button>
      </div>
    </>
  )
}