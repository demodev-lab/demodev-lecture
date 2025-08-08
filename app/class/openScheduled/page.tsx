"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import OpenScheduledSidebar from "@/components/openScheduled/OpenScheduledSidebar";

function OpenScheduledContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  
  const getSectionTitle = () => {
    if (subcategory) {
      return subcategory;
    }
    if (category) {
      return category;
    }
    return "오픈 예정";
  };
  
  return (
    <div className="flex max-w-7xl mx-auto">
      <div className="w-64 flex-shrink-0">
        <OpenScheduledSidebar selectedCategory={category} selectedSubcategory={subcategory} />
      </div>

      <div className="flex-1 px-8 py-6">
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

        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-lg">오픈 예정 강의가 없습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default function OpenScheduledPage() {
  return (
    <div className="min-h-screen bg-white pt-6">
      <Suspense fallback={
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading...</div>
        </div>
      }>
        <OpenScheduledContent />
      </Suspense>
    </div>
  );
}