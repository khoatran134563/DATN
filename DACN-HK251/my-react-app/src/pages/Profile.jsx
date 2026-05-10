import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    school: '',
    className: '',
    dob: '',
    province: '',
    bio: '',
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        school: currentUser.school || '',
        className: currentUser.className || '',
        dob: currentUser.dob ? String(currentUser.dob).slice(0, 10) : '',
        province: currentUser.province || '',
        bio: '',
      });
    }
  }, [currentUser]);

  const avatarSeed = useMemo(() => {
    return encodeURIComponent(profileData.fullName || currentUser?.email || 'ChemLearn');
  }, [profileData.fullName, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert('Hiện tại trang hồ sơ đang hiển thị dữ liệu thật từ tài khoản đăng nhập. Nếu muốn, bước tiếp theo tui sẽ làm luôn chức năng cập nhật hồ sơ vào MongoDB.');
  };

  // Admin không cần hồ sơ cá nhân
  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
        <div className="pt-24 pb-10 px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Hồ sơ cá nhân</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-black mb-4">
                AD
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Administrator</h2>
              <p className="text-gray-500 mt-2">
                Tài khoản quản trị không sử dụng trang hồ sơ cá nhân này.
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
                >
                  Quay về Dashboard
                </button>

                <Link
                  to="/admin/users"
                  className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Quản lý người dùng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <div className="pt-24 pb-10 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Hồ sơ cá nhân</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 rounded-full bg-white p-1 inline-block shadow">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt="User Avatar"
                  className="w-full h-full rounded-full bg-gray-200"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {userRole === 'teacher' ? 'Đơn vị công tác / Trường' : 'Trường'}
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={profileData.school}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {userRole === 'student' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                    <input
                      type="text"
                      name="className"
                      value={profileData.className}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                    <input
                      type="text"
                      value="Giáo viên"
                      readOnly
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    name="province"
                    value={profileData.province}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiểu sử</label>
                <textarea
                  rows="3"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder={
                    userRole === 'teacher'
                      ? 'Giới thiệu ngắn về chuyên môn, trường, môn dạy...'
                      : 'Giới thiệu ngắn về bản thân, mục tiêu học tập...'
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;