import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';

const Profile = () => {
  const { currentUser, userRole, updateCurrentUser, logout } = useAuth();
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

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        school: currentUser.school || '',
        className: currentUser.className || '',
        dob: currentUser.dob ? String(currentUser.dob).slice(0, 10) : '',
        province: currentUser.province || '',
        bio: currentUser.bio || '',
      });
    }
  }, [currentUser]);

  const avatarSeed = useMemo(() => {
    return encodeURIComponent(profileData.fullName || currentUser?.email || 'ChemLearn');
  }, [profileData.fullName, currentUser]);

  const roleLabel = userRole === 'teacher' ? 'Giáo viên' : 'Học sinh';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setMessage('');
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    setFieldErrors({});

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.');
        logout();
        navigate('/signin');
        return;
      }

      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          school: profileData.school,
          className: profileData.className,
          dob: profileData.dob,
          province: profileData.province,
          bio: profileData.bio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setFieldErrors({
            [data.field]: data.message || 'Dữ liệu không hợp lệ.',
          });
        } else {
          setMessage(data.message || 'Không thể cập nhật hồ sơ.');
        }

        return;
      }

      updateCurrentUser(data.user);
      setMessage(data.message || 'Cập nhật hồ sơ thành công.');
    } catch (error) {
      console.error('UPDATE PROFILE ERROR =', error);
      setMessage('Không thể kết nối server. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
        <div className="pt-24 pb-10 px-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-black text-blue-900">Chưa có dữ liệu tài khoản</h1>
            <p className="text-gray-500 mt-2">Vui lòng đăng nhập lại để xem hồ sơ.</p>
            <button
              onClick={() => navigate('/signin')}
              className="mt-6 bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderError = (field) => {
    if (!fieldErrors[field]) return null;

    return (
      <p className="mt-1 text-sm font-medium text-red-600">
        {fieldErrors[field]}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <div className="pt-24 pb-10 px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Hồ sơ cá nhân</h1>
          
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-700 to-indigo-700"></div>

          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-full bg-white p-1 inline-block shadow">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                    alt="User Avatar"
                    className="w-full h-full rounded-full bg-gray-200"
                  />
                </div>

                
              </div>
            </div>

            {message && (
              <div
                className={`mb-6 rounded-xl border px-4 py-3 text-sm font-bold ${
                  message.includes('thành công')
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      fieldErrors.fullName ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {renderError('fullName')}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    readOnly
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                  />
                  
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    {userRole === 'teacher' ? 'Đơn vị công tác / Trường' : 'Trường'}
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={profileData.school}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      fieldErrors.school ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {renderError('school')}
                </div>

                {userRole === 'student' ? (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Lớp
                    </label>
                    <input
                      type="text"
                      name="className"
                      value={profileData.className}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        fieldErrors.className ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {renderError('className')}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Vai trò
                    </label>
                    <input
                      type="text"
                      value="Giáo viên"
                      readOnly
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      fieldErrors.dob ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {renderError('dob')}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={profileData.province}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      fieldErrors.province ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {renderError('province')}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Tiểu sử
                </label>
                <textarea
                  rows="4"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder={
                    userRole === 'teacher'
                      ? 'Giới thiệu ngắn về chuyên môn, trường, môn dạy...'
                      : 'Giới thiệu ngắn về bản thân, mục tiêu học tập...'
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-6 py-2.5 rounded-lg font-bold transition ${
                    saving
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
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