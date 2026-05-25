const {
  normalizeQuestionPayload,
  validateQuestionPayload,
} = require('../../utils/questionValidation');


describe('Unit Test - Question Payload Normalization', () => {
  test('Chuẩn hóa quiz_id và question_text bằng cách trim khoảng trắng', () => {
    const result = normalizeQuestionPayload({
      quiz_id: ' cbhh_nbth ',
      question_text: ' Cân bằng hóa học là gì? ',
      options: [' A ', ' B ', ' C ', ' D '],
      correct_index: '1',
      explanation: ' Giải thích mẫu ',
    });

    expect(result).toEqual({
      quiz_id: 'cbhh_nbth',
      question_text: 'Cân bằng hóa học là gì?',
      options: ['A', 'B', 'C', 'D'],
      correct_index: 1,
      explanation: 'Giải thích mẫu',
    });
  });

  test('Nếu options không phải array thì chuyển thành mảng rỗng', () => {
    const result = normalizeQuestionPayload({
      quiz_id: 'cbhh_nbth',
      question_text: 'Câu hỏi mẫu',
      options: null,
      correct_index: 0,
    });

    expect(result.options).toEqual([]);
  });

  test('Nếu explanation không có thì trả về chuỗi rỗng', () => {
    const result = normalizeQuestionPayload({
      quiz_id: 'cbhh_nbth',
      question_text: 'Câu hỏi mẫu',
      options: ['A', 'B'],
      correct_index: 0,
    });

    expect(result.explanation).toBe('');
  });

  test('Nếu correct_index là chuỗi số thì chuyển về number', () => {
    const result = normalizeQuestionPayload({
      quiz_id: 'cbhh_nbth',
      question_text: 'Câu hỏi mẫu',
      options: ['A', 'B'],
      correct_index: '1',
    });

    expect(result.correct_index).toBe(1);
  });
});

describe('Unit Test - Question Payload Validation', () => {
  const validPayload = {
    quiz_id: 'cbhh_nbth',
    question_text: 'Yếu tố nào ảnh hưởng đến cân bằng hóa học?',
    options: ['Nhiệt độ', 'Áp suất', 'Nồng độ', 'Chất xúc tác'],
    correct_index: 0,
    explanation: 'Nhiệt độ có thể làm chuyển dịch cân bằng.',
  };

  test('Payload hợp lệ thì không trả về lỗi', () => {
    expect(validateQuestionPayload(validPayload)).toBe(null);
  });

  test('Thiếu quiz_id thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, quiz_id: '' })).toBe(
      'Thiếu mã quiz_id.'
    );
  });

  test('Thiếu question_text thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, question_text: '' })).toBe(
      'Thiếu nội dung câu hỏi.'
    );
  });

  test('Options không phải array thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, options: null })).toBe(
      'Câu hỏi phải có ít nhất 2 đáp án.'
    );
  });

  test('Options ít hơn 2 đáp án thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, options: ['A'] })).toBe(
      'Câu hỏi phải có ít nhất 2 đáp án.'
    );
  });

  test('Có đáp án rỗng thì báo lỗi', () => {
    expect(
      validateQuestionPayload({ ...validPayload, options: ['A', '', 'C', 'D'] })
    ).toBe('Các đáp án không được để trống.');
  });

  test('correct_index âm thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, correct_index: -1 })).toBe(
      'Đáp án đúng không hợp lệ.'
    );
  });

  test('correct_index vượt số lượng đáp án thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, correct_index: 4 })).toBe(
      'Đáp án đúng không hợp lệ.'
    );
  });

  test('correct_index không phải số thì báo lỗi', () => {
    expect(validateQuestionPayload({ ...validPayload, correct_index: NaN })).toBe(
      'Đáp án đúng không hợp lệ.'
    );
  });
});