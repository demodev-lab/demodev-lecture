"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const sections = [
  {
    title: "오리지널",
    items: ["바이브 빌더스"],
  },
  {
    title: "바이브 코딩",
    items: ["프롬프트 엔지니어링", "컨텍스트 엔지니어링", "AI 도구 활용"],
  },
  {
    title: "앱/웹",
    items: [
      "앱 바이브 코딩 입문",
      "웹 바이브 코딩 입문",
      "앱 수익화",
      "웹 수익화",
    ],
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
  },
];

function SectionToggle({
  title,
  items,
  open,
  onClick,
  onItemClick,
  onCategoryClick,
  selectedCategory,
  selectedSubcategory,
}: {
  title: string;
  items: string[];
  open: boolean;
  onClick: () => void;
  onItemClick: (category: string, subcategory: string) => void;
  onCategoryClick: (category: string) => void;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
}) {
  const isSelectedCategory = selectedCategory === title;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center">
        <button
          className="flex-1 flex items-center py-4 px-0 text-left focus:outline-none group"
          onClick={() => onCategoryClick(title)}
        >
          <span className={`text-lg font-medium transition-colors ${
            isSelectedCategory ? "text-brand-500" : "text-gray-800 hover:text-brand-500"
          }`}>
            {title}
          </span>
        </button>
        <button
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClick}
          aria-expanded={open}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 pl-0">
          {items.map((item) => {
            const isSelected = selectedCategory === title && selectedSubcategory === item;
            return (
              <li key={item}>
                <button
                  onClick={() => onItemClick(title, item)}
                  className={`block w-full text-left text-base py-2 transition-colors duration-150 ${
                    isSelected 
                      ? "text-brand-500 font-medium" 
                      : "text-gray-600 hover:text-brand-500"
                  }`}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface LecturesSidebarProps {
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;
}

export default function LecturesSidebar({ selectedCategory, selectedSubcategory }: LecturesSidebarProps) {
  const router = useRouter();
  const [openSections, setOpenSections] = useState(
    sections.map((_, idx) => idx === 1) // 두 번째 섹션만 열어둠 (이미지와 같이)
  );

  const handleToggle = (idx: number) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    router.push(`/curriculum?${params.toString()}`);
  };

  const handleItemClick = (category: string, subcategory: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('subcategory', subcategory);
    router.push(`/curriculum?${params.toString()}`);
  };

  return (
    <aside className="w-full bg-white border-r border-gray-100 min-h-screen">
      <div className="px-6 py-8">
        <div className="space-y-0">
          {sections.map((section, idx) => (
            <SectionToggle
              key={section.title}
              title={section.title}
              items={section.items}
              open={openSections[idx]}
              onClick={() => handleToggle(idx)}
              onItemClick={handleItemClick}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory || null}
              selectedSubcategory={selectedSubcategory || null}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}