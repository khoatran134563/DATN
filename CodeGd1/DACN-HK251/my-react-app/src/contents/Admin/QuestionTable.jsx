import React from 'react';

const QuestionTable = ({ questions, loading, onEdit, onDelete }) => {
  
  // Hàm Helper phân tích ID
  const parseInfo = (quizId = '') => {
    let chapter = "Chương 1";
    let level = "Khác";
    let levelColor = "bg-gray-100 text-gray-600";

    if (quizId.endsWith('nbth')) {
        level = "NB - TH";
        levelColor = "bg-green-100 text-green-700 border-green-200";
    } else if (quizId.endsWith('vdvdc')) {
        level = "VD - VDC";
        levelColor = "bg-orange-100 text-orange-700 border-orange-200";
    }

    return { chapter, level, levelColor };
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4 w-32">Mã câu hỏi</th> {/* CỘT MỚI */}
                <th className="p-4">Nội dung câu hỏi</th>
                <th className="p-4 w-32">Chương</th>
                <th className="p-4 w-32">Mức độ</th>
                <th className="p-4 w-28 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {questions.map((q, idx) => {
                const { chapter, level, levelColor } = parseInfo(q.quiz_id);
                return (
                  <tr key={q._id || idx} className="hover:bg-blue-50/50 transition duration-150 group">
                    
                    {/* 1. Số thứ tự */}
                    <td className="p-4 font-mono text-gray-400 text-center text-xs">#{idx + 1}</td>

                    {/* 2. Mã câu hỏi (ID) - MỚI */}
                    <td className="p-4">
                       <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 whitespace-nowrap">
                          {q.quiz_id}
                       </span>
                    </td>

                    {/* 3. Nội dung câu hỏi (Giờ đã thoáng hơn) */}
                    <td className="p-4">
                      <div className="font-medium text-gray-900 line-clamp-2 mb-1" title={q.question_text}>
                        {q.question_text}
                      </div>
                      {/* Chỉ còn hiển thị đáp án đúng ở đây */}
                      <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Đúng: {q.options[q.correct_index]}
                      </div>
                    </td>

                    {/* 4. Chương */}
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-bold border border-gray-200 whitespace-nowrap">
                        {chapter}
                      </span>
                    </td>

                    {/* 5. Mức độ */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border whitespace-nowrap ${levelColor}`}>
                        {level}
                      </span>
                    </td>

                    {/* 6. Hành động */}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(q)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition" title="Chỉnh sửa">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button onClick={() => onDelete(q._id)} className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition" title="Xóa">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {questions.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <div className="text-4xl mb-3 opacity-30">🔍</div>
              <p>Không tìm thấy câu hỏi nào phù hợp.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionTable;