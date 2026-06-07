import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import InteractivePdfPage from './InteractivePdfPage';
import { HOTSPOTS } from './hotspotData';
import './styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_URL =
  import.meta.env.VITE_TEXTBOOK_PDF_URL || '/textbooks/hoa-11-chuong-1.pdf';

const TABLE_OF_CONTENTS = [
  { id: 'cover', title: 'Bìa sách', page: 1 },
  { id: 'guide', title: 'Hướng dẫn sử dụng sách', page: 4 },
  { id: 'preface', title: 'Lời nói đầu', page: 5 },
  { id: 'toc', title: 'Mục lục', page: 6 },

  { id: 'lesson-1', title: 'Bài 1. Khái niệm về cân bằng hóa học', page: 7 },
  { id: 'lesson-2', title: 'Bài 2. Cân bằng trong dung dịch nước', page: 14 },
  { id: 'lesson-3', title: 'Bài 3. Đơn chất nitrogen', page: 22 },
  { id: 'lesson-4', title: 'Bài 4. Ammonia và một số hợp chất ammonium', page: 26 },
  { id: 'lesson-5', title: 'Bài 5. Một số hợp chất với oxygen của nitrogen', page: 32 },
  { id: 'lesson-6', title: 'Bài 6. Sulfur và sulfur dioxide', page: 37 },
  { id: 'lesson-7', title: 'Bài 7. Sulfuric acid và muối sulfate', page: 42 },

  { id: 'lesson-8', title: 'Bài 8. Hợp chất hữu cơ và hóa học hữu cơ', page: 48 },
  { id: 'lesson-9', title: 'Bài 9. Phương pháp tách và tinh chế hợp chất hữu cơ', page: 54 },
  { id: 'lesson-10', title: 'Bài 10. Công thức phân tử hợp chất hữu cơ', page: 59 },
  { id: 'lesson-11', title: 'Bài 11. Cấu tạo hóa học hợp chất hữu cơ', page: 63 },

  { id: 'lesson-12', title: 'Bài 12. Alkane', page: 68 },
  { id: 'lesson-13', title: 'Bài 13. Hydrocarbon không no', page: 76 },
  { id: 'lesson-14', title: 'Bài 14. Arene', page: 87 },

  { id: 'lesson-15', title: 'Bài 15. Dẫn xuất halogen', page: 94 },
  { id: 'lesson-16', title: 'Bài 16. Alcohol', page: 101 },
  { id: 'lesson-17', title: 'Bài 17. Phenol', page: 110 },

  { id: 'lesson-18', title: 'Bài 18. Hợp chất carbonyl', page: 117 },
  { id: 'lesson-19', title: 'Bài 19. Carboxylic acid', page: 126 },

  { id: 'glossary', title: 'Giải thích thuật ngữ', page: 135 },
];

const TextbookViewer = () => {
  const navigate = useNavigate();
  const pageRefs = useRef({});
  const pageShellRefs = useRef({});
  const readerViewportRef = useRef(null);

  const [numPages, setNumPages] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [pageWidth, setPageWidth] = useState(640);
  const [loadError, setLoadError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renderedPages, setRenderedPages] = useState(new Set([1]));

  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [quizChecked, setQuizChecked] = useState(false);
  const [showNoteHint, setShowNoteHint] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState({});
  const [practiceQuestions, setPracticeQuestions] = useState([]);

  const zoomPercent = Math.round((pageWidth / 940) * 100);

  const hotspotsByPage = useMemo(() => {
    return HOTSPOTS.reduce((acc, hotspot) => {
      if (!acc[hotspot.page]) {
        acc[hotspot.page] = [];
      }

      acc[hotspot.page].push(hotspot);
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    setSelectedOptionId('');
    setQuizChecked(false);
    setShowNoteHint(false);
    setPracticeAnswers({});

    if (selectedHotspot?.action?.type === 'practiceSet') {
      setPracticeQuestions(selectedHotspot.action.questions || []);
    } else {
      setPracticeQuestions([]);
    }
  }, [selectedHotspot]);

  useEffect(() => {
  if (!numPages || !readerViewportRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      setRenderedPages((prev) => {
        const next = new Set(prev);

        entries.forEach((entry) => {
          const pageNumber = Number(entry.target.dataset.pageNumber);

          if (entry.isIntersecting) {
            next.add(pageNumber);

            if (pageNumber > 1) next.add(pageNumber - 1);
            if (pageNumber < numPages) next.add(pageNumber + 1);
          }
        });

        return next;
      });
    },
    {
      root: readerViewportRef.current,
      rootMargin: '900px 0px',
      threshold: 0.01,
    }
  );

  Object.values(pageShellRefs.current).forEach((element) => {
    if (element) observer.observe(element);
  });

  return () => observer.disconnect();
}, [numPages]);


  const handleDocumentLoadSuccess = (pdf) => {
    setLoadError('');
    setNumPages(pdf.numPages || 0);
  };

  const shufflePracticeQuestions = () => {
    setPracticeAnswers({});

    setPracticeQuestions((prev) => {
      const copied = [...prev];

      for (let i = copied.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copied[i], copied[j]] = [copied[j], copied[i]];
      }

      return copied;
    });
  };

  const handleDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setLoadError(error?.message || 'Không thể tải file PDF.');
  };

  const handlePageLoadError = (error) => {
    console.error('PDF page render error:', error);
    setLoadError(error?.message || 'Không thể hiển thị trang PDF.');
  };

  const scrollToPage = (pageNumber) => {
    const pageElement = pageRefs.current[pageNumber];

    if (pageElement) {
      pageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setCurrentPage(pageNumber);
      setPageInput(String(pageNumber));
    }
  };

  const handleHotspotClick = (hotspot) => {
    if (hotspot.action.type === 'scroll') {
      scrollToPage(hotspot.action.page);
      return;
    }

    if (hotspot.action.type === 'route') {
      navigate(hotspot.action.url);
      return;
    }

    setSelectedHotspot(hotspot);
  };

  const closeModal = () => {
    setSelectedHotspot(null);
  };

  const handleZoomOut = () => {
    setPageWidth((prev) => Math.max(480, prev - 80));
  };

  const handleZoomIn = () => {
    setPageWidth((prev) => Math.min(1050, prev + 80));
  };

  const handleFitWidth = () => {
    const viewport = readerViewportRef.current;

    if (!viewport) {
      setPageWidth(700);
      return;
    }

    const availableWidth = viewport.clientWidth - 72;
    const nextWidth = Math.max(520, Math.min(920, availableWidth));

    setPageWidth(nextWidth);
  };

  const handlePageInputSubmit = (e) => {
    e.preventDefault();

    const nextPage = Number(pageInput);

    if (!Number.isInteger(nextPage) || nextPage < 1 || nextPage > numPages) {
      setPageInput(String(currentPage));
      return;
    }

    scrollToPage(nextPage);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = 'hoa-11-chan-troi-sang-tao.pdf';
    link.click();
  };

  const handlePrint = () => {
    window.open(PDF_URL, '_blank');
  };

  const handleBackToKnowledge = () => {
    navigate('/progress');
  };

  const handleQuizOptionClick = (optionId) => {
    setSelectedOptionId(optionId);
    setQuizChecked(true);
  };

  const getModalSizeClass = () => {
    if (!selectedHotspot?.action) return 'max-w-xl';

    const size = selectedHotspot.action.modalSize;

    if (size === 'sm') return 'max-w-lg';
    if (size === 'md') return 'max-w-xl';
    if (size === 'lg') return 'max-w-3xl';
    if (size === 'xl') return 'max-w-4xl';

    if (selectedHotspot.action.type === 'video') return 'max-w-3xl';
    if (selectedHotspot.action.type === 'lab3d') return 'max-w-4xl';
    if (selectedHotspot.action.type === 'quiz') return 'max-w-xl';

    return 'max-w-xl';
  };

  const renderQuizBlock = () => {
    const action = selectedHotspot?.action;
    if (!action) return null;

    const isCorrect = quizChecked && selectedOptionId === action.correctOptionId;

    return (
      <div className="space-y-4">
        <div>
          <p className="text-gray-800 text-base leading-7 font-medium">
            {action.prompt}
          </p>

          {action.equations && action.equations.length > 0 && (
            <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="space-y-1.5 text-sm text-slate-700">
                {action.equations.map((eq, index) => (
                  <p key={index} className="leading-6 font-medium">
                    {eq}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {action.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isAnswer = action.correctOptionId === option.id;

            let optionClass =
              'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700';

            if (quizChecked && isAnswer) {
              optionClass =
                'border-emerald-400 bg-emerald-50 text-emerald-700';
            } else if (quizChecked && isSelected && !isAnswer) {
              optionClass = 'border-red-400 bg-red-50 text-red-700';
            } else if (isSelected) {
              optionClass = 'border-blue-400 bg-blue-50 text-blue-700';
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleQuizOptionClick(option.id)}
                className={`w-full text-left rounded-xl border px-4 py-3 transition ${optionClass}`}
              >
                <span className="text-sm font-bold">{option.text}</span>
              </button>
            );
          })}
        </div>

        {quizChecked && (
          <div
            className={`rounded-xl border p-3 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p
              className={`text-sm font-black mb-2 ${
                isCorrect ? 'text-emerald-700' : 'text-red-700'
              }`}
            >
              {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
            </p>

            <p className="text-sm text-slate-700 leading-6 whitespace-pre-line">
              {action.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  const handlePracticeAnswer = (questionId, optionId) => {
    setPracticeAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const renderPracticeSetBlock = () => {
    const action = selectedHotspot?.action;
    if (!action?.questions) return null;

    return (
      <div className="space-y-5">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={shufflePracticeQuestions}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-bold shadow-sm transition active:scale-95"
          >
            Xáo trộn câu hỏi
          </button>
        </div>

        {practiceQuestions.map((question, index) => {
          const selectedId = practiceAnswers[question.id];
          const isChecked = Boolean(selectedId);
          const isCorrect = selectedId === question.correctOptionId;

          return (
            <div
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3">
                <p className="text-sm font-black text-slate-500 mb-1">
                  Câu {index + 1}
                </p>
                <p className="text-base font-bold text-slate-800 leading-7 whitespace-pre-line">
                  {question.prompt}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((option) => {
                  const isSelected = selectedId === option.id;
                  const isAnswer = question.correctOptionId === option.id;

                  let optionClass =
                    'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700';

                  if (isChecked && isAnswer) {
                    optionClass =
                      'border-emerald-400 bg-emerald-50 text-emerald-700';
                  } else if (isChecked && isSelected && !isAnswer) {
                    optionClass = 'border-red-400 bg-red-50 text-red-700';
                  } else if (isSelected) {
                    optionClass = 'border-blue-400 bg-blue-50 text-blue-700';
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handlePracticeAnswer(question.id, option.id)}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition ${optionClass}`}
                    >
                      <span className="text-sm font-bold">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {isChecked && (
                <div
                  className={`mt-3 rounded-xl border p-3 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <p
                    className={`text-sm font-black mb-2 ${
                      isCorrect ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                  </p>

                  <p className="text-sm text-slate-700 leading-6 whitespace-pre-line">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const isVideoModal = selectedHotspot?.action?.type === 'video';
  const isLab3DModal = selectedHotspot?.action?.type === 'lab3d';
  const isDarkModal = isVideoModal || isLab3DModal;

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />

      <div className="pt-[72px] h-screen flex flex-col">
        {loadError && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-sm text-red-600 font-bold text-center">
            Lỗi PDF: {loadError}
          </div>
        )}

        <div className="flex-1 min-h-0 flex overflow-hidden relative">
          {!sidebarOpen && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="textbook-sidebar-toggle-floating"
              title="Hiện mục lục"
            >
              ☰
            </button>
          )}

          {sidebarOpen && (
            <aside className="hidden lg:flex w-[320px] bg-white border-r border-slate-200 flex-col">
              <div className="px-5 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    Mục lục sách
                  </h2>

                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="textbook-sidebar-toggle-inline"
                    title="Ẩn mục lục"
                  >
                    ☰
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBackToKnowledge}
                  className="textbook-back-to-knowledge"
                >
                  <span aria-hidden="true">←</span>
                  <span>Quay lại Kiến thức</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {TABLE_OF_CONTENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToPage(item.page)}
                    className={`w-full text-left rounded-lg px-4 py-3 transition border ${
                      currentPage === item.page
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-transparent text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <span className="text-sm font-bold leading-snug">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </aside>
          )}

          <main
            ref={readerViewportRef}
            className="flex-1 min-w-0 overflow-auto textbook-reader-bg px-6 py-3 pr-24"
          >
            <Document
              file={PDF_URL}
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={handleDocumentLoadError}
              loading={
                <div className="text-center py-20 text-slate-500 font-bold">
                  Đang tải sách giáo khoa online...
                </div>
              }
              error={
                <div className="text-center py-20 text-red-500 font-bold">
                  Không thể tải file PDF. Kiểm tra lại đường dẫn public/textbooks/hoa-11-chuong-1.pdf.
                </div>
              }
            >
              {numPages > 0 ? (
                  Array.from({ length: numPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const shouldRenderPage = renderedPages.has(pageNumber);
                    const estimatedPageHeight = Math.round(pageWidth * 1.42);

                    return (
                      <div
                        key={pageNumber}
                        ref={(element) => {
                          pageRefs.current[pageNumber] = element;
                          pageShellRefs.current[pageNumber] = element;
                        }}
                        data-page-number={pageNumber}
                        className="scroll-mt-3"
                        style={{
                          minHeight: shouldRenderPage ? undefined : estimatedPageHeight,
                        }}
                      >
                        {shouldRenderPage ? (
                          <InteractivePdfPage
                            pageNumber={pageNumber}
                            width={pageWidth}
                            hotspots={hotspotsByPage[pageNumber] || []}
                            onHotspotClick={handleHotspotClick}
                            debugMode={false}
                            onPageLoadError={handlePageLoadError}
                          />
                        ) : (
                          <div
                            className="mx-auto mb-4 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 text-sm font-bold shadow-sm"
                            style={{
                              width: pageWidth,
                              height: estimatedPageHeight,
                            }}
                          >
                            Đang chờ tải trang {pageNumber}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                <div className="text-center py-20 text-slate-500 font-bold">
                  Đang chuẩn bị hiển thị trang PDF...
                </div>
              )}
            </Document>
          </main>

          <div className="textbook-floating-controls">
            <form
              onSubmit={handlePageInputSubmit}
              className="textbook-page-control"
            >
              <input
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                className="textbook-page-input"
                title="Nhập số trang"
              />
              <span className="textbook-page-total">
                / {numPages || '...'}
              </span>
            </form>

            <button
              type="button"
              onClick={handleZoomIn}
              className="textbook-floating-button"
              title="Phóng to"
            >
              +
            </button>

            <div className="textbook-zoom-badge">{zoomPercent}%</div>

            <button
              type="button"
              onClick={handleZoomOut}
              className="textbook-floating-button"
              title="Thu nhỏ"
            >
              −
            </button>

            <button
              type="button"
              onClick={handleFitWidth}
              className="textbook-floating-button textbook-fit-button"
              title="Vừa chiều rộng"
            >
              Fit
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="textbook-floating-button"
              title="Tải PDF"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="textbook-floating-button"
              title="Mở để in"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9V3h12v6" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <path d="M6 14h12v7H6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedHotspot && (
        <div
          className={`fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-4 pt-16 pb-8 ${
            isDarkModal ? 'bg-black/75' : 'bg-black/45'
          }`}
        >
          <div
            className={`w-full ${getModalSizeClass()} max-h-[calc(100vh-48px)] overflow-hidden shadow-2xl flex flex-col ${
              isDarkModal
                ? 'rounded-2xl bg-slate-950 border border-white/10'
                : 'rounded-2xl bg-white'
            }`}
          >
            <div
              className={`px-5 py-4 border-b flex items-center justify-between ${
                isDarkModal
                  ? 'border-white/10 bg-slate-950 text-white'
                  : 'border-gray-200 bg-white text-gray-900'
              }`}
            >
              <h2
                className={`text-lg font-bold ${
                  isDarkModal ? 'text-white' : 'text-gray-900'
                }`}
              >
                {selectedHotspot.action.title || selectedHotspot.label}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className={`text-2xl leading-none transition ${
                  isVideoModal
                    ? 'text-white/60 hover:text-white'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                ×
              </button>
            </div>

            <div
              className={
                isDarkModal
                  ? 'p-4 bg-slate-950 overflow-y-auto'
                  : 'p-5 bg-white overflow-y-auto'
              }
            >
              {selectedHotspot.action.type === 'video' && (
                <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <iframe
                    src={selectedHotspot.action.url}
                    title={selectedHotspot.action.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedHotspot.action.type === 'image' && (
                <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={selectedHotspot.action.url}
                    alt={selectedHotspot.action.title || selectedHotspot.label}
                    className="w-full max-h-[70vh] object-contain bg-white"
                  />

                  {selectedHotspot.action.caption && (
                    <div className="px-4 py-3 bg-white border-t border-slate-200">
                      <p className="text-sm text-slate-600 leading-6">
                        {selectedHotspot.action.caption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedHotspot.action.type === 'lab3d' && (
                <div className="h-[58vh] min-h-[420px] rounded-xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
                  <iframe
                    src={selectedHotspot.action.url}
                    title={selectedHotspot.action.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedHotspot.action.type === 'note' && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                    <p className="text-gray-800 leading-7 text-base font-medium whitespace-pre-line">
                      {selectedHotspot.action.content}
                    </p>
                  </div>

                  {selectedHotspot.action.hint && (
                    <div>
                      {!showNoteHint ? (
                        <button
                          type="button"
                          onClick={() => setShowNoteHint(true)}
                          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition active:scale-95"
                        >
                          Xem gợi ý
                        </button>
                      ) : (
                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                          <p className="text-sm font-black text-amber-700 mb-2">
                            💡 Gợi ý
                          </p>
                          <p className="text-sm text-slate-700 leading-6 whitespace-pre-line">
                            {selectedHotspot.action.hint}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {selectedHotspot.action.type === 'quiz' && renderQuizBlock()}
              {selectedHotspot.action.type === 'practiceSet' &&
                renderPracticeSetBlock()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TextbookViewer;