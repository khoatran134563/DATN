import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PostEditor from './PostEditor';
import { useAuth } from '../../context/AuthContext';
import { API_BASE } from '../../config/api';
import './styles.css';

const ForumCreate = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (userRole && userRole !== 'teacher' && userRole !== 'admin') {
      navigate('/forum');
    }
  }, [userRole, navigate]);

  const uploadImageToCloudinary = async (imageFile) => {
    if (!imageFile) return '';

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('folder', 'chemlearn/forum');

    const response = await fetch(`${API_BASE}/api/upload/single`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Không thể upload ảnh bài viết.');
    }

    return data.file?.url || '';
  };

  const handlePublish = async (data) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('Bạn cần đăng nhập để đăng bài.');
        return;
      }

      let imageUrl = '';

      if (data.imageFile) {
        imageUrl = await uploadImageToCloudinary(data.imageFile);
      }

      const response = await fetch(`${API_BASE}/api/forum/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          category: data.category,
          summary: data.summary,
          content: data.content,
          image: imageUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || 'Không thể đăng bài forum.');
        return;
      }

      alert('Đăng bài forum thành công!');
      navigate(`/forum/post/${result.post.id}`);
    } catch (error) {
      console.error('PUBLISH FORUM POST ERROR =', error);
      setErrorMessage(error.message || 'Không thể kết nối đến server backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Bạn có chắc muốn hủy? Nội dung đã nhập sẽ bị mất.');

    if (confirmCancel) {
      navigate('/forum');
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden font-sans">
      <Header />

      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-4 pb-20 pt-6">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Soạn bài viết mới</h1>
              <p className="text-sm text-gray-500 mt-1">
                Chia sẻ kiến thức, thông báo hoặc giải đáp thắc mắc cho học sinh.
              </p>
            </div>

            <button
              onClick={() => navigate('/forum')}
              disabled={isSubmitting}
              className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-60"
            >
              Quay lại diễn đàn
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-lg px-4 py-3">
              {errorMessage}
            </div>
          )}

          <PostEditor
            onSubmit={handlePublish}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />

        </div>
      </div>
    </div>
  );
};

export default ForumCreate;