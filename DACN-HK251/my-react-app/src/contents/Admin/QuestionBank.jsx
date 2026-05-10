import React, { useMemo, useState, useEffect } from 'react';
import QuestionToolbar from './QuestionToolbar';
import QuestionTable from './QuestionTable';
import QuestionModal from './QuestionModal';
import { API_BASE } from '../../config/api';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterChapter, setFilterChapter] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQ, setEditingQ] = useState(null);

  const [formData, setFormData] = useState({
    quiz_id: '',
    question_text: '',
    options: ['', '', '', ''],
    correct_index: 0,
    explanation: '',
    lessonPart: 'cbhh',
    levelPart: 'nbth'
  });

  // --- 1. LẤY DỮ LIỆU ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/questions`); 
        const data = await response.json(); 
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // --- 2. LOGIC LỌC ---
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
        let chapter = "Chương 1"; 
        let level = "Khác";
        if (q.quiz_id.endsWith('nbth')) level = "NB - TH";
        else if (q.quiz_id.endsWith('vdvdc')) level = "VD - VDC";

        const matchText = q.question_text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchChapter = filterChapter === 'All' || chapter === filterChapter;
        const matchLevel = filterLevel === 'All' || level === filterLevel;

        return matchText && matchChapter && matchLevel;
    });
  }, [questions, searchTerm, filterChapter, filterLevel]);

  // --- 3. CRUD HANDLERS ---
  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa câu hỏi này khỏi ngân hàng đề?')) {
      setQuestions(questions.filter((q) => q._id !== id));
    }
  };

  const openModal = (question = null) => {
    if (question) {
      setEditingQ(question);
      const parts = question.quiz_id.split('_');
      setFormData({
        ...question,
        lessonPart: parts[0] || 'cbhh',
        levelPart: parts[1] || 'nbth'
      });
    } else {
      setEditingQ(null);
      setFormData({
        quiz_id: '',
        question_text: '',
        options: ['', '', '', ''],
        correct_index: 0,
        explanation: '',
        lessonPart: 'cbhh',
        levelPart: 'nbth'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.question_text) return alert('Vui lòng nhập nội dung câu hỏi!');

    const generatedId = `${formData.lessonPart}_${formData.levelPart}`;
    const payload = { ...formData, quiz_id: generatedId };

    if (editingQ) {
      const updatedList = questions.map((q) =>
        q._id === editingQ._id ? { ...payload, _id: editingQ._id } : q
      );
      setQuestions(updatedList);
    } else {
      const newQ = { ...payload, _id: Date.now().toString() };
      setQuestions([newQ, ...questions]);
    }
    setIsModalOpen(false);
  };

  // --- RENDER ---
  return (
    <div className="p-8 h-full flex flex-col bg-gray-50 font-sans">
      {/* TRUYỀN THÊM PROPS COUNT VÀO ĐÂY NÈ */}
      <QuestionToolbar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterChapter={filterChapter} setFilterChapter={setFilterChapter}
        filterLevel={filterLevel} setFilterLevel={setFilterLevel}
        onAdd={() => openModal()}
        totalCount={questions.length}           // <--- Tổng số
        filteredCount={filteredQuestions.length} // <--- Số sau khi lọc
      />

      <QuestionTable 
        questions={filteredQuestions}
        loading={loading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <QuestionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={!!editingQ}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default QuestionBank;