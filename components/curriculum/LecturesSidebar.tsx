"use client";

import React, { useState } from "react";

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
}: {
  title: string;
  items: string[];
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 px-0 text-left focus:outline-none group"
        onClick={onClick}
        aria-expanded={open}
      >
        <span className={`text-lg font-medium transition-colors ${
          open ? "text-blue-600" : "text-gray-800"
        }`}>
          {title}
        </span>
        <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
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
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 pl-0">
          {items.map((item) => (
            <li key={item}>
              <span className="block text-gray-600 text-base py-2 hover:text-gray-800 transition-colors duration-150 cursor-pointer">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function LecturesSidebar() {
  const [openSections, setOpenSections] = useState(
    sections.map((_, idx) => idx === 1) // 두 번째 섹션만 열어둠 (이미지와 같이)
  );

  const handleToggle = (idx: number) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  return (
    <aside
      className="
        w-full
        md:w-64
        bg-white
        min-h-screen
        fixed
        md:static
        z-20
        top-0
        left-0
        transition-all
        duration-300
        flex-shrink-0
      "
      style={{ maxWidth: "100vw" }}
    >
      <div className="px-6 py-8">
        <div className="space-y-0">
          {sections.map((section, idx) => (
            <SectionToggle
              key={section.title}
              title={section.title}
              items={section.items}
              open={openSections[idx]}
              onClick={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}