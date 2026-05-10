import React, { useState } from 'react';

const USERS_DATA = [
  { id: 1, name: "Lê Thu Thủy", email: "thuthuy@chemlearn.com", role: "teacher", status: "active" },
  { id: 2, name: "Nguyễn Văn Nam", email: "namnv@chemlearn.com", role: "student", status: "banned" },
  //{ id: 3, name: "Trần Thị Bé", email: "betran@chemlearn.com", role: "student", status: "banned" },
  //{ id: 4, name: "Hoàng Văn C", email: "hoangc@chemlearn.com", role: "teacher", status: "active" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
      setUsers(users.map(u => {
          if (u.id === id) {
              return { ...u, status: u.status === 'active' ? 'banned' : 'active' };
          }
          return u;
      }));
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
          <div>
              <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
              <p className="text-gray-500 text-sm mt-1">Danh sách Giáo viên và Học sinh trong hệ thống.</p>
          </div>
          <div className="relative">
                <input 
                    type="text" placeholder="Tìm kiếm user..." 
                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-bold">
                      <tr>
                          <th className="p-4 border-b">Họ và tên</th>
                          <th className="p-4 border-b">Vai trò</th>
                          <th className="p-4 border-b">Trạng thái</th>
                          <th className="p-4 border-b text-right">Hành động</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                      {filteredUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-gray-50 transition">
                              <td className="p-4">
                                  <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${u.role === 'teacher' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                                          {u.name.charAt(0)}
                                      </div>
                                      <div>
                                          <div className="font-bold text-gray-900">{u.name}</div>
                                          <div className="text-xs text-gray-400">{u.email}</div>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-4">
                                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                      {u.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                                  </span>
                              </td>
                              <td className="p-4">
                                  <span className={`flex items-center gap-1.5 text-xs font-bold ${u.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                      <span className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                      {u.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                                  </span>
                              </td>
                              <td className="p-4 text-right">
                                  <button 
                                    onClick={() => toggleStatus(u.id)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded transition border ${u.status === 'active' ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                                  >
                                      {u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default UserManagement;