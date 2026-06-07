const normalizeQuestionPayload = (body = {}) => {
  const options = Array.isArray(body.options)
    ? body.options.map((item) => String(item || '').trim())
    : [];

  return {
    quiz_id: String(body.quiz_id || '').trim(),
    question_text: String(body.question_text || '').trim(),
    options,
    correct_index: Number(body.correct_index),
    explanation: String(body.explanation || '').trim(),
  };
};

const validateQuestionPayload = (payload = {}) => {
  if (!payload.quiz_id) return 'Thiếu mã quiz_id.';
  if (!payload.question_text) return 'Thiếu nội dung câu hỏi.';

  if (!Array.isArray(payload.options) || payload.options.length < 2) {
    return 'Câu hỏi phải có ít nhất 2 đáp án.';
  }

  if (payload.options.some((item) => !item)) {
    return 'Các đáp án không được để trống.';
  }

  if (
    Number.isNaN(payload.correct_index) ||
    payload.correct_index < 0 ||
    payload.correct_index >= payload.options.length
  ) {
    return 'Đáp án đúng không hợp lệ.';
  }

  return null;
};

module.exports = {
  normalizeQuestionPayload,
  validateQuestionPayload,
};