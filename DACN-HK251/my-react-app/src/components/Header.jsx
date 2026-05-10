import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { isLoggedIn, logout, userRole } = useAuth(); 

  const navigate = useNavigate();
  const location = useLocation();
  const hideHeaderRoutes = ['/signin', '/signup', '/forgot-password'];
const shouldHideHeader =
  hideHeaderRoutes.includes(location.pathname) ||
  location.pathname.startsWith('/reset-password/');

  const isHomePage = location.pathname === '/';

  // --- LOGIC NAV LINKS THEO ROLE ---
  // Nếu là Admin thì hiện menu Admin, còn lại giữ nguyên
  const navLinks = userRole === 'admin' 
    ? [
        { name: 'Kiến thức', path: '/progress' },
        { name: 'Forum', path: '/forum' },
        { name: 'Admin', path: '/admin/dashboard' }, // Vào thẳng Dashboard
      ]
    : [
        { name: 'Kiến thức', path: '/progress' },
        { name: 'Lớp học', path: '/classroom' },
        { name: 'Forum', path: '/forum' },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); 
    setIsUserMenuOpen(false); 
    navigate('/'); // Sửa lại về trang signin cho chuẩn
  };

  const getHeaderStyle = () => {
    if (isHomePage) {
      return isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg h-16 border-b border-white/10' 
        : 'bg-transparent h-16 border-b border-transparent';
    } else {
      return 'bg-[#1e3a8a] shadow-md h-16 border-b border-blue-800';
    }
  };

  const navLinkStyle = ({ isActive }) => 
    `px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 flex items-center
     ${isActive 
        ? 'bg-white/10 text-white shadow-inner border border-white/20' 
        : 'text-gray-300 hover:text-white hover:bg-white/5'}`;
  if (shouldHideHeader) return null;

  return (
    <header 
      className={`fixed w-full top-0 z-[100] transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 flex items-center justify-between px-6 text-white ${getHeaderStyle()}`}
    >
      {/* --- KHỐI BÊN TRÁI: LOGO + MENU --- */}
      <div className="flex items-center">
          {/* Logo click vào thì tùy role mà đi đâu */}
          <Link to={userRole === 'admin' ? "/admin/dashboard" : "/"} className="flex items-center gap-2 group relative mr-4">
            <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-1.5 rounded-xl text-blue-900 group-hover:rotate-12 transition-transform duration-300 shadow-[0_4px_15px_rgba(250,204,21,0.4)] relative z-10 border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 drop-shadow-sm" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.344c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-wide drop-shadow-sm relative z-10 hidden sm:block">
              Chem<span className="text-yellow-400 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Learn</span>
            </span>
          </Link>

          {isLoggedIn && (
              <nav className="hidden md:flex items-center gap-4 ml-12 lg:ml-24 transition-all">
                  {/* Render danh sách link động theo role */}
                  {navLinks.map((link) => (
                    <NavLink key={link.path} to={link.path} className={navLinkStyle}>
                        {link.name}
                    </NavLink>
                  ))}
              </nav>
          )}
      </div>

      {/* --- KHỐI BÊN PHẢI: SEARCH + USER --- */}
      <div className="flex items-center gap-4">
          
          {/* SEARCH BAR - CHỈ HIỆN KHI ĐÃ ĐĂNG NHẬP */}
          {isLoggedIn && (
            <div className="hidden lg:block w-64 transition-all duration-300 group">
                <div className="relative">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="w-full py-2 px-4 pl-10 rounded-full border border-white/20 bg-white/10 text-sm text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-sm"
                />
                <span className="absolute left-3 top-2.5 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                </div>
            </div>
          )}

          {/* USER PROFILE BUTTON */}
          <div className="relative">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="focus:outline-none flex items-center gap-3 group p-1 rounded-full transition-all duration-300 hover:bg-white/10">
              {isLoggedIn && (
                <div className="hidden xl:flex flex-col items-end leading-tight mr-1">
                    <span className="text-sm font-bold text-white">
                        {/* HIỂN THỊ TÊN ROLE CHUẨN */}
                        {userRole === 'admin' ? 'Administrator' : (userRole === 'teacher' || userRole === 'gv' ? 'Giáo viên' : 'Học sinh')}
                    </span>
                    <span className="text-[10px] text-blue-200 font-medium">Online</span>
                </div>
              )}
              
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                ${isLoggedIn 
                  // ADMIN CÓ MÀU TÍM, CÒN LẠI MÀU VÀNG CAM
                  ? (userRole === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px]' : 'bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-[2px]')
                  : 'bg-white/10 hover:bg-white/20 border-2 border-white/30 group-hover:border-yellow-300/70'}`}>
                 
                 <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden
                    ${isLoggedIn ? 'bg-white' : ''}`}>
                    {isLoggedIn ? (
                        <span className={`font-black text-sm w-full h-full flex items-center justify-center
                            ${userRole === 'admin' ? 'text-purple-700 bg-purple-50' : 'text-blue-900 bg-gradient-to-br from-gray-100 to-gray-300'}`}>
                            {/* AVATAR CHỮ CÁI: A, G hoặc H */}
                            {userRole === 'admin' ? 'AD' : (userRole === 'teacher' || userRole === 'gv' ? 'GV' : 'HS')}
                        </span>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white drop-shadow-sm group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    )}
                 </div>
                 {isLoggedIn && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1e3a8a] rounded-full"></span>}
              </div>
            </button>

            {/* MENU DROPDOWN */}
            {isUserMenuOpen && (
              <>
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsUserMenuOpen(false)}></div>
                <div className="absolute right-0 mt-4 w-80 z-50 origin-top-right animate-fade-in-up p-1 rounded-[32px]
                                bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.5)]
                                overflow-hidden ring-1 ring-white/20 text-gray-800">
                    <div className="rounded-[28px] bg-gradient-to-b from-white/60 to-blue-50/40 overflow-hidden relative">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        {isLoggedIn ? (
                        <>
                            <div className="px-6 py-5 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-blue-100/50 relative">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full p-[3px] shadow-md
                                        ${userRole === 'admin' ? 'bg-gradient-to-br from-purple-400 to-indigo-600' : 'bg-gradient-to-br from-yellow-300 to-orange-500'}`}>
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                            <span className={`font-black text-xl ${userRole === 'admin' ? 'text-purple-700' : 'text-blue-900'}`}>
                                                {userRole === 'admin' ? 'A' : (userRole === 'teacher' || userRole === 'gv' ? 'G' : 'H')}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-800 truncate">
                                            {userRole === 'admin' ? 'Administrator' : (userRole === 'teacher' || userRole === 'gv' ? 'Giáo Viên' : 'Học Sinh')}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                                {userRole === 'admin' ? 'Super Admin' : 'Thành viên VIP'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <Link to="/profile" className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 rounded-2xl hover:bg-blue-500/10 hover:text-blue-700 transition-all group">
                                    <span className="mr-4 text-xl bg-blue-100/50 p-2 rounded-xl group-hover:bg-blue-200/50 group-hover:scale-110 transition-all shadow-sm">👤</span> 
                                    <span className="flex-1">Hồ sơ cá nhân</span>
                                </Link>
                            </div>
                            <div className="p-3 mt-1">
                                <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-red-600 bg-red-50/50 hover:bg-red-100/80 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </>
                        ) : (
                        <div className="p-6 relative">
                            <div className="text-center mb-6 relative z-10">
                                <h3 className="text-xl font-black text-gray-800 mb-1">Chào bạn mới!</h3>
                                <p className="text-sm text-gray-500 font-medium">Hãy bắt đầu hành trình khám phá hóa học.</p>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <Link to="/signin" className="group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-white overflow-hidden transition-all duration-300 shadow-lg bg-blue-600 hover:bg-blue-700">
                                    <span className="relative z-10">Đăng nhập</span>
                                </Link>
                                <Link to="/signup" className="group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-white overflow-hidden transition-all duration-300 shadow-lg bg-emerald-500 hover:bg-emerald-600">
                                    <span className="relative z-10">Đăng ký tài khoản mới</span>
                                </Link>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
              </>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;