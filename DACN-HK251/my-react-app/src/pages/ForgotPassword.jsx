import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    general: '',
  });

  const clearError = (field) => {
    setFormErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');

    const errors = { email: '', general: '' };

    if (!email.trim()) {
      errors.email = 'Vui lòng nhập email!';
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({ email: '', general: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setFormErrors((prev) => ({
            ...prev,
            [data.field]: data.message || 'Dữ liệu không hợp lệ.',
          }));
        } else {
          setFormErrors((prev) => ({
            ...prev,
            general: data.message || 'Không thể xử lý yêu cầu.',
          }));
        }
        return;
      }

      setMessage(data.message);
      setEmail('');
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
        : 'border-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-violet-600 rounded-full filter blur-[150px] opacity-70 animate-blob-fast"></div>
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-[150px] opacity-70 animate-blob-medium animation-delay-2000"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-fuchsia-500 rounded-full filter blur-[150px] opacity-70 animate-blob-slow animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full filter blur-[120px] opacity-60 animate-blob-fast"></div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10 animate-fade-in">
        <div className="bg-gradient-to-r from-violet-600/70 to-indigo-900/70 p-8 text-center text-white relative backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-2 tracking-wide text-white">ChemLearn</h2>
          <p className="text-violet-100 text-sm font-medium uppercase tracking-wider">Khôi phục tài khoản</p>
        </div>

        <div className="p-8 bg-black/50">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-white">Quên mật khẩu?</h3>
            <p className="text-gray-300 text-sm">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1 ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                  clearError('email');
                }}
                placeholder="name@example.com"
                className={inputClass(!!formErrors.email)}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-400 ml-1">{formErrors.email}</p>
              )}
            </div>

            {message && (
              <div className="text-green-400 text-sm text-center font-medium bg-green-500/10 border border-green-500/20 rounded-xl py-3 px-4">
                {message}
              </div>
            )}

            {formErrors.general && (
              <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
                {formErrors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang gửi...</span>
                </div>
              ) : (
                'Gửi liên kết đặt lại mật khẩu'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/signin" className="text-violet-400 font-bold hover:text-violet-300 hover:underline transition-colors">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;