const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const EssayQuestion = require('../models/EssayQuestion');

// Lấy TOÀN BỘ câu hỏi trắc nghiệm
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
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