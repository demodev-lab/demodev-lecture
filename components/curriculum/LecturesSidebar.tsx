"use client";

import React, { useState } from "react";

const sections = [
  {
    title: "오리지널",
    titleClass: "text-blue-600",
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
  titleClass,
  items,
  open,
  onClick,
}: {
  title: string;
  titleClass?: string;
  items: string[];
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mb-8">
      <div
        className="py-2 flex items-center cursor-pointer select-none"
        onClick={onClick}
      >
        <span
          className={`text-lg font-semibold ${titleClass ? titleClass : ""}`}
        >
          {title}
        </span>
        <span className="ml-2 text-gray-400">
          {open ? (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 15l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 9l-6 6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </div>
      {open && (
        <ul className="mt-2 space-y-2 pl-4">
          {items.map((item) => (
            <li key={item}>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LecturesSidebar() {
  const [openSections, setOpenSections] = useState(
    sections.map(() => true)
  );

  const handleToggle = (idx: number) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === idx ? !open : open))
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {sections.map((section, idx) => (
          <SectionToggle
            key={section.title}
            title={section.title}
            titleClass={section.titleClass}
            items={section.items}
            open={openSections[idx]}
            onClick={() => handleToggle(idx)}
          />
        ))}
      </div>
    </div>
  );
}