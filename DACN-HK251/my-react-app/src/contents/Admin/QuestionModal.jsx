import React from 'react';

const QuestionModal = ({ isOpen, onClose, isEditing, formData, setFormData, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-up border border-gray-100" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">{isEditing ? 'Cập nhật câu hỏi' : 'Thêm câu hỏi mới'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Nội dung câu hỏi */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Nội dung câu hỏi <span className="text-red-500">*</span></label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              rows="3"
              value={formData.question_text}
              onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
              placeholder="Nhập đề bài tại đây..."
            />
          </div>

          {/* Các đáp án */}
          <div className="grid grid-cols-2 gap-4">
            {formData.options.map((opt, i) => (
              <div key={i}>
                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">Đáp án {String.fromCharCode(65 + i)}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...formData.options];
                    newOpts[i] = e.target.value;
                    setFormData({ ...formData, options: newOpts });
                  }}
                  placeholder={`Lựa chọn ${i + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Đáp án đúng <span className="text-red-500">*</span></label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.correct_index}
                onChange={(e) => setFormData({ ...formData, correct_index: Number(e.target.value) })}
              >
                {formData.options.map((opt, i) => (
                    <option key={i} value={i}>{String.fromCharCode(65 + i)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Bài học</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.lessonPart}
                onChange={(e) => setFormData({ ...formData, lessonPart: e.target.value })}
              >
                <option value="cbhh">Khái niệm CBHH</option>
                <option value="tddn">Cân bằng TDDN</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Mức độ</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.levelPart}
                onChange={(e) => setFormData({ ...formData, levelPart: e.target.value })}
              >
                <option value="nbth">NB - TH</option>
                <option value="vdvdc">VD - VDC</option>
              </select>
            </div>
          </div>
          
          {/* Giải thích */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Giải thích (Optional)</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              rows="2"
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              placeholder="Giải thích vì sao đáp án đó đúng..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button onClick={onClose} className="px-5 py-2.5 font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-all">Hủy bỏ</button>
          <button onClick={onSave} className="px-6 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
            {isEditing ? 'Cập nhật' : 'Lưu câu hỏi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;