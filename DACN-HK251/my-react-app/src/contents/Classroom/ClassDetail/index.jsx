import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ClassSidebar from './ClassSidebar';
import NewsFeed from './NewsFeed';
import Classwork from './Classwork';
import People from './People';
import { API_BASE } from '../../../config/api';

const ClassDetail = () => {
  const { id } = useParams();
  const { userRole } = useAuth();
  const location = useLocation();

  const isTeacher = userRole === 'teacher';

  const [activeTab, setActiveTab] = useState('stream');

  const [classInfo, setClassInfo] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);

  const [posts, setPosts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  const reloadAssignments = async () => {
    try {
      if (!token || !id) return;

      const response = await fetch(`${API_BASE}/api/classrooms/${id}/assignments`, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || 'Không thể tải lại danh sách bài tập.');
        return;
      }

      setAssignments(data.assignments || []);
    } catch (error) {
      console.error('RELOAD ASSIGNMENTS ERROR =', error);
    }
  };

  const reloadMaterials = async () => {
    try {
      if (!token || !id) return;

      const response = await fetch(`${API_BASE}/api/classrooms/${id}/materials`, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || 'Không thể tải lại danh sách tài liệu.');
        return;
      }

      setMaterials(data.materials || []);
    } catch (error) {
      console.error('RELOAD MATERIALS ERROR =', error);
    }
  };

  const reloadAnnouncements = async () => {
    try {
      if (!token || !id) return;

      const response = await fetch(`${API_BASE}/api/classrooms/${id}/announcements`, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || 'Không thể tải lại thông báo lớp học.');
        return;
      }

      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('RELOAD ANNOUNCEMENTS ERROR =', error);
    }
  };

  const fetchClassData = async () => {
    try {
      setIsLoading(true);
      setPageError('');

      if (!token) {
        setPageError('Bạn chưa đăng nhập.');
        return;
      }

      const headers = getAuthHeaders();

      const requests = [
        fetch(`${API_BASE}/api/classrooms/${id}`, { headers }),
        fetch(`${API_BASE}/api/classrooms/${id}/members`, { headers }),
        fetch(`${API_BASE}/api/classrooms/${id}/posts`, { headers }),
        fetch(`${API_BASE}/api/classrooms/${id}/materials`, { headers }),
        fetch(`${API_BASE}/api/classrooms/${id}/assignments`, { headers }),
        fetch(`${API_BASE}/api/classrooms/${id}/announcements`, { headers }),
      ];

      if (isTeacher) {
        requests.push(fetch(`${API_BASE}/api/classrooms/${id}/pending-members`, { headers }));
      }

      const responses = await Promise.all(requests);
      const jsons = await Promise.all(responses.map((response) => response.json()));

      const [
        classRes,
        membersRes,
        postsRes,
        materialsRes,
        assignmentsRes,
        announcementsRes,
      ] = responses;

      const [
        classData,
        membersData,
        postsData,
        materialsData,
        assignmentsData,
        announcementsData,
      ] = jsons;

      if (!classRes.ok) {
        setPageError(classData.message || 'Không thể tải thông tin lớp.');
        return;
      }

      if (!membersRes.ok) {
        setPageError(membersData.message || 'Không thể tải danh sách thành viên.');
        return;
      }

      if (!postsRes.ok) {
        setPageError(postsData.message || 'Không thể tải bảng tin lớp.');
        return;
      }

      if (!materialsRes.ok) {
        setPageError(materialsData.message || 'Không thể tải danh sách tài liệu.');
        return;
      }

      if (!assignmentsRes.ok) {
        setPageError(assignmentsData.message || 'Không thể tải danh sách bài tập.');
        return;
      }

      if (!announcementsRes.ok) {
        setPageError(announcementsData.message || 'Không thể tải thông báo lớp học.');
        return;
      }

      setClassInfo(classData.classInfo || null);
      setTeacher(membersData.teacher || null);
      setStudents(membersData.students || []);
      setPosts(postsData.posts || []);
      setMaterials(materialsData.materials || []);
      setAssignments(assignmentsData.assignments || []);
      setAnnouncements(announcementsData.announcements || []);

      if (isTeacher) {
        const pendingRes = responses[6];
        const pendingData = jsons[6];

        if (pendingRes?.ok) {
          setPendingStudents(pendingData.pendingStudents || []);
        } else {
          setPendingStudents([]);
        }
      } else {
        setPendingStudents([]);
      }
    } catch (error) {
      console.error('FETCH CLASS DATA ERROR =', error);
      setPageError('Không thể kết nối tới server backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token && id) {
      fetchClassData();
    } else {
      setIsLoading(false);
      setPageError('Bạn chưa đăng nhập.');
    }
  }, [id, token, isTeacher]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f7f9fc] overflow-hidden">
        <div className="flex pt-16 h-full w-full items-center justify-center text-gray-400">
          Đang tải dữ liệu lớp học...
        </div>
      </div>
    );
  }

  if (pageError || !classInfo) {
    return (
      <div className="flex h-screen bg-[#f7f9fc] overflow-hidden">
        <div className="flex pt-16 h-full w-full items-center justify-center px-6">
          <div className="bg-red-50 border border-red-200 text-red-500 px-6 py-4 rounded-xl font-medium">
            {pageError || 'Không tìm thấy lớp học.'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f7f9fc] overflow-hidden">
      <div className="flex pt-16 h-full w-full">
        <ClassSidebar
          classData={classInfo}
          teacher={teacher}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'stream' && 'Bảng tin lớp học'}
                {activeTab === 'people' && 'Danh sách thành viên'}
                {activeTab === 'classwork' && 'Bài tập'}
                {activeTab === 'documents' && 'Tài liệu'}
              </h2>
            </div>

            <div className="animate-fade-in pb-20">
              {activeTab === 'stream' && (
                <NewsFeed
                  classId={id}
                  classInfo={classInfo}
                  isTeacher={isTeacher}
                  posts={posts}
                  announcements={announcements}
                  assignments={assignments}
                  onReloadPosts={fetchClassData}
                  onReloadAnnouncements={reloadAnnouncements}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'classwork' && (
                <Classwork
                  classroomId={id}
                  assignments={assignments}
                  isTeacher={isTeacher}
                  onReloadAssignments={reloadAssignments}
                />
              )}

              {activeTab === 'documents' && (
                <Classwork
                  classroomId={id}
                  assignments={materials}
                  isTeacher={isTeacher}
                  isDocumentView={true}
                  onReloadDocuments={reloadMaterials}
                />
              )}

              {activeTab === 'people' && (
                <People
                  classId={id}
                  teacher={teacher}
                  students={students}
                  pendingStudents={pendingStudents}
                  isTeacher={isTeacher}
                  onReloadMembers={fetchClassData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;