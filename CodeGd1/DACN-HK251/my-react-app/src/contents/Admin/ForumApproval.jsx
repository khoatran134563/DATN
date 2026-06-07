import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../../config/api';

const TABS = [
  { id: 'pending', label: 'Chờ duyệt' },
  { id: 'active', label: 'Đã duyệt' },
  { id: 'rejected', label: 'Từ chối' },
  { id: 'hidden', label: 'Đã ẩn' },
];

const STATUS_META = {
  pending: {
    label: 'Chờ duyệt',
    badge: 'bg-orange-100 text-orange-700 border-orange-200',
    empty: 'Không có bài viết nào đang chờ duyệt.',
  },
  active: {
    label: 'Đã duyệt',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    empty: 'Chưa có bài viết nào đang hiển thị.',
  },
  rejected: {
    label: 'Từ chối',
    badge: 'bg-red-100 text-red-700 border-red-200',
    empty: 'Chưa có bài viết nào bị từ chối.',
  },
  hidden: {
    label: 'Đã ẩn',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    empty: 'Chưa có bài viết nào bị ẩn.',
  },
};

const ForumApproval = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({
    pending: 0,
    active: 0,
    rejected: 0,
    hidden: 0,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const token = localStorage.getItem('token');

  const fetchPosts = async (status = activeTab) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/admin/posts?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách bài viết.');
      }

      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setCounts(data.counts || {
        pending: 0,
        active: 0,
        rejected: 0,
        hidden: 0,
      });
    } catch (error) {
      console.error('FETCH ADMIN FORUM POSTS ERROR =', error);
      alert(error.message || 'Lỗi tải danh sách bài viết.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const activeMeta = STATUS_META[activeTab];

  const contextText = useMemo(() => {
    if (activeTab === 'pending') {
      return {
        title: 'Danh sách bài viết cần duyệt',
        desc: 'Admin cần mở chi tiết, đọc nội dung rồi mới quyết định duyệt hoặc từ chối đăng.',
      };
    }

    if (activeTab === 'active') {
      return {
        title: 'Danh sách bài viết đang hiển thị',
        desc: 'Các bài viết này đang được hiển thị công khai trong Forum.',
      };
    }

    if (activeTab === 'rejected') {
      return {
        title: 'Danh sách bài viết đã từ chối',
        desc: 'Các bài viết này được lưu lại để theo dõi lịch sử kiểm duyệt.',
      };
    }

    return {
      title: 'Danh sách bài viết đã ẩn',
      desc: 'Các bài viết này từng được quản trị viên ẩn khỏi Forum công khai.',
    };
  }, [activeTab]);

  const handleOpenDetail = async (post) => {
    try {
      const response = await fetch(`${API_BASE}/api/forum/admin/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải chi tiết bài viết.');
      }

      setSelectedPost(data.post);
      setRejectReason(data.post?.rejectedReason || '');
    } catch (error) {
      console.error('FETCH ADMIN POST DETAIL ERROR =', error);
      alert(error.message || 'Lỗi tải chi tiết bài viết.');
    }
  };

  const handleApprove = async (postId) => {
    if (!postId) return;

    const confirmed = window.confirm('Duyệt đăng bài viết này?');
    if (!confirmed) return;

    setActionLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/admin/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Duyệt bài viết thất bại.');
      }

      alert('Đã duyệt bài viết thành công.');
      setSelectedPost(null);
      await fetchPosts(activeTab);
    } catch (error) {
      console.error('APPROVE POST ERROR =', error);
      alert(error.message || 'Lỗi duyệt bài viết.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (postId) => {
    if (!postId) return;

    const confirmed = window.confirm('Từ chối đăng bài viết này?');
    if (!confirmed) return;

    setActionLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/admin/posts/${postId}/reject`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: rejectReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Từ chối bài viết thất bại.');
      }

      alert('Đã từ chối bài viết.');
      setSelectedPost(null);
      setRejectReason('');
      await fetchPosts(activeTab);
    } catch (error) {
      console.error('REJECT POST ERROR =', error);
      alert(error.message || 'Lỗi từ chối bài viết.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleHide = async (postId) => {
    if (!postId) return;

    const confirmed = window.confirm('Ẩn bài viết này khỏi Forum công khai?');
    if (!confirmed) return;

    setActionLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/admin/posts/${postId}/hide`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: rejectReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ẩn bài viết thất bại.');
      }

      alert('Đã ẩn bài viết.');
      setSelectedPost(null);
      setRejectReason('');
      await fetchPosts(activeTab);
    } catch (error) {
      console.error('HIDE POST ERROR =', error);
      alert(error.message || 'Lỗi ẩn bài viết.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col bg-gray-50">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Forum</h2>
          <p className="text-gray-500 text-sm mt-1">
            Kiểm duyệt và quản lý các bài viết trong diễn đàn
          </p>
        </div>

        <button
          onClick={() => fetchPosts(activeTab)}
          disabled={loading}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-6 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'relative -mb-px pb-3 text-sm font-semibold transition',
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-800',
              ].join(' ')}
            >
              <span className="inline-flex items-center gap-2">
                {tab.label}
                <span
                  className={[
                    'inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 rounded-full text-xs font-bold',
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600',
                  ].join(' ')}
                >
                  {counts[tab.id] || 0}
                </span>
              </span>

              <span
                className={[
                  'absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition',
                  activeTab === tab.id ? 'bg-blue-600' : 'bg-transparent',
                ].join(' ')}
              />
            </button>
          ))}
        </div>

        <div className="text-right hidden lg:block">
          <div className="text-sm font-bold text-gray-800">{contextText.title}</div>
          <div className="text-xs text-gray-500 mt-1">{contextText.desc}</div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {posts.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {posts.map((post) => {
                  const meta = STATUS_META[post.status] || STATUS_META.pending;

                  return (
                    <div
                      key={post.id}
                      className="p-6 hover:bg-gray-50 transition flex flex-col xl:flex-row gap-4 xl:items-start"
                    >
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                          {post.avatar || post.author?.charAt(0) || 'U'}
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                          <span className="text-xs text-gray-400">{post.date}</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                            {post.title}
                          </h3>

                          <span className={`border text-xs font-bold px-2 py-1 rounded-full ${meta.badge}`}>
                            {meta.label}
                          </span>

                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                          {post.summary || post.excerpt || post.content}
                        </p>

                        {post.status === 'rejected' && post.rejectedReason && (
                          <p className="text-xs text-red-600 mt-2">
                            Lý do từ chối: {post.rejectedReason}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 xl:flex-col xl:w-36 shrink-0">
                        <button
                          onClick={() => handleOpenDetail(post)}
                          className="flex-1 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{activeMeta.empty}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => {
            if (!actionLoading) setSelectedPost(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4 bg-gray-50">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`border text-xs font-bold px-2 py-1 rounded-full ${STATUS_META[selectedPost.status]?.badge}`}>
                    {STATUS_META[selectedPost.status]?.label}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 leading-snug">
                  {selectedPost.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Tác giả: <span className="font-bold text-gray-700">{selectedPost.author}</span>
                  {' · '}
                  {selectedPost.fullDate}
                </p>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                disabled={actionLoading}
                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full max-h-[320px] object-cover rounded-xl border border-gray-100 mb-5"
                />
              )}

              {selectedPost.summary && (
                <div className="mb-5 rounded-xl bg-blue-50 border border-blue-100 p-4">
                  <p className="text-sm font-bold text-blue-800 mb-1">Tóm tắt</p>
                  <p className="text-sm text-blue-900 leading-6">{selectedPost.summary}</p>
                </div>
              )}

              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700 leading-8">
                  {selectedPost.content}
                </p>
              </div>

              {(selectedPost.status === 'pending' || selectedPost.status === 'active') && (
                <div className="mt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Lý do từ chối / lý do ẩn bài
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    rows="3"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Nhập lý do nếu admin quyết định từ chối hoặc ẩn bài..."
                  />
                </div>
              )}

              {selectedPost.status === 'rejected' && selectedPost.rejectedReason && (
                <div className="mt-6 rounded-xl bg-red-50 border border-red-100 p-4">
                  <p className="text-sm font-bold text-red-700 mb-1">Lý do từ chối</p>
                  <p className="text-sm text-red-700 leading-6">{selectedPost.rejectedReason}</p>
                </div>
              )}

              {selectedPost.status === 'hidden' && selectedPost.rejectedReason && (
                <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm font-bold text-slate-700 mb-1">Lý do ẩn bài</p>
                  <p className="text-sm text-slate-700 leading-6">{selectedPost.rejectedReason}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setSelectedPost(null)}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-50"
              >
                Đóng
              </button>

              {selectedPost.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReject(selectedPost.id)}
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 disabled:opacity-50"
                  >
                    {actionLoading ? 'Đang xử lý...' : 'Từ chối đăng'}
                  </button>

                  <button
                    onClick={() => handleApprove(selectedPost.id)}
                    disabled={actionLoading}
                    className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionLoading ? 'Đang xử lý...' : 'Duyệt đăng'}
                  </button>
                </>
              )}

              {selectedPost.status === 'active' && (
                <button
                  onClick={() => handleHide(selectedPost.id)}
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 disabled:opacity-50"
                >
                  {actionLoading ? 'Đang xử lý...' : 'Ẩn bài'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumApproval;