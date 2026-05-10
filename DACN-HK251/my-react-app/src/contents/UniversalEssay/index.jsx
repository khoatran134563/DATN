import React, { useState, useEffect } from 'react';
import './styles.css';

const UniversalEssay = ({ title, quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Quản lý trạng thái hiển thị Gợi ý/Lời giải cho từng câu
  const [showState, setShowState] = useState({});

  // Gọi API lấy dữ liệu từ DB
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/essay/${quizId}`);
        if (!response.ok) throw new Error('Lỗi kết nối Server');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải bài tập. Kiểm tra Backend nhé!");
        setLoading(false);
      }
    };
    fetchEssays();
  }, [quizId]);

  const toggleShow = (id, type) => {
    setShowState(prev => ({
      ...prev,
      [id]: { ...prev[id], [type]: !prev[id]?.[type] }
    }));
  };

  if (loading) return <div className="p-10 text-center text-purple-600 font-bold animate-pulse">⏳ Đang tải bài tập tự luận...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">⚠️ {error}</div>;

  return (
    <div className="essay-container animate-fade-in">
      {/* Header */}
      <div className="essay-header border-b pb-4 mb-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2 font-bold uppercase text-sm">
           <span>📝 Bài tập Tự Luận</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div key={q._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            
            {/* Đề bài (Render HTML vì trong DB có thẻ sub, sup, p...) */}
            <h3 className="font-bold text-lg text-blue-900 mb-3">{q.title}</h3>
            <div 
                className="text-gray-700 mb-4 leading-relaxed content-html"
                dangerouslySetInnerHTML={{ __html: q.content }} 
            />

            {/* Nút chức năng */}
            <div className="flex gap-3 mb-4">
                <button 
                    onClick={() => toggleShow(q._id, 'hint')}
                    className="flex items-center gap-1 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition"
                >
                    {showState[q._id]?.hint ? '🙈 Ẩn gợi ý' : '💡 Xem gợi ý'}
                </button>
                
                <button 
                    onClick={() => toggleShow(q._id, 'solution')}
                    className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition"
                >
                    {showState[q._id]?.solution ? '🔒 Ẩn lời giải' : '🔑 Lời giải chi tiết'}
                </button>
            </div>

            {/* Khu vực Gợi ý */}
            {showState[q._id]?.hint && (
                <div className="mb-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200 animate-fade-in">
                    <p className="font-bold text-yellow-800 mb-2 text-sm uppercase">Gợi ý:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {q.hints.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                </div>
            )}

            {/* Khu vực Lời giải (Render HTML) */}
            {showState[q._id]?.solution && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 animate-fade-in">
                    <p className="font-bold text-green-800 mb-2 text-sm uppercase">Lời giải chi tiết:</p>
                    <div 
                        className="text-gray-800 text-sm leading-relaxed content-html"
                        dangerouslySetInnerHTML={{ __html: q.solution }} 
                    />
                </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversalEssay;