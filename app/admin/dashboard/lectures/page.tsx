"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import AddLectureModal from "@/components/admin/lectures/AddLectureModal";
import EditLectureModal from "@/components/admin/lectures/EditLectureModal";
import { lectureStore } from "@/utils/lectureStore";

interface Lecture {
  id: string;
  title: string;
  category: string;
  level: string;
  students: number;
  status: "active" | "draft" | "archived";
  updatedAt: string;
  thumbnailUrl?: string;
  image?: string;
}

export default function LecturesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: "demo-1",
      title: "AI 프롬프트 엔지니어링 실전",
      category: "바이브 코딩",
      level: "초급",
      students: 128,
      status: "active",
      updatedAt: "2025-01-08",
    },
  ]);
  const [loading] = useState(false);

  // 스토어 변경 감지
  useEffect(() => {
    const updateLectureList = () => {
      const storeLectures = lectureStore.getLectures();
      const adminLectures = storeLectures.map(lecture => ({
        id: lecture.id.toString(),
        title: lecture.title,
        category: lecture.category,
        level: "초급" as const,
        students: lecture.enrolledStudents || 0,
        status: "active" as const,
        updatedAt: lecture.lastUpdated,
      }));
      
      // 기존 데모 데이터와 스토어 데이터 합치기
      setLectures(prev => {
        const demoLectures = prev.filter(l => l.id === "demo-1");
        return [...adminLectures, ...demoLectures];
      });
    };

    // React hydration 완료 후 실행
    let mounted = true;
    
    const loadData = () => {
      if (mounted) {
        updateLectureList();
      }
    };

    // 즉시 실행
    loadData();
    
    // 추가 지연 로드 (hydration 대응)
    const timer = setTimeout(loadData, 300);
    
    const unsubscribe = lectureStore.subscribe(() => {
      if (mounted) {
        updateLectureList();
      }
    });
    
    return () => {
      mounted = false;
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const filteredLectures = lectures.filter((lecture) => {
    const matchesSearch = lecture.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || lecture.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Lecture["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      archived: "bg-gray-100 text-gray-700",
    };
    const labels = {
      active: "활성",
      draft: "초안",
      archived: "보관됨",
    };

    return (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const handleAddLecture = (lectureData: {
    title: string;
    price: string;
    duration: string;
    startDate: string;
    endDate: string;
    category: string;
    subcategory: string;
    thumbnail: File | null;
    thumbnailPreview: string;
    thumbnailUrl: string;
    video: File | null;
    videoPreview: string;
    videoUrl: string;
  }) => {
    // 강의 스토어에 추가 (스토어 변경으로 자동으로 UI 업데이트됨)
    lectureStore.addLecture({
      title: lectureData.title,
      price: lectureData.price,
      duration: lectureData.duration,
      startDate: lectureData.startDate,
      endDate: lectureData.endDate,
      category: lectureData.category,
      subcategory: lectureData.subcategory,
      thumbnailUrl: lectureData.thumbnailUrl,
      videoUrl: lectureData.videoUrl,
    });

    alert(`강의가 성공적으로 추가되었습니다!\n카테고리: ${lectureData.category} > ${lectureData.subcategory}`);
  };

  const handleEditLecture = (lectureData: {
    id?: string;
    title: string;
    price: string;
    duration: string;
    category: string;
    subcategory: string;
    thumbnailUrl: string;
    videoUrl: string;
  }) => {
    if (!lectureData.id) return;

    const lectureId = parseInt(lectureData.id);
    const success = lectureStore.updateLecture(lectureId, {
      title: lectureData.title,
      price: lectureData.price,
      duration: lectureData.duration,
      category: lectureData.category,
      subcategory: lectureData.subcategory,
      thumbnailUrl: lectureData.thumbnailUrl,
      videoUrl: lectureData.videoUrl,
    });

    if (success) {
      alert("강의가 성공적으로 수정되었습니다!");
    } else {
      alert("강의 수정에 실패했습니다.");
    }
  };

  const handleDeleteLecture = (id: string) => {
    if (!window.confirm("정말로 이 강의를 삭제하시겠습니까?")) {
      return;
    }

    // 데모 데이터는 삭제 불가
    if (id === "demo-1") {
      alert("데모 데이터는 삭제할 수 없습니다.");
      return;
    }

    const lectureId = parseInt(id);
    const success = lectureStore.deleteLecture(lectureId);

    if (success) {
      alert("강의가 삭제되었습니다.");
    } else {
      alert("강의 삭제에 실패했습니다.");
    }
  };

  const handleEditClick = (lecture: Lecture) => {
    // 데모 데이터는 수정 불가
    if (lecture.id === "demo-1") {
      alert("데모 데이터는 수정할 수 없습니다.");
      return;
    }

    setSelectedLecture(lecture);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">강의 관리</h1>
        <p className="mt-1 text-sm text-gray-600">
          전체 강의를 관리하고 편집할 수 있습니다.
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="강의 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="draft">초안</option>
            <option value="archived">보관됨</option>
          </select>
        </div>

        {/* Add New Button */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          새 강의 추가
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                썸네일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                강의명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                난이도
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                수강생
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                수정일
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                  강의 목록을 불러오는 중...
                </td>
              </tr>
            ) : filteredLectures.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-500">
                  표시할 강의가 없습니다.
                </td>
              </tr>
            ) : (
              filteredLectures.map((lecture) => (
              <tr key={lecture.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-16 w-24">
                    {(lecture.thumbnailUrl?.startsWith('blob:') || lecture.thumbnailUrl?.startsWith('data:') || lecture.image?.startsWith('blob:') || lecture.image?.startsWith('data:')) ? (
                      <Image
                        src={lecture.thumbnailUrl || lecture.image || '/placeholder.jpg'}
                        alt={lecture.title}
                        width={96}
                        height={64}
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">없음</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {lecture.title}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{lecture.category}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">{lecture.level}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {lecture.students.toLocaleString()}명
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {getStatusBadge(lecture.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {lecture.updatedAt}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEditClick(lecture)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteLecture(lecture.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{filteredLectures.length}</span>개의
          강의
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            이전
          </button>
          <button className="rounded-lg bg-black px-3 py-1 text-sm text-white">
            1
          </button>
          <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            2
          </button>
          <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            3
          </button>
          <button className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>

      {/* Add Lecture Modal */}
      <AddLectureModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLecture}
      />

      {/* Edit Lecture Modal */}
      <EditLectureModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedLecture(null);
        }}
        onSubmit={handleEditLecture}
        lectureData={selectedLecture || undefined}
      />
    </div>
  );
}