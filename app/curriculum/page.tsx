"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { curriculum } from "@/app/lecture/[id]/lectures";
import LecturesHero from "@/components/curriculum/LecturesHero";
import LecturesGrid from "@/components/curriculum/LecturesGrid";
import LecturesSidebar from "@/components/curriculum/LecturesSidebar";

function LecturesContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  
  // 선택된 카테고리에 따라 제목 결정
  const getSectionTitle = () => {
    if (subcategory) {
      return subcategory;
    }
    if (category) {
      return category;
    }
    return "오리지널";
  };
  return (
    <>
      {/* Main Content with Sidebar */}
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <LecturesSidebar selectedCategory={category} selectedSubcategory={subcategory} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-6">
          {/* Section Title and Filter */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{getSectionTitle()}</h2>
            <div className="flex items-center space-x-4">
              <select className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
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