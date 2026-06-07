import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole'); // 'admin' | 'teacher' | 'student'

  if (!isLoggedIn) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/progress" replace />;
  }

  return children;
};

export default ProtectedRoute;
