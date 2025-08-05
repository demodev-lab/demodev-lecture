"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MyPageSidebar from "@/components/mypage/MyPageSidebar";
import MyPageDashboard from "@/components/mypage/MyPageDashboard";
import MyPageProfile from "@/components/mypage/MyPageProfile";
import PurchaseHistory from "@/components/mypage/PurchaseHistory";

function MyPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"dashboard" | "profile" | "purchase">("dashboard");
  
  useEffect(() => {
    if (tabParam === "purchase" || tabParam === "profile" || tabParam === "dashboard") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
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
              id={`${activeTab}-panel`}
              aria-labelledby={`${activeTab}-tab`}
            >
              {activeTab === "dashboard" && <MyPageDashboard />}
              {activeTab === "profile" && <MyPageProfile />}
              {activeTab === "purchase" && <PurchaseHistory />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <MyPageContent />
    </Suspense>
  );
}