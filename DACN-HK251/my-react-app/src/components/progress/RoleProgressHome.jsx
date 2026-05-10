import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentProgressHome from './StudentProgressHome';
import TeacherProgressHome from './TeacherProgressHome';
import AdminProgressHome from './AdminProgressHome';

const RoleProgressHome = ({ onOpenTheory, onOpenVideo }) => {
  const { userRole, currentUser } = useAuth();

  if (userRole === 'teacher') {
    return <TeacherProgressHome currentUser={currentUser} />;
  }

  if (userRole === 'admin') {
    return <AdminProgressHome currentUser={currentUser} />;
  }

  return (
    <StudentProgressHome
      currentUser={currentUser}
      onOpenTheory={onOpenTheory}
      onOpenVideo={onOpenVideo}
    />
  );
};

export default RoleProgressHome;