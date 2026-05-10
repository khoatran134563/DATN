import React from 'react';
import Header from '../../components/Header';
import AdminSidebar from './AdminSidebar';
import QuestionBank from './QuestionBank';
import ForumApproval from './ForumApproval';
import UserManagement from './UserManagement';
import Dashboard from './Dashboard'; // <--- IMPORT CÁI MỚI

const AdminPage = ({ activeTab }) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      <div className="fixed top-0 left-0 right-0 z-50">
         <Header /> 
      </div>

      <div className="flex pt-16 w-full h-full">
        <AdminSidebar />

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8f9fa]">
            {activeTab === 'dashboard' && <Dashboard />} {/* <--- Dùng ở đây */}
            {activeTab === 'question-bank' && <QuestionBank />}
            {activeTab === 'forum-approval' && <ForumApproval />}
            {activeTab === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;