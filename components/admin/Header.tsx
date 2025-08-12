"use client";

import { usePathname } from "next/navigation";
import { User } from "lucide-react";

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
      "/admin/dashboard": "대시보드",
      "/admin/dashboard/lectures": "강의 관리",
    };

    return routes[pathname] || "강의 관리 시스템";
  };

  return (
    <header className="border-b border-gray-200 bg-white h-16 flex items-center">
      <div className="flex items-center justify-between px-6 w-full">
        <div className="flex items-center space-x-2">
          <nav className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{getPageTitle()}</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}