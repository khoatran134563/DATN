import React from 'react';

const QuestionItem = ({ index, question, onUpdate, onDelete }) => {
  
  // Các hàm xử lý giữ nguyên
  const handleTextChange = (e) => {
    onUpdate(index, { ...question, text: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdate(index, { ...question, type: e.target.value });
  };

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    onUpdate(index, { ...question, options: newOptions });
  };

  const handleCorrectSelect = (optIndex) => {
    onUpdate(index, { ...question, correctIndex: optIndex });
  };

  const handleCorrectTextChange = (e) => {
    onUpdate(index, { ...question, correctAnswerText: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 transition hover:shadow-md">
      
      {/* 1. Header Câu hỏi & Dropdown chọn loại */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
             {/* SỬA Ở ĐÂY: Dùng h-9 và flex để căn giữa, bo góc rounded-lg cho đồng bộ */}
             <div className="h-9 flex items-center justify-center bg-blue-100 text-blue-700 font-bold px-3 rounded-lg text-xs uppercase tracking-wide shrink-0">
                 Câu {index + 1}
             </div>
             
             {/* SỬA Ở ĐÂY: Dùng h-9 để cao bằng cái nút bên cạnh */}
             <select 
                value={question.type}
                onChange={handleTypeChange}
                className="h-9 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 px-3 cursor-pointer hover:bg-gray-100 transition"
             >
                 <option value="multiple-choice">Trắc nghiệm chọn câu</option>
                 <option value="fill-in">Điền đáp án (Text/Số)</option>
             </select>
        </div>

        <button 
            onClick={() => onDelete(index)}
            className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
            title="Xóa câu hỏi này"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {/* 2. Nội dung câu hỏi (Giữ nguyên) */}
      <div className="mb-4">
        <textarea 
            value={question.text}
            onChange={handleTextChange}
            placeholder="Nhập nội dung câu hỏi..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 min-h-[80px] resize-y"
        />
      </div>

      {/* 3. Khu vực đáp án (Giữ nguyên) */}
      {question.type === 'multiple-choice' ? (
          <div className="space-y-3">
            {question.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center shrink-0">
                        <input 
                            type="radio" 
                            name={`correct-${index}`}
                            checked={question.correctIndex === i}
                            onChange={() => handleCorrectSelect(i)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-green-500 transition-all"
                        />
                        <div className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-green-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>

                    <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                        <span className="px-3 py-2 bg-gray-50 text-gray-500 font-bold text-xs border-r border-gray-200 w-10 text-center">
                            {String.fromCharCode(65 + i)}
                        </span>
                        <input 
                            type="text" 
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            placeholder={`Nhập đáp án ${String.fromCharCode(65 + i)}`}
                            className="flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>
            ))}
             <p className="text-[10px] text-gray-400 mt-2 italic">* Tích vào ô tròn để chọn đáp án đúng.</p>
          </div>
      ) : (
          <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <label className="block text-xs font-bold text-blue-800 mb-2 uppercase">Đáp án đúng (Dùng để chấm điểm tự động)</label>
              <input 
                  type="text" 
                  value={question.correctAnswerText || ''}
                  onChange={handleCorrectTextChange}
                  placeholder="Ví dụ: 197 hoặc Au..."
                  className="w-full border border-blue-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500 text-gray-800 font-medium"
              />
              <p className="text-[10px] text-blue-600 mt-2">
                  * Học sinh cần nhập chính xác nội dung này (không phân biệt hoa thường) để được tính điểm.
              </p>
          </div>
      )}

    </div>
  );
};

export default QuestionItem;