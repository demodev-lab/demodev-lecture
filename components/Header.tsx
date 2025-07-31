"use client";

import { Search, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  // 헤더 높이 동적으로 계산
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

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
        <div className="mx-auto max-w-[1200px] px-2.5 py-4 flex justify-between items-center">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={140}
                height={40}
                className="h-8 w-[100px] sm:h-10 sm:w-[140px] min-w-[100px] sm:min-w-[140px] mr-3 sm:mr-6 object-contain"
              />
            </Link>

            {/* Navigation Links - 모바일에서는 숨김 */}
            <div className="hidden md:flex">
              <Link
                href="/"
                className="cursor-pointer p-1 px-2 text-xl font-bold no-underline text-[#1f5af2]"
              >
                클래스
              </Link>
              <Link
                href="/community"
                className="cursor-pointer p-1 px-2 text-xl font-bold no-underline text-[#222222]"
              >
                커뮤니티
              </Link>
            </div>
          </div>

          {/* Right section - Search and Auth */}
          <div className="flex items-center gap-2">
            {/* Search Bar - 모바일에서 크기 조정 */}
            <div className="flex">
              <span className="relative inline-flex h-[42px] w-full">
                <span className="absolute flex h-full items-center pl-4">
                  <Search className="h-4 w-4 text-neutral-500" />
                </span>
                <input
                  className="h-full w-[200px] sm:w-[300px] lg:w-[376px] border border-solid border-[#f2f2f2] bg-[#f2f2f2] px-11 py-0 font-medium placeholder-[#aaa] rounded-lg pl-10 text-sm focus:border-[#1f5af2] focus:bg-white focus:outline-none"
                  placeholder="검색어를 입력하세요"
                />
              </span>
            </div>

            {/* Auth Buttons - 모바일에서는 숨기거나 간소화 */}
            <div className="hidden sm:flex items-center gap-[7px]">
              <button className="h-[42px] cursor-pointer border-none bg-transparent px-3 font-semibold text-[#222222] text-sm hover:bg-gray-100 rounded-md transition-colors">
                로그인
              </button>
              <div className="h-4 w-[1px] bg-neutral-200 mx-0.5"></div>
              <button className="h-[42px] cursor-pointer border-none bg-transparent px-3 font-semibold text-[#1f5af2] text-sm hover:bg-gray-100 rounded-md transition-colors">
                회원가입
              </button>
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <button className="sm:hidden p-2">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation - 모바일에서는 숨김 */}
        <div className="hidden lg:block mx-auto h-10 w-full max-w-[1200px] gap-6 px-2.5">
          <div className="flex justify-between items-center gap-6">
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
                          <span className="absolute top-2 -right-2 rounded-full bg-[#e34935] h-[5px] w-[5px]"></span>
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
                <div className="shrink-0 mx-1.5 h-4 w-[1px] bg-neutral-200"></div>
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
        <div className="lg:hidden mx-auto w-full max-w-[1200px] px-2.5 py-2">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Link
              href="/"
              className="whitespace-nowrap text-sm font-semibold text-[#1f5af2] px-2"
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
        style={{
          height: headerHeight ? `${headerHeight}px` : "120px",
          minHeight: 80,
        }}
      />
    </>
  );
}
