"use client";

import { Search, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "./auth/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  // 헤더 높이 동적으로 계산
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }
    updateHeaderHeight();
    
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-30"
      >
        {/* Main Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={140}
                height={40}
                className="mr-3 sm:mr-4 md:mr-6 object-contain"
                style={{
                  width: "auto",
                  height: "32px",
                }}
              />
            </Link>

            {/* Navigation Links - 모바일에서는 숨김 */}
            <div className="hidden md:flex">
              <Link
                href="/"
                className="cursor-pointer py-1 px-2 sm:px-3 text-base sm:text-lg md:text-xl font-bold no-underline text-brand"
              >
                클래스
              </Link>
              <Link
                href="/community"
                className="cursor-pointer py-1 px-2 sm:px-3 text-base sm:text-lg md:text-xl font-bold no-underline text-gray-900"
              >
                커뮤니티
              </Link>
            </div>
          </div>

          {/* Right section - Search and Auth */}
          <div className="flex items-center gap-2">
            {/* Search Bar - 모바일에서 크기 조정 */}
            <div className="flex">
              <span className="relative inline-flex h-10 sm:h-11 w-full">
                <span className="absolute flex h-full items-center pl-3 sm:pl-4">
                  <Search className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  className="h-full w-36 sm:w-48 md:w-64 lg:w-80 xl:w-96 border border-solid border-gray-200 bg-gray-100 px-10 sm:px-11 py-0 font-medium placeholder-gray-400 rounded-lg text-xs sm:text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  placeholder="검색어를 입력하세요"
                  aria-label="검색어 입력"
                />
              </span>
            </div>

            {/* Auth Buttons - 모바일에서는 숨기거나 간소화 */}
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/mypage"
                    className="h-10 md:h-[42px] flex items-center cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors"
                  >
                    마이페이지
                  </Link>
                  <div className="h-3 md:h-4 w-[1px] bg-neutral-200 mx-0.5"></div>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="h-10 md:h-[42px] cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="h-10 md:h-[42px] cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors"
                  >
                    로그인
                  </button>
                  <div className="h-3 md:h-4 w-[1px] bg-neutral-200 mx-0.5"></div>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="h-10 md:h-[42px] cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-brand-500 text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <button className="sm:hidden p-2" aria-label="메뉴 열기">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation - 모바일에서는 숨김 */}
        <div className="hidden lg:block mx-auto h-10 w-full max-w-7xl gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4 md:gap-6">
            {/* Category Button */}
            <div className="text-md flex h-10 cursor-pointer items-center border-b-2 border-b-transparent font-semibold shrink-0 pb-4">
              <Menu className="w-5 h-5 mr-1" />
              카테고리
            </div>

            {/* Navigation Menu */}
            <div className="flex w-full items-stretch justify-between">
              <div className="flex items-stretch gap-3">
                <div className="flex items-stretch">
                  <div className="relative flex items-stretch grow">
                    <div className="overflow-hidden">
                      <div className="flex ml-0 h-full gap-6">
                        <Link
                          href="/class/2"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          오리지널
                        </Link>
                        <Link
                          href="/class/best"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          베스트
                        </Link>
                        <Link
                          href="/curriculum"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          커리큘럼
                        </Link>
                        <Link
                          href="/class/openScheduled"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          오픈예정
                        </Link>
                        <Link
                          href="#"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          강의뭐듣지?
                          <span className="absolute top-2 -right-2 rounded-full bg-red-500 h-1 w-1 sm:h-1.5 sm:w-1.5"></span>
                        </Link>
                        <Link
                          href="/onboarding"
                          className="relative flex h-10 items-center border-b-2 border-b-transparent font-semibold pb-4 text-base hover:border-b-[#1c2a4b]"
                        >
                          첫구매특가
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Links */}
              <div className="flex shrink-0 items-center font-medium text-neutral-700">
                <a
                  className="px-2.5"
                  target="_blank"
                  href="https://b2b.weolbu.com"
                >
                  기업교육
                </a>
                <div className="shrink-0 mx-1 sm:mx-1.5 h-3 sm:h-4 w-px bg-neutral-200"></div>
                <a
                  className="px-2.5"
                  target="_blank"
                  href="https://b2b.weolbu.com"
                >
                  강사 지원하기
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일용 간소화된 네비게이션 */}
        <div className="lg:hidden mx-auto w-full max-w-7xl px-4 sm:px-6 py-2">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Link
              href="/"
              className="whitespace-nowrap text-sm font-semibold  px-2"
            >
              클래스
            </Link>
            <Link
              href="/community"
              className="whitespace-nowrap text-sm font-semibold text-[#222222] px-2"
            >
              커뮤니티
            </Link>
            <Link
              href="/class/best"
              className="whitespace-nowrap text-sm font-semibold text-[#222222] px-2"
            >
              베스트
            </Link>
            <Link
              href="/curriculum"
              className="whitespace-nowrap text-sm font-semibold text-[#222222] px-2"
            >
              커리큘럼
            </Link>
          </div>
        </div>
      </header>
      {/* 헤더가 고정되면서 아래 컨텐츠가 가려지지 않도록 패딩 추가 */}
      <div
        aria-hidden
        className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px]"
        style={{
          height: headerHeight ? `${headerHeight}px` : undefined,
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
