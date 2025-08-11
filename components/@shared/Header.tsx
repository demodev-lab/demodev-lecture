"use client";

import { Search, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../auth/AuthModal";
import { useSupabaseAuth } from "../auth/SupabaseAuthContext";
import CategoryDropdown from "../main/CategoryDropdown";

export default function Header() {
  const { user, signOut } = useSupabaseAuth();
  const isAuthenticated = !!user;
  const router = useRouter();
  // 헤더 높이 동적으로 계산
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/curriculum?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-40"
      >
        {/* Main Header - 전체 화면 너비 사용 */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 sm:py-4">
          <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={120}
                height={32}
                className="mr-2 sm:mr-4 md:mr-6 object-contain"
                style={{
                  width: "auto",
                  height: "28px",
                }}
              />
            </Link>
          </div>

          {/* Right section - Search and Auth */}
          <div className="flex items-center gap-2">
            {/* Search Bar - 모바일에서 크기 조정 */}
            <form onSubmit={handleSearchSubmit} className="flex">
              <span className="relative inline-flex h-9 sm:h-10 w-full">
                <span className="absolute flex h-full items-center pl-3 sm:pl-4">
                  <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-500" />
                </span>
                <input
                  onChange={handleSearchChange} 
                  value={searchQuery}
                  className="h-full w-32 sm:w-44 md:w-56 lg:w-72 xl:w-80 border border-solid border-gray-200 bg-gray-100 px-8 sm:px-10 py-0 font-medium placeholder-gray-400 rounded-lg text-xs sm:text-sm focus:border-brand-500 focus:bg-white focus:outline-none transition-all duration-200"
                  placeholder="검색어를 입력"
                  aria-label="검색어 입력"
                />
              </span>
            </form>

            {/* Auth Buttons - 모바일에서는 숨기거나 간소화 */}
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/mypage"
                    className="touch-target h-10 md:h-[44px] flex items-center cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors focus-visible-ring"
                  >
                    마이페이지
                  </Link>
                  <div className="h-3 md:h-4 w-[1px] bg-neutral-200 mx-0.5"></div>
                  <button
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                    className="touch-target h-10 md:h-[44px] cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors focus-visible-ring"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="touch-target h-10 md:h-[44px] cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-[#222222] text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors focus-visible-ring"
                  >
                    로그인
                  </button>
                  <div className="h-3 md:h-4 w-[1px] bg-neutral-200 mx-0.5"></div>
                  <Link
                    href="/signup"
                    className="touch-target h-10 md:h-[44px] flex items-center cursor-pointer border-none bg-transparent px-2 md:px-3 font-semibold text-brand-500 text-xs md:text-sm hover:bg-gray-100 rounded-md transition-colors focus-visible-ring"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>

            {/* 모바일 햄버거 메뉴 */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="sm:hidden p-3 touch-target-sm" 
              aria-label="메뉴 열기"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          </div>
        </div>

        {/* Category Navigation - 모바일에서는 숨김 */}
        <div className="hidden lg:block w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-10">
          <div className="max-w-[1920px] mx-auto">
          <div className="flex justify-between items-center gap-4 md:gap-6">
            {/* Category Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="text-md flex h-10 cursor-pointer items-center border-b-2 border-b-transparent font-semibold shrink-0 pb-4 hover:text-brand-500 transition-colors"
              >
                <Menu className="w-5 h-5 mr-1" />
                카테고리
              </button>
              
              <CategoryDropdown
                isOpen={showCategoryDropdown}
                onClose={() => setShowCategoryDropdown(false)}
              />
            </div>

            {/* Navigation Menu */}
            <div className="flex w-full items-stretch justify-between">
              <div className="flex items-stretch gap-3">
                <div className="flex items-stretch">
                  <div className="relative flex items-stretch grow">
                    <div className="overflow-hidden">
                      <div className="flex ml-0 h-full gap-6">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Links */}
              {/* <div className="flex shrink-0 items-center font-medium text-neutral-700">
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
              </div> */}
            </div>
          </div>
          </div>
        </div>

        {/* 모바일용 간소화된 네비게이션 */}
        <nav className="lg:hidden w-full px-4 sm:px-6 py-2 border-t border-gray-100" aria-label="Mobile navigation">
          <div className="flex items-center justify-center gap-8 overflow-x-auto">
            <Link
              href="/"
              className="whitespace-nowrap text-sm font-semibold text-brand-600 px-3 py-1"
            >
              클래스
            </Link>
            <Link
              href="/class/best"
              className="whitespace-nowrap text-sm font-semibold text-gray-700 px-3 py-1 hover:text-brand-600 transition-colors"
            >
              베스트
            </Link>
            <Link
              href="/curriculum"
              className="whitespace-nowrap text-sm font-semibold text-gray-700 px-3 py-1 hover:text-brand-600 transition-colors"
            >
              커리큘럼
            </Link>
          </div>
        </nav>
      </header>
      {/* 헤더가 고정되면서 아래 컨텐츠가 가려지지 않도록 패딩 추가 */}
      <div
        aria-hidden
        className="min-h-[60px] sm:min-h-[70px] md:min-h-[80px]"
        style={{
          height: headerHeight ? `${headerHeight}px` : undefined,
        }}
      />

      {/* 모바일 드롭다운 메뉴 */}
      {showMobileMenu && (
        <>
          {/* 오버레이 */}
          <div 
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* 드롭다운 메뉴 */}
          <div className="sm:hidden fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 transform transition-transform duration-300">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={100}
                  height={26}
                  className="object-contain"
                />
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="메뉴 닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 사용자 정보 영역 */}
            <div className="p-4 border-b border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    href="/mypage"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-3 bg-gray-50 rounded-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      router.push("/");
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
                  >
                    로그인
                  </button>
                  <Link
                    href="/signup"
                    onClick={() => setShowMobileMenu(false)}
                    className="block text-center px-4 py-3 border border-brand-500 text-brand-500 rounded-lg font-medium hover:bg-brand-50 transition-colors"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
            
            {/* 네비게이션 링크 */}
            <nav className="p-4">
              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  클래스
                </Link>
                <Link
                  href="/class/best"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  베스트
                </Link>
                <Link
                  href="/curriculum"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  커리큘럼
                </Link>
                <Link
                  href="/class/openScheduled"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  오픈예정
                </Link>
              </div>
              
              {/* 카테고리 섹션 */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  카테고리
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/curriculum?category=오리지널"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    오리지널
                  </Link>
                  <Link
                    href="/curriculum?category=바이브 코딩"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    바이브 코딩
                  </Link>
                  <Link
                    href="/curriculum?category=앱/웹"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    앱/웹
                  </Link>
                  <Link
                    href="/curriculum?category=자동화"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    자동화
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
