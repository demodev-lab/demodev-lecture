"use client";

import { useEffect } from "react";
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

interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryDropdown({ isOpen, onClose }: CategoryDropdownProps) {
  const router = useRouter();

  const handleItemClick = (category: string, subcategory: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('subcategory', subcategory);
    
    router.push(`/curriculum?${params.toString()}`);
    onClose();
  };

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    
    router.push(`/curriculum?${params.toString()}`);
    onClose();
  };

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 배경 */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* 드롭다운 메뉴 */}
      <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-brand-700 transition-colors"
                  onClick={() => handleCategoryClick(section.title)}
                >
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleItemClick(section.title, item)}
                      className="block w-full text-left text-gray-600 hover:text-brand-500 transition-colors py-1 text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}