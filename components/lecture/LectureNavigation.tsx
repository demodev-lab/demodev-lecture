"use client";

import { useState } from "react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface LectureNavigationProps {
  lecture: Lecture;
}

interface NavItem {
  id: string;
  label: string;
  count?: number;
}

export default function LectureNavigation({ lecture }: LectureNavigationProps) {
  const [activeTab, setActiveTab] = useState("후기");

  const navItems: NavItem[] = [
    { id: "소개", label: "소개" },
    { id: "커리큘럼", label: "커리큘럼" },
    { id: "크리에이터", label: "크리에이터" },
    { id: "후기", label: "후기", count: lecture.reviews || 0 },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // 해당 섹션으로 스크롤
    const sectionId = getSectionId(tabId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const getSectionId = (tabId: string): string => {
    switch (tabId) {
      case "소개": return "lecture-description";
      case "커리큘럼": return "curriculum";
      case "크리에이터": return "instructor";
      case "후기": return "reviews";
      default: return "";
    }
  };

  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-4xl">
        <nav className="flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors
                ${activeTab === item.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className={`ml-2 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                  {item.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}