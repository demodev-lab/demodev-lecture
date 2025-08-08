"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import AddLectureModal from "@/components/admin/lectures/AddLectureModal";

interface Lecture {
  id: string;
  title: string;
  category: string;
  level: string;
  students: number;
  status: "active" | "draft" | "archived";
  updatedAt: string;
}

const mockLectures: Lecture[] = [
  {
    id: "1",
    title: "React 기초부터 실전까지",
    category: "Frontend",
    level: "초급",
    students: 1234,
    status: "active",
    updatedAt: "2025-01-10",
  },
  {
    id: "2",
    title: "Next.js 14 마스터 클래스",
    category: "Frontend",
    level: "중급",
    students: 856,
    status: "active",
    updatedAt: "2025-01-09",
  },
  {
    id: "3",
    title: "TypeScript 완벽 가이드",
    category: "Programming",
    level: "중급",
    students: 945,
    status: "draft",
    updatedAt: "2025-01-08",
  },
  {
    id: "4",
    title: "Node.js 백엔드 개발",
    category: "Backend",
    level: "중급",
    students: 678,
    status: "active",
    updatedAt: "2025-01-07",
  },
  {
    id: "5",
    title: "Python 데이터 분석",
    category: "Data Science",
    level: "초급",
    students: 0,
    status: "archived",
    updatedAt: "2025-01-06",
  },
];

export default function LecturesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredLectures = mockLectures.filter((lecture) => {
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
    thumbnail: File | null;
    thumbnailPreview: string;
  }) => {
    // 실제 API 호출로 대체 예정
    console.log("새 강의 추가:", lectureData);
    alert("강의가 성공적으로 추가되었습니다!");
    // 실제로는 강의 목록을 새로고침하거나 상태를 업데이트
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
            {filteredLectures.map((lecture) => (
              <tr key={lecture.id} className="hover:bg-gray-50">
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
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
    </div>
  );
}