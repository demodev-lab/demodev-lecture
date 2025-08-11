"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { curriculum } from "@/app/lecture/[id]/lectures";
import LecturesHero from "@/components/curriculum/LecturesHero";
import LecturesGrid from "@/components/curriculum/LecturesGrid";
import LecturesSidebar from "@/components/curriculum/LecturesSidebar";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// 카테고리 목록 정의
const categories = [
  { id: "all", label: "전체" },
  { id: "오리지널", label: "오리지널" },
  { id: "바이브 코딩", label: "바이브코딩" },
  { id: "앱/웹", label: "웹/앱" },
  { id: "자동화", label: "자동화" },
];

function LecturesContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  
  // 선택된 카테고리에 따라 제목 결정
  const getSectionTitle = () => {
    if (subcategory) {
      return subcategory;
    }
    if (category) {
      return category;
    }
    return "전체 강의";
  };

  return (
    <>
      {/* Mobile Category Pills - 베스트 페이지 스타일 */}
      <div className="lg:hidden mb-6 px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id || (cat.id === "all" && !selectedCategory);
            return (
              <Link
                key={cat.id}
                href={cat.id === "all" ? "/curriculum" : `/curriculum?category=${encodeURIComponent(cat.id)}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap
                  transition-all duration-200 border
                  ${
                    isSelected
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button - 숨김 처리 */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hidden lg:hidden fixed bottom-4 right-4 z-50 touch-target w-14 h-14 bg-brand-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-600 transition-colors focus-visible-ring"
        aria-label="카테고리 메뉴"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content with Sidebar */}
      <div className="flex flex-col lg:flex-row container-responsive">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 lg:w-64 flex-shrink-0
          transform transition-transform duration-300 lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <LecturesSidebar 
            selectedCategory={category} 
            selectedSubcategory={subcategory}
            onItemClick={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Section Title and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{getSectionTitle()}</h2>
            <div className="flex items-center">
              <select className="w-full sm:w-auto text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                <option>인기순</option>
                <option>최신순</option>
                <option>평점순</option>
                <option>가격순</option>
              </select>
            </div>
          </div>

          {/* Lecture Cards Grid */}
          <LecturesGrid lectures={curriculum} />
        </div>
      </div>
    </>
  );
}

export default function LecturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <LecturesHero />
      
      <Suspense fallback={
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading...</div>
        </div>
      }>
        <LecturesContent />
      </Suspense>
    </div>
  );
}