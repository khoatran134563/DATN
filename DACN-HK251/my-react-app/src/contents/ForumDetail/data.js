export const POST_DETAIL = {
  id: 1,
  category: "MẸO GIẢI NHANH",
  date: "Thứ sáu, 12/12/2025, 20:00 (GMT+7)",
  title: "Phương pháp giải nhanh bài toán HNO3 tác dụng với hỗn hợp kim loại",
  description: "Cô thấy nhiều bạn vẫn lúng túng khi gặp bài toán HNO3 tác dụng với hỗn hợp kim loại. Hôm nay cô chia sẻ phương pháp bảo toàn electron giúp giải quyết bài toán chỉ trong 30 giây.",
  content: [
    "Trong các bài thi THPT Quốc gia, bài toán kim loại tác dụng với axit HNO3 luôn chiếm một vị trí quan trọng. Tuy nhiên, nếu giải theo cách viết phương trình phản ứng thông thường, các em sẽ mất rất nhiều thời gian để cân bằng.",
    "Nguyên tắc cốt lõi của phương pháp bảo toàn electron là: Tổng số mol electron do chất khử nhường bằng tổng số mol electron do chất oxi hóa nhận. Chúng ta không cần quan tâm đến các giai đoạn trung gian của phản ứng.",
    "Ví dụ: Hòa tan hoàn toàn 12g hỗn hợp Fe và Cu vào dung dịch HNO3 đặc nóng dư, thu được 11,2 lít khí NO2 (đktc). Tính khối lượng muối thu được. Áp dụng công thức tính nhanh: m(muối) = m(kim loại) + 62 * n(e trao đổi).",
    "Các em hãy thử áp dụng công thức này vào các bài tập cô đính kèm bên dưới nhé. Chúc các em học tốt!"
  ],
  author: "Lê Thu Thủy",
  commentsCount: 18
};

export const COMMENTS = [
  {
    id: 1,
    user: "Trần Minh Tuấn",
    avatar: "M",
    avatarColor: "bg-orange-500",
    content: "Cách này hay quá cô ơi! Trước giờ em toàn ngồi cân bằng phương trình mỏi cả tay mà hay bị sai hệ số.",
    time: "4h trước",
    likes: 15,
    replies: [
      {
        id: 101,
        user: "Lê Thu Thủy",
        avatar: "T",
        avatarColor: "bg-emerald-500",
        isAuthor: true,
        content: "Cố gắng luyện tập thêm các dạng bài tập cô gửi nhé em. Chú ý trường hợp có muối NH4NO3 nữa nhé.",
        time: "3h trước",
        likes: 5
      }
    ]
  },
  {
    id: 2,
    user: "Nguyễn Văn Nam",
    avatar: "N",
    avatarColor: "bg-blue-500",
    content: "Cô ơi cho em hỏi nếu đề bài cho sản phẩm khử là hỗn hợp khí NO và N2O thì mình xử lý số mol e nhận như thế nào ạ?",
    time: "1 ngày trước",
    likes: 2,
    replies: []
  },
  {
    id: 3,
    user: "Phạm Thị Hương",
    avatar: "H",
    avatarColor: "bg-purple-500",
    content: "Phương pháp này áp dụng cho bài toán H2SO4 đặc nóng được không ạ?",
    time: "2 ngày trước",
    likes: 0,
    replies: []
  }
];