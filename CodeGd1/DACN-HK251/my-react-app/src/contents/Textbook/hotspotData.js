export const HOTSPOTS = [
  // =========================
  // PAGE 1: BÌA SÁCH
  // Nút "Bắt đầu học" → nhảy tới mục lục
  // =========================
  {
    id: 'p1-start-learning',
    page: 1,
    type: 'start',
    label: 'Bắt đầu học',
    x: 13.2,
    y: 94.48,
    width: 24,
    height: 5,
    action: {
      type: 'scroll',
      page: 6,
    },
  },

  // =========================
// PAGE 6: MỤC LỤC
// Vùng click bao quanh số trang ở cuối dòng bài học
// Lưu ý: page app = trang in SGK + 2
// =========================
{
  id: 'toc-bai-1',
  page: 6,
  type: 'toc',
  label: 'Bài 1. Khái niệm về cân bằng hóa học',
  x: 44.78,
  y: 33.39,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 7,
  },
},
{
  id: 'toc-bai-2',
  page: 6,
  type: 'toc',
  label: 'Bài 2. Cân bằng trong dung dịch nước',
  x: 44.78,
  y: 38,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 14,
  },
},
{
  id: 'toc-bai-3',
  page: 6,
  type: 'toc',
  label: 'Bài 3. Đơn chất nitrogen',
  x: 44.78,
  y: 47.5,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 22,
  },
},
{
  id: 'toc-bai-4',
  page: 6,
  type: 'toc',
  label: 'Bài 4. Ammonia và một số hợp chất ammonium',
  x: 44.78,
  y: 52.3,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 26,
  },
},
{
  id: 'toc-bai-5',
  page: 6,
  type: 'toc',
  label: 'Bài 5. Một số hợp chất với oxygen của nitrogen',
  x: 44.78,
  y: 57,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 32,
  },
},
{
  id: 'toc-bai-6',
  page: 6,
  type: 'toc',
  label: 'Bài 6. Sulfur và sulfur dioxide',
  x: 44.78,
  y: 59.5,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 37,
  },
},
{
  id: 'toc-bai-7',
  page: 6,
  type: 'toc',
  label: 'Bài 7. Sulfuric acid và muối sulfate',
  x: 44.78,
  y: 64.2,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 42,
  },
},
{
  id: 'toc-bai-8',
  page: 6,
  type: 'toc',
  label: 'Bài 8. Hợp chất hữu cơ và hóa học hữu cơ',
  x: 44.78,
  y: 75.8,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 48,
  },
},
{
  id: 'toc-bai-9',
  page: 6,
  type: 'toc',
  label: 'Bài 9. Phương pháp tách và tinh chế hợp chất hữu cơ',
  x: 44.78,
  y: 80.2,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 54,
  },
},

// Cột phải của trang mục lục
{
  id: 'toc-bai-10',
  page: 6,
  type: 'toc',
  label: 'Bài 10. Công thức phân tử hợp chất hữu cơ',
  x: 86.7,
  y: 21.8,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 59,
  },
},
{
  id: 'toc-bai-11',
  page: 6,
  type: 'toc',
  label: 'Bài 11. Cấu tạo hóa học hợp chất hữu cơ',
  x: 86.7,
  y: 26.5,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 63,
  },
},
{
  id: 'toc-bai-12',
  page: 6,
  type: 'toc',
  label: 'Bài 12. Alkane',
  x: 86.7,
  y: 35.9,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 68,
  },
},
{
  id: 'toc-bai-13',
  page: 6,
  type: 'toc',
  label: 'Bài 13. Hydrocarbon không no',
  x: 86.7,
  y: 38.4,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 76,
  },
},
{
  id: 'toc-bai-14',
  page: 6,
  type: 'toc',
  label: 'Bài 14. Arene',
  x: 86.7,
  y: 42.6,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 87,
  },
},
{
  id: 'toc-bai-15',
  page: 6,
  type: 'toc',
  label: 'Bài 15. Dẫn xuất halogen',
  x: 86.7,
  y: 52.2,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 94,
  },
},
{
  id: 'toc-bai-16',
  page: 6,
  type: 'toc',
  label: 'Bài 16. Alcohol',
  x: 86.7,
  y: 54.5,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 101,
  },
},
{
  id: 'toc-bai-17',
  page: 6,
  type: 'toc',
  label: 'Bài 17. Phenol',
  x: 86,
  y: 56.8,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 110,
  },
},
{
  id: 'toc-bai-18',
  page: 6,
  type: 'toc',
  label: 'Bài 18. Hợp chất carbonyl',
  x: 86,
  y: 68.45,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 117,
  },
},
{
  id: 'toc-bai-19',
  page: 6,
  type: 'toc',
  label: 'Bài 19. Carboxylic acid',
  x: 86,
  y: 71,
  width: 6.2,
  height: 3.2,
  action: {
    type: 'scroll',
    page: 126,
  },
},

  // ===== PAGE 7 - BÀI 1 =====
    {
    id: 'p7-video-bai-hoc',
    page: 7,
    type: 'video',
    variant: 'ghost',
    align: 'right',
    icon: '▶',
    label: 'Video bài học',
    x: 93,
    y: 17.5,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'video',
        modalSize: 'md',
        title: 'Video bài học - Khái niệm về cân bằng hóa học',
        url: 'https://www.youtube.com/embed/BioKpQql4io',
    },
    },
    {
    id: 'p7-cau-hoi-mo-dau',
    page: 7,
    type: 'note',
    variant: 'ghost',
    align: 'right',
    icon: '?',
    label: 'Câu hỏi mở đầu',
    x: 93,
    y: 46,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'note',
        modalSize: 'sm',
        title: 'Câu hỏi mở đầu',
        content:
        'Vì sao phản ứng tạo ammonia trong công nghiệp không hoàn toàn tạo thành ammonia với hiệu suất 100%?',
        hint:
        'Phản ứng tổng hợp ammonia là phản ứng thuận nghịch. Khi phản ứng đạt trạng thái cân bằng, phản ứng thuận và phản ứng nghịch vẫn tiếp tục xảy ra với tốc độ bằng nhau, nên không phải toàn bộ N₂ và H₂ đều chuyển hết thành NH₃.',
    },
    },
    {
    id: 'p7-video-ammonia',
    page: 7,
    type: 'video',
    variant: 'ghost',
    align: 'right',
    icon: '►',
    label: 'Mô phỏng công nghiệp ammonia',
    x: 93,
    y: 51,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'video',
        modalSize: 'md',
        title: 'Mô phỏng công nghiệp ammonia',
        url: 'https://www.youtube.com/embed/wyTtn4B4hyQ',
    },
    },
    {
    id: 'p7-thi-nghiem-kmno4',
    page: 7,
    type: 'video',
    variant: 'ghost',
    align: 'left',
    icon: '►',
    label: 'Thí nghiệm KMnO4',
    x: 3,
    y: 71.3,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'video',
        modalSize: 'md',
        title: 'Thí nghiệm phân hủy KMnO4',
        url: 'https://www.youtube.com/embed/1QdJaU46quE',
    },
    },
    {
    id: 'p7-tra-loi-cau-1',
    page: 7,
    type: 'quiz',
    variant: 'ghost',
    align: 'right',
    icon: '✓',
    label: 'Trả lời câu hỏi 1',
    x: 93,
    y: 72,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'quiz',
        modalSize: 'md',
        title: 'Trả lời câu hỏi 1',
        prompt:
        'Dựa vào phương trình hóa học của phản ứng điều chế khí oxygen từ KMnO4, em hãy cho biết phản ứng có xảy ra theo chiều ngược lại được không?',
        options: [
        {
            id: 'yes',
            text: 'Có, phản ứng có thể xảy ra theo chiều ngược lại.',
        },
        {
            id: 'no',
            text: 'Không, trong điều kiện thí nghiệm này phản ứng được xem là một chiều.',
        },
        ],
        correctOptionId: 'no',
        explanation:
        'Đáp án đúng là "Không". Trong điều kiện thí nghiệm đang xét, phản ứng nhiệt phân KMnO4 được xem là phản ứng một chiều, vì sản phẩm tạo thành không tự phản ứng trở lại để tạo chất ban đầu trong cùng điều kiện đó.',
    },
    },
    {
    id: 'p7-bai-tap-nhanh',
    page: 7,
    type: 'quiz',
    variant: 'ghost',
    align: 'right',
    icon: '✎',
    label: 'Làm b.tập nhanh',
    x: 93,
    y: 86,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'quiz',
        modalSize: 'sm',
        title: 'Bài tập nhanh',
        prompt: 'Cho các phản ứng sau, có bao nhiêu phản ứng một chiều?',
        equations: [
        '1) 2KMnO4 → K2MnO4 + MnO2 + O2↑',
        '2) Cl2 + H2O ⇌ HCl + HClO',
        '3) N2 + 3H2 ⇌ 2NH3',
        '4) CaCO3 → CaO + CO2↑',
        '5) AgNO3 + NaCl → AgCl↓ + NaNO3',
        '6) 2SO2 + O2 ⇌ 2SO3',
        ],
        options: [
        { id: '2', text: '2' },
        { id: '3', text: '3' },
        { id: '4', text: '4' },
        { id: '5', text: '5' },
        ],
        correctOptionId: '3',
        explanation:
        'Đáp án đúng là 3. Các phản ứng một chiều là: (1) nhiệt phân KMnO4, (4) nhiệt phân CaCO3 trong điều kiện nung, (5) phản ứng tạo kết tủa AgCl. Các phản ứng (2), (3), (6) là phản ứng thuận nghịch nên không tính là phản ứng một chiều.',
    },
    },
    // ===== PAGE 8 - PHẢN ỨNG THUẬN NGHỊCH + TRẠNG THÁI CÂN BẰNG =====

{
  id: 'p8-cau-hoi-2',
  page: 8,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 2',
  x: 93,
  y: 11.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 2',
    content:
      'Phản ứng Cl₂ tác dụng với H₂O có đặc điểm gì khác với phản ứng nhiệt phân thuốc tím?',
    hint:
      'Phản ứng Cl₂ với H₂O là phản ứng thuận nghịch, vì trong cùng điều kiện phản ứng có thể xảy ra theo cả chiều thuận và chiều nghịch. Còn phản ứng nhiệt phân KMnO₄ ở trang trước được xem là phản ứng một chiều trong điều kiện thí nghiệm đang xét.',
  },
},
{
  id: 'p8-kiem-tra-phuong-trinh',
  page: 8,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Kiểm tra PT',
  x: 93,
  y: 24,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Kiểm tra phương trình',
    prompt:
      'Trong thực tế có các phản ứng sau:\n\n(1) 2H₂ + O₂ → 2H₂O\n(2) 2H₂O → 2H₂ + O₂  (điện phân)\n\nVậy có thể viết 2H₂ + O₂ ⇌ 2H₂O được không?',
    options: [
      {
        id: 'yes',
        text: 'Có, vì hai phản ứng có chiều ngược nhau.',
      },
      {
        id: 'no',
        text: 'Không, vì hai phản ứng không xảy ra trong cùng điều kiện.',
      },
    ],
    correctOptionId: 'no',
    explanation:
      'Đáp án đúng là "Không". Phản ứng thuận nghịch phải xảy ra theo cả hai chiều trong cùng một điều kiện. Ở đây, phản ứng tạo nước từ H₂ và O₂ xảy ra theo điều kiện khác, còn phản ứng phân hủy nước thành H₂ và O₂ cần có dòng điện để điện phân. Vì hai chiều không xảy ra trong cùng điều kiện nên không viết là 2H₂ + O₂ ⇌ 2H₂O.',
  },
},
{
  id: 'p8-tra-loi-cau-3',
  page: 8,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 3',
  x: 93,
  y: 46,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Trả lời câu hỏi 3',
    content:
      'Quan sát Hình 1.1, nhận xét sự biến thiên nồng độ của các chất trong hệ phản ứng theo thời gian.',
    hint:
      'Trong Hình 1.1, nồng độ của N₂ và H₂ giảm dần theo thời gian vì N₂ và H₂ là các chất tham gia phản ứng. Ngược lại, nồng độ của NH₃ tăng dần vì NH₃ là sản phẩm được tạo thành.\n\nSau một khoảng thời gian, nồng độ của cả N₂, H₂ và NH₃ đều không còn thay đổi rõ rệt mà trở nên gần như không đổi. Điều đó cho thấy hệ phản ứng đã đạt trạng thái cân bằng hóa học.\n\nKết luận: khi hệ đạt cân bằng, nồng độ các chất trong hệ không đổi theo thời gian, mặc dù phản ứng thuận và phản ứng nghịch vẫn tiếp tục xảy ra.',
  },
},
{
  id: 'p8-tra-loi-cau-4',
  page: 8,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 4',
  x: 93,
  y: 64,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Trả lời câu hỏi 4',
    content:
      'Quan sát Hình 1.2, nhận xét về tốc độ của phản ứng thuận và tốc độ của phản ứng nghịch theo thời gian trong điều kiện nhiệt độ không đổi.',
    hint:
      'Trong Hình 1.2, lúc đầu tốc độ phản ứng thuận lớn vì nồng độ các chất phản ứng còn cao. Theo thời gian, tốc độ phản ứng thuận giảm dần do lượng chất phản ứng giảm.\n\nNgược lại, tốc độ phản ứng nghịch ban đầu rất nhỏ, sau đó tăng dần vì sản phẩm được tạo ra ngày càng nhiều.\n\nĐến một thời điểm, tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch. Khi đó, hệ đạt trạng thái cân bằng hóa học.\n\nKết luận: cân bằng hóa học là cân bằng động, vì phản ứng thuận và phản ứng nghịch vẫn xảy ra nhưng với tốc độ bằng nhau nên thành phần của hệ không đổi theo thời gian.',
  },
},


// ===== PAGE 9 - HẰNG SỐ CÂN BẰNG KC =====
{
  id: 'p9-doc-bang-so-lieu',
  page: 9,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Đọc bảng số liệu',
  x: 3,
  y: 22.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Đọc bảng số liệu',
    content:
      'Bảng 1.1 cho biết nồng độ ban đầu và nồng độ ở trạng thái cân bằng của NO₂ và N₂O₄ trong 5 thí nghiệm.',
    hint:
  'Ở mỗi thí nghiệm, ta chú ý hai giá trị tại trạng thái cân bằng: [NO₂] và [N₂O₄].\n\n' +
  'Từ các giá trị này có thể tính biểu thức Kc = [N₂O₄]/[NO₂]².\n' +
  'Nếu tính ở nhiều thí nghiệm mà giá trị thu được gần như không đổi, ta có cơ sở kết luận đó là hằng số cân bằng của phản ứng ở nhiệt độ xác định.',
  },
},
{
  id: 'p9-tinh-kc-tu-bang',
  page: 9,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Tính Kc từ bảng',
  x: 93,
  y: 16.4,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Tính Kc từ bảng',
    prompt:
      'Dựa vào thí nghiệm 1, biết [NO₂] = 0,0547 mol/L và [N₂O₄] = 0,6430 mol/L. Giá trị gần đúng của Kc = [N₂O₄]/[NO₂]² là bao nhiêu?',
    options: [
      {
        id: 'A',
        text: '21,5',
      },
      {
        id: 'B',
        text: '215',
      },
      {
        id: 'C',
        text: '2,15',
      },
      {
        id: 'D',
        text: '0,215',
      },
    ],
    correctOptionId: 'B',
    explanation:
      'Đáp án đúng là 215.\n' + 'Ta có Kc = [N₂O₄]/[NO₂]² = 0,6430/(0,0547)² ≈ 214,9, xấp xỉ 215.',
  },
},
{
  id: 'p9-chat-ran-khong-co-trong-kc',
  page: 9,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Chất rắn trong Kc',
  x: 3,
  y: 52.7,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Vì sao chất rắn không xuất hiện trong Kc?',
    content:
      'Trong biểu thức hằng số cân bằng, chất rắn tinh khiết không được đưa vào biểu thức Kc.',
    hint:
      'Lý do là hoạt độ của chất rắn tinh khiết được xem như không đổi trong quá trình phản ứng. Vì giá trị này không làm thay đổi hằng số cân bằng, nó được gộp vào hằng số và không viết trong biểu thức Kc.\n\nTương tự, chất lỏng tinh khiết thường cũng không xuất hiện trong biểu thức hằng số cân bằng.',
  },
},
{
  id: 'p9-cau-hoi-6',
  page: 9,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 6',
  x: 93,
  y: 30.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 6',
    content:
      'Viết các biểu thức tính tốc độ phản ứng thuận và tốc độ phản ứng nghịch của phản ứng đơn giản:\n\naA + bB ⇌ cC + dD\n\nSau đó lập tỉ lệ giữa hằng số tốc độ phản ứng thuận và hằng số tốc độ phản ứng nghịch ở trạng thái cân bằng.',
    hint:
  'Với phản ứng thuận:\n' +
  'vt = kt[A]ᵃ[B]ᵇ\n\n' +
  'Với phản ứng nghịch:\n' +
  'vn = kn[C]ᶜ[D]ᵈ\n\n' +
  'Tại trạng thái cân bằng:\n' +
  'vt = vn\n\n' +
  'Suy ra:\n' +
  'kt[A]ᵃ[B]ᵇ = kn[C]ᶜ[D]ᵈ\n\n' +
  'Chuyển vế:\n' +
  'kt/kn = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ\n' +
  'Mà Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ, nên có thể thấy Kc = kt/kn.',
  },
},
{
  id: 'p9-bai-tap-kc',
  page: 9,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài tập Kc',
  x: 93,
  y: 62.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Viết biểu thức Kc',
    prompt:
      'Cho hệ cân bằng:\n\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\n\nBiểu thức hằng số cân bằng Kc của phản ứng trên là:',
    options: [
      {
        id: 'A',
        text: 'Kc = [SO₃]² / ([SO₂]²[O₂])',
      },
      {
        id: 'B',
        text: 'Kc = [SO₂]²[O₂] / [SO₃]²',
      },
      {
        id: 'C',
        text: 'Kc = [SO₃] / ([SO₂][O₂])',
      },
      {
        id: 'D',
        text: 'Kc = [SO₂][O₂] / [SO₃]',
      },
    ],
    correctOptionId: 'A',
    explanation:
      'Đáp án đúng là A. Với phản ứng 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), sản phẩm SO₃ được đặt ở tử số, chất tham gia SO₂ và O₂ đặt ở mẫu số. Hệ số cân bằng trở thành số mũ, nên Kc = [SO₃]² / ([SO₂]²[O₂]).',
  },
},
{
  id: 'p9-y-nghia-kc',
  page: 9,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Ý nghĩa Kc',
  x: 3,
  y: 66.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Ý nghĩa của Kc',
    content:
      'Hằng số cân bằng Kc cho biết mức độ xảy ra của phản ứng ở trạng thái cân bằng.',
 hint:
  'Nếu Kc lớn, cân bằng nghiêng nhiều về phía sản phẩm.\n' +
  'Nếu Kc nhỏ, cân bằng nghiêng về phía chất phản ứng.\n' +
  'Giá trị Kc chỉ xác định tại một nhiệt độ nhất định.',
  },
},
 {
    id: 'p9-video-chuyendich',
    page: 9,
    type: 'video',
    variant: 'ghost',
    align: 'left',
    icon: '►',
    label: 'Video chuyển dịch cân bằng',
    x: 3,
    y: 84,
    width: 4.4,
    height: 4.4,
    action: {
        type: 'video',
        modalSize: 'md',
        title: 'Sự chuyển dịch cân bằng của phản ứng',
        url: 'https://www.youtube.com/embed/6ihArvsCamA',
    },
    },


    // ===== PAGE 10 - CHUYỂN DỊCH CÂN BẰNG HÓA HỌC =====
  {
    id: 'p10-lab-3d-no2',
    page: 10,
    type: 'lab',
    variant: 'ghost',
    align: 'left',
    icon: '△',
    label: 'Mô phỏng 3D NO₂',
    x: 3,
    y: 9,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'lab3d',
      modalSize: 'xl',
      title: 'Mô phỏng 3D: Ảnh hưởng của nhiệt độ đến cân bằng NO₂ ⇌ N₂O₄',
      url: '/textbook-lab/no2',
    },
  },
  {
    id: 'p10-cau-hoi-7',
    page: 10,
    type: 'note',
    variant: 'ghost',
    align: 'right',
    icon: '?',
    label: 'Câu hỏi 7',
    x: 93,
    y: 11.5,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'note',
      modalSize: 'sm',
      title: 'Câu hỏi 7',
      content:
        'Nêu hiện tượng xảy ra trong Thí nghiệm 1, từ đó cho biết chiều chuyển dịch cân bằng của phản ứng trong bình 2 và bình 3.',
      hint:
        'Cân bằng đang xét là:\n2NO₂(g) ⇌ N₂O₄(g)\n\nNO₂ có màu nâu đỏ, còn N₂O₄ không màu.\n\nBình 2 được ngâm trong nước đá nên nhiệt độ giảm. Khi làm lạnh, màu nâu đỏ nhạt đi, chứng tỏ cân bằng chuyển dịch theo chiều tạo N₂O₄.\n\nBình 3 được ngâm trong nước nóng nên nhiệt độ tăng. Khi đun nóng, màu nâu đỏ đậm hơn, chứng tỏ cân bằng chuyển dịch theo chiều tạo NO₂.',
    },
  },
  {
    id: 'p10-cau-hoi-8',
    page: 10,
    type: 'note',
    variant: 'ghost',
    align: 'right',
    icon: '?',
    label: 'Câu hỏi 8',
    x: 93,
    y: 27.7,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'note',
      modalSize: 'sm',
      title: 'Câu hỏi 8',
      content:
        'Nhận xét hiện tượng xảy ra trong Thí nghiệm 2.',
      hint:
        'Trong Thí nghiệm 2, dung dịch có phenolphthalein nên màu sắc thay đổi tùy theo tính bazơ của dung dịch.\n\nKhi đun nóng bình (1), màu hồng thay đổi rõ hơn, cho thấy trạng thái cân bằng của phản ứng thủy phân sodium acetate đã bị chuyển dịch do tác động của nhiệt độ.\n\nHiện tượng này chứng minh nhiệt độ là một yếu tố có thể làm chuyển dịch cân bằng hóa học.',
    },
  },
  {
    id: 'p10-cau-hoi-9',
    page: 10,
    type: 'note',
    variant: 'ghost',
    align: 'right',
    icon: '?',
    label: 'Câu hỏi 9',
    x: 93,
    y: 45,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'note',
      modalSize: 'sm',
      title: 'Câu hỏi 9',
      content:
        'Khi đun nóng, phản ứng trong bình (1) chuyển dịch theo chiều nào?',
      hint:
        'Phản ứng đang xét là:\nCH₃COONa(aq) + H₂O(l) ⇌ CH₃COOH(aq) + NaOH(aq)\n\nKhi có nhiều NaOH hơn, môi trường bazơ tăng và phenolphthalein có màu hồng rõ hơn.\n\nNếu khi đun nóng màu hồng đậm hơn, có thể kết luận cân bằng chuyển dịch theo chiều thuận, tức là chiều tạo thêm CH₃COOH và NaOH.',
    },
  },


  {
    id: 'p10-chuyen-dich-can-bang',
    page: 10,
    type: 'note',
    variant: 'ghost',
    align: 'left',
    icon: '?',
    label: 'Chuyển dịch cân bằng',
    x: 3,
    y: 63.7,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'note',
      modalSize: 'sm',
      title: 'Chuyển dịch cân bằng là gì?',
      content:
        'Sự chuyển dịch cân bằng hóa học là sự chuyển từ trạng thái cân bằng này sang trạng thái cân bằng khác.',
      hint:
        'Khi một hệ cân bằng bị tác động từ bên ngoài, ví dụ thay đổi nhiệt độ, nồng độ hoặc áp suất, trạng thái cân bằng ban đầu có thể bị phá vỡ.\n\nSau đó hệ sẽ thiết lập một trạng thái cân bằng mới. Quá trình đó được gọi là sự chuyển dịch cân bằng hóa học.',
    },
  },
  {
    id: 'p10-nguyen-li-le-chatelier',
    page: 10,
    type: 'note',
    variant: 'ghost',
    align: 'left',
    icon: '?',
    label: 'Le Chatelier',
    x: 3,
    y: 77,
    width: 4.4,
    height: 4.4,
    action: {
      type: 'note',
      modalSize: 'sm',
      title: 'Nguyên lí Le Chatelier',
      content:
        'Một phản ứng thuận nghịch đang ở trạng thái cân bằng khi chịu tác động từ bên ngoài như biến đổi nồng độ, áp suất, nhiệt độ thì cân bằng sẽ chuyển dịch theo chiều làm giảm tác động đó.',
      hint:
        'Có thể hiểu đơn giản: hệ cân bằng luôn có xu hướng “chống lại” tác động từ bên ngoài.\nNếu tăng nhiệt độ, cân bằng sẽ ưu tiên chiều hấp thụ nhiệt.\nNếu giảm nhiệt độ, cân bằng sẽ ưu tiên chiều tỏa nhiệt.\nNếu tăng nồng độ một chất, cân bằng sẽ chuyển dịch theo chiều làm giảm bớt chất đó.',
    },
  },
  // ===== PAGE 11 - ẢNH HƯỞNG CỦA NHIỆT ĐỘ VÀ ÁP SUẤT =====
{
  id: 'p11-cau-hoi-10',
  page: 11,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 10',
  x: 93,
  y: 15,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 10',
    content:
      'Cho biết chiều nào của phản ứng (1) là chiều thu nhiệt và chiều nào là chiều tỏa nhiệt.',
    hint:
      'Phản ứng đang xét là:\n\n2NO₂(g) ⇌ N₂O₄(g)      ΔH°₂₉₈ = -58 kJ\n\nVì ΔH < 0 nên chiều thuận, tức chiều tạo N₂O₄, là chiều tỏa nhiệt.\n\nDo đó, chiều nghịch, tức chiều N₂O₄ phân hủy tạo lại NO₂, là chiều thu nhiệt.\n\nKết luận:\n- Chiều thuận: 2NO₂ → N₂O₄ là chiều tỏa nhiệt.\n- Chiều nghịch: N₂O₄ → 2NO₂ là chiều thu nhiệt.\n\nKhi tăng nhiệt độ, cân bằng chuyển dịch theo chiều thu nhiệt để làm giảm tác động tăng nhiệt. Khi giảm nhiệt độ, cân bằng chuyển dịch theo chiều tỏa nhiệt.',
  },
},
{
  id: 'p11-cau-hoi-11',
  page: 11,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 11',
  x: 93,
  y: 24,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 11',
    content:
      'Từ hiện tượng ở Thí nghiệm 1, cho biết khi làm lạnh bình (2) và làm nóng bình (3), cân bằng trong mỗi bình chuyển dịch theo chiều tỏa nhiệt hay thu nhiệt.',
    hint:
      'Cân bằng đang xét là:\n\n2NO₂(g) ⇌ N₂O₄(g)\n\nNO₂ có màu nâu đỏ, còn N₂O₄ không màu.\n\nKhi làm lạnh bình (2), màu nâu đỏ nhạt đi. Điều đó chứng tỏ cân bằng chuyển dịch theo chiều tạo N₂O₄, tức chiều tỏa nhiệt.\n\nKhi làm nóng bình (3), màu nâu đỏ đậm lên. Điều đó chứng tỏ cân bằng chuyển dịch theo chiều tạo NO₂, tức chiều thu nhiệt.\n\nKết luận:\n- Làm lạnh: cân bằng chuyển dịch theo chiều tỏa nhiệt.\n- Làm nóng: cân bằng chuyển dịch theo chiều thu nhiệt.',
  },
},
{
  id: 'p11-bai-tap-caco3',
  page: 11,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài tập CaCO₃',
  x: 93,
  y: 40.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Bài tập calcium carbonate',
    prompt:
      'Cho phản ứng nhiệt phân calcium carbonate:\n\nCaCO₃(s) ⇌ CaO(s) + CO₂(g)      ΔH°₂₉₈ = 178,49 kJ\n\nĐể nâng cao hiệu suất phản ứng sản xuất vôi, cần điều chỉnh nhiệt độ như thế nào?',
    options: [
      {
        id: 'A',
        text: 'Giảm nhiệt độ.',
      },
      {
        id: 'B',
        text: 'Tăng nhiệt độ.',
      },
      {
        id: 'C',
        text: 'Giữ nhiệt độ không đổi.',
      },
      {
        id: 'D',
        text: 'Nhiệt độ không ảnh hưởng đến phản ứng.',
      },
    ],
    correctOptionId: 'B',
    explanation:
      'Đáp án đúng là tăng nhiệt độ. Vì ΔH°₂₉₈ = 178,49 kJ > 0 nên chiều thuận là chiều thu nhiệt. Khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều thu nhiệt, tức chiều tạo CaO và CO₂. Do đó hiệu suất sản xuất vôi tăng.',
  },
},
{
  id: 'p11-ap-suat-anh-huong',
  page: 11,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Ảnh hưởng áp suất',
  x: 3,
  y: 62.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Áp suất ảnh hưởng đến cân bằng như thế nào?',
    content:
      'Áp suất ảnh hưởng rõ đến các cân bằng hóa học có chất khí tham gia.',
    hint:
      'Khi tăng áp suất, cân bằng chuyển dịch theo chiều làm giảm số mol khí.\n\nKhi giảm áp suất, cân bằng chuyển dịch theo chiều làm tăng số mol khí.\n\nVới hệ:\n\n2NO₂(g) ⇌ N₂O₄(g)\n\nVế trái có 2 mol khí, vế phải có 1 mol khí.\n\nNếu tăng áp suất, cân bằng chuyển dịch sang phải, tạo nhiều N₂O₄ hơn nên màu nâu đỏ nhạt dần.\n\nNếu giảm áp suất, cân bằng chuyển dịch sang trái, tạo nhiều NO₂ hơn nên màu nâu đỏ đậm dần.',
  },
},
{
  id: 'p11-cau-hoi-12',
  page: 11,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 12',
  x: 93,
  y: 57.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 12',
    content:
      'Khi đẩy hoặc kéo pit-tông thì số mol khí của hệ (2) thay đổi như thế nào?',
    hint:
      'Hệ cân bằng đang xét là:\n\n2NO₂(g) ⇌ N₂O₄(g)\n\nKhi đẩy pit-tông, thể tích giảm nên áp suất tăng. Cân bằng chuyển dịch theo chiều làm giảm số mol khí, tức chiều tạo N₂O₄. Vì vậy tổng số mol khí của hệ giảm.\n\nKhi kéo pit-tông, thể tích tăng nên áp suất giảm. Cân bằng chuyển dịch theo chiều làm tăng số mol khí, tức chiều tạo NO₂. Vì vậy tổng số mol khí của hệ tăng.\n\nKết luận:\n- Đẩy pit-tông: số mol khí giảm.\n- Kéo pit-tông: số mol khí tăng.',
  },
},
{
  id: 'p11-bai-tap-ammonia-ap-suat',
  page: 11,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài tập ammonia',
  x: 93,
  y: 79.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Bài tập áp suất trong tổng hợp ammonia',
    prompt:
      'Phản ứng tổng hợp ammonia:\n\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g)\n\nĐể thu được NH₃ với hiệu suất cao, cần điều chỉnh áp suất như thế nào?',
    options: [
      {
        id: 'A',
        text: 'Tăng áp suất.',
      },
      {
        id: 'B',
        text: 'Giảm áp suất.',
      },
      {
        id: 'C',
        text: 'Áp suất không ảnh hưởng.',
      },
      {
        id: 'D',
        text: 'Tăng thể tích bình phản ứng.',
      },
    ],
    correctOptionId: 'A',
    explanation:
      'Đáp án đúng là tăng áp suất. Ở vế trái có 1 mol N₂ + 3 mol H₂ = 4 mol khí. Ở vế phải có 2 mol NH₃ = 2 mol khí. Khi tăng áp suất, cân bằng chuyển dịch theo chiều làm giảm số mol khí, tức chuyển dịch sang phải để tạo nhiều NH₃ hơn.',
  },
},

// ===== PAGE 12 - ẢNH HƯỞNG CỦA NỒNG ĐỘ ĐẾN CÂN BẰNG HÓA HỌC =====
{
  id: 'p12-cau-hoi-13',
  page: 12,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 13',
  x: 93,
  y: 35.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 13',
    content:
      'Hãy cho biết cân bằng chuyển dịch theo chiều nào khi thêm một lượng khí CO vào hệ cân bằng (3).',
    hint:
      'Hệ cân bằng đang xét là:\n\nC(s) + CO₂(g) ⇌ 2CO(g)\n\nKhi thêm CO vào hệ, nồng độ CO tăng lên. CO là sản phẩm của chiều thuận.\n\nTheo nguyên lí Le Chatelier, cân bằng sẽ chuyển dịch theo chiều làm giảm lượng CO vừa thêm vào.\n\nVì vậy, cân bằng chuyển dịch theo chiều nghịch, tức từ phải sang trái, tạo thêm C và CO₂.',
  },
},
{
  id: 'p12-chat-ran-khong-anh-huong',
  page: 12,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Chất rắn trong chuyển dịch',
  x: 3,
  y: 51,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Vì sao chất rắn hầu như không làm chuyển dịch cân bằng?',
    content:
      'Trong hệ cân bằng có chất rắn, việc thêm hoặc bớt lượng chất rắn hầu như không ảnh hưởng đến trạng thái cân bằng.',
    hint:
      'Trong cân bằng dị thể, chất rắn tinh khiết có hoạt độ gần như không đổi.\n\nVì vậy, khi thêm hoặc bớt chất rắn, biểu thức cân bằng và trạng thái cân bằng hầu như không thay đổi.\n\nVí dụ với hệ:\n\nC(s) + CO₂(g) ⇌ 2CO(g)\n\nViệc thêm hoặc bớt C rắn hầu như không làm cân bằng chuyển dịch. Nhưng nếu thay đổi nồng độ CO₂ hoặc CO thì cân bằng có thể chuyển dịch.',
  },
},
{
  id: 'p12-bai-tap-thach-nhu',
  page: 12,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài tập thạch nhũ',
  x: 93,
  y: 75.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Giải thích sự hình thành thạch nhũ',
    content:
      'Trong các hang động đá vôi thường xảy ra hiện tượng hình thành thạch nhũ và xâm thực của nước mưa vào đá vôi theo phương trình:\n\nCaCO₃(s) + H₂O(l) + CO₂(aq) ⇌ Ca(HCO₃)₂(aq)\n\nHãy giải thích các quá trình này.',
    hint:
      'Khi nước mưa chứa CO₂ thấm qua đá vôi, nồng độ CO₂ trong nước tăng. Cân bằng chuyển dịch theo chiều thuận, làm CaCO₃ tan dần tạo Ca(HCO₃)₂ tan trong nước. Đây là quá trình xâm thực đá vôi.\n\nKhi dung dịch Ca(HCO₃)₂ chảy vào hang, CO₂ thoát ra ngoài hoặc nước bay hơi làm giảm lượng CO₂ hòa tan. Cân bằng chuyển dịch theo chiều nghịch, tạo lại CaCO₃ rắn bám trên trần hoặc nền hang.\n\nTheo thời gian dài, CaCO₃ tích tụ tạo thành thạch nhũ, măng đá trong hang động.',
  },
},
{
  id: 'p12-hinh-anh-thach-nhu',
  page: 12,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '▣',
  label: 'Hình thạch nhũ',
  x: 3,
  y: 75.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'image',
    modalSize: 'md',
    title: 'Hình ảnh thạch nhũ trong hang động',
    url: 'https://res.cloudinary.com/dsdntnovc/image/upload/v1779289977/thachnhu_gxpif1.jpg',
    caption:
      'Thạch nhũ được hình thành do sự kết tủa CaCO₃ trong thời gian dài khi cân bằng giữa CaCO₃, CO₂, H₂O và Ca(HCO₃)₂ bị chuyển dịch.',
  },
},

// ===== PAGE 13 - BÀI TẬP TỔNG KẾT BÀI 1 =====
{
  id: 'p13-cau-1',
  page: 13,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Câu 1',
  x: 93,
  y: 17.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Bài tập 1',
    prompt:
      'Hằng số cân bằng Kc của một phản ứng thuận nghịch phụ thuộc vào yếu tố nào sau đây?',
    options: [
      { id: 'A', text: 'Nồng độ.' },
      { id: 'B', text: 'Nhiệt độ.' },
      { id: 'C', text: 'Áp suất.' },
      { id: 'D', text: 'Chất xúc tác.' },
    ],
    correctOptionId: 'B',
    explanation:
      'Đáp án đúng là B. Hằng số cân bằng Kc của một phản ứng xác định chỉ phụ thuộc vào nhiệt độ. Nồng độ, áp suất có thể làm cân bằng chuyển dịch, còn chất xúc tác chỉ làm hệ đạt cân bằng nhanh hơn, không làm thay đổi Kc.',
  },
},
{
  id: 'p13-cau-2',
  page: 13,
  type: 'quiz',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Câu 2',
  x: 93,
  y: 24,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'quiz',
    modalSize: 'sm',
    title: 'Bài tập 2',
    prompt:
      'Yếu tố nào sau đây luôn luôn không làm dịch chuyển cân bằng của hệ phản ứng?',
    options: [
      { id: 'A', text: 'Nhiệt độ.' },
      { id: 'B', text: 'Áp suất.' },
      { id: 'C', text: 'Nồng độ.' },
      { id: 'D', text: 'Chất xúc tác.' },
    ],
    correctOptionId: 'D',
    explanation:
      'Đáp án đúng là D. Chất xúc tác làm tăng tốc độ phản ứng thuận và phản ứng nghịch, giúp hệ nhanh đạt trạng thái cân bằng hơn, nhưng không làm thay đổi vị trí cân bằng.',
  },
},
{
  id: 'p13-cau-3',
  page: 13,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu 3',
  x: 93,
  y: 31,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Lời giải bài tập 3',
    content:
      'Viết biểu thức tính Kc cho các phản ứng sau:\n\n(1) CaCO₃(s) ⇌ CaO(s) + CO₂(g)\n(2) Cu₂O(s) + 1/2O₂(g) ⇌ 2CuO(s)',
    hint:
      'Lưu ý: chất rắn tinh khiết không được viết trong biểu thức Kc.\n\n(1) CaCO₃(s) ⇌ CaO(s) + CO₂(g)\nCác chất rắn CaCO₃ và CaO không xuất hiện trong Kc.\nKc = [CO₂]\n\n(2) Cu₂O(s) + 1/2O₂(g) ⇌ 2CuO(s)\nCác chất rắn Cu₂O và CuO không xuất hiện trong Kc.\nKc = 1 / [O₂]^(1/2)',
  },
},
{
  id: 'p13-cau-4',
  page: 13,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu 4',
  x: 93,
  y: 43.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 4',
    content:
      'Xét các hệ cân bằng trong một bình kín:\n\na) C(s) + H₂O(g) ⇌ CO(g) + H₂(g), ΔH°₂₉₈ = 131 kJ\nb) CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g), ΔH°₂₉₈ = -41 kJ\n\nCác cân bằng trên dịch chuyển theo chiều nào khi thay đổi điều kiện?',
    hint:
      'a) C(s) + H₂O(g) ⇌ CO(g) + H₂(g), ΔH > 0 nên chiều thuận là chiều thu nhiệt.\nb) CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g), ΔH < 0 nên chiều thuận là chiều tỏa nhiệt.\n\n(1) Tăng nhiệt độ:\n- Hệ a chuyển dịch theo chiều thuận.\n- Hệ b chuyển dịch theo chiều nghịch.\n\n(2) Thêm hơi nước H₂O:\n- Cả hai hệ đều chuyển dịch theo chiều thuận để tiêu thụ bớt H₂O.\n\n(3) Thêm khí H₂:\n- Hệ a chuyển dịch theo chiều nghịch vì H₂ là sản phẩm.\n- Hệ b chuyển dịch theo chiều nghịch vì H₂ là sản phẩm.\n\n(4) Tăng áp suất bằng cách nén cho thể tích hệ giảm xuống:\n- Hệ a: vế trái có 1 mol khí, vế phải có 2 mol khí, nên cân bằng chuyển dịch theo chiều nghịch.\n- Hệ b: hai vế đều có 2 mol khí, nên áp suất hầu như không làm cân bằng chuyển dịch.\n\n(5) Dùng chất xúc tác:\n- Cả hai hệ không bị chuyển dịch cân bằng. Chất xúc tác chỉ làm hệ đạt cân bằng nhanh hơn.',
  },
},
{
  id: 'p13-cau-5',
  page: 13,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu 5',
  x: 93,
  y: 59.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Lời giải bài tập 5',
    content:
      'Cho phản ứng:\nCOCl₂(g) ⇌ CO(g) + Cl₂(g)\n\nKc = 8,2 × 10⁻² ở 900 K.\nTại trạng thái cân bằng, nếu nồng độ CO và Cl₂ đều bằng 0,15 M thì nồng độ COCl₂ là bao nhiêu?',
    hint:
      'Biểu thức hằng số cân bằng:\nKc = [CO][Cl₂] / [COCl₂]\nSuy ra:\n[COCl₂] = [CO][Cl₂] / Kc\nThay số:\n[COCl₂] = 0,15 × 0,15 / (8,2 × 10⁻²)\n[COCl₂] = 0,0225 / 0,082 ≈ 0,274 M\nVậy nồng độ COCl₂ ở trạng thái cân bằng xấp xỉ 0,274 M.',
  },
},
{
  id: 'p13-bai-tap-them',
  page: 13,
  type: 'practice',
  variant: 'solid',
  align: 'left',
  icon: '',
  label: 'Bài tập thêm',
  x: 22.5,
  y: 66,
  width: 18,
  height: 5,
  action: {
    type: 'practiceSet',
    modalSize: 'lg',
    title: 'Bài tập thêm - Cân bằng hóa học',
    questions: [
      {
        id: 'extra-1',
        prompt:
          'Hằng số cân bằng Kc của một phản ứng thuận nghịch phụ thuộc vào yếu tố nào sau đây?',
        options: [
          { id: 'A', text: 'Nồng độ.' },
          { id: 'B', text: 'Nhiệt độ.' },
          { id: 'C', text: 'Áp suất.' },
          { id: 'D', text: 'Chất xúc tác.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Trong phản ứng thuận nghịch, hằng số cân bằng Kc của một phản ứng xác định chỉ phụ thuộc vào nhiệt độ.',
      },
      {
        id: 'extra-2',
        prompt:
          'Phát biểu nào sau đây về một phản ứng thuận nghịch tại trạng thái cân bằng là không đúng?',
        options: [
          {
            id: 'A',
            text: 'Tốc độ của phản ứng thuận bằng tốc độ của phản ứng nghịch.',
          },
          {
            id: 'B',
            text: 'Nồng độ của tất cả các chất trong hỗn hợp phản ứng là không đổi.',
          },
          {
            id: 'C',
            text: 'Nồng độ mol của chất phản ứng luôn bằng nồng độ mol của chất sản phẩm phản ứng.',
          },
          {
            id: 'D',
            text: 'Phản ứng thuận và phản ứng nghịch vẫn diễn ra.',
          },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Tại trạng thái cân bằng, phản ứng thuận và phản ứng nghịch vẫn diễn ra với tốc độ bằng nhau nên nồng độ các chất không đổi. Tuy nhiên, nồng độ chất phản ứng không nhất thiết bằng nồng độ chất sản phẩm.',
      },
      {
        id: 'extra-3',
        prompt:
          'Cho phản ứng thuận nghịch:\n\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g)\n\nHằng số cân bằng của phản ứng trên là:',
        options: [
          { id: 'A', text: 'Kc = [SO₃]² / ([SO₂]²[O₂])' },
          { id: 'B', text: 'Kc = [SO₃] / ([SO₂][O₂])' },
          { id: 'C', text: 'Kc = [SO₂]²[O₂] / [SO₃]²' },
          { id: 'D', text: 'Kc = [SO₂][O₂] / [SO₃]' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Sản phẩm SO₃ đặt ở tử số, chất phản ứng SO₂ và O₂ đặt ở mẫu số. Hệ số cân bằng trở thành số mũ nên Kc = [SO₃]² / ([SO₂]²[O₂]).',
      },
      {
        id: 'extra-4',
        prompt:
          'Xét cân bằng:\n\nN₂O₄(g) ⇌ 2NO₂(g)\n\nở 25°C. Khi chuyển dịch sang một trạng thái cân bằng mới nếu nồng độ N₂O₄ tăng lên 9 lần thì nồng độ NO₂:',
        options: [
          { id: 'A', text: 'Tăng 9 lần.' },
          { id: 'B', text: 'Tăng 3 lần.' },
          { id: 'C', text: 'Tăng 4,5 lần.' },
          { id: 'D', text: 'Giảm 3 lần.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Ta có Kc = [NO₂]²/[N₂O₄]. Khi [N₂O₄] tăng 9 lần, để Kc không đổi thì [NO₂] phải tăng 3 lần vì 3² = 9.',
      },
      {
        id: 'extra-5',
        prompt:
          'Trộn 2 mol khí NO và một lượng chưa xác định khí O₂ vào bình kín 1 L ở 40°C:\n\n2NO(g) + O₂(g) ⇌ 2NO₂(g)\n\nKhi cân bằng, hỗn hợp có 0,00156 mol O₂ và 0,5 mol NO₂. Hằng số cân bằng Kc lúc này có giá trị là:',
        options: [
          { id: 'A', text: '4,42.' },
          { id: 'B', text: '40,1.' },
          { id: 'C', text: '71,2.' },
          { id: 'D', text: '214.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Số mol NO ở cân bằng là 2 - 0,5 = 1,5 mol. Vì thể tích bình là 1 L nên [NO] = 1,5 M, [O₂] = 0,00156 M, [NO₂] = 0,5 M.\n\nKc = [NO₂]² / ([NO]²[O₂]) = 0,5² / (1,5² × 0,00156) ≈ 71,23.',
      },
      {
        id: 'extra-6',
        prompt:
          'Cho cân bằng hóa học:\n\nH₂(g) + I₂(g) ⇌ 2HI(g), ΔH > 0\n\nCân bằng không bị chuyển dịch khi:',
        options: [
          { id: 'A', text: 'Tăng nhiệt độ của hệ.' },
          { id: 'B', text: 'Giảm nồng độ HI.' },
          { id: 'C', text: 'Giảm áp suất chung của hệ.' },
          { id: 'D', text: 'Tăng nồng độ H₂.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Tổng số mol khí ở hai vế đều bằng 2 nên thay đổi áp suất không làm cân bằng chuyển dịch.',
      },
      {
        id: 'extra-7',
        prompt:
          'Cho phản ứng:\n\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g)\n\nBiết phản ứng thuận là phản ứng tỏa nhiệt, cân bằng hóa học không bị chuyển dịch khi nào?',
        options: [
          { id: 'A', text: 'Thay đổi áp suất của hệ.' },
          { id: 'B', text: 'Thay đổi nhiệt độ của hệ.' },
          { id: 'C', text: 'Thay đổi nồng độ N₂.' },
          { id: 'D', text: 'Thêm chất xúc tác Fe.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Chất xúc tác không làm thay đổi nồng độ các chất ở trạng thái cân bằng và không làm thay đổi hằng số cân bằng, nên không làm chuyển dịch cân bằng.',
      },
      {
        id: 'extra-8',
        prompt:
          'Cho phản ứng:\n\n2NO₂(g) ⇌ N₂O₄(g), ΔrH°₂₉₈ < 0\n\nNếu nhúng bình phản ứng vào nước đá thì:',
        options: [
          { id: 'A', text: 'Giữ nguyên màu như ban đầu.' },
          { id: 'B', text: 'Màu nâu đậm dần.' },
          { id: 'C', text: 'Màu nâu nhạt dần.' },
          { id: 'D', text: 'Chuyển sang màu xanh.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. ΔrH°₂₉₈ < 0 nên chiều thuận là chiều tỏa nhiệt. Khi nhúng bình vào nước đá, nhiệt độ giảm, cân bằng chuyển dịch theo chiều tỏa nhiệt, tức chiều tạo N₂O₄ không màu, làm màu nâu nhạt dần.',
      },
      {
        id: 'extra-9',
        prompt:
          'Phản ứng tổng hợp ammonia là:\n\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔrH°₂₉₈ < 0\n\nYếu tố không giúp tăng hiệu suất tổng hợp ammonia là:',
        options: [
          { id: 'A', text: 'Tăng nhiệt độ.' },
          { id: 'B', text: 'Lấy ammonia ra khỏi hỗn hợp phản ứng.' },
          { id: 'C', text: 'Tăng áp suất.' },
          { id: 'D', text: 'Bổ sung thêm khí nitrogen vào hỗn hợp phản ứng.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Phản ứng thuận tỏa nhiệt nên khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều thu nhiệt, tức chiều nghịch. Vì vậy tăng nhiệt độ không giúp tăng hiệu suất tổng hợp ammonia.',
      },
      {
        id: 'extra-10',
        prompt:
          'Cho phản ứng sau đây ở trạng thái cân bằng:\n\nA(g) + B(g) ⇌ C(g) + D(g)\n\nNếu tách khí D ra khỏi môi trường phản ứng, thì:',
        options: [
          { id: 'A', text: 'Cân bằng hóa học chuyển dịch theo chiều thuận.' },
          { id: 'B', text: 'Cân bằng hóa học chuyển dịch theo chiều nghịch.' },
          {
            id: 'C',
            text: 'Tốc độ phản ứng thuận và tốc độ phản ứng nghịch tăng như nhau.',
          },
          { id: 'D', text: 'Không gây ra sự chuyển dịch cân bằng hóa học.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Khi tách khí D ra khỏi hệ, nồng độ D giảm. Cân bằng sẽ chuyển dịch theo chiều làm tăng D, tức chiều thuận.',
      },
      {
        id: 'extra-11',
        prompt:
          'Trong phản ứng tổng hợp ammonia:\n\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔrH° < 0\n\nSẽ thu được nhiều khí NH₃ nhất nếu:',
        options: [
          { id: 'A', text: 'Giảm nhiệt độ và áp suất.' },
          { id: 'B', text: 'Tăng nhiệt độ và áp suất.' },
          { id: 'C', text: 'Tăng nhiệt độ và giảm áp suất.' },
          { id: 'D', text: 'Giảm nhiệt độ và tăng áp suất.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Phản ứng thuận tỏa nhiệt nên giảm nhiệt độ làm cân bằng chuyển dịch theo chiều thuận. Vế trái có 4 mol khí, vế phải có 2 mol khí nên tăng áp suất cũng làm cân bằng chuyển dịch theo chiều thuận.',
      },
      {
        id: 'extra-12',
        prompt:
          'Cho cân bằng:\n\n2NaHCO₃(s) ⇌ Na₂CO₃(s) + CO₂(g) + H₂O(g), ΔrH < 0\n\nĐể cân bằng dịch chuyển theo chiều thuận, cách tốt nhất là:',
        options: [
          { id: 'A', text: 'Tăng nhiệt độ.' },
          { id: 'B', text: 'Giảm nhiệt độ.' },
          { id: 'C', text: 'Tăng áp suất.' },
          { id: 'D', text: 'Tăng nhiệt độ, tăng áp suất.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. ΔrH < 0 nên chiều thuận là chiều tỏa nhiệt. Khi giảm nhiệt độ, cân bằng chuyển dịch theo chiều tỏa nhiệt, tức chiều thuận.',
      },
      {
        id: 'extra-13',
        prompt:
          'Ở nhiệt độ không đổi, hệ cân bằng nào sẽ dịch chuyển về bên phải nếu tăng áp suất?',
        options: [
          { id: 'A', text: 'S(s) + O₂(g) ⇌ SO₂(g).' },
          { id: 'B', text: '2CO₂(g) ⇌ 2CO(g) + O₂(g).' },
          { id: 'C', text: '2NO(g) ⇌ N₂(g) + O₂(g).' },
          { id: 'D', text: '2CO(g) ⇌ CO₂(g) + C(s).' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Khi tăng áp suất, cân bằng chuyển dịch theo chiều làm giảm số mol khí. Với 2CO(g) ⇌ CO₂(g) + C(s), vế trái có 2 mol khí, vế phải có 1 mol khí nên cân bằng chuyển dịch sang phải.',
      },
      {
        id: 'extra-14',
        prompt:
          'Cho cân bằng hóa học:\n\n2SO₂(g) + O₂(g) ⇌ SO₃(g)\n\nPhản ứng thuận là phản ứng tỏa nhiệt. Phát biểu đúng là:',
        options: [
          {
            id: 'A',
            text: 'Cân bằng chuyển dịch theo chiều thuận khi tăng nhiệt độ.',
          },
          {
            id: 'B',
            text: 'Cân bằng chuyển dịch theo chiều nghịch khi giảm nồng độ O₂.',
          },
          {
            id: 'C',
            text: 'Cân bằng chuyển dịch theo chiều thuận khi giảm áp suất hệ phản ứng.',
          },
          {
            id: 'D',
            text: 'Cân bằng chuyển dịch theo chiều nghịch khi giảm nồng độ SO₃.',
          },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Khi giảm nồng độ O₂, cân bằng chuyển dịch theo chiều làm tăng nồng độ O₂, tức chiều nghịch.',
      },
      {
        id: 'extra-15',
        prompt:
          'Cho phản ứng:\n\nFe₂O₃(s) + 3CO(g) ⇌ 2Fe(s) + 3CO₂(g)\n\nKhi tăng áp suất chung của hệ phản ứng thì:',
        options: [
          { id: 'A', text: 'Cân bằng chuyển dịch theo chiều thuận.' },
          { id: 'B', text: 'Cân bằng không bị chuyển dịch.' },
          { id: 'C', text: 'Cân bằng chuyển dịch theo chiều nghịch.' },
          { id: 'D', text: 'Phản ứng dừng lại.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Hai vế có số mol khí bằng nhau: vế trái có 3 mol CO, vế phải có 3 mol CO₂. Chất rắn không tính vào số mol khí khi xét ảnh hưởng áp suất. Vì vậy tăng áp suất không làm cân bằng chuyển dịch.',
      },
    ],
  },
},
// ===== PAGE 14 - BÀI 2: CÂN BẰNG TRONG DUNG DỊCH NƯỚC - TRANG MỞ ĐẦU =====
{
  id: 'p14-video-bai-hoc-bai-2',
  page: 14,
  type: 'video',
  variant: 'ghost',
  align: 'right',
  icon: '▶',
  label: 'Video bài học',
  x: 93,
  y: 9.2,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Video bài học - Cân bằng trong dung dịch nước',
    url: 'https://www.youtube.com/embed/RmEt-jvUYTQ',
  },
},
{
  id: 'p14-cau-hoi-mo-dau',
  page: 14,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Câu hỏi mở đầu',
  x: 3,
  y: 46,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi mở đầu',
    content:
      'Các hợp chất acid và base có vai trò rất quan trọng trong đời sống của con người. Acid, base là gì? Làm cách nào có thể xác định nồng độ của dung dịch acid, base?',
    hint:
      'Acid và base là những chất có thể tạo ra môi trường acid hoặc môi trường base trong dung dịch nước.\n\n' +
      'Để nhận biết dung dịch có tính acid hay base, có thể dùng chất chỉ thị màu như giấy quỳ, phenolphthalein hoặc dùng máy đo pH.\n\n' +
      'Để xác định chính xác hơn nồng độ acid hoặc base, có thể dùng phương pháp chuẩn độ acid - base. Đây là phương pháp thực nghiệm quan trọng được học trong bài này.',
  },
},
{
  id: 'p14-may-do-ph',
  page: 14,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Máy đo pH',
  x: 93,
  y: 47.1,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Máy đo pH dùng để làm gì?',
    content:
      'Máy đo pH là dụng cụ dùng để xác định giá trị pH của dung dịch, từ đó nhận biết dung dịch có tính acid, trung tính hay base.',
    hint:
      'Giá trị pH cho biết mức độ acid hoặc base của dung dịch:\n\n' +
      '- pH < 7: dung dịch có môi trường acid.\n' +
      '- pH = 7: dung dịch có môi trường trung tính.\n' +
      '- pH > 7: dung dịch có môi trường base.\n\n' +
      'So với chất chỉ thị màu, máy đo pH cho kết quả định lượng rõ ràng hơn vì hiển thị trực tiếp giá trị pH của dung dịch.',
  },
},
{
  id: 'p14-video-may-do-ph',
  page: 14,
  type: 'video',
  variant: 'ghost',
  align: 'right',
  icon: '►',
  label: 'Video đo pH',
  x: 93,
  y: 52.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Cách đo pH bằng máy đo pH',
    url: 'https://www.youtube.com/embed/WFxgwMdVpYw',
  },
},
{
  id: 'p14-giai-thich-hinh-2-1',
  page: 14,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Giải thích Hình 2.1',
  x: 93,
  y: 73.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Giải thích Hình 2.1 - Thí nghiệm dẫn điện',
    content:
      'Quan sát Hình 2.1, nhận xét hiện tượng xảy ra khi thực hiện thí nghiệm. So sánh tính dẫn điện của nước cất và các dung dịch.',
    hint:
      'Trong thí nghiệm ở Hình 2.1:\n\n' +
      '- Cốc nước cất: bóng đèn không sáng hoặc sáng rất yếu vì nước cất gần như không có ion tự do.\n\n' +
      '- Dung dịch saccharose: bóng đèn không sáng vì saccharose tan trong nước nhưng không phân li thành ion.\n\n' +
      '- Dung dịch sodium chloride: bóng đèn sáng vì NaCl tan trong nước và phân li thành các ion Na⁺, Cl⁻. Các ion này chuyển động trong dung dịch nên dung dịch dẫn điện.\n\n' +
      'So sánh tính dẫn điện:\n' +
      'Dung dịch sodium chloride dẫn điện tốt nhất. Nước cất và dung dịch saccharose gần như không dẫn điện.\n\n' +
      'Kết luận:\n' +
      'Dung dịch có thể dẫn điện khi trong dung dịch có các ion tự do chuyển động. Đây là cơ sở để phân biệt chất điện li và chất không điện li.',
  },
},
{
  id: 'p14-video-thi-nghiem-dan-dien',
  page: 14,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video thí nghiệm',
  x: 3,
  y: 76.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Thí nghiệm khảo sát tính dẫn điện của dung dịch',
    url: 'https://www.youtube.com/embed/nYGuUQS1NF8',
  },
},

// ===== PAGE 15 - BÀI 2: SỰ ĐIỆN LI VÀ PHÂN LOẠI CHẤT ĐIỆN LI =====
{
  id: 'p15-cau-hoi-2',
  page: 15,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 2',
  x: 93,
  y: 9.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 2',
    content:
      'Hãy cho biết nguyên nhân vì sao dung dịch NaCl có tính dẫn điện.',
    hint:
      'Dung dịch NaCl có tính dẫn điện vì khi tan trong nước, NaCl phân li thành các ion Na⁺ và Cl⁻.\n\n' +
      'Các ion Na⁺ và Cl⁻ có thể chuyển động tự do trong dung dịch. Khi đặt dung dịch vào mạch điện, các ion này đóng vai trò là hạt tải điện, làm cho dòng điện truyền qua dung dịch.\n\n' +
      'Vì vậy, dung dịch NaCl dẫn điện được.',
  },
},
{
  id: 'p15-giai-thich-su-dien-li',
  page: 15,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Sự điện li',
  x: 3,
  y: 44,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Sự điện li là gì?',
    content:
      'Quá trình phân li các chất trong nước tạo thành các ion được gọi là sự điện li.',
    hint:
      'Khi một chất tan trong nước và tạo ra các ion, quá trình đó được gọi là sự điện li.\n\n' +
      'Ví dụ:\n' +
      'NaCl → Na⁺ + Cl⁻\n\n' +
      'Trong dung dịch NaCl, các ion Na⁺ và Cl⁻ chuyển động tự do nên dung dịch có khả năng dẫn điện.\n\n' +
      'Chất khi tan trong nước tạo thành các ion và làm dung dịch dẫn điện được gọi là chất điện li.',
  },
},
{
  id: 'p15-video-su-dien-li-nacl',
  page: 15,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video sự điện li',
  x: 3,
  y: 35.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Mô phỏng sự điện li của NaCl trong nước',
    url: 'https://www.youtube.com/embed/1hW1hJghqq0',
  },
},
{
  id: 'p15-cau-hoi-3',
  page: 15,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 3',
  x: 93,
  y: 62.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 3',
    content:
      'Quan sát Hình 2.3, nhận xét về độ sáng của bóng đèn ở các thí nghiệm. Biết rằng nồng độ mol của các dung dịch là bằng nhau, cho biết dung dịch nào dẫn điện mạnh, dẫn điện yếu và không dẫn điện.',
    hint:
      'Quan sát Hình 2.3:\n\n' +
      '- Dung dịch hydrochloric acid HCl: bóng đèn sáng mạnh. Điều đó cho thấy dung dịch HCl dẫn điện mạnh.\n\n' +
      '- Dung dịch acetic acid CH₃COOH: bóng đèn sáng yếu hơn. Điều đó cho thấy dung dịch CH₃COOH dẫn điện yếu.\n\n' +
      '- Dung dịch glucose C₆H₁₂O₆: bóng đèn không sáng. Điều đó cho thấy dung dịch glucose không dẫn điện.\n\n' +
      'Kết luận:\n' +
      'Với cùng nồng độ mol, dung dịch tạo ra càng nhiều ion tự do thì dẫn điện càng mạnh và bóng đèn càng sáng.',
  },
},
{
  id: 'p15-phan-loai-chat-dien-li',
  page: 15,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Phân loại chất điện li',
  x: 3,
  y: 66.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Phân loại chất điện li',
    content:
      'Dựa vào khả năng phân li ra ion trong nước, có thể chia các chất thành: chất điện li mạnh, chất điện li yếu và chất không điện li.',
    hint:
      'Chất điện li mạnh là chất khi tan trong nước phân li gần như hoàn toàn thành ion. Vì tạo nhiều ion nên dung dịch dẫn điện mạnh. Ví dụ: HCl, NaOH, KOH, nhiều muối tan như NaCl.\n\n' +
      'Chất điện li yếu là chất khi tan trong nước chỉ phân li một phần thành ion. Vì tạo ít ion hơn nên dung dịch dẫn điện yếu. Ví dụ: CH₃COOH.\n\n' +
      'Chất không điện li là chất tan trong nước nhưng không phân li thành ion, nên dung dịch không dẫn điện. Ví dụ: glucose C₆H₁₂O₆, saccharose C₁₂H₂₂O₁₁.\n\n' +
      'Tóm lại:\n' +
      '- HCl: chất điện li mạnh.\n' +
      '- CH₃COOH: chất điện li yếu.\n' +
      '- Glucose: chất không điện li.',
  },
},
{
  id: 'p15-cau-hoi-4',
  page: 15,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 4',
  x: 93,
  y: 80,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 4',
    content:
      'Từ phương trình (1) và (2), nhận xét về mức độ phân li của HCl và CH₃COOH trong nước.',
    hint:
      'Phương trình điện li của HCl:\n' +
      'HCl → H⁺ + Cl⁻\n\n' +
      'HCl dùng mũi tên một chiều vì HCl là chất điện li mạnh. Khi tan trong nước, HCl phân li gần như hoàn toàn thành ion H⁺ và Cl⁻.\n\n' +
      'Phương trình điện li của CH₃COOH:\n' +
      'CH₃COOH ⇌ H⁺ + CH₃COO⁻\n\n' +
      'CH₃COOH dùng mũi tên hai chiều vì CH₃COOH là chất điện li yếu. Khi tan trong nước, chỉ một phần phân tử CH₃COOH phân li thành ion, phần còn lại vẫn tồn tại dưới dạng phân tử CH₃COOH.\n\n' +
      'Kết luận:\n' +
      '- HCl phân li gần như hoàn toàn.\n' +
      '- CH₃COOH chỉ phân li một phần.',
  },
},

// ===== PAGE 16 - BÀI 2: CHẤT ĐIỆN LI YẾU + THUYẾT BRØNSTED - LOWRY =====
{
  id: 'p16-cau-hoi-5',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 5',
  x: 93,
  y: 13,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 5',
    content:
      'Nếu nhỏ thêm vài giọt dung dịch NaOH hoặc CH₃COONa vào dung dịch CH₃COOH thì cân bằng (2) chuyển dịch theo chiều nào?',
    hint:
      'Cân bằng điện li của acetic acid là:\n\n' +
      'CH₃COOH ⇌ CH₃COO⁻ + H⁺\n\n' +
      'Trường hợp 1: Thêm dung dịch NaOH.\n' +
      'NaOH cung cấp ion OH⁻. Ion OH⁻ phản ứng với H⁺ tạo H₂O, làm nồng độ H⁺ trong dung dịch giảm.\n\n' +
      'Theo nguyên lí chuyển dịch cân bằng, khi H⁺ giảm, cân bằng sẽ chuyển dịch theo chiều thuận để tạo thêm H⁺.\n\n' +
      'Trường hợp 2: Thêm dung dịch CH₃COONa.\n' +
      'CH₃COONa phân li tạo ion CH₃COO⁻, làm nồng độ CH₃COO⁻ tăng.\n\n' +
      'Khi sản phẩm CH₃COO⁻ tăng, cân bằng chuyển dịch theo chiều nghịch để làm giảm bớt CH₃COO⁻.\n\n' +
      'Kết luận:\n' +
      '- Thêm NaOH: cân bằng chuyển dịch theo chiều thuận.\n' +
      '- Thêm CH₃COONa: cân bằng chuyển dịch theo chiều nghịch.',
  },
},
{
  id: 'p16-bai-tap-dien-li',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài tập điện li',
  x: 93,
  y: 29,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Viết phương trình điện li',
    content:
      'Viết phương trình điện li nếu có của các chất sau khi hòa tan vào nước: HNO₃, Ca(OH)₂ và BaCl₂.',
    hint:
      'Các phương trình điện li là:\n\n' +
      'HNO₃ → H⁺ + NO₃⁻\n\n' +
      'Ca(OH)₂ → Ca²⁺ + 2OH⁻\n\n' +
      'BaCl₂ → Ba²⁺ + 2Cl⁻\n\n' +
      'Giải thích:\n' +
      '- HNO₃ là acid mạnh nên phân li gần như hoàn toàn trong nước.\n' +
      '- Ca(OH)₂ là base mạnh nên phân li tạo ion Ca²⁺ và OH⁻.\n' +
      '- BaCl₂ là muối tan nên phân li tạo ion Ba²⁺ và Cl⁻.\n\n' +
      'Vì các chất trên được xem là chất điện li mạnh nên phương trình điện li dùng mũi tên một chiều.',
  },
},
{
  id: 'p16-thuyet-bronsted-lowry',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Brønsted - Lowry',
  x: 3,
  y: 44.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Thuyết Brønsted - Lowry về acid - base',
    content:
      'Theo thuyết Brønsted - Lowry: acid là chất cho proton H⁺, base là chất nhận proton H⁺.',
    hint:
      'Điểm quan trọng của thuyết Brønsted - Lowry là xét sự chuyển proton H⁺ giữa các chất.\n\n' +
      '- Chất nhường H⁺ được gọi là acid.\n' +
      '- Chất nhận H⁺ được gọi là base.\n\n' +
      'Theo thuyết này, acid và base có thể là phân tử trung hòa hoặc ion.\n\n' +
      'Một chất có thể vừa cho H⁺, vừa nhận H⁺ trong các phản ứng khác nhau thì chất đó có tính lưỡng tính.',
  },
},
{
  id: 'p16-cau-hoi-6',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 6',
  x: 93,
  y: 42.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 6',
    content:
      'Quan sát Hình 2.4 và Hình 2.5, cho biết chất nào nhận H⁺, chất nào cho H⁺.',
    hint:
      'Hình 2.4:\n\n' +
      'HCl + H₂O → H₃O⁺ + Cl⁻\n\n' +
      '- HCl cho H⁺ cho H₂O nên HCl là acid.\n' +
      '- H₂O nhận H⁺ từ HCl nên H₂O là base.\n\n' +
      'Hình 2.5:\n\n' +
      'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻\n\n' +
      '- H₂O cho H⁺ cho NH₃ nên H₂O là acid.\n' +
      '- NH₃ nhận H⁺ từ H₂O nên NH₃ là base.\n\n' +
      'Kết luận:\n' +
      'Một chất là acid hay base phụ thuộc vào vai trò cho hoặc nhận proton H⁺ trong phản ứng cụ thể.',
  },
},
{
  id: 'p16-cau-hoi-7',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 7',
  x: 93,
  y: 52.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 7',
    content:
      'Nhận xét về vai trò acid - base của phân tử H₂O trong các cân bằng ở Hình 2.4, Hình 2.5 và cân bằng của ion HCO₃⁻ trong nước.',
    hint:
      'Trong Hình 2.4:\n\n' +
      'HCl + H₂O → H₃O⁺ + Cl⁻\n\n' +
      'H₂O nhận H⁺ từ HCl nên H₂O đóng vai trò là base.\n\n' +
      'Trong Hình 2.5:\n\n' +
      'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻\n\n' +
      'H₂O cho H⁺ cho NH₃ nên H₂O đóng vai trò là acid.\n\n' +
      'Với ion HCO₃⁻ trong nước:\n\n' +
      'HCO₃⁻ + H₂O ⇌ H₃O⁺ + CO₃²⁻\n' +
      'Trong cân bằng này, HCO₃⁻ cho H⁺ nên HCO₃⁻ là acid.\n\n' +
      'HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻\n' +
      'Trong cân bằng này, HCO₃⁻ nhận H⁺ nên HCO₃⁻ là base.\n\n' +
      'Kết luận:\n' +
      'H₂O và HCO₃⁻ đều có thể thể hiện tính lưỡng tính, vì trong những phản ứng khác nhau chúng có thể cho hoặc nhận proton H⁺.',
  },
},
{
  id: 'p16-xac-dinh-acid-base',
  page: 16,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Xác định acid-base',
  x: 93,
  y: 70.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Xác định acid - base theo Brønsted - Lowry',
    content:
      'Cho phương trình:\n\n' +
      '(1) CH₃COOH + H₂O ⇌ H₃O⁺ + CH₃COO⁻\n\n' +
      '(2) CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻\n\n' +
      'Cho biết chất nào là acid, chất nào là base theo thuyết Brønsted - Lowry.',
    hint:
      'Phương trình (1):\n\n' +
      'CH₃COOH + H₂O ⇌ H₃O⁺ + CH₃COO⁻\n\n' +
      '- CH₃COOH cho H⁺ cho H₂O nên CH₃COOH là acid.\n' +
      '- H₂O nhận H⁺ nên H₂O là base.\n' +
      '- H₃O⁺ có thể cho H⁺ nên là acid liên hợp.\n' +
      '- CH₃COO⁻ có thể nhận H⁺ nên là base liên hợp.\n\n' +
      'Phương trình (2):\n\n' +
      'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻\n\n' +
      '- CO₃²⁻ nhận H⁺ từ H₂O nên CO₃²⁻ là base.\n' +
      '- H₂O cho H⁺ nên H₂O là acid.\n' +
      '- HCO₃⁻ có thể cho H⁺ nên là acid liên hợp.\n' +
      '- OH⁻ có thể nhận H⁺ nên là base liên hợp.\n\n' +
      'Cách làm nhanh:\n' +
      'Chất cho H⁺ là acid, chất nhận H⁺ là base.',
  },
},


// ===== PAGE 17 - BÀI 2: KHÁI NIỆM pH. CHẤT CHỈ THỊ ACID - BASE =====
{
  id: 'p17-cau-hoi-8-9',
  page: 17,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 8, 9',
  x: 93,
  y: 14.1,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 8 và 9',
    content:
      '8. Tính pH của dung dịch có nồng độ H⁺ là 10⁻² M.\n' +
      '9. Tính pH của dung dịch có nồng độ OH⁻ là 10⁻⁴ M.',
    hint:
      'Câu 8:\n' +
      '[H⁺] = 10⁻² M\n' +
      'pH = -lg[H⁺] = -lg(10⁻²) = 2\n\n' +
      'Vậy pH của dung dịch là 2.\n\n' +
      'Câu 9:\n' +
      '[OH⁻] = 10⁻⁴ M\n\n' +
      'Ta có:\n' +
      'pOH = -lg[OH⁻] = -lg(10⁻⁴) = 4\n\n' +
      'Ở 25 °C:\n' +
      'pH + pOH = 14\n\n' +
      'Suy ra:\n' +
      'pH = 14 - 4 = 10\n\n' +
      'Vậy pH của dung dịch là 10.',
  },
},
{
  id: 'p17-tich-so-ion-cua-nuoc',
  page: 17,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Tích số ion nước',
  x: 3,
  y: 26,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Tích số ion của nước',
    content:
      'Trong nước luôn tồn tại một lượng rất nhỏ ion H⁺ và OH⁻. Tích số nồng độ của hai ion này được gọi là tích số ion của nước, kí hiệu là Kᴡ.',
    hint:
      'Công thức:\n\n' +
      'Kᴡ = [H⁺][OH⁻]\n\n' +
      'Ở 25 °C:\n\n' +
      'Kᴡ = [H⁺][OH⁻] = 10⁻¹⁴\n\n' +
      'Điều này có nghĩa là trong dung dịch nước loãng, nếu nồng độ H⁺ tăng thì nồng độ OH⁻ phải giảm để tích số [H⁺][OH⁻] không đổi.\n\n' +
      'Ngược lại, nếu nồng độ OH⁻ tăng thì nồng độ H⁺ phải giảm.\n\n' +
      'Ví dụ:\n' +
      '- Trong môi trường acid: [H⁺] > [OH⁻].\n' +
      '- Trong môi trường trung tính: [H⁺] = [OH⁻] = 10⁻⁷ M.\n' +
      '- Trong môi trường base: [H⁺] < [OH⁻].',
  },
},
{
  id: 'p17-cong-thuc-ph',
  page: 17,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Công thức pH',
  x: 3,
  y: 50.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Công thức tính pH',
    content:
      'pH là chỉ số dùng để đánh giá độ acid hoặc độ base của một dung dịch.',
    hint:
      'Công thức tính pH:\n\n' +
      'pH = -lg[H⁺]\n\n' +
      'Trong đó, [H⁺] là nồng độ mol của ion H⁺ trong dung dịch.\n\n' +
      'Nếu [H⁺] = 10⁻ᵃ M thì pH = a.\n\n' +
      'Ví dụ:\n' +
      '- Nếu [H⁺] = 10⁻³ M thì pH = 3.\n' +
      '- Nếu [H⁺] = 10⁻⁷ M thì pH = 7.\n' +
      '- Nếu [H⁺] = 10⁻¹⁰ M thì pH = 10.\n\n' +
      'Ý nghĩa:\n' +
      '- pH càng nhỏ thì dung dịch càng có tính acid mạnh.\n' +
      '- pH càng lớn thì dung dịch càng có tính base mạnh.\n' +
      '- pH = 7 thường ứng với môi trường trung tính ở 25 °C.',
  },
},
{
  id: 'p17-cau-hoi-10',
  page: 17,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 10',
  x: 93,
  y: 55.1,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 10',
    content:
      'Quan sát Hình 2.6, cho biết khoảng giá trị nào trong thang pH tương ứng với môi trường của dung dịch là acid, base hay trung tính.',
    hint:
      'Dựa vào thang pH:\n\n' +
      '- pH < 7: dung dịch có môi trường acid.\n' +
      '- pH = 7: dung dịch có môi trường trung tính.\n' +
      '- pH > 7: dung dịch có môi trường base.\n\n' +
      'Thang pH thường dùng có giá trị từ 1 đến 14.\n\n' +
      'Dung dịch càng acid thì pH càng nhỏ. Dung dịch càng base thì pH càng lớn.',
  },
},
{
  id: 'p17-bai-tap-ph',
  page: 17,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài tập pH',
  x: 93,
  y: 73.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Bài tập tính pH',
    content:
      'a) Pha 500 mL dung dịch HCl 0,2 M vào 500 mL nước. Tính pH của dung dịch thu được.\n\n' +
      'b) Tính khối lượng NaOH cần để pha 100 mL dung dịch NaOH có pH = 12.',
    hint:
      'Câu a:\n\n' +
      'HCl là acid mạnh nên phân li hoàn toàn:\n' +
      'HCl → H⁺ + Cl⁻\n\n' +
      'Số mol HCl ban đầu:\n' +
      'n = C × V = 0,2 × 0,5 = 0,1 mol\n\n' +
      'Thể tích dung dịch sau khi pha loãng:\n' +
      'V = 500 mL + 500 mL = 1000 mL = 1,0 L\n\n' +
      'Nồng độ H⁺ sau pha loãng:\n' +
      '[H⁺] = 0,1 / 1,0 = 0,1 M = 10⁻¹ M\n\n' +
      'pH = -lg(10⁻¹) = 1\n\n' +
      'Vậy pH của dung dịch thu được là 1.\n\n' +
      'Câu b:\n\n' +
      'Dung dịch NaOH có pH = 12.\n\n' +
      'Ở 25 °C:\n' +
      'pH + pOH = 14\n\n' +
      'Suy ra:\n' +
      'pOH = 14 - 12 = 2\n\n' +
      '[OH⁻] = 10⁻² M\n\n' +
      'NaOH là base mạnh nên:\n' +
      '[NaOH] = [OH⁻] = 10⁻² M\n\n' +
      'Thể tích dung dịch cần pha:\n' +
      'V = 100 mL = 0,1 L\n\n' +
      'Số mol NaOH cần dùng:\n' +
      'n = C × V = 10⁻² × 0,1 = 0,001 mol\n\n' +
      'Khối lượng NaOH:\n' +
      'm = n × M = 0,001 × 40 = 0,04 g\n\n' +
      'Vậy cần 0,04 g NaOH.',
  },
},


// ===== PAGE 18 - BÀI 2: Ý NGHĨA pH VÀ CHẤT CHỈ THỊ ACID - BASE =====
{
  id: 'p18-cau-hoi-11',
  page: 18,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 11',
  x: 93,
  y: 16,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 11',
    content:
      'Quan sát Hình 2.7, cho biết khoảng pH thấp nhất và cao nhất ở các cơ quan trong hệ tiêu hóa của con người.',
    hint:
      'Quan sát Hình 2.7:\n\n' +
      '- Khoang dạ dày có pH khoảng 1,5 - 3,5. Đây là khoảng pH thấp nhất trong hình, cho thấy môi trường trong dạ dày có tính acid mạnh.\n\n' +
      '- Khoang miệng có pH khoảng 6,5 - 7,5. Đây là khoảng pH cao hơn so với dạ dày và gần môi trường trung tính.\n\n' +
      'Kết luận:\n' +
      'pH trong các cơ quan tiêu hóa không giống nhau. Mỗi cơ quan có khoảng pH phù hợp với chức năng sinh lí riêng.',
  },
},
{
  id: 'p18-y-nghia-ph-thuc-tien',
  page: 18,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Ý nghĩa pH',
  x: 3,
  y: 17,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Ý nghĩa của pH trong thực tiễn',
    content:
      'pH là một chỉ số quan trọng dùng để đánh giá độ acid hoặc độ base của môi trường trong cơ thể, đất, nước và nhiều dung dịch trong đời sống.',
    hint:
      'Một số ý nghĩa thực tiễn của pH:\n\n' +
      '- Trong cơ thể người: pH ở các cơ quan khác nhau có giá trị khác nhau. Ví dụ, dạ dày có pH thấp để hỗ trợ tiêu hóa thức ăn.\n\n' +
      '- Trong nông nghiệp: pH đất ảnh hưởng đến sự phát triển của cây trồng và hiệu quả sử dụng phân bón.\n\n' +
      '- Trong đời sống: pH nước sinh hoạt là một chỉ tiêu quan trọng để đánh giá chất lượng nước.\n\n' +
      'Vì vậy, việc xác định và điều chỉnh pH có ý nghĩa lớn trong y học, nông nghiệp, môi trường và sinh hoạt.',
  },
},
{
  id: 'p18-bai-tap-dat-chua',
  page: 18,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài tập đất chua',
  x: 93,
  y: 39.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Bài tập đất chua',
    content:
      'Đất chua là đất có độ pH dưới 6,5. Để cải thiện đất trồng bị chua, người nông dân có thể bổ sung chất nào trong các chất sau vào đất: CaO, P₂O₅? Giải thích.',
    hint:
      'Đất chua có môi trường acid, vì vậy cần bổ sung chất có tính base để trung hòa bớt acid trong đất.\n\n' +
      'Trong hai chất đã cho:\n\n' +
      '- CaO là oxide base. Khi gặp nước, CaO tạo thành Ca(OH)₂ có tính base:\n' +
      'CaO + H₂O → Ca(OH)₂\n\n' +
      'Ca(OH)₂ có thể trung hòa bớt acid trong đất, giúp làm giảm độ chua của đất.\n\n' +
      '- P₂O₅ là oxide acid, không phù hợp để cải thiện đất chua.\n\n' +
      'Kết luận:\n' +
      'Nên bổ sung CaO vào đất chua.',
  },
},
{
  id: 'p18-chat-chi-thi-acid-base',
  page: 18,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Chất chỉ thị',
  x: 3,
  y: 56,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Chất chỉ thị acid - base',
    content:
      'Chất chỉ thị acid - base là chất có màu thay đổi phụ thuộc vào độ pH của môi trường.',
    hint:
      'Chất chỉ thị acid - base được dùng để nhận biết nhanh môi trường của dung dịch là acid, base hay trung tính.\n\n' +
      'Một số chất chỉ thị thường gặp:\n\n' +
      '- Giấy pH: đổi màu theo pH của dung dịch. Sau khi nhúng giấy pH vào dung dịch, so màu giấy với bảng màu chuẩn để ước lượng giá trị pH.\n\n' +
      '- Phenolphthalein: thường không màu trong môi trường acid và trung tính, chuyển màu hồng trong môi trường base.\n\n' +
      '- Quỳ tím: chuyển đỏ trong môi trường acid, chuyển xanh trong môi trường base.\n\n' +
      'Chất chỉ thị giúp nhận biết nhanh tính acid - base, nhưng nếu cần giá trị pH chính xác hơn thì nên dùng máy đo pH.',
  },
},
{
  id: 'p18-cau-hoi-12',
  page: 18,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 12',
  x: 93,
  y: 60.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 12',
    content:
      'Quan sát Hình 2.8, trình bày sự chuyển đổi màu sắc của các chất chỉ thị acid - base trong các dung dịch có độ pH khác nhau.',
    hint:
      'Quan sát Hình 2.8:\n\n' +
      '1. Giấy pH:\n' +
      'Giấy pH đổi màu khác nhau tùy theo giá trị pH của dung dịch. Sau đó, so màu giấy với bảng màu chuẩn để ước lượng pH.\n\n' +
      '2. Dung dịch phenolphthalein:\n' +
      '- Trong môi trường acid: không màu.\n' +
      '- Trong môi trường trung tính: không màu.\n' +
      '- Trong môi trường base: chuyển màu hồng.\n\n' +
      '3. Quỳ tím:\n' +
      '- Trong môi trường acid mạnh, khoảng pH < 4,5: quỳ tím chuyển đỏ.\n' +
      '- Trong môi trường base, khoảng pH > 8,3: quỳ tím chuyển xanh.\n' +
      '- Gần môi trường trung tính: quỳ tím ít đổi màu hoặc giữ màu tím.\n\n' +
      'Kết luận:\n' +
      'Các chất chỉ thị acid - base đổi màu theo pH nên có thể dùng để nhận biết môi trường acid, base hoặc trung tính.',
  },
},
{
  id: 'p18-video-quy-tim-phenol',
  page: 18,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video chỉ thị',
  x: 3,
  y: 61.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Đo pH bằng quỳ tím và phenolphthalein',
    url: 'https://www.youtube.com/embed/Ht0wbsmT3Ns',
  },
},


// ===== PAGE 19 - BÀI 2: CHUẨN ĐỘ ACID - BASE =====
{
  id: 'p19-cau-hoi-13',
  page: 19,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 13',
  x: 93,
  y: 23.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 13',
    content:
      'Hãy nêu vai trò của chất chỉ thị trong phương pháp chuẩn độ acid - base.',
    hint:
      'Chất chỉ thị acid - base giúp nhận biết thời điểm acid và base đã phản ứng vừa đủ.\n\n' +
      'Khi gần điểm tương đương, pH thay đổi nhanh làm chất chỉ thị đổi màu. Nhờ đó, người thực hiện biết lúc cần dừng nhỏ dung dịch từ burette.',
  },
},
{
  id: 'p19-cau-hoi-14',
  page: 19,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 14',
  x: 93,
  y: 32.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 14',
    content:
      'Quan sát Hình 2.9, giải thích vì sao cần lắc nhẹ dung dịch trong bình tam giác khi thực hiện thao tác chuẩn độ.',
    hint:
      'Cần lắc nhẹ bình tam giác để dung dịch trong bình trộn đều với dung dịch nhỏ từ burette.\n\n' +
      'Nếu không lắc, dung dịch mới nhỏ xuống có thể tạo vùng nồng độ cục bộ, làm chất chỉ thị đổi màu không đều và dễ xác định sai điểm kết thúc chuẩn độ.',
  },
},
{
  id: 'p19-nguyen-tac-chuan-do',
  page: 19,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Nguyên tắc chuẩn độ',
  x: 3,
  y: 20.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Nguyên tắc chuẩn độ acid - base',
    content:
      'Chuẩn độ acid - base dùng dung dịch đã biết chính xác nồng độ để xác định nồng độ dung dịch acid hoặc base chưa biết.',
    hint:
      'Dung dịch đã biết nồng độ gọi là dung dịch chuẩn.\n\n' +
      'Khi acid và base phản ứng vừa đủ, hệ đạt điểm tương đương.\n\n' +
      'Chất chỉ thị giúp nhận biết gần đúng thời điểm cần dừng chuẩn độ.',
  },
},
{
  id: 'p19-thao-tac-chuan-do',
  page: 19,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Thao tác chuẩn độ',
  x: 3,
  y: 54.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Thao tác khi chuẩn độ',
    content:
      'Khi chuẩn độ, cần nhỏ dung dịch từ burette từ từ vào bình tam giác và lắc nhẹ liên tục.',
    hint:
      'Tay thuận cầm bình tam giác và lắc nhẹ.\n\n' +
      'Tay còn lại điều chỉnh khóa burette để dung dịch nhỏ xuống từ từ.\n\n' +
      'Khi gần đổi màu, cần nhỏ từng giọt để tránh vượt quá điểm kết thúc chuẩn độ.',
  },
},
{
  id: 'p19-video-chuan-do-acid-base',
  page: 19,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video chuẩn độ',
  x: 3,
  y: 73.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Thí nghiệm chuẩn độ acid - base',
    url: 'https://www.youtube.com/embed/34fd06rhrRo',
  },
},
{
  id: 'p19-cau-hoi-15',
  page: 19,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 15',
  x: 93,
  y: 69.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 15',
    content:
      'Viết phương trình hóa học của phản ứng xảy ra trong thí nghiệm chuẩn độ dung dịch NaOH bằng dung dịch HCl.',
    hint:
      'Phương trình hóa học:\n\n' +
      'NaOH + HCl → NaCl + H₂O\n\n' +
      'Phương trình ion rút gọn:\n\n' +
      'H⁺ + OH⁻ → H₂O\n\n' +
      'Giải thích:\n' +
      'HCl cung cấp H⁺, NaOH cung cấp OH⁻. Khi chuẩn độ, H⁺ và OH⁻ phản ứng với nhau tạo nước.',
  },
},



// ===== PAGE 20 - BÀI 2: CHUẨN ĐỘ NaOH + Ý NGHĨA CÂN BẰNG ION =====
{
  id: 'p20-cau-hoi-16',
  page: 20,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 16',
  x: 93,
  y: 29.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 16',
    content:
      'Quan sát Hình 2.10, mô tả hiện tượng ở thời điểm kết thúc chuẩn độ.',
    hint:
      'Ở thời điểm kết thúc chuẩn độ, dung dịch trong bình tam giác xuất hiện màu hồng nhạt bền trong khoảng 30 giây.\n\n' +
      'Đây là dấu hiệu cho biết lượng NaOH đã vừa đủ để phản ứng với HCl, và phenolphthalein bắt đầu đổi màu trong môi trường base rất nhẹ.',
  },
},
{
  id: 'p20-cau-hoi-17',
  page: 20,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 17',
  x: 93,
  y: 37,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 17',
    content:
      'Giả sử khi kết thúc chuẩn độ, thể tích dung dịch NaOH đã sử dụng là 12,5 mL. Tính nồng độ dung dịch NaOH ban đầu.',
    hint:
      'Dữ kiện:\n' +
      'V_HCl = 10,00 mL\n' +
      'C_HCl = 0,10 M\n' +
      'V_NaOH = 12,5 mL\n\n' +
      'Phản ứng:\n' +
      'HCl + NaOH → NaCl + H₂O\n\n' +
      'Vì HCl và NaOH phản ứng theo tỉ lệ mol 1 : 1 nên:\n\n' +
      'C_NaOH = (V_HCl × C_HCl) / V_NaOH\n\n' +
      'Thay số:\n' +
      'C_NaOH = (10,00 × 0,10) / 12,5 = 0,08 M\n\n' +
      'Vậy nồng độ dung dịch NaOH ban đầu là 0,08 M.',
  },
},
{
  id: 'p20-video-chuan-do-naoh-hcl',
  page: 20,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video chuẩn độ',
  x: 3,
  y: 12.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Thí nghiệm chuẩn độ NaOH bằng HCl',
    url: 'https://www.youtube.com/embed/hNnqbCq0R-E',
  },
},
{
  id: 'p20-cong-thuc-c-naoh',
  page: 20,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Công thức CNaOH',
  x: 3,
  y: 57.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Công thức tính nồng độ NaOH',
    content:
      'Công thức tính nồng độ NaOH được dùng khi HCl và NaOH phản ứng theo tỉ lệ mol 1 : 1.',
    hint:
      'Phản ứng:\n' +
      'HCl + NaOH → NaCl + H₂O\n\n' +
      'Tại điểm tương đương:\n' +
      'n_HCl = n_NaOH\n\n' +
      'Suy ra:\n' +
      'C_HCl × V_HCl = C_NaOH × V_NaOH\n\n' +
      'Do đó:\n' +
      'C_NaOH = (V_HCl × C_HCl) / V_NaOH\n\n' +
      'Lưu ý: các thể tích phải dùng cùng một đơn vị.',
  },
},
{
  id: 'p20-y-nghia-can-bang-ion',
  page: 20,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Cân bằng ion',
  x: 3,
  y: 79.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Ý nghĩa cân bằng ion trong dung dịch nước',
    content:
      'Các ion như Al³⁺, Fe³⁺, CO₃²⁻ có thể tham gia cân bằng trong dung dịch nước.',
    hint:
      'Những cân bằng này liên quan đến nhiều hiện tượng thực tiễn như tạo kết tủa, xử lí nước, bảo quản dung dịch muối và sự thay đổi pH của dung dịch.\n\n' +
      'Ví dụ, ion Al³⁺ và Fe³⁺ có thể bị thủy phân trong nước tạo hydroxide ít tan.',
  },
},
{
  id: 'p20-cau-hoi-18',
  page: 20,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 18',
  x: 93,
  y: 81.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 18',
    content:
      'Tại sao khi bảo quản dung dịch muối M³⁺ trong phòng thí nghiệm người ta thường nhỏ vài giọt dung dịch acid vào trong lọ đựng dung dịch muối?',
    hint:
      'Ion M³⁺ như Al³⁺, Fe³⁺ có thể bị thủy phân trong nước theo cân bằng:\n\n' +
      'M³⁺ + 3H₂O ⇌ M(OH)₃↓ + 3H⁺\n\n' +
      'Nếu cân bằng chuyển dịch theo chiều thuận, sẽ tạo kết tủa M(OH)₃ làm dung dịch bị đục hoặc biến đổi.\n\n' +
      'Khi nhỏ thêm vài giọt acid, nồng độ H⁺ tăng. Theo nguyên lí Le Chatelier, cân bằng chuyển dịch theo chiều nghịch, làm giảm sự tạo thành kết tủa M(OH)₃.\n\n' +
      'Vì vậy, thêm acid giúp bảo quản dung dịch muối M³⁺ ổn định hơn.',
  },
},
// ===== PAGE 21 - BÀI 2: CÂN BẰNG ION CO3²⁻ + BÀI TẬP CUỐI BÀI =====
{
  id: 'p21-phen-chua-lam-trong-nuoc',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Phèn chua',
  x: 3,
  y: 22,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Phèn chua làm trong nước',
    content:
      'Phèn chua có thể làm trong nước vì ion Al³⁺ bị thủy phân tạo keo Al(OH)₃.',
    hint:
      'Ion Al³⁺ trong phèn chua bị thủy phân:\n\n' +
      'Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺\n\n' +
      'Al(OH)₃ tạo thành ở dạng keo, có khả năng kéo theo các hạt bẩn lơ lửng trong nước rồi lắng xuống. Vì vậy nước trở nên trong hơn.',
  },
},
{
  id: 'p21-cau-hoi-19',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 19',
  x: 93,
  y: 39,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 19',
    content:
      'Giải thích vì sao quá trình thủy phân ion CO₃²⁻ trong nước làm tăng pH của nước.',
    hint:
      'Ion CO₃²⁻ nhận proton H⁺ từ nước:\n\n' +
      'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻\n\n' +
      'Vì phản ứng tạo ra ion OH⁻ nên dung dịch có tính base hơn. Khi [OH⁻] tăng, pH của nước tăng.',
  },
},
{
  id: 'p21-can-bang-co3',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Cân bằng CO₃²⁻',
  x: 3,
  y: 47.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Cân bằng thủy phân ion CO₃²⁻',
    content:
      'Ion CO₃²⁻ bị thủy phân trong nước tạo môi trường base.',
    hint:
      'Theo Brønsted - Lowry, CO₃²⁻ là base vì có khả năng nhận H⁺ từ nước.\n\n' +
      'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻\n\n' +
      'Sản phẩm có OH⁻ nên dung dịch sau thủy phân có môi trường base.',
  },
},
{
  id: 'p21-bai-tap-ho-boi',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài tập hồ bơi',
  x: 93,
  y: 51,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Điều chỉnh pH nước ao, hồ',
    content:
      'Khi mưa nhiều ngày liên tục có thể làm pH của nước ở ao, hồ giảm xuống dưới 6,5 và người ta thường rắc vôi bột để điều chỉnh pH. Giải thích.',
    hint:
      'Nước mưa thường có tính acid nhẹ do hòa tan CO₂ và một số khí acid trong không khí. Vì vậy mưa kéo dài có thể làm pH nước ao, hồ giảm.\n\n' +
      'Vôi bột có tính base. Nếu dùng CaO, CaO phản ứng với nước tạo Ca(OH)₂:\n\n' +
      'CaO + H₂O → Ca(OH)₂\n\n' +
      'Ca(OH)₂ tạo OH⁻, giúp trung hòa bớt acid và làm pH tăng về khoảng phù hợp.',
  },
},

// ===== 5 NÚT LỜI GIẢI BÀI TẬP SGK =====
{
  id: 'p21-bai-tap-1',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài 1',
  x: 93,
  y: 67.2,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Lời giải bài tập 1',
    content:
      'Một dung dịch có [OH⁻] = 2,5 × 10⁻¹⁰ M. Tính pH và xác định môi trường của dung dịch này.',
    hint:
      'Ta có:\n' +
      'pOH = -lg[OH⁻] = -lg(2,5 × 10⁻¹⁰)\n\n' +
      'pOH ≈ 9,6\n\n' +
      'pH = 14 - pOH = 14 - 9,6 = 4,4\n\n' +
      'Vì pH < 7 nên dung dịch có môi trường acid.',
  },
},
{
  id: 'p21-bai-tap-2',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài 2',
  x: 93,
  y: 72.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 2',
    content:
      'Tính pH của dung dịch thu được sau khi trộn 40 mL dung dịch HCl 0,5 M với 60 mL dung dịch NaOH 0,5 M.',
    hint:
      'Số mol HCl:\n' +
      'nHCl = 0,5 × 0,040 = 0,020 mol\n\n' +
      'Số mol NaOH:\n' +
      'nNaOH = 0,5 × 0,060 = 0,030 mol\n\n' +
      'Phản ứng: HCl + NaOH → NaCl + H₂O\n\n' +
      'NaOH dư:\n' +
      'nOH⁻ dư = 0,030 - 0,020 = 0,010 mol\n\n' +
      'Thể tích dung dịch sau trộn:\n' +
      'V = 40 mL + 60 mL = 100 mL = 0,100 L\n\n' +
      '[OH⁻] = 0,010 / 0,100 = 0,10 M = 10⁻¹ M\n\n' +
      'pOH = 1\n' +
      'pH = 14 - 1 = 13\n\n' +
      'Vậy pH của dung dịch sau phản ứng là 13.',
  },
},
{
  id: 'p21-bai-tap-3',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài 3',
  x: 93,
  y: 76.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Lời giải bài tập 3',
    content:
      'Một mẫu dịch vị có pH = 2,5. Xác định nồng độ mol của ion H⁺ trong mẫu dịch vị đó.',
    hint:
      'Ta có:\n' +
      'pH = -lg[H⁺]\n\n' +
      'Suy ra:\n' +
      '[H⁺] = 10⁻pH = 10⁻²·⁵\n\n' +
      '[H⁺] ≈ 3,16 × 10⁻³ M\n\n' +
      'Vậy nồng độ mol của ion H⁺ trong mẫu dịch vị là khoảng 3,16 × 10⁻³ M.',
  },
},
{
  id: 'p21-bai-tap-4',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài 4',
  x: 93,
  y: 81.6,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 4',
    content:
      'Viết phương trình điện li của các chất: H₂SO₄, Ba(OH)₂, Al₂(SO₄)₃.',
    hint:
      'Các phương trình điện li:\n\n' +
      'H₂SO₄ → 2H⁺ + SO₄²⁻\n\n' +
      'Ba(OH)₂ → Ba²⁺ + 2OH⁻\n\n' +
      'Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻\n\n' +
      'Các chất trên được xem là chất điện li mạnh nên dùng mũi tên một chiều.',
  },
},
{
  id: 'p21-bai-tap-5',
  page: 21,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài 5',
  x: 93,
  y: 86.2,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 5',
    content:
      'Ở các vùng quê, người dân thường dùng phèn chua để làm trong nước nhờ ứng dụng phản ứng thủy phân ion Al³⁺. Giải thích. Chất hay ion nào là acid, là base trong phản ứng thủy phân Al³⁺?',
    hint:
      'Ion Al³⁺ bị thủy phân trong nước:\n\n' +
      'Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺\n\n' +
      'Al(OH)₃ tạo thành ở dạng keo, kéo theo các hạt bẩn lơ lửng rồi lắng xuống. Vì vậy nước trở nên trong hơn.\n\n' +
      'Xét theo Brønsted - Lowry:\n' +
      '- Al³⁺ làm tăng khả năng cho H⁺ của nước, nên Al³⁺ có vai trò acid.\n' +
      '- H₂O cho H⁺ nên đóng vai trò base đối với Al³⁺ trong quá trình thủy phân.',
  },
},

// ===== NÚT BÀI TẬP THÊM BÀI 2 =====
{
  id: 'p21-bai-tap-them-bai-2',
  page: 21,
  type: 'practice',
  variant: 'solid',
  align: 'left',
  icon: '',
  label: 'Bài tập thêm',
  x: 22.5,
  y: 89.0,
  width: 18,
  height: 5,
  action: {
    type: 'practiceSet',
    modalSize: 'lg',
    title: 'Bài tập thêm - Cân bằng trong dung dịch nước',
    questions: [
      {
        id: 'bai2-extra-1',
        prompt: 'Chất nào sau đây là chất điện li?',
        options: [
          { id: 'A', text: 'Cl₂.' },
          { id: 'B', text: 'HNO₃.' },
          { id: 'C', text: 'MgO.' },
          { id: 'D', text: 'CH₄.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. HNO₃ là acid mạnh nên khi tan trong nước phân li ra ion, do đó là chất điện li.',
      },
      {
        id: 'bai2-extra-2',
        prompt: 'Chất nào dưới đây không phân li ra ion khi hòa tan trong nước?',
        options: [
          { id: 'A', text: 'MgCl₂.' },
          { id: 'B', text: 'HClO₃.' },
          { id: 'C', text: 'Ba(OH)₂.' },
          { id: 'D', text: 'C₆H₁₂O₆ (glucose).' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Glucose tan trong nước nhưng không phân li thành ion, nên là chất không điện li.',
      },
      {
        id: 'bai2-extra-3',
        prompt: 'Chất nào sau đây thuộc loại chất điện li mạnh?',
        options: [
          { id: 'A', text: 'CH₃COOH.' },
          { id: 'B', text: 'C₂H₅OH.' },
          { id: 'C', text: 'H₂O.' },
          { id: 'D', text: 'NaCl.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. NaCl là muối tan, khi tan trong nước phân li gần như hoàn toàn thành Na⁺ và Cl⁻ nên là chất điện li mạnh.',
      },
      {
        id: 'bai2-extra-4',
        prompt: 'Phương trình điện li viết đúng là:',
        options: [
          { id: 'A', text: 'H₂SO₄ → 2H⁺ + SO₄⁻.' },
          { id: 'B', text: 'NaOH ⇌ Na⁺ + OH⁻.' },
          { id: 'C', text: 'HF ⇌ H⁺ + F⁻.' },
          { id: 'D', text: 'AlCl₃ → Al³⁺ + Cl₃⁻.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. HF là acid yếu nên phương trình điện li dùng mũi tên hai chiều: HF ⇌ H⁺ + F⁻.',
      },
      {
        id: 'bai2-extra-5',
        prompt: 'Phương trình điện li nào sau đây không đúng?',
        options: [
          { id: 'A', text: 'HCl → H⁺ + Cl⁻.' },
          { id: 'B', text: 'K₂SO₄ ⇌ 2K⁺ + SO₄²⁻.' },
          { id: 'C', text: 'HF ⇌ H⁺ + F⁻.' },
          { id: 'D', text: 'BaCl₂ → Ba²⁺ + 2Cl⁻.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. K₂SO₄ là muối tan, là chất điện li mạnh nên phải viết mũi tên một chiều: K₂SO₄ → 2K⁺ + SO₄²⁻.',
      },
      {
        id: 'bai2-extra-6',
        prompt:
          'Trong dung dịch acetic acid CH₃COOH, bỏ qua sự phân li của H₂O, có những phần tử nào?',
        options: [
          { id: 'A', text: 'H⁺, CH₃COO⁻.' },
          { id: 'B', text: 'H⁺, CH₃COO⁻, H₂O.' },
          { id: 'C', text: 'CH₃COOH, H⁺, CH₃COO⁻, H₂O.' },
          { id: 'D', text: 'CH₃COOH, CH₃COO⁻, H⁺.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. CH₃COOH là chất điện li yếu nên trong dung dịch vẫn còn phân tử CH₃COOH, đồng thời có một phần phân li thành H⁺ và CH₃COO⁻. Vì đề yêu cầu bỏ qua sự phân li của H₂O nên không xét H₂O.',
      },
      {
        id: 'bai2-extra-7',
        prompt:
          'Cho phương trình: CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺. Trong phản ứng thuận, theo thuyết Brønsted - Lowry, chất nào là acid?',
        options: [
          { id: 'A', text: 'CH₃COOH.' },
          { id: 'B', text: 'H₂O.' },
          { id: 'C', text: 'CH₃COO⁻.' },
          { id: 'D', text: 'H₃O⁺.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Trong phản ứng thuận, CH₃COOH nhường H⁺ cho H₂O nên CH₃COOH là acid.',
      },
      {
        id: 'bai2-extra-8',
        prompt:
          'Trong phản ứng: CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻, những chất nào đóng vai trò là base theo thuyết Brønsted - Lowry?',
        options: [
          { id: 'A', text: 'CO₃²⁻ và OH⁻.' },
          { id: 'B', text: 'CO₃²⁻ và HCO₃⁻.' },
          { id: 'C', text: 'H₂O và OH⁻.' },
          { id: 'D', text: 'H₂O và CO₃²⁻.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Trong phản ứng thuận, CO₃²⁻ nhận H⁺ nên là base. Trong phản ứng nghịch, OH⁻ nhận H⁺ nên cũng là base.',
      },
      {
        id: 'bai2-extra-9',
        prompt: 'Saccharose là chất không điện li vì:',
        options: [
          { id: 'A', text: 'Phân tử saccharose không có khả năng hòa tan trong nước.' },
          { id: 'B', text: 'Phân tử saccharose không có khả năng phân li thành ion trong nước.' },
          { id: 'C', text: 'Phân tử saccharose không có tính dẫn điện.' },
          { id: 'D', text: 'Phân tử saccharose có khả năng hòa tan trong nước.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Saccharose có thể tan trong nước nhưng không phân li thành ion nên dung dịch saccharose không dẫn điện.',
      },
      {
        id: 'bai2-extra-10',
        prompt: 'Hãy cho biết tập hợp các chất nào sau đây đều là chất điện li yếu?',
        options: [
          { id: 'A', text: 'Cu(OH)₂, NaCl, C₂H₅OH, HCl.' },
          { id: 'B', text: 'C₆H₁₂O₆, Na₂SO₄, NaNO₃, H₂SO₄.' },
          { id: 'C', text: 'NaOH, NaCl, Na₂SO₄, HNO₃.' },
          { id: 'D', text: 'CH₃COOH, HF, Mg(OH)₂, H₂S.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. CH₃COOH, HF, Mg(OH)₂ và H₂S đều là acid yếu hoặc base yếu, nên được xem là các chất điện li yếu.',
      },
      {
        id: 'bai2-extra-11',
        prompt: 'Đặc điểm nào sau đây là không đúng khi mô tả về base yếu?',
        options: [
          { id: 'A', text: 'Trong dung dịch, không phân li hoàn toàn ra OH⁻.' },
          { id: 'B', text: 'Có khả năng nhận H⁺.' },
          { id: 'C', text: 'Dung dịch nước của chúng dẫn điện.' },
          { id: 'D', text: 'Có khả năng cho H⁺.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Theo Brønsted - Lowry, base là chất có khả năng nhận H⁺, không phải cho H⁺.',
      },
      {
        id: 'bai2-extra-12',
        prompt: 'Dung dịch chất nào sau đây, có cùng nồng độ, dẫn điện tốt nhất?',
        options: [
          { id: 'A', text: 'K₂SO₄.' },
          { id: 'B', text: 'KOH.' },
          { id: 'C', text: 'NaCl.' },
          { id: 'D', text: 'KNO₃.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Với cùng nồng độ, K₂SO₄ phân li tạo 3 ion: 2K⁺ và SO₄²⁻, nên tạo nhiều ion hơn các chất còn lại và dẫn điện tốt nhất.',
      },
      {
        id: 'bai2-extra-13',
        prompt: 'Nồng độ mol của ion Na⁺ trong dung dịch Na₂SO₄ 0,2 M là:',
        options: [
          { id: 'A', text: '0,2 M.' },
          { id: 'B', text: '0,1 M.' },
          { id: 'C', text: '0,4 M.' },
          { id: 'D', text: '0,5 M.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Na₂SO₄ → 2Na⁺ + SO₄²⁻. Do đó [Na⁺] = 2 × 0,2 = 0,4 M.',
      },
      {
        id: 'bai2-extra-14',
        prompt:
          'Theo thuyết Brønsted - Lowry, chất nào sau đây là acid?',
        options: [
          { id: 'A', text: 'NaOH.' },
          { id: 'B', text: 'NaCl.' },
          { id: 'C', text: 'NH₄⁺.' },
          { id: 'D', text: 'CO₃²⁻.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. NH₄⁺ có thể nhường H⁺ nên là acid theo thuyết Brønsted - Lowry.',
      },
      {
        id: 'bai2-extra-15',
        prompt: 'Dung dịch chất nào sau đây làm xanh quỳ tím?',
        options: [
          { id: 'A', text: 'HCl.' },
          { id: 'B', text: 'Na₂SO₄.' },
          { id: 'C', text: 'NaOH.' },
          { id: 'D', text: 'KCl.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. NaOH là base mạnh, dung dịch có pH > 7 nên làm xanh quỳ tím.',
      },
    ],
  },
},

// ===== PAGE 22 - BÀI 3: ĐƠN CHẤT NITROGEN - TRANG MỞ ĐẦU =====
{
  id: 'p22-video-bai-hoc-nitrogen',
  page: 22,
  type: 'video',
  variant: 'ghost',
  align: 'right',
  icon: '▶',
  label: 'Video bài học',
  x: 93,
  y: 16,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Video bài học - Đơn chất nitrogen',
    url: 'https://www.youtube.com/embed/_zgY4t_ZW1M?start=494',
  },
},
{
  id: 'p22-cau-hoi-mo-dau',
  page: 22,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Câu hỏi mở đầu',
  x: 3,
  y: 39.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi mở đầu',
    content:
      'Nitrogen là khí có hàm lượng lớn nhất trong không khí, có vai trò cung cấp đạm tự nhiên cho cây trồng. Nitrogen có tính chất gì và có những ứng dụng nào trong cuộc sống?',
    hint:
      'Nitrogen tồn tại chủ yếu dưới dạng khí N₂ trong không khí.\n\n' +
      'Ở điều kiện thường, N₂ khá trơ vì phân tử có liên kết ba rất bền.\n\n' +
      'Nitrogen có nhiều ứng dụng: tạo môi trường trơ, sản xuất ammonia và phân đạm, dùng nitrogen lỏng để làm lạnh nhanh và bảo quản mẫu, thực phẩm.',
  },
},
{
  id: 'p22-nitrogen-long',
  page: 22,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Nitrogen lỏng',
  x: 93,
  y: 43.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Nitrogen lỏng dùng để làm gì?',
    content:
      'Nitrogen lỏng là nitrogen ở trạng thái lỏng, có nhiệt độ rất thấp nên được dùng để làm lạnh nhanh.',
    hint:
      'Nitrogen lỏng có khả năng hấp thụ nhiệt rất mạnh khi bay hơi, vì vậy được dùng để làm lạnh và bảo quản thực phẩm, mẫu sinh học hoặc vật liệu cần giữ ở nhiệt độ thấp.\n\n' +
      'Khi sử dụng cần có dụng cụ bảo hộ vì nitrogen lỏng có thể gây bỏng lạnh nếu tiếp xúc trực tiếp với da.',
  },
},
{
  id: 'p22-video-nitrogen-long',
  page: 22,
  type: 'video',
  variant: 'ghost',
  align: 'right',
  icon: '►',
  label: 'Video nitrogen lỏng',
  x: 93,
  y: 48.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Nitrogen lỏng làm lạnh thực phẩm',
    url: 'https://www.youtube.com/embed/ElyzmimKbgo',
  },
},
{
  id: 'p22-cau-hoi-1',
  page: 22,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 1',
  x: 93,
  y: 63,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 1',
    content:
      'Quan sát Hình 3.1, cho biết trong không khí, khí nào chiếm tỉ lệ thể tích lớn nhất.',
    hint:
      'Theo Hình 3.1, nitrogen chiếm khoảng 78% thể tích không khí.\n\n' +
      'Oxygen chiếm khoảng 21%, còn carbon dioxide, argon, hơi nước và các khí khác chiếm khoảng 1%.\n\n' +
      'Vì vậy, khí chiếm tỉ lệ thể tích lớn nhất trong không khí là nitrogen.',
  },
},
{
  id: 'p22-cau-hoi-2',
  page: 22,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 2',
  x: 93,
  y: 72.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 2',
    content:
      'Ngoài đơn chất nitrogen thì nguyên tố nitrogen còn tồn tại dưới dạng nào? Lấy ví dụ.',
    hint:
      'Ngoài dạng đơn chất N₂, nguyên tố nitrogen còn tồn tại trong nhiều hợp chất.\n\n' +
      'Ví dụ:\n' +
      '- Trong khoáng vật: sodium nitrate NaNO₃, còn gọi là diêm tiêu natri.\n' +
      '- Trong sinh vật: protein, nucleic acid.\n' +
      '- Trong phân bón: urea, ammonium nitrate, các muối nitrate.\n\n' +
      'Kết luận: trong tự nhiên, nitrogen tồn tại cả ở dạng đơn chất và dạng hợp chất.',
  },
},
{
  id: 'p22-trang-thai-tu-nhien-nitrogen',
  page: 22,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Trạng thái tự nhiên',
  x: 3,
  y: 81.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Trạng thái tự nhiên của nitrogen',
    content:
      'Trong tự nhiên, nitrogen tồn tại ở dạng đơn chất và hợp chất.',
    hint:
      'Ở dạng đơn chất, nitrogen chủ yếu tồn tại dưới dạng khí N₂, chiếm khoảng 78% thể tích không khí.\n\n' +
      'Nitrogen tự nhiên là hỗn hợp của hai đồng vị bền: ¹⁴N và ¹⁵N.\n\n' +
      'Ở dạng hợp chất, nitrogen có trong khoáng vật nitrate, trong protein, nucleic acid và nhiều hợp chất hữu cơ khác.',
  },
},

// ===== PAGE 23 - BÀI 3: TÍNH CHẤT VẬT LÍ VÀ HÓA HỌC CỦA NITROGEN =====

// ===== NỬA 1: TÍNH CHẤT VẬT LÍ =====
{
  id: 'p23-cau-hoi-3',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 3',
  x: 93,
  y: 17.4,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 3',
    content:
      'Quan sát Hình 3.2, nêu hiện tượng xảy ra. Giải thích.',
    hint:
      'Hiện tượng: khi đưa cây nến đang cháy vào bình chứa khí nitrogen, ngọn nến tắt.\n\n' +
      'Giải thích: nitrogen không duy trì sự cháy. Trong bình chứa chủ yếu khí nitrogen, lượng oxygen không đủ để cây nến tiếp tục cháy nên ngọn lửa bị tắt.',
  },
},
{
  id: 'p23-cau-hoi-4',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 4',
  x: 93,
  y: 22.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 4',
    content:
      'Nitrogen nặng hơn hay nhẹ hơn không khí? Tại sao?',
    hint:
      'Phân tử khối của N₂ là 28.\n\n' +
      'Khối lượng mol trung bình của không khí khoảng 29 g/mol.\n\n' +
      'Vì 28 < 29 nên nitrogen nhẹ hơn không khí một chút.',
  },
},
{
  id: 'p23-video-n2-khong-duy-tri-su-chay',
  page: 23,
  type: 'video',
  variant: 'ghost',
  align: 'left',
  icon: '►',
  label: 'Video N₂',
  x: 3,
  y: 18.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'video',
    modalSize: 'md',
    title: 'Thí nghiệm nitrogen không duy trì sự cháy',
    url: 'https://www.youtube.com/embed/zTJT47iebko',
  },
},
{
  id: 'p23-thu-khi-nitrogen',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Thu khí N₂',
  x: 93,
  y: 35.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Thu khí nitrogen bằng phương pháp đẩy nước',
    content:
      'Người ta có thể thu khí nitrogen trong phòng thí nghiệm bằng phương pháp đẩy nước. Hãy giải thích điều này.',
    hint:
      'Có thể thu nitrogen bằng phương pháp đẩy nước vì nitrogen tan rất ít trong nước.\n\n' +
      'Ở điều kiện thường, 1 lít nước chỉ hòa tan được khoảng 0,015 lít khí nitrogen.\n\n' +
      'Do tan rất ít và không phản ứng đáng kể với nước ở điều kiện thường, khí nitrogen có thể đẩy nước ra khỏi bình thu khí.',
  },
},
{
  id: 'p23-tinh-chat-vat-li-nitrogen',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Tính chất vật lí',
  x: 3,
  y: 34,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Tính chất vật lí của nitrogen',
    content:
      'Ở điều kiện thường, nitrogen là chất khí không màu, không mùi, không vị, hơi nhẹ hơn không khí và tan rất ít trong nước.',
    hint:
      'Một số ý chính cần nhớ:\n\n' +
      '- Nitrogen là khí không màu, không mùi, không vị.\n' +
      '- Hơi nhẹ hơn không khí.\n' +
      '- Hóa lỏng ở -196 °C.\n' +
      '- Hóa rắn ở -210 °C.\n' +
      '- Tan rất ít trong nước.\n' +
      '- Không duy trì sự cháy và sự hô hấp.',
  },
},

// ===== NỬA 2: TÍNH CHẤT HÓA HỌC =====
{
  id: 'p23-lien-ket-n-ba-n',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Liên kết N≡N',
  x: 3,
  y: 51.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Liên kết ba trong phân tử nitrogen',
    content:
      'Phân tử nitrogen có liên kết ba N≡N với năng lượng liên kết rất lớn.',
    hint:
      'Trong phân tử N₂, hai nguyên tử nitrogen liên kết với nhau bằng liên kết ba N≡N.\n\n' +
      'Năng lượng liên kết N≡N khoảng 945 kJ/mol, rất lớn.\n\n' +
      'Vì liên kết này rất bền nên ở nhiệt độ thường, nitrogen khá trơ về mặt hóa học.',
  },
},
{
  id: 'p23-cau-hoi-5',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 5',
  x: 93,
  y: 59.6,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Câu hỏi 5',
    content:
      'Quan sát Hình 3.3 và từ dữ kiện năng lượng liên kết trong phân tử N₂, dự đoán về độ bền phân tử và khả năng phản ứng của nitrogen ở nhiệt độ thường.',
    hint:
      'Phân tử N₂ rất bền vì có liên kết ba N≡N với năng lượng liên kết lớn.\n\n' +
      'Liên kết này khó bị phá vỡ ở điều kiện thường.\n\n' +
      'Vì vậy, nitrogen khó phản ứng với nhiều chất ở nhiệt độ thường, tức là khá trơ về mặt hóa học.',
  },
},
{
  id: 'p23-tac-dung-voi-h2',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Tác dụng với H₂',
  x: 3,
  y: 71.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Nitrogen tác dụng với hydrogen',
    content:
      'Ở nhiệt độ cao, áp suất cao và có xúc tác Fe, nitrogen phản ứng với hydrogen tạo ammonia.',
    hint:
      'Phương trình phản ứng:\n\n' +
      'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)\n\n' +
      'Điều kiện: nhiệt độ khoảng 380 °C - 450 °C, áp suất cao và xúc tác Fe.\n\n' +
      'Đây là phản ứng quan trọng trong công nghiệp sản xuất ammonia và phân đạm.\n\n' +
      'Phản ứng có ΔH°₂₉₈ = -91,8 kJ nên là phản ứng tỏa nhiệt.',
  },
},
{
  id: 'p23-tac-dung-voi-o2',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Tác dụng với O₂',
  x: 3,
  y: 80.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Nitrogen tác dụng với oxygen',
    content:
      'Ở nhiệt độ rất cao, nitrogen phản ứng với oxygen tạo nitrogen monoxide NO.',
    hint:
      'Phương trình phản ứng:\n\n' +
      'N₂(g) + O₂(g) ⇌ 2NO(g)\n\n' +
      'Phản ứng cần nhiệt độ rất cao vì phân tử N₂ có liên kết ba rất bền.\n\n' +
      'Phản ứng có ΔH°₂₉₈ = 180 kJ nên là phản ứng thu nhiệt.\n\n' +
      'Trong tự nhiên, phản ứng này có thể xảy ra khi có tia sét.',
  },
},
{
  id: 'p23-cau-hoi-6',
  page: 23,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 6',
  x: 93,
  y: 74.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 6',
    content:
      'Xác định tính oxi hóa, tính khử của nitrogen trong phản ứng của N₂ với H₂ và với O₂. Cho biết các phản ứng này thu nhiệt hay tỏa nhiệt.',
    hint:
      'Phản ứng với hydrogen:\n\n' +
      'N₂ + 3H₂ ⇌ 2NH₃\n\n' +
      'Số oxi hóa của N thay đổi: 0 → -3.\n' +
      'Nitrogen bị khử nên N₂ đóng vai trò chất oxi hóa.\n' +
      'ΔH°₂₉₈ = -91,8 kJ < 0 nên phản ứng tỏa nhiệt.\n\n' +
      'Phản ứng với oxygen:\n\n' +
      'N₂ + O₂ ⇌ 2NO\n\n' +
      'Số oxi hóa của N thay đổi: 0 → +2.\n' +
      'Nitrogen bị oxi hóa nên N₂ đóng vai trò chất khử.\n' +
      'ΔH°₂₉₈ = 180 kJ > 0 nên phản ứng thu nhiệt.',
  },
},

// ===== PAGE 24 - BÀI 3: CHU TRÌNH NITROGEN VÀ ỨNG DỤNG =====
{
  id: 'p24-chu-trinh-nitrogen',
  page: 24,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Chu trình N',
  x: 3,
  y: 25,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Chu trình nitrogen trong tự nhiên',
    content:
      'Trong tự nhiên, nitrogen luôn chuyển hóa giữa nhiều dạng khác nhau theo một chu trình tuần hoàn.',
    hint:
      'Nitrogen tồn tại trong không khí chủ yếu ở dạng N₂.\n\n' +
      'Một phần nitrogen được chuyển hóa thành các hợp chất trong đất, sau đó thực vật hấp thụ chủ yếu dưới dạng ion nitrate NO₃⁻ và ammonium NH₄⁺.\n\n' +
      'Động vật lấy nitrogen thông qua thức ăn. Khi sinh vật chết hoặc bài tiết, các hợp chất chứa nitrogen trở lại đất và tiếp tục được vi sinh vật chuyển hóa.\n\n' +
      'Nhờ chu trình này, nitrogen được luân chuyển giữa khí quyển, đất và sinh vật.',
  },
},
{
  id: 'p24-cau-hoi-7',
  page: 24,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 7',
  x: 93,
  y: 23.3,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 7',
    content:
      'Quan sát Hình 3.4, cho biết con người có thể can thiệp vào chu trình của nitrogen trong tự nhiên bằng cách nào. Nếu sự can thiệp đó vượt ngưỡng cho phép thì ảnh hưởng gì đến môi trường?',
    hint:
      'Con người có thể can thiệp vào chu trình nitrogen bằng nhiều cách, ví dụ:\n\n' +
      '- Sử dụng phân bón chứa nitrogen như phân nitrate, phân ammonium, urea.\n' +
      '- Trồng cây họ đậu để tăng khả năng cố định nitrogen.\n' +
      '- Xử lí đất, xử lí nước thải.\n' +
      '- Hoạt động công nghiệp và đốt nhiên liệu cũng có thể tạo ra các oxide của nitrogen.\n\n' +
      'Nếu sự can thiệp vượt ngưỡng cho phép, lượng hợp chất nitrogen dư thừa có thể gây ô nhiễm đất, ô nhiễm nước, phú dưỡng ao hồ, làm mất cân bằng hệ sinh thái và ảnh hưởng đến sức khỏe con người.',
  },
},
{
  id: 'p24-nitrate-tu-nuoc-mua',
  page: 24,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Nitrate từ mưa',
  x: 3,
  y: 47.0,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Nitrate được tạo từ nước mưa như thế nào?',
    content:
      'Trong khí quyển, nitrogen có thể được chuyển hóa thành hợp chất nitrate rồi theo nước mưa đi xuống đất.',
    hint:
      'Khi có sấm sét, nhiệt độ rất cao làm nitrogen trong không khí phản ứng với oxygen tạo các oxide của nitrogen.\n\n' +
      'Các oxide này tiếp tục chuyển hóa trong khí quyển, tạo thành các hợp chất nitrate.\n\n' +
      'Khi mưa xuống, nitrate theo nước mưa đi vào đất, bổ sung một lượng hợp chất nitrogen tự nhiên cho cây trồng.',
  },
},
{
  id: 'p24-ket-luan-chu-trinh-nitrogen',
  page: 24,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Kết luận',
  x: 3,
  y: 61.4,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Kết luận về chu trình nitrogen',
    content:
      'Nitrogen rất cần thiết cho sự sống và luôn được chuyển hóa tuần hoàn trong tự nhiên.',
    hint:
      'Trong tự nhiên, nitrogen không đứng yên ở một dạng duy nhất.\n\n' +
      'Nó được chuyển hóa giữa nitrogen trong không khí, nitrogen trong đất và nitrogen trong sinh vật.\n\n' +
      'Chu trình nitrogen giúp duy trì nguồn nitrogen cần thiết cho cây trồng, động vật và toàn bộ hệ sinh thái.',
  },
},
{
  id: 'p24-ung-dung-nitrogen',
  page: 24,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Ứng dụng N₂',
  x: 3,
  y: 79.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Ứng dụng của đơn chất nitrogen',
    content:
      'Nitrogen khí và nitrogen lỏng được dùng nhiều trong sản xuất, bảo quản và nghiên cứu nhờ tính khá trơ của N₂ và nhiệt độ rất thấp của nitrogen lỏng.',
    hint:
      'Một số ứng dụng trong hình:\n\n' +
      '1. Trong sản xuất rượu bia:\n' +
      'Nitrogen được bơm vào các bể chứa để loại bớt oxygen. Nhờ đó hạn chế quá trình oxi hóa, giúp bảo quản sản phẩm tốt hơn.\n\n' +
      '2. Trong công nghệ đóng gói thực phẩm:\n' +
      'Nitrogen được bơm vào túi để loại bỏ khí oxygen và làm phồng bao bì. Việc giảm oxygen giúp hạn chế sự oxi hóa, làm chậm quá trình hư hỏng thực phẩm.\n\n' +
      '3. Trong chữa cháy:\n' +
      'Nitrogen được dùng để dập tắt các đám cháy do hóa chất, chập điện,... vì nitrogen làm giảm nồng độ oxygen quanh vùng cháy. Khi thiếu oxygen, sự cháy không được duy trì.\n\n' +
      'Ngoài ra, nitrogen lỏng còn được dùng để làm lạnh sâu, bảo quản mẫu sinh học, thực phẩm và hỗ trợ một số hoạt động nghiên cứu.',
  },
},
// ===== PAGE 25 - BÀI 3: ỨNG DỤNG NITROGEN + BÀI TẬP CUỐI BÀI =====
{
  id: 'p25-cau-hoi-8',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Câu hỏi 8',
  x: 93,
  y: 12.3,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Câu hỏi 8',
    content:
      'Quan sát Hình 3.5 và dựa vào các tính chất của nitrogen, hãy giải thích vì sao nitrogen có những ứng dụng đó.',
    hint:
      'Nitrogen có nhiều ứng dụng vì N₂ khá trơ ở điều kiện thường, không duy trì sự cháy và nitrogen lỏng có nhiệt độ rất thấp.\n\n' +
      '- Trong y tế: nitrogen lỏng dùng để bảo quản mẫu, tế bào, dịch cơ thể, trứng, tinh trùng,... vì có nhiệt độ rất thấp.\n\n' +
      '- Trong khai thác dầu khí: hỗn hợp khí N₂ và CO₂ được bơm vào bể chứa để tạo áp suất đẩy dầu còn lại lên trên, đồng thời N₂ khá trơ nên an toàn hơn trong nhiều điều kiện.\n\n' +
      '- Trong công nghiệp và bảo quản: N₂ được dùng làm môi trường trơ, hạn chế sự oxi hóa và hạn chế cháy nổ.',
  },
},
{
  id: 'p25-vaccine-nitrogen',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Lọ vaccine',
  x: 93,
  y: 24.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'sm',
    title: 'Vì sao bơm nitrogen vào lọ vaccine?',
    content:
      'Giải thích vì sao người ta bơm khí nitrogen vào những lọ vaccine.',
    hint:
      'Khí nitrogen khá trơ ở điều kiện thường nên thường được dùng để thay thế không khí trong bao bì hoặc lọ chứa.\n\n' +
      'Khi bơm nitrogen vào lọ vaccine, lượng oxygen trong lọ giảm xuống. Điều này giúp hạn chế quá trình oxi hóa, giảm nguy cơ làm biến đổi thành phần nhạy cảm và hỗ trợ bảo quản vaccine ổn định hơn.',
  },
},
{
  id: 'p25-ung-dung-nitrogen-tong-ket',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'left',
  icon: '?',
  label: 'Ứng dụng N₂',
  x: 3,
  y: 36.8,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Tổng kết ứng dụng của nitrogen',
    content:
      'Nitrogen là nguyên tố dinh dưỡng quan trọng và đơn chất nitrogen có nhiều ứng dụng trong công nghiệp, y tế, thực phẩm và nghiên cứu.',
    hint:
      'Một số ứng dụng quan trọng:\n\n' +
      '- Dùng để tổng hợp ammonia NH₃, từ đó sản xuất phân đạm, nitric acid,...\n\n' +
      '- Dùng làm môi trường trơ trong luyện kim, thực phẩm, điện tử,... vì N₂ khá trơ ở điều kiện thường.\n\n' +
      '- Dùng trong đóng gói thực phẩm để giảm oxygen, hạn chế oxi hóa và kéo dài thời gian bảo quản.\n\n' +
      '- Nitrogen lỏng dùng làm môi trường đông lạnh để bảo quản mẫu sinh học, tế bào, mô, tinh trùng, trứng,...\n\n' +
      '- Nitrogen cũng được dùng trong một số hệ thống chữa cháy hoặc khai thác dầu khí.',
  },
},

// ===== 3 NÚT LỜI GIẢI BÀI TẬP SGK =====
{
  id: 'p25-bai-tap-1',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '✓',
  label: 'Bài 1',
  x: 93,
  y: 67.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 1',
    content:
      'Trình bày cấu tạo của phân tử N₂. Giải thích vì sao ở điều kiện thường, N₂ khá trơ về mặt hóa học.',
    hint:
      'Phân tử N₂ gồm hai nguyên tử nitrogen liên kết với nhau bằng liên kết ba:\n\n' +
      'N≡N\n\n' +
      'Liên kết ba N≡N có năng lượng liên kết rất lớn, khoảng 945 kJ/mol. Vì vậy liên kết này rất khó bị phá vỡ ở điều kiện thường.\n\n' +
      'Do đó, ở điều kiện thường, phân tử N₂ rất bền và khá trơ về mặt hóa học.',
  },
},
{
  id: 'p25-bai-tap-2',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài 2',
  x: 93,
  y: 72.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 2',
    content:
      'Viết phương trình hóa học chứng minh tính oxi hóa và tính khử của nitrogen. Cho biết số oxi hóa của nitrogen thay đổi như thế nào trong các phản ứng đó.',
    hint:
      '1. Nitrogen thể hiện tính oxi hóa khi tác dụng với hydrogen:\n\n' +
      'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)\n\n' +
      'Số oxi hóa của N thay đổi: 0 → -3.\n' +
      'Nitrogen bị khử nên N₂ là chất oxi hóa.\n\n' +
      '2. Nitrogen thể hiện tính khử khi tác dụng với oxygen:\n\n' +
      'N₂(g) + O₂(g) ⇌ 2NO(g)\n\n' +
      'Số oxi hóa của N thay đổi: 0 → +2.\n' +
      'Nitrogen bị oxi hóa nên N₂ là chất khử.',
  },
},
{
  id: 'p25-bai-tap-3',
  page: 25,
  type: 'note',
  variant: 'ghost',
  align: 'right',
  icon: '?',
  label: 'Bài 3',
  x: 93,
  y: 80.5,
  width: 4.4,
  height: 4.4,
  action: {
    type: 'note',
    modalSize: 'md',
    title: 'Lời giải bài tập 3',
    content:
      'Dựa vào giá trị năng lượng liên kết, hãy dự đoán ở điều kiện thường, chất nào khó và dễ tham gia phản ứng hóa học nhất. Vì sao?',
    hint:
      'Năng lượng liên kết càng lớn thì liên kết càng bền, phân tử càng khó bị phá vỡ và càng khó tham gia phản ứng hóa học.\n\n' +
      'Dữ kiện:\n' +
      'N₂: Eb = 945 kJ/mol\n' +
      'H₂: Eb = 432 kJ/mol\n' +
      'O₂: Eb = 498 kJ/mol\n' +
      'Cl₂: Eb = 243 kJ/mol\n\n' +
      'Sắp xếp độ bền liên kết:\n' +
      'N₂ > O₂ > H₂ > Cl₂\n\n' +
      'Vậy N₂ khó tham gia phản ứng hóa học nhất vì có năng lượng liên kết lớn nhất.\n\n' +
      'Cl₂ dễ tham gia phản ứng hóa học nhất vì có năng lượng liên kết nhỏ nhất.',
  },
},

// ===== NÚT BÀI TẬP THÊM BÀI 3 =====
{
  id: 'p25-bai-tap-them-bai-3',
  page: 25,
  type: 'practice',
  variant: 'solid',
  align: 'left',
  icon: '',
  label: 'Bài tập thêm',
  x: 22.5,
  y: 92.7,
  width: 18,
  height: 5,
  action: {
    type: 'practiceSet',
    modalSize: 'lg',
    title: 'Bài tập thêm - Đơn chất nitrogen',
    questions: [
      {
        id: 'bai3-extra-1',
        prompt:
          'Nguyên tố hóa học nào sau đây thuộc nhóm VA trong bảng tuần hoàn các nguyên tố hóa học?',
        options: [
          { id: 'A', text: 'Nitrogen.' },
          { id: 'B', text: 'Chlorine.' },
          { id: 'C', text: 'Carbon.' },
          { id: 'D', text: 'Oxygen.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Nitrogen thuộc nhóm VA trong bảng tuần hoàn các nguyên tố hóa học.',
      },
      {
        id: 'bai3-extra-2',
        prompt:
          'Công thức hóa học của diêm tiêu Chile, hay diêm tiêu natri, là:',
        options: [
          { id: 'A', text: 'Ca(NO₃)₂.' },
          { id: 'B', text: 'KNO₃.' },
          { id: 'C', text: 'NH₄NO₃.' },
          { id: 'D', text: 'NaNO₃.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Sodium nitrate NaNO₃ còn được gọi là diêm tiêu Chile hoặc diêm tiêu natri.',
      },
      {
        id: 'bai3-extra-3',
        prompt:
          'Trong phản ứng nào sau đây nitrogen đóng vai trò chất khử?',
        options: [
          { id: 'A', text: 'N₂ + O₂ → 2NO.' },
          { id: 'B', text: 'N₂ + 3H₂ ⇌ 2NH₃.' },
          { id: 'C', text: '3Mg + N₂ → Mg₃N₂.' },
          { id: 'D', text: '6Li + N₂ → 2Li₃N.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Trong phản ứng N₂ + O₂ → 2NO, số oxi hóa của N tăng từ 0 lên +2 nên N₂ bị oxi hóa và đóng vai trò chất khử.',
      },
      {
        id: 'bai3-extra-4',
        prompt:
          'Trong phản ứng tổng hợp ammonia từ nitrogen và hydrogen, nitrogen đóng vai trò là:',
        options: [
          { id: 'A', text: 'Chất khử.' },
          { id: 'B', text: 'Chất oxi hóa.' },
          { id: 'C', text: 'Acid.' },
          { id: 'D', text: 'Base.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. Trong phản ứng N₂ + 3H₂ ⇌ 2NH₃, số oxi hóa của N giảm từ 0 xuống -3 nên N₂ là chất oxi hóa.',
      },
      {
        id: 'bai3-extra-5',
        prompt:
          'Trong phản ứng hóa hợp với oxygen, nitrogen đóng vai trò là:',
        options: [
          { id: 'A', text: 'Chất oxi hóa.' },
          { id: 'B', text: 'Base.' },
          { id: 'C', text: 'Chất khử.' },
          { id: 'D', text: 'Acid.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Khi nitrogen phản ứng với oxygen tạo NO, số oxi hóa của N tăng từ 0 lên +2 nên N₂ đóng vai trò chất khử.',
      },
      {
        id: 'bai3-extra-6',
        prompt:
          'Nitrogen thể hiện tính khử trong phản ứng nào sau đây?',
        options: [
          { id: 'A', text: 'N₂ + O₂ → 2NO.' },
          { id: 'B', text: 'N₂ + 3H₂ ⇌ 2NH₃.' },
          { id: 'C', text: 'N₂ + 3Mg → Mg₃N₂.' },
          { id: 'D', text: 'N₂ + 6Li → 2Li₃N.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Trong phản ứng với oxygen, số oxi hóa của nitrogen tăng từ 0 lên +2, nên nitrogen bị oxi hóa và thể hiện tính khử.',
      },
      {
        id: 'bai3-extra-7',
        prompt:
          'Nhận định nào sau đây về đơn chất nitrogen là sai?',
        options: [
          { id: 'A', text: 'Không màu và nhẹ hơn không khí.' },
          { id: 'B', text: 'Hóa hợp với oxygen ở nhiệt độ cao hoặc tia lửa điện.' },
          { id: 'C', text: 'Thể hiện tính oxi hóa mạnh ở điều kiện thường.' },
          { id: 'D', text: 'Khó hóa lỏng và ít tan trong nước.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Nitrogen khá trơ ở điều kiện thường, không thể hiện tính oxi hóa mạnh ở điều kiện thường.',
      },
      {
        id: 'bai3-extra-8',
        prompt:
          'Cho sơ đồ chuyển hóa nitrogen trong khí quyển thành phân đạm:\n\nN₂ → NO → NO₂ → HNO₃ → NO₃⁻\n\nSố phản ứng thuộc loại oxi hóa - khử trong sơ đồ là:',
        options: [
          { id: 'A', text: '3.' },
          { id: 'B', text: '1.' },
          { id: 'C', text: '4.' },
          { id: 'D', text: '2.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Các bước N₂ → NO, NO → NO₂ và NO₂ → HNO₃ có sự thay đổi số oxi hóa của nitrogen nên là phản ứng oxi hóa - khử. Bước HNO₃ → NO₃⁻ không làm đổi số oxi hóa của N.',
      },
      {
        id: 'bai3-extra-9',
        prompt:
          'Nitrogen trong không khí có vai trò nào sau đây?',
        options: [
          { id: 'A', text: 'Cung cấp đạm tự nhiên cho cây trồng.' },
          { id: 'B', text: 'Hình thành sấm sét.' },
          { id: 'C', text: 'Tham gia quá trình quang hợp của cây.' },
          { id: 'D', text: 'Tham gia hình thành mây.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Nitrogen trong không khí có vai trò cung cấp nguồn đạm tự nhiên cho cây trồng thông qua chu trình nitrogen.',
      },
      {
        id: 'bai3-extra-10',
        prompt:
          'Trong công nghiệp, phần lớn lượng nitrogen sản xuất ra được dùng để:',
        options: [
          { id: 'A', text: 'Tổng hợp phân đạm.' },
          { id: 'B', text: 'Làm môi trường trơ trong luyện kim.' },
          { id: 'C', text: 'Sản xuất nitric acid.' },
          { id: 'D', text: 'Tổng hợp ammonia.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Trong công nghiệp, phần lớn nitrogen được dùng để tổng hợp ammonia, từ đó sản xuất phân đạm, nitric acid,...',
      },
      {
        id: 'bai3-extra-11',
        prompt:
          'Hỗn hợp X gồm CO₂ và N₂ có tỉ khối so với H₂ là 18. Phần trăm khối lượng của nitrogen trong X là:',
        options: [
          { id: 'A', text: '20%.' },
          { id: 'B', text: '80%.' },
          { id: 'C', text: '61,11%.' },
          { id: 'D', text: '38,89%.' },
        ],
        correctOptionId: 'D',
        explanation:
          'Đáp án đúng là D. Tỉ khối so với H₂ bằng 18 nên M trung bình của hỗn hợp là 36. Gọi số mol CO₂ và N₂ lần lượt là a, b: (44a + 28b)/(a + b) = 36, suy ra a = b. Vậy %mN₂ = 28/(28 + 44) × 100% = 38,89%.',
      },
      {
        id: 'bai3-extra-12',
        prompt:
          'Cho phương trình nhiệt hóa học: 3H₂(g) + N₂(g) → 2NH₃(g), ΔH° = -91,80 kJ. Lượng nhiệt tỏa ra khi dùng 9 g H₂ tạo thành NH₃ là:',
        options: [
          { id: 'A', text: '275,40 kJ.' },
          { id: 'B', text: '137,70 kJ.' },
          { id: 'C', text: '45,90 kJ.' },
          { id: 'D', text: '183,60 kJ.' },
        ],
        correctOptionId: 'B',
        explanation:
          'Đáp án đúng là B. 3 mol H₂ tương ứng 6 g H₂ tỏa 91,80 kJ. Với 9 g H₂, nhiệt tỏa ra là 91,80 × 9 / 6 = 137,70 kJ.',
      },
      {
        id: 'bai3-extra-13',
        prompt:
          'Cho biết năng lượng liên kết trong O₂, N₂ và NO lần lượt là 494 kJ/mol, 945 kJ/mol và 607 kJ/mol. Biến thiên enthalpy chuẩn của phản ứng N₂(g) + O₂(g) → 2NO(g) là:',
        options: [
          { id: 'A', text: '225 kJ.' },
          { id: 'B', text: '450 kJ.' },
          { id: 'C', text: '220 kJ.' },
          { id: 'D', text: '300 kJ.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. ΔH ≈ tổng năng lượng liên kết bị phá vỡ - tổng năng lượng liên kết hình thành = 945 + 494 - 2 × 607 = 225 kJ.',
      },
      {
        id: 'bai3-extra-14',
        prompt:
          'Cho a mol N₂ phản ứng với 3a mol H₂, sau phản ứng áp suất của hệ giảm 10%. Hiệu suất phản ứng tổng hợp NH₃ là:',
        options: [
          { id: 'A', text: '15%.' },
          { id: 'B', text: '25%.' },
          { id: 'C', text: '20%.' },
          { id: 'D', text: '30%.' },
        ],
        correctOptionId: 'C',
        explanation:
          'Đáp án đúng là C. Ban đầu tổng số mol khí là 4a. Gọi x mol N₂ phản ứng thì tổng mol sau phản ứng là 4a - 2x. Áp suất giảm 10% nên số mol khí giảm 10%: 2x/4a = 0,1, suy ra x = 0,2a. Hiệu suất = x/a × 100% = 20%.',
      },
      {
        id: 'bai3-extra-15',
        prompt:
          'Cho các phát biểu:\n\n' +
          '(a) Trong không khí, N₂ chiếm khoảng 78% về thể tích.\n' +
          '(b) Phân tử N₂ có chứa liên kết ba bền vững nên N₂ trơ về mặt hóa học ngay cả khi đun nóng.\n' +
          '(c) Trong phản ứng giữa N₂ và H₂ thì N₂ vừa là chất oxi hóa, vừa là chất khử.\n' +
          '(d) N₂ lỏng có nhiệt độ thấp nên thường được sử dụng để bảo quản thực phẩm.\n' +
          '(e) Phần lớn N₂ được sử dụng để tổng hợp NH₃, từ đó sản xuất nitric acid, phân bón,...\n\n' +
          'Số phát biểu đúng là:',
        options: [
          { id: 'A', text: '2.' },
          { id: 'B', text: '3.' },
          { id: 'C', text: '4.' },
          { id: 'D', text: '5.' },
        ],
        correctOptionId: 'A',
        explanation:
          'Đáp án đúng là A. Đúng: (a), (e). Sai: (b) vì khi đun nóng hoặc có điều kiện thích hợp N₂ hoạt động hơn; (c) vì trong phản ứng với H₂, N₂ là chất oxi hóa; (d) theo nội dung bài, N₂ lỏng chủ yếu dùng bảo quản máu và mẫu sinh vật, còn bảo quản thực phẩm thường dùng khí N₂.',
      },
    ],
  },
},
];
