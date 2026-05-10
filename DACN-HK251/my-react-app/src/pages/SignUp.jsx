import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';
const PROVINCES = [
  "Tuyên Quang", "Cao Bằng", "Lai Châu", "Lào Cai", "Thái Nguyên", "Điện Biên",
  "Lạng Sơn", "Sơn La", "Phú Thọ", "Bắc Ninh", "Quảng Ninh", "TP. Hà Nội",
  "TP. Hải Phòng", "Hưng Yên", "Ninh Bình", "Thanh Hóa", "Nghệ An", "Hà Tĩnh",
  "Quảng Trị", "TP. Huế", "TP. Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk",
  "Khánh Hoà", "Lâm Đồng", "Đồng Nai", "Tây Ninh", "TP. Hồ Chí Minh", "Đồng Tháp",
  "An Giang", "Vĩnh Long", "TP. Cần Thơ", "Cà Mau"
];

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
    return s;
  }, [password]);

  if (!password) return null;

  const widthClass =
    score === 1 ? 'w-1/4' :
    score === 2 ? 'w-2/4' :
    score === 3 ? 'w-3/4' : 'w-full';

  const colorClass =
    score === 1 ? 'bg-red-500' :
    score === 2 ? 'bg-orange-500' :
    score === 3 ? 'bg-yellow-500' : 'bg-green-500';

  const text =
    score === 1 ? 'Rất yếu' :
    score === 2 ? 'Yếu' :
    score === 3 ? 'Trung bình' : 'Mạnh';

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

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    role: '',
    fullName: '',
    school: '',
    className: '',
    dob: '',
    province: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    className: '',
    dob: '',
    province: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const rules = {
    min8: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const clearError = (field) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: '',
      general: '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
    setFieldErrors((prev) => ({ ...prev, role: '', general: '' }));
  };

  const handleBackToRole = () => {
    setStep(1);
    setRole(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFieldErrors({
      role: '',
      fullName: '',
      school: '',
      className: '',
      dob: '',
      province: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });
    setFormData({
      fullName: '',
      school: '',
      className: '',
      dob: '',
      province: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const validateForm = () => {
    const errors = {
      role: '',
      fullName: '',
      school: '',
      className: '',
      dob: '',
      province: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    };

    if (!role) errors.role = 'Vui lòng chọn vai trò!';
    if (!formData.fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên!';
    if (!formData.school.trim()) {
      errors.school = role === 'teacher'
        ? 'Vui lòng nhập đơn vị công tác / trường!'
        : 'Vui lòng nhập tên trường!';
    }
    if (role === 'student' && !formData.className.trim()) {
      errors.className = 'Học sinh phải nhập lớp!';
    }
    if (!formData.dob) errors.dob = 'Vui lòng chọn ngày sinh!';
    if (!formData.province) errors.province = 'Vui lòng chọn tỉnh/thành phố!';

    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email!';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim().toLowerCase())) {
        errors.email = 'Email không đúng định dạng!';
      }
    }

    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu!';
    } else if (!(rules.min8 && rules.upper && rules.lower && rules.number)) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số!';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }

    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setFieldErrors({
      role: '',
      fullName: '',
      school: '',
      className: '',
      dob: '',
      province: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          fullName: formData.fullName,
          school: formData.school,
          className: formData.className,
          dob: formData.dob,
          province: formData.province,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Đăng ký tài khoản ${role === 'teacher' ? 'Giáo viên' : 'Học sinh'} thành công!`);
        navigate('/signin');
      } else {
        if (data.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [data.field]: data.message || 'Dữ liệu không hợp lệ!',
          }));
        } else {
          setFieldErrors((prev) => ({
            ...prev,
            general: data.message || 'Có lỗi xảy ra khi đăng ký!',
          }));
        }
      }
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        general: 'Lỗi kết nối đến server. Vui lòng kiểm tra lại backend!',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-lg border bg-gray-800/50 text-white placeholder-gray-500 outline-none transition-all ${
      hasError
        ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:bg-gray-700'
        : 'border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500'
    }`;

  const errorText = (msg) =>
    msg ? <p className="mt-2 text-xs text-red-400 ml-1">{msg}</p> : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-green-600 rounded-full filter blur-[150px] opacity-70 animate-blob-fast"></div>
      <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-lime-500 rounded-full filter blur-[150px] opacity-70 animate-blob-medium animation-delay-2000"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-teal-600 rounded-full filter blur-[150px] opacity-70 animate-blob-slow animation-delay-4000"></div>

      <div className={`relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl w-full ${step === 2 ? 'max-w-2xl' : 'max-w-lg'} overflow-hidden border border-white/10 animate-fade-in transition-all duration-500`}>
        <div className="bg-gradient-to-r from-green-600/70 to-green-900/70 p-6 text-center text-white relative backdrop-blur-sm">
          {step === 2 && (
            <button onClick={handleBackToRole} className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Chọn lại vai trò
            </button>
          )}
          <h2 className="text-2xl font-bold tracking-wide text-white mt-1">
            {step === 1 ? "Tham gia ChemLearn" : (role === 'teacher' ? "Đăng ký Giáo viên" : "Đăng ký Học sinh")}
          </h2>
          <p className="text-green-50 text-sm font-medium mt-2 opacity-90">
            {step === 1 ? "Chọn vai trò để bắt đầu hành trình chinh phục Hóa học" : "Điền thông tin bên dưới để khởi tạo tài khoản của bạn"}
          </p>
        </div>

        <div className="p-8 bg-black/50 min-h-[400px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <button
                onClick={() => handleSelectRole('student')}
                className="w-full bg-gray-800/60 hover:bg-green-900/30 border border-gray-700 hover:border-green-500 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left"
              >
                <div className="bg-gray-700/50 group-hover:bg-green-600 p-3 rounded-full transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400">Tôi là Học sinh</h3>
                  <p className="text-sm text-gray-400">Tham gia lớp học, làm bài tập và luyện thi.</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectRole('teacher')}
                className="w-full bg-gray-800/60 hover:bg-green-900/30 border border-gray-700 hover:border-green-500 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 group text-left"
              >
                <div className="bg-gray-700/50 group-hover:bg-green-600 p-3 rounded-full transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400">Tôi là Giáo viên</h3>
                  <p className="text-sm text-gray-400">Tạo lớp học, quản lý bài giảng và học sinh.</p>
                </div>
              </button>

              {fieldErrors.role && (
                <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
                  {fieldErrors.role}
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Đã có tài khoản?
                  <Link to="/signin" className="text-green-500 font-bold hover:underline ml-1 transition-colors">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSignUp} className="space-y-6 animate-fade-in-right">
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
                  Thông tin cá nhân
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Họ tên</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className={inputClass(!!fieldErrors.fullName)}
                    />
                    {errorText(fieldErrors.fullName)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {role === 'student' && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Lớp</label>
                        <input
                          name="className"
                          value={formData.className}
                          onChange={handleChange}
                          type="text"
                          placeholder="11A1"
                          className={inputClass(!!fieldErrors.className)}
                        />
                        {errorText(fieldErrors.className)}
                      </div>
                    )}

                    <div className={role === 'teacher' ? 'md:col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">
                        {role === 'student' ? 'Trường' : 'Đơn vị công tác / Trường'}
                      </label>
                      <input
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        type="text"
                        placeholder="THPT..."
                        className={inputClass(!!fieldErrors.school)}
                      />
                      {errorText(fieldErrors.school)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Ngày sinh</label>
                      <input
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        type="date"
                        className={inputClass(!!fieldErrors.dob)}
                      />
                      {errorText(fieldErrors.dob)}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Tỉnh / Thành phố</label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className={`${inputClass(!!fieldErrors.province)} appearance-none`}
                      >
                        <option value="" className="bg-gray-800 text-gray-400">-- Chọn tỉnh thành --</option>
                        {PROVINCES.map((prov, idx) => (
                          <option key={idx} value={prov} className="bg-gray-800 text-white">
                            {prov}
                          </option>
                        ))}
                      </select>
                      {errorText(fieldErrors.province)}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 mt-2">
                  Thông tin tài khoản
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="text"
                      placeholder="example@gmail.com"
                      className={inputClass(!!fieldErrors.email)}
                    />
                    {errorText(fieldErrors.email)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Mật khẩu</label>
                      <div className="relative">
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`${inputClass(!!fieldErrors.password)} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                        >
                          <EyeIcon open={showPassword} />
                        </button>
                      </div>

                      <PasswordStrength password={formData.password} />

                      <div className="mt-3 space-y-2">
                        <Rule ok={rules.min8}>Ít nhất 8 ký tự</Rule>
                        <Rule ok={rules.upper}>Có ít nhất 1 chữ in hoa</Rule>
                        <Rule ok={rules.lower}>Có ít nhất 1 chữ thường</Rule>
                        <Rule ok={rules.number}>Có ít nhất 1 chữ số</Rule>
                      </div>

                      {errorText(fieldErrors.password)}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1 ml-1">Xác nhận mật khẩu</label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={`${inputClass(!!fieldErrors.confirmPassword)} pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                        >
                          <EyeIcon open={showConfirmPassword} />
                        </button>
                      </div>
                      {errorText(fieldErrors.confirmPassword)}
                    </div>
                  </div>
                </div>
              </div>

              {fieldErrors.general && (
                <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
                  {fieldErrors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-900/40 hover:shadow-green-900/60 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang tạo tài khoản...</span>
                  </div>
                ) : (
                  "Đăng ký tài khoản"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;