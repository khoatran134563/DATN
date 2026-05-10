import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

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

const PasswordStrength = ({ password }) => {
  const score = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[a-z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const widthClass =
    score <= 1 ? 'w-1/5' :
    score === 2 ? 'w-2/5' :
    score === 3 ? 'w-3/5' :
    score === 4 ? 'w-4/5' : 'w-full';

  const colorClass =
    score <= 1 ? 'bg-red-500' :
    score === 2 ? 'bg-orange-500' :
    score === 3 ? 'bg-yellow-500' :
    score === 4 ? 'bg-lime-500' : 'bg-green-500';

  const text =
    score <= 1 ? 'Rất yếu' :
    score === 2 ? 'Yếu' :
    score === 3 ? 'Trung bình' :
    score === 4 ? 'Khá mạnh' : 'Mạnh';

  if (!password) return null;

  return (
    <div className="mt-3">
      <div className="h-2 w-full rounded-full bg-gray-700 overflow-hidden">
        <div className={`h-full ${widthClass} ${colorClass} transition-all duration-300 rounded-full`} />
      </div>
      <p className="mt-2 text-xs text-gray-300">
        Độ mạnh mật khẩu: <span className="font-bold text-white">{text}</span>
      </p>
    </div>
  );
};

const Rule = ({ ok, children }) => (
  <div className={`text-xs flex items-center gap-2 ${ok ? 'text-green-400' : 'text-gray-400'}`}>
    <span className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-gray-500'}`}></span>
    <span>{children}</span>
  </div>
);

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
    general: '',
  });

  const rules = {
    min8: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const clearError = (field) => {
    setFormErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');

    const errors = {
      password: '',
      confirmPassword: '',
      general: '',
    };

    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu mới.';
    } else if (password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }

    if (errors.password || errors.confirmPassword) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({ password: '', confirmPassword: '', general: '' });

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword }),
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
            general: data.message || 'Không thể đặt lại mật khẩu.',
          }));
        }
        return;
      }

      setMessage(data.message);
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/signin');
      }, 1800);
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
        : 'border-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-[150px] opacity-70 animate-blob-fast"></div>
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-[150px] opacity-70 animate-blob-medium animation-delay-2000"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-rose-500 rounded-full filter blur-[150px] opacity-70 animate-blob-slow animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500 rounded-full filter blur-[120px] opacity-60 animate-blob-fast"></div>

      <div className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10 animate-fade-in">
        <div className="bg-gradient-to-r from-amber-500/80 to-orange-700/80 p-8 text-center text-white relative backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-2 tracking-wide text-white">ChemLearn</h2>
          <p className="text-amber-100 text-sm font-medium uppercase tracking-wider">Đặt lại mật khẩu</p>
        </div>

        <div className="p-8 bg-black/50">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-white">Tạo mật khẩu mới</h3>
            <p className="text-gray-300 text-sm">
              Nhập mật khẩu mới để hoàn tất khôi phục tài khoản.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1 ml-1">Mật khẩu mới</label>
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

              <PasswordStrength password={password} />

              <div className="mt-3 space-y-2">
                <Rule ok={rules.min8}>Ít nhất 8 ký tự</Rule>
                <Rule ok={rules.upper}>Có ít nhất 1 chữ in hoa</Rule>
                <Rule ok={rules.lower}>Có ít nhất 1 chữ thường</Rule>
                <Rule ok={rules.number}>Có ít nhất 1 chữ số</Rule>
              </div>

              {formErrors.password && (
                <p className="mt-2 text-sm text-red-400 ml-1">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1 ml-1">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearError('confirmPassword');
                  }}
                  placeholder="••••••••"
                  className={`${inputClass(!!formErrors.confirmPassword)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>

              {formErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 ml-1">{formErrors.confirmPassword}</p>
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
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-900/40 hover:shadow-orange-900/60 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang cập nhật...</span>
                </div>
              ) : (
                'Cập nhật mật khẩu'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/signin" className="text-amber-400 font-bold hover:text-amber-300 hover:underline transition-colors">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;