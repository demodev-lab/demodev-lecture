"use client";

import { useState } from "react";

const categories = [
  { id: "all", label: "전체" },
  { id: "real-estate", label: "부동산투자" },
  { id: "home", label: "내집마련" },
  { id: "online-store", label: "온라인스토어" },
  { id: "blog", label: "블로그" },
  { id: "youtube", label: "유튜브" },
  { id: "auction", label: "경매" },
  { id: "stock", label: "주식" },
  { id: "finance", label: "재테크" },
  { id: "tax-loan", label: "세금/대출" },
];

export default function BestPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              가장 인기있는 베스트 강의
            </h1>
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-12">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-gray-500 text-lg">베스트 강의가 준비 중입니다.</p>
            <p className="text-gray-400 text-sm mt-2">곧 최고의 강의들을 만나보실 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}