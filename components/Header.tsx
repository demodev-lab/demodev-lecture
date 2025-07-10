"use client";

import Image from "next/image";
// import { Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 p-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="" width={110} height={20} />
          </div>

          <h1 className="text-gray-700 hidden md:block text-2xl font-bold">
            대모산 개발단과 함께하는 실전 성장형 챌린지
          </h1>
        </div>

        {/* Navigation */}
        {/* <nav className="hidden lg:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            패키지
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            게시판
          </a>
        </nav> */}

        {/* Search and Actions */}
        {/* <div className="flex items-center space-x-4"> */}
        {/* Search Bar */}
        {/* <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="검색"
              className="w-64 pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div> */}

        {/* Mobile Search */}
        {/* <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button> */}

        {/* Auth Buttons */}
        {/* <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              회원가입
            </Button>
            <Button size="sm">로그인</Button>
          </div> */}

        {/* Mobile Menu */}
        {/* <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button> */}
        {/* </div> */}
      </div>
    </header>
  );
}
