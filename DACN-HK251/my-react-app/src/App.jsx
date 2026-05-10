import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// --- IMPORT CONTEXT ---
import { AuthProvider } from './context/AuthContext'; 

// --- IMPORT COMPONENTS ---
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'; 

// --- IMPORT PAGES ---
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Chapter1 from './pages/Chapter1';

// --- IMPORT CONTENTS (ADMIN) ---
import AdminPage from './contents/Admin';

// --- IMPORT CONTENTS (FORUM) ---
import ForumScreen from './contents/Forum';
import ForumDetail from './contents/ForumDetail';
import ForumCreate from './contents/ForumCreate';

// --- IMPORT CONTENTS (CLASSROOM & TEST) ---
import ClassroomScreen from './contents/Classroom';
import ClassDetail from './contents/Classroom/ClassDetail';
import CreateQuiz from './contents/Classroom/CreateQuiz';
import TakeQuiz from './contents/Classroom/TakeQuiz';
import DocumentViewer from './contents/Classroom/DocumentViewer';
import TestScreen from './contents/Test/TestScreen';

function App() {
  return (
    <div className='App'>
      {/* Bọc AuthProvider ở ngoài cùng để toàn app có thể check đăng nhập */}
      <AuthProvider>
        <Router>
          {/* Header nằm trong Router nhưng ngoài Routes để luôn hiển thị */}
          <Header /> 
          
          <Routes>
            
            {/* =========================================
                1. PUBLIC ROUTES (Ai cũng vào được) 
               ========================================= */}
            <Route path='/' element={<Home/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/signup' element={<SignUp/>} />

            {/* =========================================
                2. ADMIN ROUTES (Chỉ Admin được vào)
               ========================================= */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage activeTab="dashboard" />
                </ProtectedRoute>
            } />
            <Route path="/admin/question-bank" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage activeTab="question-bank" />
                </ProtectedRoute>
            } />
            <Route path="/admin/forum-approval" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage activeTab="forum-approval" />
                </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage activeTab="users" />
                </ProtectedRoute>
            } />
            {/* Nếu gõ /admin khơi khơi thì về dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />


            {/* =========================================
                3. CLASSROOM ROUTES (Chỉ GV và HS)
               ========================================= */}
            {/* Admin không cần vào mấy trang này */}
            <Route path='/classroom' element={
              <ProtectedRoute allowedRoles={['teacher', 'student']}>
                <ClassroomScreen />
              </ProtectedRoute>
            } />

            <Route path='/classroom/:id' element={
              <ProtectedRoute allowedRoles={['teacher', 'student']}>
                <ClassDetail />
              </ProtectedRoute>
            } />

            <Route path='/classroom/:classId/create-quiz' element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <CreateQuiz />
              </ProtectedRoute>
            } />

            <Route path='/classroom/:classId/quiz/:quizId' element={
              <ProtectedRoute allowedRoles={['teacher', 'student']}>
                <TakeQuiz />
              </ProtectedRoute>
            } />

            <Route path="/classroom/:classId/document/:docId" element={
              <ProtectedRoute allowedRoles={['teacher', 'student']}>
                <DocumentViewer />
              </ProtectedRoute>
            } />



            {/* =========================================
                4. FORUM ROUTES (Ai đăng nhập cũng vào được)
               ========================================= */}
            <Route path='/forum' element={
                <ProtectedRoute>
                  <ForumScreen /> 
                </ProtectedRoute>
            } />
            <Route path='/forum/create' element={
                <ProtectedRoute>
                  <ForumCreate />
                </ProtectedRoute>
            } />
             <Route path='/forum/post/:id' element={
                <ProtectedRoute>
                  <ForumDetail />
                </ProtectedRoute>
            } />


            {/* =========================================
                5. GENERAL PROTECTED (Profile, Progress...)
               ========================================= */}
            <Route path='/progress' element={
                <ProtectedRoute>
                  <Progress/>
                </ProtectedRoute>
            } />
            <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
            } />
            <Route path='/settings' element={
                <ProtectedRoute>
                  <Settings/>
                </ProtectedRoute>
            } />
            <Route path='/chapter1' element={
                <ProtectedRoute>
                  <Chapter1/>
                </ProtectedRoute>
            } />
            <Route path='/test' element={
                <ProtectedRoute>
                  <TestScreen />
                </ProtectedRoute>
            } />
            <Route path="/forgot-password" element={
                <ForgotPassword /> 
            } />
            <Route path="/reset-password/:token" element={
                <ResetPassword />
            } />

            {/* Route bắt lỗi 404 (Nếu nhập linh tinh thì về Home) */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;