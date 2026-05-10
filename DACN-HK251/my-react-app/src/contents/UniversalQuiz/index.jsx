import React, { useState, useEffect } from 'react';
import './styles.css';

// Component này nhận props: title (tên bài) và quizId (mã bài)
const UniversalQuiz = ({ title, quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [openExplain, setOpenExplain] = useState({});

  // Reset state mỗi khi quizId thay đổi
  useEffect(() => {
    setQuestions([]);
    setLoading(true);
    setError(null);
    setUserAnswers({});
    setShowResult(false);
    setOpenExplain({});

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${quizId}`);
        if (!response.ok) throw new Error('Lỗi kết nối Server');
        const data = await response.json();
        
        if (data.length === 0) {
            setError("Chưa có câu hỏi nào trong Database cho bài này!");
        } else {
            setQuestions(data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Lỗi:", err);
        setError("Không thể tải câu hỏi. Hãy kiểm tra Backend.");
        setLoading(false);
      }
    };

    if (quizId) fetchQuestions();
  }, [quizId]);

  // Logic xử lý (giữ nguyên)
  const handleSelect = (qId, idx) => {
    if (showResult) return;
    setUserAnswers({ ...userAnswers, [qId]: idx });
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < questions.length) {
        alert("Vui lòng trả lời hết các câu hỏi!");
        return;
    }
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setUserAnswers({});
    setShowResult(false);
    setOpenExplain({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = questions.reduce((acc, q) => {
    return acc + (userAnswers[q._id] === q.correct_index ? 1 : 0);
  }, 0);

  if (loading) return <div className="p-10 text-center text-blue-600 font-bold animate-pulse">⏳ Đang tải bài tập...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">⚠️ {error}</div>;

  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-header">
        <div className="flex items-center gap-2 text-blue-600 mb-2 font-bold uppercase text-sm">
           <span>📝 Bài tập trắc nghiệm</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      {showResult && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm mb-8 flex justify-between items-center animate-bounce-in">
              <div>
                  <h2 className="text-xl font-bold text-blue-900">Kết quả: {score}/{questions.length}</h2>
                  <p className="text-blue-700">Bạn đã hoàn thành bài tập.</p>
              </div>
              <button onClick={handleRetry} className="px-4 py-2 bg-white text-blue-600 font-bold rounded border hover:bg-blue-100">Làm lại</button>
          </div>
      )}

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q._id} className="question-card">
            {showResult && (
                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg ${userAnswers[q._id] === q.correct_index ? 'bg-green-500' : 'bg-red-500'}`}>
                    {userAnswers[q._id] === q.correct_index ? 'ĐÚNG' : 'SAI'}
                </div>
            )}
            <h3 className="font-bold text-lg text-gray-800 mb-4">Câu {index + 1}: {q.question_text}</h3>
            
            <div className="space-y-2">
              {q.options.map((opt, idx) => {
                let btnClass = "option-btn";
                if (showResult) {
                   if (idx === q.correct_index) btnClass += " opt-correct";
                   else if (userAnswers[q._id] === idx) btnClass += " opt-wrong";
                   else btnClass += " opt-dimmed";
                } else if (userAnswers[q._id] === idx) {
                   btnClass += " opt-selected";
                }
                return (
                  <div key={idx} onClick={() => handleSelect(q._id, idx)} className={btnClass}>
                    {opt}
                  </div>
                );
              })}
            </div>

            {showResult && (
                <div className="mt-3">
                    <button onClick={() => setOpenExplain(p => ({...p, [q._id]: !p[q._id]}))} className="text-sm text-blue-600 font-bold hover:underline">
                        {openExplain[q._id] ? 'Ẩn giải thích' : 'Xem giải thích'}
                    </button>
                    {openExplain[q._id] && <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700 border">{q.explanation}</div>}
                </div>
            )}
          </div>
        ))}
      </div>

      {!showResult && (
        <div className="mt-8 flex justify-end">
           <button onClick={handleSubmit} className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg">Nộp bài</button>
        </div>
      )}
    </div>
  );
};

export default UniversalQuiz;