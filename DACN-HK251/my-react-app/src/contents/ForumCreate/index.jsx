import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import PostEditor from './PostEditor';
import { useAuth } from '../../context/AuthContext';
import './styles.css';

const ForumCreate = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  // Bảo vệ route: Nếu không phải Teacher thì đá về Forum chính
  React.useEffect(() => {
    if (userRole !== 'teacher') {
      navigate('/forum');
    }
  }, [userRole, navigate]);

  const handlePublish = (data) => {
    // LOGIC: Sau này sẽ gọi API lưu vào Database ở đây
    console.log("Dữ liệu bài viết mới:", data);
    
    // Giả lập loading rồi chuyển trang
    alert("Đăng bài thành công! (Demo)");
    navigate('/forum');
  };

  const handleCancel = () => {
    const confirm = window.confirm("Bạn có chắc muốn hủy? Nội dung đã nhập sẽ bị mất.");
    if (confirm) {
        navigate('/forum');
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden font-sans">
      <Header />
      
      <div className="flex-1 pt-20 h-full overflow-y-auto custom-scrollbar">
        {/* Container giới hạn độ rộng để tập trung viết bài (khoảng 900px) */}
        <div className="max-w-4xl mx-auto px-4 pb-20 pt-6">
          
          {/* Header Page */}
          <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Soạn bài viết mới</h1>
                <p className="text-sm text-gray-500 mt-1">Chia sẻ kiến thức, thông báo hoặc giải đáp thắc mắc cho học sinh.</p>
            </div>
            
            <button 
                onClick={() => navigate('/forum')}
                className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
            >
                Quay lại diễn đàn
            </button>
          </div>

          {/* Form Editor */}
          <PostEditor onSubmit={handlePublish} onCancel={handleCancel} />

        </div>
      </div>
    </div>
  );
};

export default ForumCreate;