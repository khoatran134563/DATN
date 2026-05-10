export const QUIZ_DATA = {
  id: 101,
  title: "Bài tập trắc nghiệm: Sự điện li & Cân bằng hóa học",
  duration: 15 * 60, 
  questions: [
    {
      id: 1,
      type: 'multiple-choice',
      text: "Chất nào sau đây là chất điện li mạnh?",
      score: 1.00,
      options: ["A. H2O", "B. C2H5OH", "C. NaCl", "D. CH3COOH"],
      correctAnswer: "C. NaCl" // Đáp án đúng
    },
    {
      id: 2,
      type: 'fill-in',
      text: "Cho trước giá trị của biến a là 5. Hãy tính kết quả của biểu thức: a + 10?",
      subText: "Điền số nguyên vào ô trống.",
      score: 2.00,
      correctAnswer: "15" // Đáp án đúng
    },
    {
      id: 3,
      type: 'multiple-choice',
      text: "Trong dung dịch axit axetic (CH3COOH) có những phần tử nào (bỏ qua sự phân li của nước)?",
      score: 1.00,
      options: ["A. H+, CH3COO-", "B. H+, CH3COO-, H2O", "C. CH3COOH, H+, CH3COO-, H2O", "D. CH3COOH, CH3COO-, H+"],
      correctAnswer: "C. CH3COOH, H+, CH3COO-, H2O"
    },
    {
      id: 4,
      type: 'fill-in',
      text: "pH của dung dịch HCl 0.01M là bao nhiêu?",
      subText: "Nhập kết quả chính xác.",
      score: 1.00,
      correctAnswer: "2"
    }
  ]
};