import React, { useEffect, useState } from 'react';
import { CATEGORIES } from './data';

const PostEditor = ({ onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    content: '',
    imageFile: null,
    imagePreview: '',
    imageName: '',
  });

  const [imageError, setImageError] = useState('');

  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Vui lòng chọn đúng file hình ảnh.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Ảnh bìa không nên vượt quá 5MB.');
      e.target.value = '';
      return;
    }

    if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
      imageName: file.name,
    }));

    setImageError('');
    e.target.value = '';
  };

  const removeImage = () => {
    if (formData.imagePreview && formData.imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: '',
      imageName: '',
    }));

    setImageError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert('Vui lòng chọn chuyên mục bài viết.');
      return;
    }

    if (!formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết.');
      return;
    }

    if (!formData.content.trim()) {
      alert('Vui lòng nhập nội dung chi tiết.');
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      category: formData.category,
      summary: formData.summary.trim(),
      content: formData.content.trim(),
      imageFile: formData.imageFile,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

      <div className="p-6 border-b border-gray-100">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
          1. Chọn chuyên mục bài viết <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className={`cursor-pointer border rounded-lg p-3 text-sm font-medium text-center transition-all
                ${
                  formData.category === cat.name
                    ? 'ring-2 ring-blue-500 border-transparent bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              <input
                type="radio"
                name="category"
                value={cat.name}
                checked={formData.category === cat.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="hidden"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            2. Tiêu đề bài viết <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Ví dụ: Phương pháp cân bằng phản ứng oxi hóa khử..."
            className="w-full text-lg font-bold text-gray-900 border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 placeholder-gray-300 transition-colors disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            3. Mô tả ngắn (Sapo)
          </label>

          <textarea
            name="summary"
            rows="2"
            value={formData.summary}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Đoạn mở đầu ngắn gọn để thu hút học sinh..."
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none disabled:opacity-70"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            4. Nội dung chi tiết <span className="text-red-500">*</span>
          </label>

          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 text-xs font-bold text-gray-600">
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded">B</button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded italic">I</button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded underline">U</button>
              <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded">H1</button>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded">H2</button>
              <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>
              <button type="button" className="p-1.5 hover:bg-gray-200 rounded">List</button>
            </div>

            <textarea
              name="content"
              required
              rows="12"
              value={formData.content}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full p-4 text-gray-800 text-base leading-relaxed focus:outline-none resize-y min-h-[300px] disabled:bg-gray-50"
              placeholder="Nhập nội dung bài giảng, kiến thức hoặc thông báo tại đây..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
            5. Ảnh bìa (Tùy chọn)
          </label>

          <div className="flex flex-col gap-3">
            {formData.imagePreview && (
              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={formData.imagePreview}
                  alt="Ảnh bìa bài viết"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  disabled={isSubmitting}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-bold rounded-lg"
                >
                  Xóa ảnh
                </button>
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors border border-gray-300">
                Chọn tệp ảnh
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>

              <span className="text-sm text-gray-500 italic">
                {formData.imageName ? `Đã chọn: ${formData.imageName}` : 'Chưa có ảnh nào được chọn'}
              </span>
            </div>

            {imageError && (
              <p className="text-xs text-red-500 font-bold">{imageError}</p>
            )}
          </div>
        </div>

      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-60"
        >
          Hủy bỏ
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang đăng bài...' : 'Đăng bài viết'}
        </button>
      </div>

    </form>
  );
};

export default PostEditor;