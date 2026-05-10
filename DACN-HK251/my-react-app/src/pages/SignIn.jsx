import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.1-2.386A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.132 5.411M15 12a3 3 0 00-4.243-2.829M9.88 9.88A3 3 0 0014.12 14.12M3 3l18 18" />
    </svg>
  );

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const role = localStorage.getItem('userRole');
      if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/progress');
    }
  }, [navigate]);

  const clearError = (field) => {
    setFormErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = { email: '', password: '', general: '' };

    if (!email.trim()) errors.email = 'Vui lòng nhập email!';
    if (!password) errors.password = 'Vui lòng nhập mật khẩu!';

    if (errors.email || errors.password) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({ email: '', password: '', general: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setFormErrors((prev) => ({
            ...prev,
            [data.field]: data.message || 'Dữ liệu không hợp lệ!',
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            general: data.message || 'Đăng nhập thất bại!',
          }));
        }
        return;
      }

      const user = data.user;
      const token = data.token;

      login(user.role, token, user);

      if (user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/progress');
    } catch (error) {
      setFormErrors((prev) => ({
        ...prev,
        general: 'Không thể kết nối đến server backend!',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border bg-gray-800/50 text-white placeholder-gray-400 transition-all outline-none ${
      hasError
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:bg-gray-700'
        : 'border-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-fuchsia-600 rounded-full filter blur-[150px] opacity-70 animate-blob-fast"></div>
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-[150px] opacity-70 animate-blob-medium animation-delay-2000"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-70 animate-blob-slow animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500 rounded-full filter blur-[120px] opacity-60 animate-blob-fast"></div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10 animate-fade-in">
        <div className="bg-gradient-to-r from-blue-600/70 to-blue-900/70 p-8 text-center text-white relative backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-2 tracking-wide text-white">ChemLearn</h2>
          <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Cổng thông tin học tập</p>
        </div>

        <div className="p-8 bg-black/50">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-white">Chào mừng trở lại!</h3>
            <p className="text-gray-300 text-sm">Vui lòng đăng nhập để tiếp tục.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1 ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError('email');
                }}
                placeholder="name@example.com"
                className={inputClass(!!formErrors.email)}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-400 ml-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1 ml-1">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError('password');
                  }}
                  placeholder="••••••••"
                  className={`${inputClass(!!formErrors.password)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {formErrors.password && (
                <p className="mt-2 text-sm text-red-400 ml-1">{formErrors.password}</p>
              )}

              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-200 transition"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            {formErrors.general && (
              <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
                {formErrors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center"
            >
              {isLoading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Chưa có tài khoản?
              <Link to="/signup" className="text-blue-500 font-bold hover:underline ml-1 transition-colors">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;