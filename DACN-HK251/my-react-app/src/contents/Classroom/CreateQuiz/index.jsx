import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import QuizInfo from './QuizInfo';
import QuestionItem from './QuestionItem';

const API_BASE = 'http://localhost:5000';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  const [quizInfo, setQuizInfo] = useState({
    title: '',
    topic: '',
    deadline: '',
    duration: '',
  });

  const [questions, setQuestions] = useState([
    {
      type: 'multiple-choice',
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      correctAnswerText: '',
      score: 1,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'multiple-choice',
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        correctAnswerText: '',
        score: 1,
      },
    ]);
  };

  const updateQuestion = (index, updatedQ) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQ;
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      alert('Bài kiểm tra phải có ít nhất 1 câu hỏi!');
      return;
    }

    setQuestions(questions.filter((_, i) => i !== index));
  };

  const validateQuiz = () => {
    if (!quizInfo.title.trim()) {
      alert('Vui lòng nhập tên bài tập!');
      return false;
    }

    if (!quizInfo.topic.trim()) {
      alert('Vui lòng nhập chủ đề / thư mục cho bài tập!');
      return false;
    }

    if (!quizInfo.duration || Number(quizInfo.duration) <= 0) {
      alert('Vui lòng nhập thời gian làm bài hợp lệ!');
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.text.trim()) {
        alert(`Câu ${i + 1} chưa có nội dung câu hỏi!`);
        return false;
      }

      if (Number(q.score || 1) <= 0) {
        alert(`Câu ${i + 1} có điểm số không hợp lệ!`);
        return false;
      }

      if (q.type === 'multiple-choice') {
        const cleanOptions = q.options.map((opt) => opt.trim());

        if (cleanOptions.some((opt) => !opt)) {
          alert(`Câu ${i + 1} có đáp án còn trống!`);
          return false;
        }

        if (!cleanOptions[q.correctIndex]) {
          alert(`Câu ${i + 1} chưa chọn đáp án đúng hợp lệ!`);
          return false;
        }
      }

      if (q.type === 'fill-in' && !q.correctAnswerText?.trim()) {
        alert(`Câu ${i + 1} chưa nhập đáp án đúng!`);
        return false;
      }
    }

    return true;
  };

  const buildFinalQuestions = () => {
    return questions.map((q, index) => {
      const questionId = String(index + 1);
      const score = Number(q.score || 1);

      if (q.type === 'fill-in') {
        return {
          id: questionId,
          type: 'fill-in',
          text: q.text.trim(),
          subText: q.subText || '',
          options: [],
          correctAnswer: q.correctAnswerText.trim(),
          score,
        };
      }

      const cleanOptions = q.options.map((opt) => opt.trim());

      return {
        id: questionId,
        type: 'multiple-choice',
        text: q.text.trim(),
        subText: q.subText || '',
        options: cleanOptions,
        correctAnswer: cleanOptions[q.correctIndex],
        score,
      };
    });
  };

  const handleSave = async () => {
    if (!validateQuiz()) return;

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Bạn chưa đăng nhập!');
      return;
    }

    try {
      setIsSaving(true);

      const finalQuestions = buildFinalQuestions();

      const response = await fetch(`${API_BASE}/api/classrooms/${classId}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: quizInfo.title.trim(),
          topic: quizInfo.topic.trim(),
          deadline: quizInfo.deadline || null,
          duration: Number(quizInfo.duration),
          durationMinutes: Number(quizInfo.duration),
          questions: finalQuestions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Không thể tạo bài tập!');
        return;
      }

      alert(data.message || 'Đã tạo bài tập thành công!');

      navigate(`/classroom/${classId}`, {
        state: { activeTab: 'classwork' },
      });
    } catch (error) {
      console.error('CREATE ASSIGNMENT ERROR =', error);
      alert('Không thể kết nối đến server backend!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden">
      <Header />

      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-6 pb-40 pt-8 animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-blue-900 tracking-tight">
              Soạn bài tập mới
            </h1>

            <p className="text-sm text-gray-500 mt-1 font-medium">
              Giáo viên tự tạo từng câu hỏi cho lớp học hiện tại.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <QuizInfo info={quizInfo} setInfo={setQuizInfo} />
          </div>

          <div className="space-y-6 mb-8">
            {questions.map((q, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-10 top-0 w-8 h-8 items-center justify-center font-bold text-gray-400 text-sm hidden md:flex">
                  {i + 1}
                </div>

                <QuestionItem
                  index={i}
                  question={q}
                  onUpdate={updateQuestion}
                  onDelete={deleteQuestion}
                />
              </div>
            ))}
          </div>

          <button
            onClick={addQuestion}
            className="group w-full py-4 border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl text-blue-600 font-bold hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <div className="bg-white p-1 rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            Thêm câu hỏi mới
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500 hidden sm:block">
            Đang soạn thảo:{' '}
            <span className="text-gray-900 font-bold">
              {questions.length} câu hỏi
            </span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() =>
                navigate(`/classroom/${classId}`, {
                  state: { activeTab: 'classwork' },
                })
              }
              disabled={isSaving}
              className="px-6 py-2.5 font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-60"
            >
              Hủy
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-200 hover:shadow-blue-300 transition transform active:scale-95 flex items-center gap-2 disabled:opacity-60"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isSaving ? 'Đang lưu...' : 'Hoàn tất & Đăng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;