import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import heroBg from '../assets/chemic.png';
import { useAuth } from '../context/AuthContext'; // 1. Import context

const Home = () => {
  // 2. Thay thế dòng kiểm tra localStorage cũ bằng useAuth
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  <-- Bỏ dòng cũ này
  const { isLoggedIn } = useAuth(); // <-- Dùng dòng mới này

  // Logic giữ nguyên: Đăng nhập rồi thì vào Progress, chưa thì vào Signin
  const startLink = isLoggedIn ? "/progress" : "/signin";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      
      <div 
        className="pt-24 pb-16 px-6 text-white text-center relative overflow-hidden" 
        style={{ 
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',        
          backgroundPosition: 'center',   
          backgroundAttachment: 'fixed',  
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10"> 
          <h1 className="text-5xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Chinh phục Hóa học 11 <br/> cùng <span className="text-yellow-300">ChemLearn</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Nền tảng học tập trực tuyến với lộ trình bài bản, video minh họa trực quan và kho bài tập phong phú.
          </p>
          <div className="flex justify-center gap-4">
            {/* Nút này giờ sẽ tự động đổi chữ ngay lập tức khi logout/login */}
            <Link to={startLink} className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg">
              {isLoggedIn ? "Tiếp tục học" : "Bắt đầu học ngay"}
            </Link>
            <Link to="/about" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION (giữ nguyên) */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">Tại sao chọn ChemLearn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📚</div>
            <h3 className="text-xl font-bold mb-2">Lý thuyết chuyên sâu</h3>
            <p className="text-gray-600">Hệ thống bài giảng bám sát SGK mới, giải thích cặn kẽ từng khái niệm.</p>
          </div>
          <div className="text-center p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎥</div>
            <h3 className="text-xl font-bold mb-2">Video minh họa</h3>
            <p className="text-gray-600">Xem thí nghiệm thực tế và mô phỏng 3D giúp dễ hình dung phản ứng.</p>
          </div>
          <div className="text-center p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✍️</div>
            <h3 className="text-xl font-bold mb-2">Bài tập đa dạng</h3>
            <p className="text-gray-600">Kho bài tập trắc nghiệm và tự luận có chấm điểm và giải thích chi tiết.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-8 text-center text-gray-500 text-sm">
        <p>© 2025 ChemLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;