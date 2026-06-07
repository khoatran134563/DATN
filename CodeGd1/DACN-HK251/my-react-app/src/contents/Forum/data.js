// Cấu hình Role người dùng hiện tại
export const CURRENT_USER_ROLE = 'student'; 

// Dữ liệu bài viết
export const FORUM_POSTS = [
  {
    id: 1,
    category: "Thông báo chung",
    title: "Công bố danh sách đội tuyển Học sinh giỏi Hóa cấp Quốc gia năm 2025",
    excerpt: "Chúc mừng các em học sinh đã xuất sắc vượt qua vòng loại. Dưới đây là danh sách chính thức và lịch tập huấn đội tuyển tại Đại học Sư Phạm. Các em nhớ mang theo CCCD và thẻ học sinh khi đi tập trung.",
    author: "Nguyễn Văn Hóa",
    role: "Giáo viên chủ nhiệm",
    avatar: "H",
    avatarColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2 giờ trước",
    comments: 45
  },
  {
    id: 2,
    category: "Mẹo giải nhanh",
    title: "Phương pháp giải nhanh bài toán HNO3 tác dụng với hỗn hợp kim loại",
    excerpt: "Cô thấy nhiều bạn vẫn lúng túng khi gặp bài toán HNO3 tác dụng với hỗn hợp kim loại. Hôm nay cô chia sẻ phương pháp bảo toàn electron giúp giải quyết bài toán chỉ trong 30 giây.",
    author: "Lê Thu Thủy",
    role: "Giáo viên Hóa",
    avatar: "T",
    avatarColor: "bg-emerald-500",
    date: "5 giờ trước",
    comments: 12
  },
  {
    id: 3,
    category: "Giải đáp thắc mắc",
    title: "Giải thích hiện tượng: Tại sao Nhôm thụ động trong H2SO4 đặc nguội?",
    excerpt: "Nhiều em thắc mắc về vấn đề này. Nguyên nhân là do Nhôm tác dụng với H2SO4 đặc nguội tạo ra lớp màng oxit Al2O3 cực kỳ bền vững, ngăn cản kim loại bên trong tiếp xúc với axit.",
    author: "Trần Thị Bích",
    role: "Giáo viên Hóa",
    avatar: "B",
    avatarColor: "bg-orange-500",
    date: "1 ngày trước",
    comments: 28
  },
  {
    id: 4,
    category: "Tài liệu ôn thi",
    title: "Tổng hợp 50 câu trắc nghiệm Este - Lipit hay thi ĐH (Có đáp án chi tiết)",
    excerpt: "File tài liệu PDF đính kèm bên dưới bao gồm các câu hỏi từ mức độ nhận biết đến vận dụng cao. Các em tải về làm thử nhé, cuối tuần thầy sẽ livestream chữa bài này.",
    author: "Phạm Quốc Khánh",
    role: "Admin chuyên môn",
    avatar: "K",
    avatarColor: "bg-purple-600",
    date: "2 ngày trước",
    comments: 34
  },
  {
    id: 5,
    category: "Thông báo lớp",
    title: "Lịch kiểm tra 1 tiết tuần sau thay đổi sang sáng thứ 5",
    excerpt: "Do trùng lịch họp hội đồng, bài kiểm tra Hóa 11 sẽ dời sang sáng thứ 5 (tiết 2-3). Các em chú ý ôn tập kỹ phần Sự điện li và pH của dung dịch nhé.",
    author: "Nguyễn Thị Mai",
    role: "Giáo viên Hóa",
    avatar: "M",
    avatarColor: "bg-red-500",
    date: "3 ngày trước",
    comments: 56
  },
  {
    id: 6,
    category: "Góc chia sẻ",
    title: "Mẹo học thuộc Bảng tuần hoàn siêu tốc bằng thơ lục bát",
    excerpt: "Để giúp các em dễ nhớ nhóm IA, IIA, thầy đã sưu tầm bài thơ lục bát rất hay. Hy vọng cách này sẽ giúp các bạn 'mất gốc' lấy lại căn bản nhanh chóng.",
    author: "Vũ Hoàng",
    role: "Giáo viên Hóa",
    avatar: "V",
    avatarColor: "bg-indigo-500",
    date: "4 ngày trước",
    comments: 9
  },
  {
    id: 7,
    category: "Chuyên đề nâng cao",
    title: "Hướng dẫn cân bằng phản ứng oxi hóa khử phức tạp",
    excerpt: "Video bài giảng tuần này thầy sẽ hướng dẫn kỹ thuật cân bằng phương trình có môi trường, nhiều chất khử bằng phương pháp thăng bằng electron.",
    author: "Nguyễn Văn Nam",
    role: "Giáo viên Hóa",
    avatar: "N",
    avatarColor: "bg-pink-500",
    date: "5 ngày trước",
    comments: 13
  },
  {
    id: 8,
    category: "Tài liệu học tập",
    title: "Sơ đồ tư duy chương Nitơ - Photpho tóm tắt toàn bộ lý thuyết",
    excerpt: "Tóm tắt toàn bộ lý thuyết chương 2 giúp các em ôn tập học kỳ hiệu quả hơn. Sơ đồ này bao gồm tính chất vật lý, hóa học và điều chế.",
    author: "Phạm Thị Hương",
    role: "Giáo viên Hóa",
    avatar: "H",
    avatarColor: "bg-teal-500",
    date: "6 ngày trước",
    comments: 15
  }
];