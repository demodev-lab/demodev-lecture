import React from "react";

const Footer = () => {
  return (
    <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black py-12 sm:py-16 text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col sm:flex-row justify-between text-sm font-normal gap-10 sm:gap-8">
          <div className="grid grid-cols-2 sm:flex sm:flex-grow gap-8 sm:gap-10 lg:gap-14">
            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-white mb-2">서비스</li>
              <li>
                <a
                  className="hover:text-brand-400 transition-colors"
                  href="/footer/terms"
                >
                  서비스 이용약관
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-400 transition-colors"
                  href="/footer/ask"
                >
                  자주 묻는 질문
                </a>
              </li>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-white mb-2">정책</li>
              <li>
                <a
                  className="hover:text-brand-400 transition-colors"
                  href="/footer/notice"
                >
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-400 transition-colors"
                  href="/footer/copyright"
                >
                  저작권 안내
                </a>
              </li>
            </ul>

            <ul className="flex flex-col gap-4">
              <li className="font-semibold text-white mb-2">소셜</li>
              <li>
                <a
                  href="https://www.youtube.com/@%EB%8C%80%EB%AA%A8%EC%82%B0%EA%B0%9C%EB%B0%9C%EB%8B%A8"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-brand-400 transition-colors group"
                  rel="noreferrer"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        d="M14.478 5.348s-.13-.915-.53-1.317c-.505-.529-1.07-.532-1.33-.563-1.856-.135-4.644-.135-4.644-.135H7.97s-2.788 0-4.644.135c-.26.031-.825.034-1.33.563-.4.402-.527 1.317-.527 1.317s-.135 1.076-.135 2.15v1.006c0 1.074.133 2.15.133 2.15s.13.915.526 1.317c.506.53 1.17.51 1.465.568 1.063.101 4.515.132 4.515.132s2.79-.005 4.646-.137c.26-.031.825-.034 1.33-.563.4-.402.53-1.317.53-1.317s.132-1.074.132-2.15V7.498c0-1.074-.132-2.15-.132-2.15M6.6 9.725V5.994l3.586 1.872z"
                      ></path>
                    </svg>
                  </div>
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/demodev_sns/"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-brand-400 transition-colors group"
                  rel="noreferrer"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M10.75 1.75h-5.5a3.5 3.5 0 0 0-3.5 3.5v5.5a3.5 3.5 0 0 0 3.5 3.5h5.5a3.5 3.5 0 0 0 3.5-3.5v-5.5a3.5 3.5 0 0 0-3.5-3.5M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m3.25-5.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5"
                      ></path>
                    </svg>
                  </div>
                  인스타그램
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.com/@demodev_sns"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-brand-400 transition-colors group"
                  rel="noreferrer"
                >
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M11.39 8.69c-.19-.55-.51-.94-.95-1.18-.19-.1-.39-.18-.6-.22v-.04c0-1.36-.55-2.3-1.65-2.8-.39-.18-.83-.27-1.32-.27h-.04c-1.02 0-1.8.36-2.31 1.08l.8.58c.35-.49.87-.74 1.53-.74h.02c.82 0 1.39.42 1.69 1.25.11.29.17.64.18 1.04-1.04.02-2.01.17-2.78.57-1.01.53-1.56 1.36-1.56 2.35 0 .66.24 1.21.7 1.63.39.36.88.54 1.46.54.87 0 1.58-.31 2.12-.93.22-.25.4-.54.54-.87.12.41.31.75.57 1.01.46.47 1.12.7 1.96.7.67 0 1.32-.17 1.93-.5l-.32-.77c-.49.27-1 .4-1.52.4-.55 0-.97-.14-1.26-.43-.29-.29-.43-.71-.43-1.26v-.07c0-.41.1-.78.29-1.11zm-3.23 2.35c-.5.61-.99.81-1.46.81-.31 0-.56-.09-.76-.27-.2-.18-.3-.42-.3-.72 0-.59.3-1.05.89-1.36.52-.27 1.21-.41 1.98-.42-.01.68-.12 1.21-.35 1.61v.35z"
                      ></path>
                    </svg>
                  </div>
                  Threads
                </a>
              </li>
            </ul>

            {/* <ul className="flex flex-col gap-4">
              <li className="font-semibold text-white mb-2">비즈니스</li>
              <li>
                <a
                  href=""
                  target="_blank"
                  className="hover:text-brand-400 transition-colors"
                  rel="noreferrer"
                >
                  강사 지원하기
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="hover:text-brand-400 transition-colors" rel="noreferrer">
                  비즈니스/제휴 문의
                </a>
              </li>
            </ul> */}
          </div>

          <div className="flex flex-shrink-0 flex-col gap-4 w-full sm:w-auto">
            <div className="border border-gray-800 p-5 rounded-lg">
              <h3 className="font-semibold text-white mb-3">고객 지원</h3>
              <a 
                href="mailto:demodev.works@gmail.com?subject=[대모산 개발단] 문의사항&body=안녕하세요,%0D%0A%0D%0A문의 내용을 작성해 주세요.%0D%0A%0D%0A감사합니다."
                className="w-full bg-gray-800 text-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors mb-3 block text-center"
              >
                문의하기
              </a>
              <div className="text-xs text-gray-400 space-y-1">
                <div>평일 10:00 - 18:00</div>
                <div>점심시간 12:00 - 13:00</div>
                <div>주말 및 공휴일 제외</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                대모산 개발단
              </div>
              <div className="text-xs text-gray-500">
                © 2025 Demodev. All rights reserved.
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>함께 성장하는 개발 커뮤니티</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
