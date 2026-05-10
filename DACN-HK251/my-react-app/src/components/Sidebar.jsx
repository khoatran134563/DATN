import React, { useState } from 'react';

const Sidebar = ({ 
  menuData, 
  activeCategory, 
  setActiveCategory, 
  activeChapter, 
  setActiveChapter,
  onSelectLesson // Hàm này sẽ nhận item cuối cùng (Topic)
}) => {
  // --- STATE QUẢN LÝ ĐÓNG/MỞ CẤP 3 (BÀI HỌC) ---
  // Dùng state này để biết bài nào đang được mở ra xem mục con
  const [expandedLesson, setExpandedLesson] = useState(null);

  // --- HANDLERS ---
  const handleCategoryClick = (catId) => {
    // Nếu là các mục đặc biệt (Bảng tuần hoàn, Kiểm tra)
    if (catId === 'periodic-table' || catId === 'test-eval') {
        setActiveCategory(catId);
        setActiveChapter(null);
        setExpandedLesson(null);
        onSelectLesson(null);
    } else {
        // Toggle Category (Cấp 1)
        if (activeCategory === catId) {
            setActiveCategory(null); 
        } else {
            setActiveCategory(catId);
            setActiveChapter(null); // Reset chương khi đổi danh mục
            setExpandedLesson(null); // Đóng tất cả bài học
        }
    }
  };

  const handleChapterClick = (chapId) => {
    // Toggle Chapter (Cấp 2)
    if (activeChapter === chapId) {
      setActiveChapter(null); 
    } else {
      setActiveChapter(chapId);
      setExpandedLesson(null); // Reset bài học khi đổi chương
    }
  };

  const handleLessonClick = (lessonId) => {
    // Toggle Lesson (Cấp 3) -> Đây là cái bro cần: Bấm vào bài để đóng/mở mục con
    if (expandedLesson === lessonId) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonId);
    }
  };
  // ------------------------------

  return (
    <aside className="w-64 bg-[#f0f2f5] border-r border-gray-200 fixed h-full overflow-y-auto hidden md:block top-16 pb-20 scrollbar-thin scrollbar-thumb-gray-300">
      <nav className="mt-4 space-y-1">
        
        {/* === MỤC ĐẶC BIỆT: Bảng tuần hoàn === */}
        <div>
            <button
              onClick={() => handleCategoryClick('periodic-table')}
              className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-sm border-l-4 transition-all duration-200 text-left
                ${activeCategory === 'periodic-table' 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-600 shadow-md' 
                  : 'text-slate-700 border-transparent hover:bg-gray-200'}`}
            >
              <span className="flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg> 
                 Bảng tuần hoàn
              </span>
            </button>
        </div>

        {/* === MENU CHÍNH (3 CẤP ĐÓNG MỞ) === */}
        {menuData && menuData.map((category) => (
          <div key={category.id}>
            {/* CẤP 1: DANH MỤC (Lý thuyết, Video...) - Bấm để đóng/mở Chương */}
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-sm border-l-4 transition-all duration-200 text-left
                ${activeCategory === category.id 
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm' 
                  : 'text-slate-700 border-transparent hover:bg-gray-200'}`}
            >
              <span className="flex items-center gap-2 truncate">
                 {category.icon} {category.title}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 transform ${activeCategory === category.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* CONTAINER CẤP 2: CHƯƠNG */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeCategory === category.id ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-gray-50 border-b border-gray-200">
                {category.chapters && category.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    
                    {/* CẤP 2: CHƯƠNG (Chương 1...) - Bấm để đóng/mở Bài học */}
                    <button
                      onClick={() => handleChapterClick(chapter.id)}
                      className={`w-full flex justify-between items-center pl-8 pr-4 py-3 text-sm font-medium transition-colors text-left border-l-[3px]
                        ${activeChapter === chapter.id 
                          ? 'bg-blue-100 text-blue-800 border-blue-500' 
                          : 'text-gray-700 border-transparent hover:bg-gray-200'}`}
                    >
                      <span className="truncate">{chapter.title}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 flex-shrink-0 ${activeChapter === chapter.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* CONTAINER CẤP 3: BÀI HỌC */}
                    {activeChapter === chapter.id && (
                      <div className="bg-gray-100 animate-fade-in">
                        {chapter.lessons && chapter.lessons.map((lesson) => (
                          <div key={lesson.id}>
                            
                            {/* CẤP 3: BÀI HỌC (Bài 1...) - Bấm để đóng/mở Mục con */}
                            <button
                              onClick={() => handleLessonClick(lesson.id)}
                              className={`w-full flex justify-between items-center pl-12 pr-4 py-2.5 text-sm font-medium transition-colors text-left
                                ${expandedLesson === lesson.id 
                                  ? 'text-blue-700 bg-blue-50' 
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                            >
                              <span className="truncate">{lesson.title}</span>
                              {/* Mũi tên đóng/mở cho Bài học */}
                              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-200 flex-shrink-0 opacity-70 ${expandedLesson === lesson.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* CẤP 4: MỤC CON (Topic) - Click vào đây mới load nội dung */}
                            {expandedLesson === lesson.id && (
                                <div className="bg-white py-1 shadow-inner">
                                    {lesson.topics && lesson.topics.map((topic, tIndex) => (
                                        <button
                                            key={tIndex}
                                            onClick={() => onSelectLesson(topic)} 
                                            className="w-full text-left pl-16 pr-4 py-2 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-start"
                                        >
                                            <span className="mt-1.5 mr-2 text-[6px] text-blue-400 flex-shrink-0">●</span> 
                                            <span className="leading-snug">{topic.title || topic}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* === MỤC ĐẶC BIỆT: Kiểm tra === */}
        <div>
            <button
              onClick={() => handleCategoryClick('test-eval')}
              className={`w-full flex justify-between items-center px-4 py-3 font-semibold text-sm border-l-4 transition-all duration-200 text-left
                ${activeCategory === 'test-eval' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-600 shadow-md' 
                  : 'text-slate-700 border-transparent hover:bg-gray-200'}`}
            >
              <span className="flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> </svg>
                 Kiểm tra & Đánh giá
              </span>
            </button>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;