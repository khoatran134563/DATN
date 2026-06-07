const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Question = require('../models/Question');
const EssayQuestion = require('../models/EssayQuestion');
const ChemicalElement = require('../models/ChemicalElement');

router.get('/', async (req, res) => {
  try {
    // 1. Đọc file (đường dẫn trỏ về thư mục data mới)
    const quizFilePath = path.join(__dirname, '../data/dulieu_tracnghiem.json');
    const essayFilePath = path.join(__dirname, '../data/dulieu_tuluan.json');
    const elementFilePath = path.join(__dirname, '../data/dulieu_nguyento.json'); 

    const quizData = JSON.parse(fs.readFileSync(quizFilePath, 'utf-8'));
    const essayData = JSON.parse(fs.readFileSync(essayFilePath, 'utf-8'));
    const elementData = JSON.parse(fs.readFileSync(elementFilePath, 'utf-8')); 

    // 2. Xóa cũ
    await Question.deleteMany({});
    await EssayQuestion.deleteMany({});
    await ChemicalElement.deleteMany({}); 

    // 3. Nạp mới
    await Question.insertMany(quizData);
    await EssayQuestion.insertMany(essayData);
    await ChemicalElement.insertMany(elementData); 

    res.send(`
      <h1>Nạp dữ liệu thành công! 🚀</h1>
      <p>- Trắc nghiệm: ${quizData.length}</p>
      <p>- Tự luận: ${essayData.length}</p>
      <p>- Nguyên tố: ${elementData.length}</p>
    `);

  } catch (err) {
    res.status(500).send(`Lỗi: ${err.message}`);
  }
});

module.exports = router;