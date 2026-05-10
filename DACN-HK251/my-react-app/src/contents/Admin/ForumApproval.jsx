import React, { useMemo, useState } from 'react';

// Dữ liệu giả lập: bài viết HIỆN CÓ (đã được duyệt/đang hiển thị cho HS)
const EXISTING_POSTS = [
  {
    id: 101,
    author: "Lê Thu Thủy (GV)",
    title: "Tổng hợp công thức hóa 10-11",
    content: "Cô gửi các em bảng tổng hợp công thức quan trọng để ôn tập...",
    date: "2023-12-05",
    status: "published",
  },
  {
    id: 102,
    author: "Nguyễn Văn A (GV)",
    title: "Lưu ý khi làm bài trắc nghiệm",
    content: "Các em chú ý đọc kỹ đề, so sánh đáp án và quản lý thời gian...",
    date: "2023-12-07",
    status: "published",
  },
];

// Dữ liệu giả lập: bài viết ĐANG CHỜ DUYỆT
const PENDING_POSTS = [
  { id: 1, author: "Lê Thu Thủy (GV)", title: "Chia sẻ tài liệu ôn thi HKI", content: "Cô gửi các em bộ đề cương ôn tập...", date: "2023-12-10", status: "pending" },
  { id: 2, author: "Nguyễn Văn A (GV)", title: "Thắc mắc về bài tập Ankan", content: "Có bạn nào giải thích giúp thầy...", date: "2023-12-11", status: "pending" },
  { id: 3, author: "Trần Thị B (GV)", title: "Thông báo nghỉ tết", content: "Lịch nghỉ tết của trường...", date: "2023-12-12", status: "pending" },
];

const ForumApproval = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'existing' | 'pending'
  const [pendingPosts, setPendingPosts] = useState(PENDING_POSTS);
  const [existingPosts] = useState(EXISTING_POSTS);

  const counts = useMemo(() => {
    return {
      existing: existingPosts.length,
      pending: pendingPosts.length,
    };
  }, [existingPosts.length, pendingPosts.length]);

  const headerRightText =
    activeTab === 'pending'
      ? 'Danh sách bài viết cần duyệt'
      : 'Danh sách bài viết đang hiển thị';

  const subText =
    activeTab === 'pending'
      ? 'Duyệt hoặc từ chối để quản lý nội dung trước khi hiển thị cho học sinh.'
      : 'Các bài viết này đang hiển thị cho học sinh xem trong Forum.';

  const handleApprove = (id) => {
    // Giả lập: duyệt xong thì remove khỏi pending
    setPendingPosts((prev) => prev.filter((p) => p.id !== id));
    alert("Đã duyệt bài viết thành công!");
  };

  const handleReject = (id) => {
    if (window.confirm("Bạn muốn từ chối bài viết này?")) {
      setPendingPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const listData = activeTab === 'pending' ? pendingPosts : existingPosts;

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Forum</h2>
        <p className="text-gray-500 text-sm mt-1">Quản lý các bài viết của diễn đàn</p>
      </div>

      {/* TOP NAV (Solution 1: Underline Tabs) */}
      <div className="mb-4 flex items-end justify-between">
        <div className="flex items-center gap-6 border-b border-gray-200">
          {/* TAB: Hiện có */}
          <button
            type="button"
            onClick={() => setActiveTab('existing')}
            className={[
              "relative -mb-px pb-3 text-sm font-semibold transition",
              activeTab === 'existing'
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-2">
              Hiện có
              <span
                className={[
                  "inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 rounded-full text-xs font-bold",
                  activeTab === 'existing'
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                ].join(" ")}
              >
                {counts.existing}
              </span>
            </span>

            {/* underline */}
            <span
              className={[
                "absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition",
                activeTab === 'existing' ? "bg-blue-600" : "bg-transparent"
              ].join(" ")}
            />
          </button>

          {/* TAB: Đang chờ */}
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={[
              "relative -mb-px pb-3 text-sm font-semibold transition",
              activeTab === 'pending'
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-2">
              Đang chờ
              <span
                className={[
                  "inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 rounded-full text-xs font-bold",
                  activeTab === 'pending'
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                ].join(" ")}
              >
                {counts.pending}
              </span>
            </span>

            {/* underline */}
            <span
              className={[
                "absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition",
                activeTab === 'pending' ? "bg-blue-600" : "bg-transparent"
              ].join(" ")}
            />
          </button>
        </div>

        {/* Right context */}
        <div className="text-right">
          <div className="text-sm font-bold text-gray-800">{headerRightText}</div>
          <div className="text-xs text-gray-500 mt-1">{subText}</div>
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {listData.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {listData.map((post) => (
                <div
                  key={post.id}
                  className="p-6 hover:bg-gray-50 transition flex flex-col sm:flex-row gap-4 sm:items-start"
                >
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>

                      {/* Badge trạng thái */}
                      {post.status === 'pending' && (
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      {post.status === 'published' && (
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">
                          Hiển thị
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{post.content}</p>
                  </div>

                  {/* Actions: chỉ hiện khi tab Pending */}
                  {activeTab === 'pending' && (
                    <div className="flex gap-2 sm:flex-col sm:w-32 shrink-0">
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded shadow-sm transition flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(post.id)}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold py-2 px-3 rounded shadow-sm transition flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Từ chối
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
              <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                {activeTab === 'pending'
                  ? 'Không có bài viết nào cần duyệt.'
                  : 'Chưa có bài viết nào đang hiển thị.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumApproval;
