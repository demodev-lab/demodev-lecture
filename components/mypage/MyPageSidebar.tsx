"use client";
import { 
  User, 
  BookOpen, 
  MessageCircle, 
  Star, 
  ShoppingCart,
  Settings,
  ChevronRight,
  LayoutGrid
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  count?: number;
  onClick?: () => void;
}
interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MyPageSidebarProps {
  activeTab?: "dashboard" | "profile" | "purchase" | "favorites";
  onTabChange?: (tab: "dashboard" | "profile" | "purchase" | "favorites") => void;
}

export default function MyPageSidebar({ activeTab, onTabChange }: MyPageSidebarProps) {
  const router = useRouter();
  
  // 임시 사용자 데이터
  const userData = {
    name: "고성현",
    level: "Lv.999999",
    levelTitle: "수강동급",
    profileImage: "/Frame_3.png", // 프로필 이미지
    coupons: 0,
    points: 0,
    credits: 0,
  };
  const menuSections: MenuSection[] = [
    {
      title: "강의 관련",
      items: [
        { 
          label: "관심 클래스", 
          icon: <BookOpen className="w-4 h-4" />,
          onClick: () => onTabChange?.("favorites")
        },
        { label: "후기 관리", icon: <Star className="w-4 h-4" /> },
        { 
          label: "구매 내역", 
          icon: <ShoppingCart className="w-4 h-4" />,
          onClick: () => onTabChange?.("purchase")
        },
      ],
    },
    {
      title: "고객 지원",
      items: [
        { 
          label: "자주 묻는 질문", 
          icon: <MessageCircle className="w-4 h-4" />,
          onClick: () => router.push("/footer/ask")
        },
      ],
    },
    {
      title: "계정 관리",
      items: [
        { label: "회원정보관리", icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {/* 프로필 섹션 */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="relative inline-block mb-3 sm:mb-4">
          {userData.profileImage ? (
            <Image
              src={userData.profileImage}
              alt="프로필"
              width={80}
              height={80}
              className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
          )}
          <button className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center" aria-label="프로필 수정">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <h2 className="font-bold text-base sm:text-lg">{userData.name}</h2>
        <p className="text-xs sm:text-sm text-gray-500">{userData.levelTitle} <span className="text-blue-600">{userData.level}</span></p>
      </div>

      {/* 탭 네비게이션 */}
      {onTabChange && (
        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
          <div className="space-y-2">
            <button
              onClick={() => onTabChange("dashboard")}
              className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="w-4 h-4 mr-3" />
              내 강의실
            </button>
            <button
              onClick={() => onTabChange("profile")}
              className={`w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <User className="w-4 h-4 mr-3" />
              프로필
            </button>
          </div>
        </div>
      )}

      {/* 메뉴 섹션 - 모바일에서는 숨김, 태블릿부터 표시 */}
      <nav className="hidden lg:block">
        {menuSections.map((section, index) => (
          <div key={index} className={`${index > 0 ? 'mt-4 sm:mt-6 pt-4 sm:pt-6 border-t' : ''}`}>
            <h3 className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </button>
                  ) : (
                    <a
                      href="#"
                      className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}