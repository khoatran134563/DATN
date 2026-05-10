import React, { useState } from 'react';
import { CATEGORIES } from './data';

const PostEditor = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '', // Sapo/Mô tả ngắn
    content: '', // Nội dung chính
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    // Demo hiển thị tên file
    if (e.target.files[0]) {
        setFormData(prev => ({ ...prev, image: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* 1. Chọn Danh mục */}
      <div className="p-6 border-b border-gray-100">
        <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            1. Chọn chuyên mục bài viết
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
                <label 
                    key={cat.id} 
                    className={`cursor-pointer border rounded-lg p-3 text-sm font-medium text-center transition-all
                        ${formData.category === cat.name 
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
                        className="hidden" 
                    />
                    {cat.name}
                </label>
            ))}
        </div>
      </div>

      {/* 2. Nhập nội dung chính */}
      <div className="p-6 space-y-6">
        
        {/* Tiêu đề */}
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
                placeholder="Ví dụ: Phương pháp cân bằng phản ứng oxi hóa khử..."
                className="w-full text-lg font-bold text-gray-900 border-b-2 border-gray-200 py-2 focus:outline-none focus:border-blue-600 placeholder-gray-300 transition-colors"
            />
        </div>

        {/* Tóm tắt (Sapo) */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                3. Mô tả ngắn (Sapo)
            </label>
            <textarea 
                name="summary"
                rows="2"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Đoạn mở đầu ngắn gọn để thu hút học sinh..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
            ></textarea>
        </div>

        {/* Nội dung chi tiết */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                4. Nội dung chi tiết <span className="text-red-500">*</span>
            </label>
            {/* Giả lập Editor khung soạn thảo */}
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                {/* Toolbar giả */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 text-xs font-bold text-gray-600">
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">B</button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded italic">I</button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded underline">U</button>
                    <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">H1</button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">H2</button>
                    <div className="w-px h-4 bg-gray-300 mx-1 self-center"></div>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">List</button>
                    <button type="button" className="p-1.5 hover:bg-gray-200 rounded">Image</button>
                </div>
                
                <textarea 
                    name="content"
                    required
                    rows="12"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-4 text-gray-800 text-base leading-relaxed focus:outline-none resize-y min-h-[300px]"
                    placeholder="Nhập nội dung bài giảng, kiến thức hoặc thông báo tại đây..."
                ></textarea>
            </div>
        </div>

        {/* Ảnh bìa */}
        <div>
             <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                5. Ảnh bìa (Tùy chọn)
            </label>
            <div className="flex items-center gap-4">
                <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors border border-gray-300">
                    Chọn tệp ảnh
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <span className="text-sm text-gray-500 italic">
                    {formData.image ? `Đã chọn: ${formData.image}` : 'Chưa có ảnh nào được chọn'}
                </span>
            </div>
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
        >
            Hủy bỏ
        </button>
        <button 
            type="submit"
            className="px-8 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
        >
            Đăng bài viết
        </button>
      </div>

    </form>
  );
};

export default PostEditor;