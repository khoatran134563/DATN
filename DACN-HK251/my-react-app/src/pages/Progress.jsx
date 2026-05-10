import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RoleProgressHome from '../components/progress/RoleProgressHome';

// --- IMPORT CÁC BÀI HỌC (Giữ nguyên) ---
import Lesson_PhanUng from '../contents/Lesson/Lesson_PhanUng.jsx';
import Lesson_HangSo from '../contents/Lesson/Lesson_HangSo.jsx'; 
import Lesson_ChuyenDich from '../contents/Lesson/Lesson_ChuyenDich.jsx';
import Lesson_YeuTo from '../contents/Lesson/Lesson_YeuTo.jsx';
import Lesson_DienLi from '../contents/Lesson/Lesson_DienLi.jsx';
import Lesson_Bronsted from '../contents/Lesson/Lesson_Bronsted.jsx';
import Lesson_pH from '../contents/Lesson/Lesson_pH.jsx';
import Lesson_ChuanDo from '../contents/Lesson/Lesson_ChuanDo.jsx';
import Lesson_AlFeCo from '../contents/Lesson/Lesson_AlFeCo.jsx';
import Video_PhanUngThuanNghich from '../contents/Video/Video_PhanUngThuanNghich.jsx';
import Video_AnhHuongNhietDo from '../contents/Video/Video_AnhHuongNhietDo.jsx';
import Video_AnhHuongNongDo from '../contents/Video/Video_AnhHuongNongDo.jsx';
import Video_AnhHuongApSuat from '../contents/Video/Video_AnhHuongApSuat.jsx';
import Video_DienLi from '../contents/Video/Video_DienLi.jsx';
import Video_DopH from '../contents/Video/Video_DopH.jsx';
import Video_ChuanDo from '../contents/Video/Video_ChuanDo.jsx';
import UniversalQuiz from '../contents/UniversalQuiz';
import PeriodicTable from '../contents/PeriodicTable/PeriodicTable.jsx';
import TestScreen from '../contents/Test/TestScreen.jsx'; 
import UniversalEssay from '../contents/UniversalEssay';
import Lab3D_NO2 from '../contents/Lab3D/Lab3D_NO2.jsx';
import Lab3D_Phenol from "../contents/Lab3Dphenol/Lab3D_Phenol";


// --- CẬP NHẬT: DỮ LIỆU 4 CẤP (Category -> Chapter -> Lesson -> Topic) ---
const COURSE_DATA = [
  {
    id: 'theory',
    title: 'Lý thuyết',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    chapters: [
      {
        id: 'chap1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'bai1',
            title: 'Bài 1: Khái niệm về cân bằng hóa học',
            topics: [
              'Phản ứng một chiều, phản ứng thuận nghịch và cân bằng hóa học',
              'Hằng số cân bằng của phản ứng thuận nghịch',
              'Sự chuyển dịch cân bằng hóa học',
              'Các yếu tố ảnh hưởng đến cân bằng hóa học'
            ]
          },
          {
            id: 'bai2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            topics: [
              'Sự điện li, chất điện li, chất không điện li',
              'Thuyết Brønsted - Lowry về acid - base',
              'Khái niệm pH. Chất chỉ thị acid - base',
              'Chuẩn độ acid - base',
              'Ý nghĩa thực tiễn cân bằng của ion Al3+, Fe3+ và CO3 2-'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'video',
    title: 'Video minh họa',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    chapters: [
      {
        id: 'v_chap1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'v_bai1',
            title: 'Bài 1: Khái niệm về cân bằng hóa học',
            topics: [
              'Video: Phản ứng thuận nghịch',
              'Video: Ảnh hưởng của nhiệt độ đến cân bằng',
              'Video: Ảnh hưởng của nồng độ đến cân bằng',
              'Video: Ảnh hưởng của áp suất đến cân bằng'
            ]
          },
          {
            id: 'v_bai2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            topics: [
              'Video: Chất điện li mạnh, chất điện li yếu',
              'Video: Đo độ pH bằng chất chỉ thị Acid - Base',
              'Video: Chuẩn độ acid - base'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'exercise',
    title: 'Bài tập',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    chapters: [
      {
        id: 'e_chap1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'e_bai1',
            title: 'Bài 1: Khái niệm về cân bằng hóa học',
            topics: [
              'Trắc nghiệm: Cân bằng hóa học (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Cân bằng hóa học (Vận dụng - Vận dụng cao)',
              'Tự luận: Cân bằng hóa học'
            ]
          },
          {
            id: 'e_bai2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            topics: [
              'Trắc nghiệm: Cân bằng trong dung dịch nước (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Cân bằng trong dung dịch nước (Vận dụng - Vận dụng cao)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'virtual-lab',
    title: 'Thí nghiệm 3D',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    chapters: [
      {
        id: 'lab_c1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'lab_no2',
            title: 'Mô phỏng 3D: Chuyển dịch cân bằng NO2',
            topics: ['Thực hành: Nhiệt độ và cân bằng NO2']
          },
          {
            id: 'lab_phenol',
            title: 'Mô phỏng 3D: Chỉ thị phenolphthalein',
            topics: ['Thực hành: Chỉ thị phenolphthalein']
          }
        ]
      }
    ]
  }
];

const Progress = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLesson, activeCategory]);

  const handleSelectLesson = (lessonData) => {
    const lessonName = lessonData?.title || lessonData;
    setSelectedLesson(lessonName);
  };

  const goHome = () => {
    setActiveCategory(null);
    setActiveChapter(null);
    setSelectedLesson(null);
  };

  const renderMainContent = () => {
    if (activeCategory === 'test-eval') {
      return <TestScreen />;
    }

    if (activeCategory === 'periodic-table') {
      return <PeriodicTable />;
    }

    if (selectedLesson) {
      return (
        <div className="animate-fade-in">
          <button onClick={() => setSelectedLesson(null)} className="mb-4 text-sm text-blue-600 hover:underline flex items-center gap-1">
            <span>←</span> Quay lại danh sách
          </button>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
            {(() => {
              if (selectedLesson === 'Phản ứng một chiều, phản ứng thuận nghịch và cân bằng hóa học') return <Lesson_PhanUng />;
              else if (selectedLesson === 'Hằng số cân bằng của phản ứng thuận nghịch') return <Lesson_HangSo />;
              else if (selectedLesson === 'Sự chuyển dịch cân bằng hóa học') return <Lesson_ChuyenDich />;
              else if (selectedLesson === 'Các yếu tố ảnh hưởng đến cân bằng hóa học') return <Lesson_YeuTo />;
              else if (selectedLesson === 'Sự điện li, chất điện li, chất không điện li') return <Lesson_DienLi />;
              else if (selectedLesson === 'Thuyết Brønsted - Lowry về acid - base') return <Lesson_Bronsted />;
              else if (selectedLesson === 'Khái niệm pH. Chất chỉ thị acid - base') return <Lesson_pH />;
              else if (selectedLesson === 'Chuẩn độ acid - base') return <Lesson_ChuanDo />;
              else if (selectedLesson === 'Ý nghĩa thực tiễn cân bằng của ion Al3+, Fe3+ và CO3 2-') return <Lesson_AlFeCo />;
              else if (selectedLesson === 'Video: Phản ứng thuận nghịch') return <Video_PhanUngThuanNghich />;
              else if (selectedLesson === 'Video: Ảnh hưởng của nhiệt độ đến cân bằng') return <Video_AnhHuongNhietDo />;
              else if (selectedLesson === 'Video: Ảnh hưởng của nồng độ đến cân bằng') return <Video_AnhHuongNongDo />;
              else if (selectedLesson === 'Video: Ảnh hưởng của áp suất đến cân bằng') return <Video_AnhHuongApSuat />;
              else if (selectedLesson === 'Video: Chất điện li mạnh, chất điện li yếu') return <Video_DienLi />;
              else if (selectedLesson === 'Video: Đo độ pH bằng chất chỉ thị Acid - Base') return <Video_DopH />;
              else if (selectedLesson === 'Video: Chuẩn độ acid - base') return <Video_ChuanDo />;
              else if (selectedLesson === 'Trắc nghiệm: Cân bằng hóa học (Nhận biết - Thông hiểu)') {
                return <UniversalQuiz title="Trắc nghiệm: Cân bằng hóa học (NB-TH)" quizId="cbhh_nbth" />;
              } else if (selectedLesson === 'Trắc nghiệm: Cân bằng hóa học (Vận dụng - Vận dụng cao)') {
                return <UniversalQuiz title="Trắc nghiệm: Cân bằng hóa học (VD-VDC)" quizId="cbhh_vdvdc" />;
              } else if (selectedLesson === 'Trắc nghiệm: Cân bằng trong dung dịch nước (Nhận biết - Thông hiểu)') {
                return <UniversalQuiz title="Trắc nghiệm: Cân bằng trong dung dịch nước (NB - TH)" quizId="tddn_nbth" />;
              } else if (selectedLesson === 'Trắc nghiệm: Cân bằng trong dung dịch nước (Vận dụng - Vận dụng cao)') {
                return <UniversalQuiz title="Trắc nghiệm: Cân bằng trong dung dịch nước (VD-VDC)" quizId="tddn_vdvdc" />;
              } else if (selectedLesson === 'Tự luận: Cân bằng hóa học') {
                return <UniversalEssay title="Tự luận: Cân bằng hóa học" quizId="essay_cbhh" />;
              } else if (selectedLesson === 'Thực hành: Nhiệt độ và cân bằng NO2') {
                return <Lab3D_NO2 />;
              } else if (selectedLesson === 'Thực hành: Chỉ thị phenolphthalein') {
                return <Lab3D_Phenol />;
              } else {
                return (
                  <div className="text-center py-20">
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-2xl font-bold text-gray-400 mb-4">Nội dung đang cập nhật...</h2>
                    <p className="text-gray-500">
                      Bài học: <span className="font-semibold text-blue-500">"{selectedLesson}"</span> đang được biên soạn.
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      );
    }

    if (activeCategory) {
      const currentData = COURSE_DATA.find(c => c.id === activeCategory);
      if (currentData) {
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                {currentData.icon} {currentData.title}
              </h2>
              <span className="text-sm font-bold text-slate-500">Learning Progress</span>
            </div>

            <div className="space-y-8">
              {currentData.chapters && currentData.chapters.map((chap) => (
                <div key={chap.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg">{chap.title}</h3>
                  </div>

                  <div className="p-4 space-y-6">
                    {chap.lessons && chap.lessons.map((lesson, lIdx) => (
                      <div key={lIdx}>
                        <h4 className="font-semibold text-blue-700 mb-3 px-2 border-l-4 border-blue-500">
                          {lesson.title}
                        </h4>

                        <div className="space-y-2 pl-2">
                          {lesson.topics && lesson.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group transition-colors border border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="text-gray-300">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{topic}</span>
                              </div>
                              <button
                                onClick={() => handleSelectLesson(topic)}
                                className="px-3 py-1 text-xs font-semibold bg-white border border-gray-200 rounded text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                Start
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    return (
      <RoleProgressHome
        onOpenTheory={() => {
          setActiveCategory('theory');
          handleSelectLesson('Hằng số cân bằng của phản ứng thuận nghịch');
        }}
        onOpenVideo={() => setActiveCategory('video')}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-slate-800">
      <div className="flex flex-1 pt-16">
        <Sidebar
          menuData={COURSE_DATA}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
          onSelectLesson={handleSelectLesson}
        />

        <main className="flex-1 md:ml-64 p-8 bg-[#f8f9fa] min-h-screen">
          <div className="text-sm text-gray-500 mb-8">
            <span onClick={goHome} className="cursor-pointer hover:text-blue-600">Home</span>

            {activeCategory === 'test-eval' && <span> &gt; Kiểm tra & Đánh giá</span>}

            {activeCategory && activeCategory !== 'periodic-table' && activeCategory !== 'test-eval' && (
              <span> &gt; <span className="capitalize">{COURSE_DATA.find(c => c.id === activeCategory)?.title}</span></span>
            )}
            {activeCategory === 'periodic-table' && <span> &gt; Bảng tuần hoàn</span>}

            {activeCategory && activeChapter && (
              <span> &gt; {COURSE_DATA.find(c => c.id === activeCategory)?.chapters?.find(ch => ch.id === activeChapter)?.title}</span>
            )}
          </div>

          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Progress;