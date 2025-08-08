import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">강의 관리 대시보드</h1>
        <p className="mt-1 text-sm text-gray-600">
          강의를 추가하고 관리할 수 있습니다.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">강의 관리</h3>
            <BookOpen className="h-6 w-6 text-gray-400" />
          </div>
          <p className="mb-4 text-sm text-gray-600">
            기존 강의를 조회하고 편집할 수 있습니다.
          </p>
          <Link
            href="/admin/dashboard/lectures"
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            강의 관리
          </Link>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">새 강의 추가</h3>
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <p className="mb-4 text-sm text-gray-600">
            새로운 강의를 추가하고 썸네일을 업로드할 수 있습니다.
          </p>
          <Link
            href="/admin/dashboard/lectures"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            강의 추가하기
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b p-6">
          <h3 className="text-lg font-semibold text-gray-900">시작하기</h3>
          <p className="mt-1 text-sm text-gray-600">
            강의 관리 시스템을 사용하여 강의를 효과적으로 관리하세요.
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">1. 새 강의 추가</p>
                <p className="text-sm text-gray-600">
                  강의 제목, 가격, 기간을 설정하고 썸네일 이미지를 업로드하세요.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">2. 이미지 자동 업로드</p>
                <p className="text-sm text-gray-600">
                  Supabase Storage에 자동으로 이미지가 업로드되어 관리됩니다.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 mt-1 h-2 w-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">3. 강의 목록 확인</p>
                <p className="text-sm text-gray-600">
                  업로드된 썸네일과 함께 강의 목록을 확인하고 관리하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}