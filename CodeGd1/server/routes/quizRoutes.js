const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const EssayQuestion = require('../models/EssayQuestion');

const normalizeQuestionPayload = (body) => {
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

const validateQuestionPayload = (payload) => {
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

// Lấy TOÀN BỘ câu hỏi trắc nghiệm
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1, _id: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm câu hỏi trắc nghiệm mới
router.post('/questions', async (req, res) => {
  try {
    const payload = normalizeQuestionPayload(req.body);
    const validationError = validateQuestionPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const createdQuestion = await Question.create(payload);
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật câu hỏi trắc nghiệm
router.put('/questions/:id', async (req, res) => {
  try {
    const payload = normalizeQuestionPayload(req.body);
    const validationError = validateQuestionPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi cần cập nhật.' });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa câu hỏi trắc nghiệm
router.delete('/questions/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Không tìm thấy câu hỏi cần xóa.' });
    }

    res.json({
      message: 'Đã xóa câu hỏi thành công.',
      deletedQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy trắc nghiệm theo quizId
router.get('/quiz/:quizId', async (req, res) => {
  try {
    const questions = await Question.find({ quiz_id: req.params.quizId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lấy tự luận theo quizId
router.get('/essay/:quizId', async (req, res) => {
  try {
    const essays = await EssayQuestion.find({ quiz_id: req.params.quizId });
    res.json(essays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;