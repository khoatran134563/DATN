// src/contents/Test/TestScreen.jsx
import React, { useState } from 'react';
import { LEVELS } from './TestData';
import TestSetup from './TestSetup';
import TestPlaying from './TestPlaying';
import TestResult from './TestResult';

const TestScreen = () => {
  const [gameState, setGameState] = useState('setup'); 
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[2]); 
  const [numQuestions, setNumQuestions] = useState(10);
  
  // SỬA: Thay isTimerEnabled thành timeLimit (0 = Không giới hạn)
  const [timeLimit, setTimeLimit] = useState(0); 
  
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleStartGame = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      const allData = await response.json();

      let filteredData = [];
      if (selectedLevel.id === 'mixed') {
        filteredData = allData; 
      } else {
        filteredData = allData.filter(q => q.quiz_id.endsWith(selectedLevel.id));
      }

      const shuffled = filteredData.sort(() => 0.5 - Math.random());
      const finalQuestions = shuffled.slice(0, numQuestions);

      if (finalQuestions.length === 0) {
        alert("Không tìm thấy câu hỏi nào phù hợp với mức độ này!");
        setLoading(false);
        return;
      }

      setQuestions(finalQuestions);
      setGameState('playing');
      setScore(0);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi kết nối Server!");
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
    <div className="w-full min-h-screen bg-gray-50 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-blue-800 font-bold animate-pulse">Đang chuẩn bị đề thi...</p>
        </div>
      )}

      {gameState === 'setup' && (
        <TestSetup 
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          // Truyền timeLimit xuống
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
          // Truyền timeLimit xuống để đếm ngược
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