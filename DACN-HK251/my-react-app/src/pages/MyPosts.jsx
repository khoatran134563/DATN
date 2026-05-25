import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../config/api';

const TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ duyệt' },
  { id: 'active', label: 'Đã đăng' },
  { id: 'rejected', label: 'Bị từ chối' },
  { id: 'hidden', label: 'Bị ẩn' },
];

const STATUS_META = {
  pending: {
    label: 'Chờ duyệt',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    desc: 'Bài viết đang chờ quản trị viên kiểm duyệt.',
  },
  active: {
    label: 'Đã đăng',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    desc: 'Bài viết đang được hiển thị công khai trong forum.',
  },
  rejected: {
    label: 'Bị từ chối',
    badge: 'bg-red-100 text-red-700 border-red-200',
    dot: 'bg-red-500',
    desc: 'Bài viết chưa đạt yêu cầu đăng tải.',
  },
  hidden: {
    label: 'Bị ẩn',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-500',
    desc: 'Bài viết đã bị ẩn khỏi forum công khai.',
  },
};

const MyPosts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    active: 0,
    rejected: 0,
    hidden: 0,
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchPosts = async (status = activeTab) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/my-posts?status=${status}`, {
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
        all: 0,
        pending: 0,
        active: 0,
        rejected: 0,
        hidden: 0,
      });
    } catch (error) {
      console.error('FETCH MY POSTS ERROR =', error);
      alert(error.message || 'Lỗi tải danh sách bài viết.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const summary = useMemo(() => {
    return [
      {
        label: 'Tổng bài đã gửi',
        value: counts.all || 0,
        color: 'text-blue-700',
        bg: 'bg-blue-50',
      },
      {
        label: 'Đang chờ duyệt',
        value: counts.pending || 0,
        color: 'text-amber-700',
        bg: 'bg-amber-50',
      },
      {
        label: 'Đã đăng công khai',
        value: counts.active || 0,
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
      },
      {
        label: 'Cần xem lại',
        value: (counts.rejected || 0) + (counts.hidden || 0),
        color: 'text-red-700',
        bg: 'bg-red-50',
      },
    ];
  }, [counts]);

  const handleOpenDetail = async (postId) => {
    setDetailLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/forum/my-posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải chi tiết bài viết.');
      }

      setSelectedPost(data.post);
    } catch (error) {
      console.error('FETCH MY POST DETAIL ERROR =', error);
      alert(error.message || 'Lỗi tải chi tiết bài viết.');
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm text-slate-500 mb-3">
              <Link to="/forum" className="hover:text-blue-600">
                Forum
              </Link>
              <span> &gt; Trạng thái bài đăng</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900">
              Trạng thái bài đăng
            </h1>
            <p className="text-slate-500 mt-2">
              Theo dõi tất cả bài viết bạn đã gửi: chờ duyệt, đã đăng, bị từ chối hoặc bị ẩn.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/forum/create"
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              + Đăng bài mới
            </Link>

            <button
              onClick={() => fetchPosts(activeTab)}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? 'Đang tải...' : 'Làm mới'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {summary.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">{item.label}</p>
              <div className={`mt-3 inline-flex min-w-14 items-center justify-center rounded-xl px-3 py-2 text-3xl font-black ${item.bg} ${item.color}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 pt-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'relative pb-4 text-sm font-bold transition',
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-800',
                  ].join(' ')}
                >
                  <span className="inline-flex items-center gap-2">
                    {tab.label}
                    <span
                      className={[
                        'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs',
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-500',
                      ].join(' ')}
                    >
                      {counts[tab.id] || 0}
                    </span>
                  </span>

                  <span
                    className={[
                      'absolute left-0 right-0 bottom-0 h-[2px] rounded-full',
                      activeTab === tab.id ? 'bg-blue-600' : 'bg-transparent',
                    ].join(' ')}
                  />
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
          ) : posts.length === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center text-slate-400">
              <div className="text-5xl mb-3">📝</div>
              <p className="font-semibold">Chưa có bài viết nào ở mục này.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {posts.map((post) => {
                const meta = STATUS_META[post.status] || STATUS_META.pending;

                return (
                  <div
                    key={post.id}
                    className="p-6 hover:bg-slate-50 transition flex flex-col lg:flex-row gap-4 lg:items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-xs font-bold ${meta.badge}`}>
                          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                          {meta.label}
                        </span>

                        <span className="bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 text-xs font-bold">
                          {post.category}
                        </span>

                        <span className="text-xs text-slate-400">
                          {post.fullDate || post.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 line-clamp-1">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                        {post.summary || post.excerpt || post.content}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        {meta.desc}
                      </p>

                      {(post.status === 'rejected' || post.status === 'hidden') && post.rejectedReason && (
                        <div className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                          <span className="font-bold">
                            {post.status === 'rejected' ? 'Lý do từ chối: ' : 'Lý do ẩn bài: '}
                          </span>
                          {post.rejectedReason}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 lg:flex-col lg:w-36 shrink-0">
                      <button
                        onClick={() => handleOpenDetail(post.id)}
                        disabled={detailLoading}
                        className="flex-1 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 disabled:opacity-60"
                      >
                        Xem chi tiết
                      </button>

                      {post.status === 'active' && (
                        <Link
                          to={`/forum/post/${post.id}`}
                          className="flex-1 text-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                        >
                          Xem forum
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`border text-xs font-bold px-2 py-1 rounded-full ${STATUS_META[selectedPost.status]?.badge}`}>
                    {STATUS_META[selectedPost.status]?.label}
                  </span>

                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
                    {selectedPost.category}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-snug">
                  {selectedPost.title}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {selectedPost.fullDate || selectedPost.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
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
                  className="w-full max-h-[320px] object-cover rounded-xl border border-slate-100 mb-5"
                />
              )}

              {selectedPost.summary && (
                <div className="mb-5 rounded-xl bg-blue-50 border border-blue-100 p-4">
                  <p className="text-sm font-bold text-blue-800 mb-1">Tóm tắt</p>
                  <p className="text-sm text-blue-900 leading-6">
                    {selectedPost.summary}
                  </p>
                </div>
              )}

              <div className="text-slate-700 leading-8 whitespace-pre-line">
                {selectedPost.content}
              </div>

              {(selectedPost.status === 'rejected' || selectedPost.status === 'hidden') && selectedPost.rejectedReason && (
                <div className="mt-6 rounded-xl bg-red-50 border border-red-100 p-4">
                  <p className="text-sm font-bold text-red-700 mb-1">
                    {selectedPost.status === 'rejected' ? 'Lý do từ chối' : 'Lý do ẩn bài'}
                  </p>
                  <p className="text-sm text-red-700 leading-6">
                    {selectedPost.rejectedReason}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold hover:bg-slate-50"
              >
                Đóng
              </button>

              {selectedPost.status === 'active' && (
                <Link
                  to={`/forum/post/${selectedPost.id}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                  onClick={() => setSelectedPost(null)}
                >
                  Mở trong forum
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;