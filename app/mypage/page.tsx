"use client";

import { useState } from "react";
import MyPageSidebar from "@/components/mypage/MyPageSidebar";
import MyPageDashboard from "@/components/mypage/MyPageDashboard";
import MyPageProfile from "@/components/mypage/MyPageProfile";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* 좌측 사이드바 - 모바일에서는 상단에 위치 */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <MyPageSidebar />
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="flex-1">
            {/* 탭 네비게이션 */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${
                    activeTab === "dashboard"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  내 강의실
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${
                    activeTab === "profile"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  프로필
                </button>
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === "dashboard" ? <MyPageDashboard /> : <MyPageProfile />}
          </main>
        </div>
      </div>
    </div>
  );
}