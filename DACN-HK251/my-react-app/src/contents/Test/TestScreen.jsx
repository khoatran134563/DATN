// src/contents/Test/TestScreen.jsx
import React, { useState } from 'react';
import { CHAPTERS, LEVELS } from './TestData';
import TestSetup from './TestSetup';
import TestPlaying from './TestPlaying';
import TestResult from './TestResult';
import { API_BASE } from '../../config/api';

const TestScreen = () => {
  const [gameState, setGameState] = useState('setup');

  const [selectedChapter, setSelectedChapter] = useState(CHAPTERS[0]);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[2]);

  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(0);

  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getQuestionPrefix = (question) => {
    const quizId = question?.quiz_id || '';
    return quizId.split('_')[0];
  };

  const isQuestionInSelectedChapter = (question) => {
    const prefix = getQuestionPrefix(question);
    return selectedChapter.quizPrefixes.includes(prefix);
  };

  const isQuestionInSelectedLevel = (question) => {
    if (selectedLevel.id === 'mixed') {
      return true;
    }

    const quizId = question?.quiz_id || '';
    return quizId.endsWith(`_${selectedLevel.id}`);
  };

  const handleStartGame = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/questions`);
      const allData = await response.json();

      const filteredData = allData.filter(
        (question) =>
          isQuestionInSelectedChapter(question) &&
          isQuestionInSelectedLevel(question)
      );

      if (filteredData.length === 0) {
        alert('Không tìm thấy câu hỏi nào phù hợp với chương và mức độ đã chọn!');
        setLoading(false);
        return;
      }

      const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
      const finalQuestions = shuffled.slice(0, numQuestions);

      if (finalQuestions.length < numQuestions) {
        alert(
          `Ngân hàng hiện chỉ có ${finalQuestions.length} câu phù hợp. Hệ thống sẽ tạo đề với ${finalQuestions.length} câu.`
        );
      }

      setQuestions(finalQuestions);
      setGameState('playing');
      setScore(0);
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Lỗi kết nối Server!');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishGame = (finalScore) => {
    setScore(finalScore);
    setGameState('result');
  };

  const handleRestart = () => {
    handleStartGame();
  };

  const handleBackToMenu = () => {
    setGameState('setup');
    setScore(0);
    setQuestions([]);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-800 mb-4"></div>
          <p className="text-blue-900 font-bold animate-pulse">
            Đang chuẩn bị đề kiểm tra...
          </p>
        </div>
      )}

      {gameState === 'setup' && (
        <TestSetup
          chapters={CHAPTERS}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
          levels={LEVELS}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          onStart={handleStartGame}
        />
      )}

      {gameState === 'playing' && (
        <TestPlaying
          questions={questions}
          numQuestions={questions.length}
          selectedLevel={selectedLevel}
          timeLimit={timeLimit}
          onFinish={handleFinishGame}
        />
      )}

      {gameState === 'result' && (
        <TestResult
          score={score}
          numQuestions={questions.length}
          selectedLevel={selectedLevel}
          onRestart={handleRestart}
          onBack={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default TestScreen;