import React, { useMemo, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RoleProgressHome from '../components/progress/RoleProgressHome';
import { useAuth } from '../context/AuthContext';

import Video_Nitrogen_KhongDuyTriSuChay from '../contents/Video/Video_Nitrogen_KhongDuyTriSuChay.jsx';
import Video_Nitrogen_LongLamLanh from '../contents/Video/Video_Nitrogen_LongLamLanh.jsx';

import Video_H2SO4_LoangKimLoai from '../contents/Video/Video_H2SO4_LoangKimLoai.jsx';
import Video_H2SO4_DacTacDungVoiCopper from '../contents/Video/Video_H2SO4_DacTacDungVoiCopper.jsx';
import Video_H2SO4_DacTacDungVoiDuong from '../contents/Video/Video_H2SO4_DacTacDungVoiDuong.jsx';
import Video_NhanBietIonSulfate from '../contents/Video/Video_NhanBietIonSulfate.jsx';
import Video_Sulfur_TacDungVoiIron from '../contents/Video/Video_Sulfur_TacDungVoiIron.jsx';
import Video_Sulfur_ChayTrongOxygen from '../contents/Video/Video_Sulfur_ChayTrongOxygen.jsx';
import Video_SO2_MuaAcid from '../contents/Video/Video_SO2_MuaAcid.jsx';
import Video_NitrogenOxide_KhongKhi from '../contents/Video/Video_NitrogenOxide_KhongKhi.jsx';
import Video_MuaAcid from '../contents/Video/Video_MuaAcid.jsx';
import Video_PhuDuong from '../contents/Video/Video_PhuDuong.jsx';
import Video_Ammonia_TinhTanTrongNuoc from '../contents/Video/Video_Ammonia_TinhTanTrongNuoc.jsx';
import Video_Ammonia_TacDungVoiHCl from '../contents/Video/Video_Ammonia_TacDungVoiHCl.jsx';
import Video_Ammonium_NhanBietIon from '../contents/Video/Video_Ammonium_NhanBietIon.jsx';
import Video_Ammonium_PhanHuyNhiet from '../contents/Video/Video_Ammonium_PhanHuyNhiet.jsx';

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
import Lab3D_Phenol from '../contents/Lab3Dphenol/Lab3D_Phenol';

const COURSE_DATA = [
  {
    id: 'video',
    title: 'Video minh họa',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
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
              'Video: Ảnh hưởng của áp suất đến cân bằng',
            ],
          },
          {
            id: 'v_bai2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            topics: [
              'Video: Chất điện li mạnh, chất điện li yếu',
              'Video: Đo độ pH bằng chất chỉ thị Acid - Base',
              'Video: Chuẩn độ acid - base',
            ],
          },
        ],
      },
      {
        id: 'v_chap2',
        title: 'Chương 2: Nitrogen và Sulfur',
        lessons: [
          {
            id: 'v_bai3',
            title: 'Bài 3: Đơn chất nitrogen',
            topics: [
              'Video: Nitrogen không duy trì sự cháy',
              'Video: Nitrogen lỏng làm lạnh nhanh',
            ],
          },
          {
            id: 'v_bai4',
            title: 'Bài 4: Ammonia và một số hợp chất ammonium',
            topics: [
              'Video: Tính tan của ammonia trong nước',
              'Video: Ammonia tác dụng với hydrogen chloride',
              'Video: Nhận biết ion ammonium',
              'Video: Sự phân hủy nhiệt của muối ammonium',
            ],
          },
          {
            id: 'v_bai5',
            title: 'Bài 5: Một số hợp chất với oxygen của nitrogen',
            topics: [
              'Video: Sự tạo thành nitrogen oxide trong không khí',
              'Video: Hiện tượng mưa acid',
              'Video: Hiện tượng phú dưỡng',
            ],
          },
          {
            id: 'v_bai6',
            title: 'Bài 6: Sulfur và sulfur dioxide',
            topics: [
              'Video: Sulfur tác dụng với iron',
              'Video: Sulfur cháy trong oxygen',
              'Video: Sulfur dioxide và hiện tượng mưa acid',
            ],
          },
          {
            id: 'v_bai7',
            title: 'Bài 7: Sulfuric acid và muối sulfate',
            topics: [
              'Video: Sulfuric acid loãng tác dụng với kim loại',
              'Video: Sulfuric acid đặc tác dụng với copper',
              'Video: Sulfuric acid đặc tác dụng với đường',
              'Video: Nhận biết ion sulfate',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'exercise',
    title: 'Bài tập',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
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
              'Tự luận: Cân bằng hóa học',
            ],
          },
          {
            id: 'e_bai2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            topics: [
              'Trắc nghiệm: Cân bằng trong dung dịch nước (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Cân bằng trong dung dịch nước (Vận dụng - Vận dụng cao)',
            ],
          },
        ],
      },
      {
        id: 'e_chap2',
        title: 'Chương 2: Nitrogen và Sulfur',
        lessons: [
          {
            id: 'e_bai3',
            title: 'Bài 3: Đơn chất nitrogen',
            topics: [
              'Trắc nghiệm: Đơn chất nitrogen (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Đơn chất nitrogen (Vận dụng - Vận dụng cao)',
            ],
          },
          {
            id: 'e_bai4',
            title: 'Bài 4: Ammonia và một số hợp chất ammonium',
            topics: [
              'Trắc nghiệm: Ammonia và hợp chất ammonium (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Ammonia và hợp chất ammonium (Vận dụng - Vận dụng cao)',
            ],
          },
          {
            id: 'e_bai5',
            title: 'Bài 5: Một số hợp chất với oxygen của nitrogen',
            topics: [
              'Trắc nghiệm: Hợp chất oxygen của nitrogen (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Hợp chất oxygen của nitrogen (Vận dụng - Vận dụng cao)',
            ],
          },
          {
            id: 'e_bai6',
            title: 'Bài 6: Sulfur và sulfur dioxide',
            topics: [
              'Trắc nghiệm: Sulfur và sulfur dioxide (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Sulfur và sulfur dioxide (Vận dụng - Vận dụng cao)',
            ],
          },
          {
            id: 'e_bai7',
            title: 'Bài 7: Sulfuric acid và muối sulfate',
            topics: [
              'Trắc nghiệm: Sulfuric acid và muối sulfate (Nhận biết - Thông hiểu)',
              'Trắc nghiệm: Sulfuric acid và muối sulfate (Vận dụng - Vận dụng cao)',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'virtual-lab',
    title: 'Thí nghiệm 3D',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    chapters: [
      {
        id: 'lab_c1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'lab_no2',
            title: 'Mô phỏng 3D: Chuyển dịch cân bằng NO2',
            topics: ['Thực hành: Chuyển dịch cân bằng NO2'],
          },
          {
            id: 'lab_phenol',
            title: 'Mô phỏng 3D: Chỉ thị phenolphthalein',
            topics: ['Thực hành: Chỉ thị phenolphthalein'],
          },
        ],
      },
    ],
  },
];

const TRACKED_CATEGORY_IDS = ['video', 'exercise'];

const getTopicTitle = (topic) => topic?.title || topic;

const buildProgressTopics = (courseData) => {
  const topics = [];

  courseData
    .filter((category) => TRACKED_CATEGORY_IDS.includes(category.id))
    .forEach((category) => {
      category.chapters?.forEach((chapter) => {
        chapter.lessons?.forEach((lesson) => {
          lesson.topics?.forEach((topic, topicIndex) => {
            const title = getTopicTitle(topic);

            topics.push({
              id: `${category.id}__${chapter.id}__${lesson.id}__${topicIndex}`,
              title,
              categoryId: category.id,
              categoryTitle: category.title,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
            });
          });
        });
      });
    });

  return topics;
};

const createEmptyProgress = () => ({
  completed: {},
  lastOpenedId: null,
});

const Progress = () => {
  const { currentUser } = useAuth();

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const progressTopics = useMemo(() => buildProgressTopics(COURSE_DATA), []);

  const progressStorageKey = useMemo(() => {
    const userKey = currentUser?.id || currentUser?._id || currentUser?.email || 'guest';
    return `chemlearn_learning_progress_${userKey}`;
  }, [currentUser]);

  const [learningProgress, setLearningProgress] = useState(createEmptyProgress);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(progressStorageKey);
      setLearningProgress(saved ? JSON.parse(saved) : createEmptyProgress());
    } catch (error) {
      console.error('LOAD LEARNING PROGRESS ERROR =', error);
      setLearningProgress(createEmptyProgress());
    }
  }, [progressStorageKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLesson, activeCategory]);

  const saveLearningProgress = (nextProgress) => {
    setLearningProgress(nextProgress);
    localStorage.setItem(progressStorageKey, JSON.stringify(nextProgress));
  };

  const findProgressTopicByTitle = (title) => {
    return progressTopics.find((item) => item.title === title);
  };

  const findProgressTopicById = (id) => {
    return progressTopics.find((item) => item.id === id);
  };

  const getCurrentCategory = () => {
    return COURSE_DATA.find((category) => category.id === activeCategory);
  };

  const getCurrentChapter = () => {
    const currentCategory = getCurrentCategory();
    return currentCategory?.chapters?.find((chapter) => chapter.id === activeChapter);
  };

  const handleSelectLesson = (lessonData) => {
    const lessonName = lessonData?.title || lessonData;
    setSelectedLesson(lessonName);

    const topicMeta = findProgressTopicByTitle(lessonName);

    if (topicMeta) {
      saveLearningProgress({
        ...learningProgress,
        lastOpenedId: topicMeta.id,
      });
    }
  };

  const openProgressTopic = (topicMeta) => {
    if (!topicMeta) return;

    setActiveCategory(topicMeta.categoryId);
    setActiveChapter(topicMeta.chapterId);
    setSelectedLesson(topicMeta.title);

    saveLearningProgress({
      ...learningProgress,
      lastOpenedId: topicMeta.id,
    });
  };

  const toggleSelectedLessonCompleted = () => {
    const topicMeta = findProgressTopicByTitle(selectedLesson);
    if (!topicMeta) return;

    const isCompleted = Boolean(learningProgress.completed?.[topicMeta.id]);
    const nextCompleted = {
      ...(learningProgress.completed || {}),
    };

    if (isCompleted) {
      delete nextCompleted[topicMeta.id];
    } else {
      nextCompleted[topicMeta.id] = {
        completedAt: new Date().toISOString(),
        title: topicMeta.title,
      };
    }

    saveLearningProgress({
      ...learningProgress,
      completed: nextCompleted,
      lastOpenedId: topicMeta.id,
    });
  };

  const completedTopicCount = progressTopics.filter(
    (item) => learningProgress.completed?.[item.id]
  ).length;

  const totalTopicCount = progressTopics.length;
  const remainingTopicCount = Math.max(totalTopicCount - completedTopicCount, 0);
  const progressPercent = totalTopicCount
    ? Math.round((completedTopicCount / totalTopicCount) * 100)
    : 0;

  const lastOpenedTopic = findProgressTopicById(learningProgress.lastOpenedId);

  const continueItems = (() => {
    const items = [];

    if (lastOpenedTopic && !learningProgress.completed?.[lastOpenedTopic.id]) {
      items.push({
        ...lastOpenedTopic,
        isLastOpened: true,
      });
    }

    progressTopics.forEach((item) => {
      if (items.length >= 2) return;
      if (learningProgress.completed?.[item.id]) return;
      if (items.some((existing) => existing.id === item.id)) return;

      items.push({
        ...item,
        isLastOpened: false,
      });
    });

    return items;
  })();

  const progressSummary = {
    totalTopics: totalTopicCount,
    completedTopics: completedTopicCount,
    remainingTopics: remainingTopicCount,
    percent: progressPercent,
    continueItems,
  };

  const goHome = () => {
    setActiveCategory(null);
    setActiveChapter(null);
    setSelectedLesson(null);
  };

  const renderSelectedContent = () => {
    if (selectedLesson === 'Video: Phản ứng thuận nghịch') return <Video_PhanUngThuanNghich />;
    if (selectedLesson === 'Video: Ảnh hưởng của nhiệt độ đến cân bằng') return <Video_AnhHuongNhietDo />;
    if (selectedLesson === 'Video: Ảnh hưởng của nồng độ đến cân bằng') return <Video_AnhHuongNongDo />;
    if (selectedLesson === 'Video: Ảnh hưởng của áp suất đến cân bằng') return <Video_AnhHuongApSuat />;
    if (selectedLesson === 'Video: Chất điện li mạnh, chất điện li yếu') return <Video_DienLi />;
    if (selectedLesson === 'Video: Đo độ pH bằng chất chỉ thị Acid - Base') return <Video_DopH />;
    if (selectedLesson === 'Video: Chuẩn độ acid - base') return <Video_ChuanDo />;

    if (selectedLesson === 'Video: Nitrogen không duy trì sự cháy') {
      return <Video_Nitrogen_KhongDuyTriSuChay />;
    }

    if (selectedLesson === 'Video: Nitrogen lỏng làm lạnh nhanh') {
      return <Video_Nitrogen_LongLamLanh />;
    }

    if (selectedLesson === 'Video: Tính tan của ammonia trong nước') {
      return <Video_Ammonia_TinhTanTrongNuoc />;
    }

    if (selectedLesson === 'Video: Ammonia tác dụng với hydrogen chloride') {
      return <Video_Ammonia_TacDungVoiHCl />;
    }

    if (selectedLesson === 'Video: Nhận biết ion ammonium') {
      return <Video_Ammonium_NhanBietIon />;
    }

    if (selectedLesson === 'Video: Sự phân hủy nhiệt của muối ammonium') {
      return <Video_Ammonium_PhanHuyNhiet />;
    }

    if (selectedLesson === 'Video: Sự tạo thành nitrogen oxide trong không khí') {
      return <Video_NitrogenOxide_KhongKhi />;
    }

    if (selectedLesson === 'Video: Hiện tượng mưa acid') {
      return <Video_MuaAcid />;
    }

    if (selectedLesson === 'Video: Hiện tượng phú dưỡng') {
      return <Video_PhuDuong />;
    }

    if (selectedLesson === 'Video: Sulfur tác dụng với iron') {
      return <Video_Sulfur_TacDungVoiIron />;
    }

    if (selectedLesson === 'Video: Sulfur cháy trong oxygen') {
      return <Video_Sulfur_ChayTrongOxygen />;
    }

    if (selectedLesson === 'Video: Sulfur dioxide và hiện tượng mưa acid') {
      return <Video_SO2_MuaAcid />;
    }

    if (selectedLesson === 'Video: Sulfuric acid loãng tác dụng với kim loại') {
      return <Video_H2SO4_LoangKimLoai />;
    }

    if (selectedLesson === 'Video: Sulfuric acid đặc tác dụng với copper') {
      return <Video_H2SO4_DacTacDungVoiCopper />;
    }

    if (selectedLesson === 'Video: Sulfuric acid đặc tác dụng với đường') {
      return <Video_H2SO4_DacTacDungVoiDuong />;
    }

    if (selectedLesson === 'Video: Nhận biết ion sulfate') {
      return <Video_NhanBietIonSulfate />;
    }

    if (selectedLesson === 'Trắc nghiệm: Cân bằng hóa học (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Cân bằng hóa học (NB-TH)" quizId="cbhh_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Cân bằng hóa học (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Cân bằng hóa học (VD-VDC)" quizId="cbhh_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Cân bằng trong dung dịch nước (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Cân bằng trong dung dịch nước (NB - TH)" quizId="tddn_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Cân bằng trong dung dịch nước (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Cân bằng trong dung dịch nước (VD-VDC)" quizId="tddn_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Đơn chất nitrogen (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Đơn chất nitrogen (NB-TH)" quizId="nitro_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Đơn chất nitrogen (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Đơn chất nitrogen (VD-VDC)" quizId="nitro_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Ammonia và hợp chất ammonium (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Ammonia và hợp chất ammonium (NB-TH)" quizId="amonia_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Ammonia và hợp chất ammonium (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Ammonia và hợp chất ammonium (VD-VDC)" quizId="amonia_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Hợp chất oxygen của nitrogen (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Hợp chất oxygen của nitrogen (NB-TH)" quizId="oxynitro_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Hợp chất oxygen của nitrogen (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Hợp chất oxygen của nitrogen (VD-VDC)" quizId="oxynitro_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Sulfur và sulfur dioxide (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Sulfur và sulfur dioxide (NB-TH)" quizId="sulfur_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Sulfur và sulfur dioxide (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Sulfur và sulfur dioxide (VD-VDC)" quizId="sulfur_vdvdc" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Sulfuric acid và muối sulfate (Nhận biết - Thông hiểu)') {
      return <UniversalQuiz title="Trắc nghiệm: Sulfuric acid và muối sulfate (NB-TH)" quizId="h2so4_nbth" />;
    }

    if (selectedLesson === 'Trắc nghiệm: Sulfuric acid và muối sulfate (Vận dụng - Vận dụng cao)') {
      return <UniversalQuiz title="Trắc nghiệm: Sulfuric acid và muối sulfate (VD-VDC)" quizId="h2so4_vdvdc" />;
    }

    if (selectedLesson === 'Tự luận: Cân bằng hóa học') {
      return <UniversalEssay title="Tự luận: Cân bằng hóa học" quizId="essay_cbhh" />;
    }

    if (selectedLesson === 'Thực hành: Chuyển dịch cân bằng NO2') {
      return <Lab3D_NO2 />;
    }

    if (selectedLesson === 'Thực hành: Chỉ thị phenolphthalein') {
      return <Lab3D_Phenol />;
    }

    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Nội dung đang cập nhật...</h2>
        <p className="text-gray-500">
          Nội dung: <span className="font-semibold text-blue-500">"{selectedLesson}"</span> đang được biên soạn.
        </p>
      </div>
    );
  };

  const renderCompletionPanel = () => {
    const topicMeta = findProgressTopicByTitle(selectedLesson);
    if (!topicMeta) return null;

    const isCompleted = Boolean(learningProgress.completed?.[topicMeta.id]);

    return (
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
            Tiến độ nội dung
          </p>
          <p className="text-sm font-bold text-slate-700 mt-1">
            {isCompleted
              ? 'Bạn đã đánh dấu hoàn thành nội dung này.'
              : 'Bạn đang học nội dung này.'}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleSelectedLessonCompleted}
          className={`px-4 py-2 rounded-lg text-sm font-black transition ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : 'bg-blue-900 text-white hover:bg-blue-800'
          }`}
        >
          {isCompleted ? 'Đã hoàn thành ✓' : 'Đánh dấu hoàn thành'}
        </button>
      </div>
    );
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
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-4 text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>←</span> Quay lại danh sách
          </button>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
            {renderCompletionPanel()}
            {renderSelectedContent()}
          </div>
        </div>
      );
    }

    if (activeCategory) {
      const currentData = COURSE_DATA.find((category) => category.id === activeCategory);

      if (currentData) {
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                {currentData.icon} {currentData.title}
              </h2>

              {TRACKED_CATEGORY_IDS.includes(activeCategory) && (
                <span className="text-sm font-bold text-slate-500">
                  Learning Progress
                </span>
              )}
            </div>

            <div className="space-y-8">
              {currentData.chapters?.map((chap) => (
                <div
                  key={chap.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-800 text-lg">{chap.title}</h3>
                  </div>

                  <div className="p-4 space-y-6">
                    {chap.lessons?.map((lesson) => (
                      <div key={lesson.id}>
                        {activeCategory !== 'virtual-lab' && (
                          <h4 className="font-semibold text-blue-700 mb-3 px-2 border-l-4 border-blue-500">
                            {lesson.title}
                          </h4>
                        )}

                        <div className="space-y-2 pl-2">
                          {lesson.topics?.map((topic, tIdx) => {
                            const topicTitle = getTopicTitle(topic);
                            const topicMeta = findProgressTopicByTitle(topicTitle);
                            const isTracked = Boolean(topicMeta);
                            const isCompleted = topicMeta
                              ? Boolean(learningProgress.completed?.[topicMeta.id])
                              : false;

                            return (
                              <div
                                key={`${lesson.id}-${tIdx}`}
                                className={`flex items-center justify-between p-3 rounded-lg group transition-colors border ${
                                  isCompleted
                                    ? 'bg-emerald-50 border-emerald-100'
                                    : 'hover:bg-blue-50 border-gray-100'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={
                                      isCompleted
                                        ? 'text-emerald-500'
                                        : isTracked
                                          ? 'text-gray-300'
                                          : 'text-slate-300'
                                    }
                                  >
                                    {isCompleted ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    )}
                                  </div>

                                  <span
                                    className={`text-sm font-medium ${
                                      isCompleted ? 'text-emerald-700' : 'text-gray-700'
                                    }`}
                                  >
                                    {topicTitle}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleSelectLesson(topicTitle)}
                                  className={`px-3 py-1 text-xs font-semibold border rounded transition-colors ${
                                    isCompleted
                                      ? 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                                      : 'bg-white border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white'
                                  }`}
                                >
                                  {isCompleted ? 'Review' : 'Start'}
                                </button>
                              </div>
                            );
                          })}
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
        progressSummary={progressSummary}
        onOpenProgressTopic={openProgressTopic}
      />
    );
  };

  const currentCategory = getCurrentCategory();
  const currentChapter = getCurrentChapter();

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
            <span onClick={goHome} className="cursor-pointer hover:text-blue-600">
              Home
            </span>

            {activeCategory === 'test-eval' && (
              <span> &gt; Kiểm tra & Đánh giá</span>
            )}

            {activeCategory &&
              activeCategory !== 'periodic-table' &&
              activeCategory !== 'test-eval' && (
                <span>
                  {' '}
                  &gt; <span className="capitalize">{currentCategory?.title}</span>
                </span>
              )}

            {activeCategory === 'periodic-table' && (
              <span> &gt; Bảng tuần hoàn</span>
            )}

            {activeCategory && activeChapter && currentChapter && (
              <span> &gt; {currentChapter.title}</span>
            )}
          </div>

          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Progress;