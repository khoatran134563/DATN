import React from 'react';
import Dashboard from './Dashboard/Dashboard';

const ClassroomScreen = () => {
  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <Dashboard />
      </div>
    </div>
  );
};

export default ClassroomScreen;