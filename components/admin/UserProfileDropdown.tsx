"use client";

import { useState } from "react";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import Image from "next/image";

interface UserProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // localStorage에서 인증 상태 제거
    localStorage.removeItem("admin_authenticated");
    // 로그인 페이지로 리다이렉트
    window.location.href = "/admin/login";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg p-2 text-sm hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <User className="h-4 w-4 text-gray-500" />
            </div>
          )}
          <div className="text-left">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="mr-3 h-4 w-4" />
              설정
            </button>
            <hr className="my-1" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4" />
              로그아웃
            </button>
          </div>
        </div>
      )}

      {/* 오버레이 배경 클릭 시 드롭다운 닫기 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}