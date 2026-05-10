import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../components/Header';
import QuestionCard from './QuestionCard';
import QuestionPalette from './QuestionPalette';
import SubmitModal from './SubmitModal';

const API_BASE = 'http://localhost:5000';

const TakeQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { classId, quizId } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const isPreview = searchParams.get('mode') === 'preview';

  const token = localStorage.getItem('token');

  const [quizData, setQuizData] = useState(null);
  const [attempt, setAttempt] = useState(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    totalScore: 0,
    correct: 0,
    totalQuestions: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const saveTimerRef = useRef(null);

  const previewKey = `preview_quiz_${classId}_${quizId}`;

  const normalizeAnswer = (value = '') => String(value).trim().toLowerCase();

  const normalizeQuestions = (questions = []) => {
    return questions.map((q, index) => ({
      ...q,
      id: String(q.id || q._id || index + 1),
      score: Number(q.score || 1),
      options: q.options || [],
      correctAnswer: q.correctAnswer || '',
    }));
  };

  const calculateRemainingTime = (startedAt, durationMinutes) => {
    if (!startedAt || !durationMinutes) return 0;

    const durationSeconds = Number(durationMinutes) * 60;
    const elapsedSeconds = Math.floor(
      (Date.now() - new Date(startedAt).getTime()) / 1000
    );

    return Math.max(0, durationSeconds - elapsedSeconds);
  };

  const calculateResult = (questions, currentAnswers) => {
    let score = 0;
    let totalScore = 0;
    let correctCount = 0;

    questions.forEach((q, index) => {
      const questionId = String(q.id || q._id || index + 1);
      const questionScore = Number(q.score || 1);

      totalScore += questionScore;

      if (normalizeAnswer(currentAnswers[questionId]) === normalizeAnswer(q.correctAnswer)) {
        score += questionScore;
        correctCount += 1;
      }
    });

    return {
      score,
      totalScore,
      correct: correctCount,
      totalQuestions: questions.length,
    };
  };

  const loadPreviewQuiz = async () => {
    const response = await fetch(
      `${API_BASE}/api/classrooms/${classId}/assignments/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Không thể tải bài tập.');
    }

    const assignment = data.assignment;

    if (!assignment) {
      throw new Error('Không tìm thấy bài tập.');
    }

    const normalizedQuestions = normalizeQuestions(assignment.questions || []);

    if (normalizedQuestions.length === 0) {
      throw new Error('Bài tập này chưa có câu hỏi nào.');
    }

    const stored = sessionStorage.getItem(previewKey);
    const parsed = stored ? JSON.parse(stored) : null;

    const startedAt = parsed?.startedAt || new Date().toISOString();
    const savedAnswers = parsed?.answers || {};
    const savedFinished = !!parsed?.isFinished;
    const savedResult = parsed?.result || null;

    if (!parsed) {
      sessionStorage.setItem(
        previewKey,
        JSON.stringify({
          startedAt,
          answers: {},
          isFinished: false,
          result: null,
        })
      );
    }

    setQuizData({
      id: assignment.id,
      title: assignment.title,
      duration: Number(assignment.duration || 15),
      questions: normalizedQuestions,
      deadline: assignment.deadline,
    });

    setAnswers(savedAnswers);
    setIsFinished(savedFinished);

    if (savedResult) {
      setResult(savedResult);
    }

    setTimeLeft(
      savedFinished
        ? 0
        : calculateRemainingTime(startedAt, Number(assignment.duration || 15))
    );
  };

  const loadStudentQuiz = async () => {
    const response = await fetch(
      `${API_BASE}/api/classrooms/${classId}/assignments/${quizId}/start`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Không thể bắt đầu bài làm.');
    }

    const loadedAssignment = data.assignment;
    const loadedAttempt = data.attempt;
    const normalizedQuestions = normalizeQuestions(loadedAssignment.questions || []);

    if (normalizedQuestions.length === 0) {
      throw new Error('Bài tập này chưa có câu hỏi nào.');
    }

    setQuizData({
      id: loadedAssignment.id,
      title: loadedAssignment.title,
      duration: Number(loadedAssignment.duration || 15),
      questions: normalizedQuestions,
      deadline: loadedAssignment.deadline,
    });

    setAttempt(loadedAttempt);
    setAnswers(loadedAttempt.answers || {});

    const submitted = loadedAttempt.status === 'submitted';
    setIsFinished(submitted);

    if (submitted) {
      setResult({
        score: loadedAttempt.score,
        totalScore: loadedAttempt.totalScore,
        correct: loadedAttempt.correctCount,
        totalQuestions: loadedAttempt.totalQuestions,
      });
      setTimeLeft(0);
    } else {
      setTimeLeft(
        calculateRemainingTime(
          loadedAttempt.startedAt,
          Number(loadedAssignment.duration || 15)
        )
      );
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        setPageError('');
        setCurrentQIndex(0);

        if (!token) {
          throw new Error('Bạn chưa đăng nhập.');
        }

        if (isPreview) {
          await loadPreviewQuiz();
        } else {
          await loadStudentQuiz();
        }
      } catch (error) {
        console.error('LOAD QUIZ ERROR =', error);
        setPageError(error.message || 'Không thể tải bài làm.');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [classId, quizId, isPreview, token]);

  useEffect(() => {
    if (!quizData || isFinished) return;

    const timer = setInterval(() => {
      if (isPreview) {
        const stored = sessionStorage.getItem(previewKey);
        const parsed = stored ? JSON.parse(stored) : null;
        const startedAt = parsed?.startedAt;

        const nextTime = calculateRemainingTime(startedAt, quizData.duration);
        setTimeLeft(nextTime);

        if (nextTime <= 0) {
          clearInterval(timer);
          handleSubmit(true);
        }

        return;
      }

      if (attempt?.startedAt) {
        const nextTime = calculateRemainingTime(attempt.startedAt, quizData.duration);
        setTimeLeft(nextTime);

        if (nextTime <= 0) {
          clearInterval(timer);
          handleSubmit(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, attempt, isFinished, isPreview]);

  const autosaveStudentAnswers = async (nextAnswers) => {
    try {
      await fetch(
        `${API_BASE}/api/classrooms/${classId}/assignments/${quizId}/attempt`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers: nextAnswers }),
        }
      );
    } catch (error) {
      console.error('AUTOSAVE ANSWERS ERROR =', error);
    }
  };

  const handleAnswer = (qId, value) => {
    if (isFinished) return;

    const questionId = String(qId);
    const nextAnswers = {
      ...answers,
      [questionId]: value,
    };

    setAnswers(nextAnswers);

    if (isPreview) {
      const stored = sessionStorage.getItem(previewKey);
      const parsed = stored ? JSON.parse(stored) : {};

      sessionStorage.setItem(
        previewKey,
        JSON.stringify({
          ...parsed,
          answers: nextAnswers,
        })
      );
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      autosaveStudentAnswers(nextAnswers);
    }, 500);
  };

  const handleNext = () => {
    if (!quizData) return;

    if (currentQIndex < quizData.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

    const handleSubmit = async (autoSubmit = false) => {
    if (!quizData || isFinished || isSubmitting) return;

    if (!autoSubmit) {
        const confirmMsg = isPreview
        ? 'Bạn muốn kết thúc quá trình làm thử và xem kết quả kiểm tra?'
        : 'Bạn có chắc chắn muốn nộp bài không? Sau khi nộp sẽ không thể sửa đáp án.';

        if (!window.confirm(confirmMsg)) return;
    }

    if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
    }

    if (isPreview) {
        const previewResult = calculateResult(quizData.questions, answers);

        setResult(previewResult);
        setIsFinished(true);
        setTimeLeft(0);

        const stored = sessionStorage.getItem(previewKey);
        const parsed = stored ? JSON.parse(stored) : {};

        sessionStorage.setItem(
        previewKey,
        JSON.stringify({
            ...parsed,
            answers,
            isFinished: true,
            result: previewResult,
        })
        );

        setIsModalOpen(true);
        return;
    }

    try {
        setIsSubmitting(true);

        const response = await fetch(
        `${API_BASE}/api/classrooms/${classId}/assignments/${quizId}/submit`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ answers }),
        }
        );

        const data = await response.json();

        if (!response.ok) {
        // Nếu backend báo bài đã nộp rồi thì chuyển sang chế độ xem lại, không cho sửa nữa
        if (data.attempt?.status === 'submitted') {
            const submittedAttempt = data.attempt;
            const resultPayload = data.result || data.attempt;

            setIsFinished(true);
            setAttempt(submittedAttempt);
            setAnswers(submittedAttempt.answers || {});
            setResult({
            score: Number(resultPayload.score || 0),
            totalScore: Number(resultPayload.totalScore || 0),
            correct: Number(resultPayload.correctCount || resultPayload.correct || 0),
            totalQuestions: Number(resultPayload.totalQuestions || quizData.questions.length),
            });
            setTimeLeft(0);
            setIsModalOpen(true);
            return;
        }

        alert(data.message || 'Không thể nộp bài.');
        return;
        }

        const submittedAttempt = data.attempt;
        const resultPayload = data.result || data.attempt;

        if (!submittedAttempt || !resultPayload) {
        throw new Error('Server phản hồi thiếu dữ liệu kết quả bài làm.');
        }

        setIsFinished(true);
        setAttempt(submittedAttempt);
        setAnswers(submittedAttempt.answers || answers);
        setResult({
        score: Number(resultPayload.score || 0),
        totalScore: Number(resultPayload.totalScore || 0),
        correct: Number(resultPayload.correctCount || resultPayload.correct || 0),
        totalQuestions: Number(resultPayload.totalQuestions || quizData.questions.length),
        });

        setTimeLeft(0);
        setIsModalOpen(true);
    } catch (error) {
        console.error('SUBMIT QUIZ ERROR =', error);
        alert(error.message || 'Không thể xử lý kết quả nộp bài.');
    } finally {
        setIsSubmitting(false);
    }
    };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans flex items-center justify-center">
        <p className="text-gray-500 font-medium">Đang tải bài làm...</p>
      </div>
    );
  }

  if (pageError || !quizData) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans flex items-center justify-center px-6">
        <div className="bg-red-50 border border-red-200 text-red-500 px-6 py-4 rounded-xl font-medium">
          {pageError || 'Không tìm thấy bài tập.'}
        </div>
      </div>
    );
  }

  if (!quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans flex items-center justify-center px-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-xl font-medium">
          Bài tập này chưa có câu hỏi nào.
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] font-sans flex items-center justify-center px-6">
        <div className="bg-red-50 border border-red-200 text-red-500 px-6 py-4 rounded-xl font-medium">
          Không tìm thấy câu hỏi hiện tại.
        </div>
      </div>
    );
  }

  const currentQuestionId = String(
    currentQuestion.id || currentQuestion._id || currentQIndex + 1
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex flex-col overflow-hidden">
      <Header />

      

      <div className="flex-1 pb-4 px-4 sm:px-6 h-screen box-border overflow-hidden pt-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 h-full items-start">
          <div className="hidden xl:block col-span-1"></div>

          <div className="col-span-12 lg:col-span-8 xl:col-span-8 flex flex-col h-full max-h-[calc(100vh-100px)]">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200 mb-3 shrink-0 flex justify-between items-center">
              <h1 className="text-lg font-bold text-blue-900 truncate">
                {quizData.title}
              </h1>

              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Bài tập lớp học
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-lg shadow-sm border border-gray-200">
              <QuestionCard
                question={currentQuestion}
                index={currentQIndex}
                userAnswer={answers[currentQuestionId]}
                onAnswer={handleAnswer}
                isReviewMode={isFinished}
              />
            </div>

            <div className="flex justify-between mt-3 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentQIndex === 0}
                className={`px-4 py-2 rounded-md font-bold text-xs transition shadow-sm ${
                  currentQIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                Quay lại
              </button>

              <button
                onClick={handleNext}
                disabled={currentQIndex === quizData.questions.length - 1}
                className={`px-4 py-2 rounded-md font-bold text-xs text-white transition shadow-sm ${
                  currentQIndex === quizData.questions.length - 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Câu tiếp theo
              </button>
            </div>
          </div>

          <div className="hidden lg:block col-span-1"></div>

          <div className="col-span-12 lg:col-span-3 xl:col-span-2 h-full">
            <QuestionPalette
              totalQuestions={quizData.questions.length}
              currentQuestion={currentQIndex}
              answers={answers}
              onSelectQuestion={setCurrentQIndex}
              timeLeft={timeLeft}
              onSubmit={() => handleSubmit(false)}
              isFinished={isFinished}
            />
          </div>
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        score={result.score}
        totalScore={result.totalScore}
        correctCount={result.correct}
        totalQuestions={result.totalQuestions}
        onClose={() => setIsModalOpen(false)}
        isPreview={isPreview}
        classId={classId}
      />
    </div>
  );
};

export default TakeQuiz;