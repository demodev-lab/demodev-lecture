"use client";

import { useState } from "react";
import MyPageSidebar from "@/components/mypage/MyPageSidebar";
import MyPageDashboard from "@/components/mypage/MyPageDashboard";
import MyPageProfile from "@/components/mypage/MyPageProfile";
import { User, LayoutGrid } from "lucide-react";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile">("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "내 강의실",
      icon: <LayoutGrid className="w-4 h-4 mr-2" />,
    },
    {
      id: "profile",
      label: "프로필",
      icon: <User className="w-4 h-4 mr-2" />,
    },
  ];

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
            <div className="mb-6" role="tablist">
              <div className="flex gap-2 px-4 pt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    onClick={() => setActiveTab(tab.id as "dashboard" | "profile")}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-150
                      ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 shadow border border-blue-200"
                          : "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                    style={{ minWidth: 110 }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

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