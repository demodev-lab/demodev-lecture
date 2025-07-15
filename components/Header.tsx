"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
// import { Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

export default function Header() {
  const pathname = usePathname();
  
  // admin 경로에서는 Clerk 버튼 숨김
  const showAuthButtons = !pathname.startsWith('/admin');

  return (
    <header className="bg-white border-b border-gray-200 p-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="대모산 개발단 로고"
              width={165}
              height={30}
            />
          </div>

          <h1 className="text-gray-700 hidden md:block text-2xl font-bold">
            대모산 개발단과 함께하는 실전 성장형 챌린지
          </h1>
        </div>

        {/* Auth Buttons - Clerk */}
        {showAuthButtons && (
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5a3de8] transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </div>
    </header>
  );
}
