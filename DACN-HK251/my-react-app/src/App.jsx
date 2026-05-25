import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import './App.css';

import TextbookViewer from './contents/Textbook';
import TextbookNo2Lab from './contents/Textbook/TextbookNo2Lab';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Chapter1 from './pages/Chapter1';
import MyPosts from './pages/MyPosts';

import AdminPage from './contents/Admin';

import ForumScreen from './contents/Forum';
import ForumDetail from './contents/ForumDetail';
import ForumCreate from './contents/ForumCreate';

import ClassroomScreen from './contents/Classroom';
import ClassDetail from './contents/Classroom/ClassDetail';
import CreateQuiz from './contents/Classroom/CreateQuiz';
import TakeQuiz from './contents/Classroom/TakeQuiz';
import DocumentViewer from './contents/Classroom/DocumentViewer';
import TestScreen from './contents/Test/TestScreen';

const AppLayout = () => {
  const location = useLocation();
  const isTextbookLabRoute = location.pathname.startsWith('/textbook-lab');

  return (
    <>
      {!isTextbookLabRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage activeTab="dashboard" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/question-bank"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage activeTab="question-bank" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/forum-approval"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage activeTab="forum-approval" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPage activeTab="users" />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/classroom"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'student']}>
              <ClassroomScreen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom/:id"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'student']}>
              <ClassDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom/:classId/create-quiz"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom/:classId/quiz/:quizId"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'student']}>
              <TakeQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classroom/:classId/document/:docId"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'student']}>
              <DocumentViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <ForumScreen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forum/create"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <ForumCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forum/post/:id"
          element={
            <ProtectedRoute>
              <ForumDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-posts"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <MyPosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapter1"
          element={
            <ProtectedRoute>
              <Chapter1 />
            </ProtectedRoute>
          }
        />

        <Route path="/textbook" element={<TextbookViewer />} />

        <Route path="/textbook-lab/no2" element={<TextbookNo2Lab />} />

        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <TestScreen />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;