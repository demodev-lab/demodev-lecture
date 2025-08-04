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
            <MyPageSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="flex-1">
            {/* 탭 컨텐츠 */}
            <div
              role="tabpanel"
              id={activeTab === "dashboard" ? "dashboard-panel" : "profile-panel"}
              aria-labelledby={activeTab === "dashboard" ? "dashboard-tab" : "profile-tab"}
            >
              {activeTab === "dashboard" ? <MyPageDashboard /> : <MyPageProfile />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}