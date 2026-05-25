const express = require('express');
const request = require('supertest');

jest.mock('../../models/Question', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock('../../models/EssayQuestion', () => ({
  find: jest.fn(),
}));

const Question = require('../../models/Question');
const EssayQuestion = require('../../models/EssayQuestion');
const quizRoutes = require('../../routes/quizRoutes');

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api', quizRoutes);
  return app;
};

describe('Integration Test - Quiz Routes', () => {
  let app;

  beforeEach(() => {
    app = createApp();
    jest.clearAllMocks();
  });

  test('GET /api/questions - trả về toàn bộ câu hỏi trắc nghiệm', async () => {
    const mockQuestions = [
      {
        _id: 'q1',
        quiz_id: 'cbhh_nbth',
        question_text: 'Yếu tố nào làm chuyển dịch cân bằng?',
        options: ['Nhiệt độ', 'Màu sắc', 'Khối lượng riêng', 'Hình dạng'],
        correct_index: 0,
        explanation: 'Nhiệt độ có thể làm chuyển dịch cân bằng.',
      },
    ];

    Question.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockQuestions),
    });

    const res = await request(app).get('/api/questions');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].quiz_id).toBe('cbhh_nbth');
  });

  test('GET /api/questions - lỗi database thì trả về 500', async () => {
    Question.find.mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error('DB error')),
    });

    const res = await request(app).get('/api/questions');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('DB error');
  });

  test('GET /api/quiz/:quizId - trả về câu hỏi theo quiz_id', async () => {
    const mockQuestions = [
      {
        _id: 'q1',
        quiz_id: 'tddn_vdvdc',
        question_text: 'Tính pH của dung dịch...',
        options: ['1', '2', '3', '4'],
        correct_index: 1,
      },
    ];

    Question.find.mockResolvedValue(mockQuestions);

    const res = await request(app).get('/api/quiz/tddn_vdvdc');

    expect(res.statusCode).toBe(200);
    expect(Question.find).toHaveBeenCalledWith({ quiz_id: 'tddn_vdvdc' });
    expect(res.body[0].quiz_id).toBe('tddn_vdvdc');
  });

  test('GET /api/quiz/:quizId - quiz không có câu hỏi thì trả về mảng rỗng', async () => {
    Question.find.mockResolvedValue([]);

    const res = await request(app).get('/api/quiz/unknown_quiz');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('GET /api/quiz/:quizId - lỗi database thì trả về 500', async () => {
    Question.find.mockRejectedValue(new Error('Quiz DB error'));

    const res = await request(app).get('/api/quiz/cbhh_nbth');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Quiz DB error');
  });

  test('GET /api/essay/:quizId - trả về câu hỏi tự luận theo quiz_id', async () => {
    const mockEssays = [
      {
        _id: 'e1',
        quiz_id: 'essay_cbhh',
        question_text: 'Trình bày khái niệm cân bằng hóa học.',
      },
    ];

    EssayQuestion.find.mockResolvedValue(mockEssays);

    const res = await request(app).get('/api/essay/essay_cbhh');

    expect(res.statusCode).toBe(200);
    expect(EssayQuestion.find).toHaveBeenCalledWith({ quiz_id: 'essay_cbhh' });
    expect(res.body[0].quiz_id).toBe('essay_cbhh');
  });

  test('GET /api/essay/:quizId - không có câu tự luận thì trả về mảng rỗng', async () => {
    EssayQuestion.find.mockResolvedValue([]);

    const res = await request(app).get('/api/essay/essay_unknown');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('GET /api/essay/:quizId - lỗi database thì trả về 500', async () => {
    EssayQuestion.find.mockRejectedValue(new Error('Essay DB error'));

    const res = await request(app).get('/api/essay/essay_cbhh');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Essay DB error');
  });

  test('POST /api/questions - thêm câu hỏi hợp lệ', async () => {
    const payload = {
      quiz_id: 'cbhh_nbth',
      question_text: 'Chất xúc tác có làm chuyển dịch cân bằng không?',
      options: ['Có', 'Không', 'Luôn luôn có', 'Chỉ khi tăng nhiệt độ'],
      correct_index: 1,
      explanation: 'Chất xúc tác không làm chuyển dịch cân bằng.',
    };

    Question.create.mockResolvedValue({
      _id: 'new-question-id',
      ...payload,
    });

    const res = await request(app)
      .post('/api/questions')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.quiz_id).toBe('cbhh_nbth');
    expect(res.body.correct_index).toBe(1);
  });

  test('POST /api/questions - tự trim dữ liệu đầu vào', async () => {
    const payload = {
      quiz_id: '  cbhh_nbth  ',
      question_text: '  Câu hỏi có khoảng trắng  ',
      options: [' A ', ' B ', ' C ', ' D '],
      correct_index: 0,
      explanation: '  Giải thích  ',
    };

    Question.create.mockResolvedValue({
      _id: 'new-question-id',
      quiz_id: 'cbhh_nbth',
      question_text: 'Câu hỏi có khoảng trắng',
      options: ['A', 'B', 'C', 'D'],
      correct_index: 0,
      explanation: 'Giải thích',
    });

    const res = await request(app)
      .post('/api/questions')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(Question.create).toHaveBeenCalledWith({
      quiz_id: 'cbhh_nbth',
      question_text: 'Câu hỏi có khoảng trắng',
      options: ['A', 'B', 'C', 'D'],
      correct_index: 0,
      explanation: 'Giải thích',
    });
  });

  test('POST /api/questions - thiếu quiz_id thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        question_text: 'Câu hỏi mẫu',
        options: ['A', 'B', 'C', 'D'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Thiếu mã quiz_id.');
  });

  test('POST /api/questions - thiếu nội dung câu hỏi thì trả về 400', async () => {
    const payload = {
      quiz_id: 'cbhh_nbth',
      question_text: '',
      options: ['A', 'B', 'C', 'D'],
      correct_index: 0,
    };

    const res = await request(app)
      .post('/api/questions')
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Thiếu nội dung câu hỏi.');
  });

  test('POST /api/questions - ít hơn 2 đáp án thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi mẫu',
        options: ['A'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Câu hỏi phải có ít nhất 2 đáp án.');
  });

  test('POST /api/questions - có đáp án rỗng thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi mẫu',
        options: ['A', '', 'C', 'D'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Các đáp án không được để trống.');
  });

  test('POST /api/questions - correct_index âm thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi mẫu',
        options: ['A', 'B', 'C', 'D'],
        correct_index: -1,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Đáp án đúng không hợp lệ.');
  });

  test('POST /api/questions - correct_index vượt số đáp án thì trả về 400', async () => {
    const res = await request(app)
      .post('/api/questions')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi mẫu',
        options: ['A', 'B'],
        correct_index: 5,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Đáp án đúng không hợp lệ.');
  });

  test('POST /api/questions - lỗi database khi tạo thì trả về 500', async () => {
    Question.create.mockRejectedValue(new Error('Create DB error'));

    const res = await request(app)
      .post('/api/questions')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi hợp lệ',
        options: ['A', 'B', 'C', 'D'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Create DB error');
  });

  test('PUT /api/questions/:id - cập nhật câu hỏi thành công', async () => {
    const payload = {
      quiz_id: 'cbhh_vdvdc',
      question_text: 'Cập nhật câu hỏi cân bằng hóa học',
      options: ['A', 'B', 'C', 'D'],
      correct_index: 2,
      explanation: 'Giải thích mẫu.',
    };

    Question.findByIdAndUpdate.mockResolvedValue({
      _id: 'q1',
      ...payload,
    });

    const res = await request(app)
      .put('/api/questions/q1')
      .send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body.quiz_id).toBe('cbhh_vdvdc');
    expect(res.body.correct_index).toBe(2);
  });

  test('PUT /api/questions/:id - payload không hợp lệ thì trả về 400', async () => {
    const res = await request(app)
      .put('/api/questions/q1')
      .send({
        quiz_id: '',
        question_text: 'Câu hỏi',
        options: ['A', 'B'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Thiếu mã quiz_id.');
  });

  test('PUT /api/questions/:id - không tìm thấy câu hỏi thì trả về 404', async () => {
    Question.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .put('/api/questions/not-found-id')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi hợp lệ',
        options: ['A', 'B', 'C', 'D'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Không tìm thấy câu hỏi cần cập nhật.');
  });

  test('PUT /api/questions/:id - lỗi database thì trả về 500', async () => {
    Question.findByIdAndUpdate.mockRejectedValue(new Error('Update DB error'));

    const res = await request(app)
      .put('/api/questions/q1')
      .send({
        quiz_id: 'cbhh_nbth',
        question_text: 'Câu hỏi hợp lệ',
        options: ['A', 'B', 'C', 'D'],
        correct_index: 0,
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Update DB error');
  });

  test('DELETE /api/questions/:id - xóa câu hỏi thành công', async () => {
    Question.findByIdAndDelete.mockResolvedValue({
      _id: 'q1',
      quiz_id: 'cbhh_nbth',
    });

    const res = await request(app).delete('/api/questions/q1');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Đã xóa câu hỏi thành công.');
  });

  test('DELETE /api/questions/:id - không tìm thấy câu hỏi thì trả về 404', async () => {
    Question.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete('/api/questions/not-found-id');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Không tìm thấy câu hỏi cần xóa.');
  });

  test('DELETE /api/questions/:id - lỗi database thì trả về 500', async () => {
    Question.findByIdAndDelete.mockRejectedValue(new Error('Delete DB error'));

    const res = await request(app).delete('/api/questions/q1');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Delete DB error');
  });
});