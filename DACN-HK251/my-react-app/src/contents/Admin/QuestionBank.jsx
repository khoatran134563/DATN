import React, { useMemo, useState, useEffect } from 'react';
import QuestionToolbar from './QuestionToolbar';
import QuestionTable from './QuestionTable';
import QuestionModal from './QuestionModal';
import { API_BASE } from '../../config/api';

const emptyFormData = {
  quiz_id: '',
  question_text: '',
  options: ['', '', '', ''],
  correct_index: 0,
  explanation: '',
  lessonPart: 'cbhh',
  levelPart: 'nbth',
};

const getChapterFromQuizId = (quizId = '') => {
  if (quizId.startsWith('cbhh_') || quizId.startsWith('tddn_')) return 'Chương 1';
  return 'Khác';
};

const getLevelFromQuizId = (quizId = '') => {
  if (quizId.endsWith('nbth')) return 'NB - TH';
  if (quizId.endsWith('vdvdc')) return 'VD - VDC';
  return 'Khác';
};

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterChapter, setFilterChapter] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQ, setEditingQ] = useState(null);

  const [formData, setFormData] = useState(emptyFormData);

  const fetchQuestions = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/questions`);

      if (!response.ok) {
        throw new Error('Không thể tải ngân hàng câu hỏi.');
      }

      const data = await response.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
      alert(error.message || 'Lỗi tải dữ liệu ngân hàng câu hỏi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const questionText = q.question_text || '';
      const chapter = getChapterFromQuizId(q.quiz_id);
      const level = getLevelFromQuizId(q.quiz_id);

      const matchText = questionText.toLowerCase().includes(searchTerm.toLowerCase());
      const matchChapter = filterChapter === 'All' || chapter === filterChapter;
      const matchLevel = filterLevel === 'All' || level === filterLevel;

      return matchText && matchChapter && matchLevel;
    });
  }, [questions, searchTerm, filterChapter, filterLevel]);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm('Bạn chắc chắn muốn xóa câu hỏi này khỏi MongoDB?');
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE}/api/questions/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Xóa câu hỏi thất bại.');
      }

      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error('Lỗi xóa câu hỏi:', error);
      alert(error.message || 'Lỗi xóa câu hỏi.');
    }
  };

  const openModal = (question = null) => {
    if (question) {
      const parts = String(question.quiz_id || '').split('_');

      setEditingQ(question);
      setFormData({
        quiz_id: question.quiz_id || '',
        question_text: question.question_text || '',
        options:
          Array.isArray(question.options) && question.options.length >= 4
            ? question.options.slice(0, 4)
            : [...(question.options || []), '', '', '', ''].slice(0, 4),
        correct_index: Number(question.correct_index || 0),
        explanation: question.explanation || '',
        lessonPart: parts[0] || 'cbhh',
        levelPart: parts[1] || 'nbth',
      });
    } else {
      setEditingQ(null);
      setFormData(emptyFormData);
    }

    setIsModalOpen(true);
  };

  const validateForm = () => {
    if (!formData.question_text.trim()) {
      return 'Vui lòng nhập nội dung câu hỏi.';
    }

    const cleanOptions = formData.options.map((item) => String(item || '').trim());

    if (cleanOptions.some((item) => !item)) {
      return 'Vui lòng nhập đủ 4 đáp án.';
    }

    if (
      Number.isNaN(Number(formData.correct_index)) ||
      Number(formData.correct_index) < 0 ||
      Number(formData.correct_index) >= cleanOptions.length
    ) {
      return 'Vui lòng chọn đáp án đúng hợp lệ.';
    }

    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();

    if (validationError) {
      alert(validationError);
      return;
    }

    const generatedId = `${formData.lessonPart}_${formData.levelPart}`;

    const payload = {
      quiz_id: generatedId,
      question_text: formData.question_text.trim(),
      options: formData.options.map((item) => String(item || '').trim()),
      correct_index: Number(formData.correct_index),
      explanation: formData.explanation.trim(),
    };

    setSaving(true);

    try {
      const url = editingQ
        ? `${API_BASE}/api/questions/${editingQ._id}`
        : `${API_BASE}/api/questions`;

      const method = editingQ ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const savedQuestion = await response.json();

      if (!response.ok) {
        throw new Error(savedQuestion.error || 'Lưu câu hỏi thất bại.');
      }

      if (editingQ) {
        setQuestions((prev) =>
          prev.map((q) => (q._id === editingQ._id ? savedQuestion : q))
        );
      } else {
        setQuestions((prev) => [savedQuestion, ...prev]);
      }

      setIsModalOpen(false);
      setEditingQ(null);
      setFormData(emptyFormData);
    } catch (error) {
      console.error('Lỗi lưu câu hỏi:', error);
      alert(error.message || 'Lỗi lưu câu hỏi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col bg-gray-50 font-sans">
      <QuestionToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterChapter={filterChapter}
        setFilterChapter={setFilterChapter}
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        onAdd={() => openModal()}
        totalCount={questions.length}
        filteredCount={filteredQuestions.length}
      />

      <QuestionTable
        questions={filteredQuestions}
        loading={loading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!saving) setIsModalOpen(false);
        }}
        isEditing={!!editingQ}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default QuestionBank;