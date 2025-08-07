"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  {
    title: "오리지널",
    items: ["바이브 빌더스"],
    emoji: "✨",
  },
  {
    title: "바이브 코딩",
    items: ["프롬프트 엔지니어링", "컨텍스트 엔지니어링", "AI 도구 활용"],
    emoji: "💻",
  },
  {
    title: "앱/웹",
    items: [
      "앱 바이브 코딩 입문",
      "웹 바이브 코딩 입문",
      "앱 수익화",
      "웹 수익화",
    ],
    emoji: "🌐",
  },
  {
    title: "자동화",
    items: [
      "n8n",
      "Make",
      "PyTorch",
      "크롤링",
      "AI 업무 자동화",
    ],
    emoji: "⚡",
  },
];

interface CategoryDropdownProps {
  category: {
    title: string;
    items: string[];
    emoji: string;
  };
  isOpen: boolean;
  onToggle: () => void;
  onCategoryClick: (category: string) => void;
  onItemClick: (category: string, subcategory: string) => void;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
}

function CategoryDropdown({
  category,
  isOpen,
  onToggle,
  onCategoryClick,
  onItemClick,
  selectedCategory,
  selectedSubcategory,
}: CategoryDropdownProps) {
  const isSelectedCategory = selectedCategory === category.title;

  return (
    <div className="mb-2">
      <div className="mx-4 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        <button
          onClick={onToggle}
          className={`w-full px-4 py-3.5 flex items-center justify-between transition-all duration-200 ${
            isSelectedCategory 
              ? "bg-gradient-to-r from-brand-50 to-purple-50" 
              : "hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className="text-xl">{category.emoji}</span>
            <span 
              className={`font-semibold transition-colors ${
                isSelectedCategory 
                  ? "text-brand-600" 
                  : "text-gray-800 hover:text-brand-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onCategoryClick(category.title);
              }}
            >
              {category.title}
            </span>
          </div>
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            className={`transition-all duration-300 ${
              isOpen ? "rotate-180 text-brand-500" : "text-gray-400"
            }`}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
            {category.items.map((item, index) => {
              const isSelected = selectedCategory === category.title && selectedSubcategory === item;
              return (
                <button
                  key={item}
                  onClick={() => onItemClick(category.title, item)}
                  className={`w-full px-12 py-3 text-left text-sm transition-all duration-150 relative group ${
                    isSelected 
                      ? "text-brand-600 font-semibold bg-brand-50" 
                      : "text-gray-600 hover:text-brand-500 hover:bg-gray-50"
                  } ${index !== category.items.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className={`absolute left-6 transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}>
                    •
                  </span>
                  {item}
                  {isSelected && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface OpenScheduledSidebarProps {
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;
}

export default function OpenScheduledSidebar({ 
  selectedCategory, 
  selectedSubcategory 
}: OpenScheduledSidebarProps) {
  const router = useRouter();

  const safeSelectedCategory: string | null = typeof selectedCategory === "undefined" ? null : selectedCategory;
  const safeSelectedSubcategory: string | null = typeof selectedSubcategory === "undefined" ? null : selectedSubcategory;

  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleToggle = (categoryTitle: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(c => c !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    router.push(`/class/openScheduled?${params.toString()}`);
  };

  const handleItemClick = (category: string, subcategory: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('subcategory', subcategory);
    router.push(`/class/openScheduled?${params.toString()}`);
  };

  return (
    <aside className="w-full bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="py-6">
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-brand-500 rounded-full"></div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              카테고리
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-2">원하는 카테고리를 선택해주세요</p>
        </div>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <CategoryDropdown
              key={category.title}
              category={category}
              isOpen={openCategories.includes(category.title)}
              onToggle={() => handleToggle(category.title)}
              onCategoryClick={handleCategoryClick}
              onItemClick={handleItemClick}
              selectedCategory={safeSelectedCategory}
              selectedSubcategory={safeSelectedSubcategory}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}