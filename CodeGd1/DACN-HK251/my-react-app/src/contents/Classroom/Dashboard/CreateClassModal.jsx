import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../../config/api';

const CreateClassModal = ({ isOpen, onClose, onCreate }) => {
  const [className, setClassName] = useState('');
  const [requiresApproval, setRequiresApproval] = useState(false);

  const [coverImage, setCoverImage] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [imageError, setImageError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setClassName('');
      setRequiresApproval(false);
      setCoverImage('');
      setCoverImageFile(null);
      setImageError('');
      setIsSubmitting(false);
      setIsUploadingImage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (coverImage && coverImage.startsWith('blob:')) {
        URL.revokeObjectURL(coverImage);
      }
    };
  }, [coverImage]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Vui lòng chọn đúng file hình ảnh.');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError('Ảnh bìa không nên vượt quá 2MB.');
      e.target.value = '';
      return;
    }

    if (coverImage && coverImage.startsWith('blob:')) {
      URL.revokeObjectURL(coverImage);
    }

    const previewUrl = URL.createObjectURL(file);

    setCoverImageFile(file);
    setCoverImage(previewUrl);
    setImageError('');
    e.target.value = '';
  };

  const uploadCoverImageToCloudinary = async () => {
    if (!coverImageFile) return '';

    const formData = new FormData();
    formData.append('file', coverImageFile);
    formData.append('folder', 'chemlearn/classrooms');

    const response = await fetch(`${API_BASE}/api/upload/single`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Không thể upload ảnh bìa lên Cloudinary.');
    }

    return data.file?.url || '';
  };

  const handleSubmit = async () => {
    if (!className.trim() || isSubmitting || isUploadingImage) return;

    try {
      setIsSubmitting(true);
      setImageError('');

      let uploadedCoverUrl = '';

      if (coverImageFile) {
        setIsUploadingImage(true);
        uploadedCoverUrl = await uploadCoverImageToCloudinary();
        setIsUploadingImage(false);
      }

      await onCreate({
        name: className.trim(),
        cover: uploadedCoverUrl,
        thumbnail: uploadedCoverUrl,
        requiresApproval,
      });

      onClose();
    } catch (error) {
      console.error('CREATE CLASS MODAL ERROR =', error);
      setImageError(error.message || 'Không thể tạo lớp học. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
      setIsUploadingImage(false);
    }
  };

  const isValid = className.trim().length > 0;
  const isButtonDisabled = !isValid || isSubmitting || isUploadingImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-gray-900/60 backdrop-blur-sm p-4 pt-24 animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col mb-10 relative">
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 shrink-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Tạo lớp học mới</h2>

          <button
            onClick={onClose}
            disabled={isSubmitting || isUploadingImage}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Tên lớp học <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  placeholder="Ví dụ: Lớp thầy Ngọc 2025..."
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  disabled={isSubmitting || isUploadingImage}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Ảnh bìa</label>

                <div className="relative w-full h-40 border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-center hover:bg-blue-100 transition cursor-pointer overflow-hidden group">
                  {coverImage ? (
                    <>
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />

                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-bold">Nhấn để thay đổi ảnh</span>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>

                      <p className="text-blue-600 font-bold mb-0.5">Thêm ảnh bìa</p>
                      <p className="text-xs text-gray-500">Khuyến nghị dưới 2MB</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    onChange={handleImageUpload}
                    disabled={isSubmitting || isUploadingImage}
                  />
                </div>

                {imageError && (
                  <p className="text-xs text-red-500 font-medium mt-2">
                    {imageError}
                  </p>
                )}

                {isUploadingImage && (
                  <p className="text-xs text-blue-600 font-bold mt-2">
                    Đang upload ảnh bìa lên Cloudinary...
                  </p>
                )}
              </div>

              <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-800 mb-0.5">
                    Phê duyệt học sinh
                  </label>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Kiểm soát người lạ vào lớp học.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={requiresApproval}
                    onChange={(e) => setRequiresApproval(e.target.checked)}
                    disabled={isSubmitting || isUploadingImage}
                  />

                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-full">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Các bước thực hiện</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        className.trim() ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {className.trim() && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${className.trim() ? 'text-gray-900' : 'text-gray-500'}`}>
                        Đặt tên lớp học
                      </p>

                      {!className.trim() && (
                        <span className="text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                          Bắt buộc - Thêm ngay
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        coverImage ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {coverImage && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${coverImage ? 'text-gray-900' : 'text-gray-500'}`}>
                        Thêm ảnh bìa lớp học
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        requiresApproval ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}
                    >
                      {requiresApproval && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <p className={`text-sm font-medium ${requiresApproval ? 'text-gray-900' : 'text-gray-500'}`}>
                        Bật phê duyệt cho học sinh
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 italic">
                    (*) Bạn phải nhập đầy đủ các trường bắt buộc để tạo lớp
                  </p>

                  <button
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                      !isButtonDisabled
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isUploadingImage
                      ? 'Đang upload ảnh...'
                      : isSubmitting
                        ? 'Đang tạo lớp...'
                        : 'Tạo lớp'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateClassModal;