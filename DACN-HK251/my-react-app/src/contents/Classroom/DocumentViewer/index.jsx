import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { renderAsync } from 'docx-preview';
import Header from '../../../components/Header';

const DocumentViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { fileUrl, title, fileType, postedDate } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [docxError, setDocxError] = useState('');

  useEffect(() => {
    if (fileType === 'DOCX' && fileUrl && containerRef.current) {
      setLoading(true);
      setDocxError('');

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          return renderAsync(blob, containerRef.current, containerRef.current, {
            className: 'docx-viewer',
            inWrapper: false,
            ignoreWidth: false,
          });
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error('Lỗi đọc file Word:', err);
          setDocxError('Không thể hiển thị tài liệu DOCX này trên trình duyệt.');
          setLoading(false);
        });
    }
  }, [fileUrl, fileType]);

  if (!fileUrl) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 flex-col gap-4">
        <p className="text-gray-500">Không tìm thấy tài liệu hoặc đường dẫn bị lỗi.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const isPdf = fileType === 'PDF';
  const isDocx = fileType === 'DOCX';
  const isDoc = fileType === 'DOC';
  const isUnsupportedOffice = isDoc || (!isPdf && !isDocx);

  return (
    <div className="flex h-screen flex-col bg-gray-100 overflow-hidden font-sans">
      <Header />

      <div className="flex-1 flex pt-16 h-full">
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0 z-10 shadow-lg">
          <div className="p-5 border-b border-gray-100">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm mb-4 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>

            <h2 className="text-lg font-bold text-gray-800 leading-snug break-words">
              {title}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Đăng ngày: {postedDate}</p>

            <div className="mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-gray-200 bg-gray-50 text-gray-600">
              Loại file: {fileType || 'Không xác định'}
            </div>
          </div>

          <div className="p-4 mt-auto border-t border-gray-200">
            <a
              href={fileUrl}
              download={title}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v10m0 0l-4-4m4 4l4-4M6 20h12"
                />
              </svg>
              Tải xuống
            </a>
          </div>
        </div>

        <div className="flex-1 bg-gray-200 p-4 sm:p-8 overflow-hidden flex items-center justify-center">
          <div className="bg-white shadow-xl rounded-xl w-full h-full max-w-5xl overflow-hidden border border-gray-300 relative flex flex-col">
            {isPdf && (
              <iframe src={fileUrl} className="w-full h-full" title="PDF Viewer"></iframe>
            )}

            {isDocx && (
              <div className="w-full h-full overflow-y-auto bg-white p-8 custom-scrollbar relative">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-500 font-medium">Đang xử lý tài liệu...</span>
                  </div>
                )}

                {docxError ? (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="max-w-md text-center">
                      <div className="text-5xl mb-4">📄</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Không thể xem trước file DOCX
                      </h3>
                      <p className="text-gray-500 mb-6">{docxError}</p>
                      <a
                        href={fileUrl}
                        download={title}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                      >
                        Tải xuống tài liệu
                      </a>
                    </div>
                  </div>
                ) : (
                  <div ref={containerRef} className="docx-content min-h-full"></div>
                )}
              </div>
            )}

            {isUnsupportedOffice && (
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 p-8">
                <div className="max-w-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl shadow-sm">
                    {isDoc ? '📝' : '📁'}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Không hỗ trợ xem trực tiếp
                  </h3>

                  <p className="text-gray-500 leading-7 mb-6">
                    {isDoc
                      ? 'Tệp .doc là định dạng Word cũ nên trình duyệt không thể hiển thị trực tiếp. Bạn hãy tải file xuống để mở bằng Microsoft Word hoặc chuyển sang PDF / DOCX.'
                      : 'Định dạng tài liệu này hiện chưa hỗ trợ xem trực tiếp trên trình duyệt. Bạn hãy tải file xuống để mở bằng ứng dụng phù hợp.'}
                  </p>

                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                      href={fileUrl}
                      download={title}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 4v10m0 0l-4-4m4 4l4-4M6 20h12"
                        />
                      </svg>
                      Tải xuống tài liệu
                    </a>

                    <button
                      onClick={() => navigate(-1)}
                      className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-lg border border-gray-300 transition"
                    >
                      Quay lại
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;