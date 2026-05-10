export const CLASS_DATA = {
  id: 1,
  name: "Hóa học 11 - Nâng cao (T2/T4/T6)",
  section: "Học kỳ 1 - 2025",
  code: "XCWPI",
  teacher: "Lê Thu Thủy",
  cover: "bg-gradient-to-r from-blue-600 to-cyan-500",
  
  // Dữ liệu Bảng tin
  posts: [
    {
      id: 1,
      author: "Lê Thu Thủy",
      avatar: "T",
      time: "12:30 hôm nay",
      content: "Chào cả lớp, cô đã up tài liệu ôn tập chương Sự điện li lên phần Bài tập nhé. Các em nhớ tải về xem trước.",
      comments: 2
    },
    {
      id: 2,
      author: "Nguyễn Văn A",
      avatar: "A",
      time: "Hôm qua",
      content: "Cô ơi bài tập về nhà hạn nộp là khi nào ạ?",
      comments: 1
    }
  ],

  // Dữ liệu Bài tập & Tài liệu
  assignments: [
    // BÀI 1: CÒN HẠN (ID: 101 -> Sẽ hiện nút Bắt đầu màu xanh)
    {
      id: 101,
      title: "Bài tập trắc nghiệm: Sự điện li",
      type: "quiz", 
      postedDate: "10 thg 12",
      deadline: "20 thg 12, 23:59", // Hạn còn xa
      status: "Đang diễn ra"
    },

    // BÀI 2: ĐÃ QUÁ HẠN (ID KHÁC 101 -> Sẽ hiện nút Xám "Đã hết thời gian")
    {
      id: 105, 
      title: "Kiểm tra 15 phút - Cân bằng hóa học",
      type: "quiz",
      postedDate: "01 thg 11",
      deadline: "05 thg 11, 23:59", // Hạn đã qua lâu lắc
      status: "Đã kết thúc"
    },

    // TÀI LIỆU
    {
      id: 102,
      title: "Tài liệu: Bảng tính tan & Màu sắc kết tủa",
      type: "material",
      postedDate: "09 thg 12",
      fileType: "PDF"
    },
    {
      id: 103,
      title: "Đề cương ôn tập Học kỳ 1",
      type: "material",
      postedDate: "08 thg 12",
      fileType: "DOCX"
    }
  ],

  // Dữ liệu Thành viên
  students: [
    { id: 1, name: "Võ Lý Đắc Duy", school: "THPT Chuyên Lê Hồng Phong", className: "11A1" },
    { id: 2, name: "Nguyễn Thiên Hải", school: "THPT Nguyễn Thượng Hiền", className: "11A4" },
    { id: 3, name: "Võ Nguyễn Gia Huy", school: "THPT Marie Curie", className: "11B2" },
    { id: 4, name: "Trần Đăng Khoa", school: "THPT Gia Định", className: "11CA" },
    { id: 5, name: "Nguyễn Tuấn Kiệt", school: "THPT Mạc Đĩnh Chi", className: "11A1" },
    { id: 6, name: "Nguyễn Xuân Minh", school: "THPT Bùi Thị Xuân", className: "11A2" },
    { id: 7, name: "Diệp Vũ Minh", school: "THPT Trần Đại Nghĩa", className: "11T1" },
  ]
};