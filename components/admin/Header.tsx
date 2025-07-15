"use client";

import { usePathname } from "next/navigation";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    const routes: { [key: string]: string } = {
      "/admin": "대시보드",
      "/admin/lectures": "강의 관리",
      "/admin/coaches": "강사 관리",
      "/admin/members": "회원 관리",
    };

    return routes[pathname] || "대시보드";
  };

  return (
    <header className="border-b border-gray-200 bg-white h-16 flex items-center">
      <div className="flex items-center justify-between px-6 w-full">
        <div className="flex items-center space-x-2">
          <nav className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{getPageTitle()}</span>
          </nav>
        </div>
        <UserProfileDropdown user={user} />
      </div>
    </header>
  );
}