import React from "react";

const Footer = () => {
  return (
    <div className="relative z-10 bg-black py-8 sm:py-10 text-[#eeeeee]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:gap-3.5 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col sm:flex-row justify-between text-xs sm:text-sm font-normal gap-8 sm:gap-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-grow gap-6 sm:gap-8 lg:gap-12 leading-5 sm:leading-[22px]">
            <ul className="flex flex-col gap-3 sm:gap-3.5">
              <li>
                <a
                  data-testid="wb-link-next-link"
                  className=""
                  href="/footer/notice"
                >
                  공지사항
                </a>
              </li>
              <li>
                <a
                  data-testid="wb-link-next-link"
                  className=""
                  href="/footer/terms"
                >
                  서비스 이용약관
                </a>
              </li>
              <li>
                <a
                  data-testid="wb-link-next-link"
                  className=""
                  target="_blank"
                  href="https://docs.channel.io/wbfaq"
                >
                  자주 묻는 질문
                </a>
              </li>
            </ul>

            <ul className="flex flex-col gap-3 sm:gap-3.5">
              <li>
                <a
                  data-testid="wb-link-next-link"
                  className=""
                  href="/footer/privacy"
                >
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a
                  data-testid="wb-link-next-link"
                  className=""
                  href="/footer/copyright"
                >
                  저작권 안내
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="" rel="noreferrer">
                  채용
                </a>
              </li>
            </ul>

            <ul className="flex flex-col gap-3 sm:gap-3.5">
              <li>
                <a
                  href="https://www.youtube.com/@%EB%8C%80%EB%AA%A8%EC%82%B0%EA%B0%9C%EB%B0%9C%EB%8B%A8"
                  target="_blank"
                  className="flex items-center gap-1"
                  rel="noreferrer"
                >
                  Youtube
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <path
                      fill="#EEE"
                      d="M14.478 5.348s-.13-.915-.53-1.317c-.505-.529-1.07-.532-1.33-.563-1.856-.135-4.644-.135-4.644-.135H7.97s-2.788 0-4.644.135c-.26.031-.825.034-1.33.563-.4.402-.527 1.317-.527 1.317s-.135 1.076-.135 2.15v1.006c0 1.074.133 2.15.133 2.15s.13.915.526 1.317c.506.53 1.17.51 1.465.568 1.063.101 4.515.132 4.515.132s2.79-.005 4.646-.137c.26-.031.825-.034 1.33-.563.4-.402.53-1.317.53-1.317s.132-1.074.132-2.15V7.498c0-1.074-.132-2.15-.132-2.15M6.6 9.725V5.994l3.586 1.872z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/demodev_sns/"
                  target="_blank"
                  className="flex items-center gap-1"
                  rel="noreferrer"
                >
                  인스타그램
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <path
                      fill="#fff"
                      d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                    ></path>
                    <path
                      fill="#fff"
                      d="M10.75 1.75h-5.5a3.5 3.5 0 0 0-3.5 3.5v5.5a3.5 3.5 0 0 0 3.5 3.5h5.5a3.5 3.5 0 0 0 3.5-3.5v-5.5a3.5 3.5 0 0 0-3.5-3.5M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m3.25-5.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.com/@demodev_sns"
                  target="_blank"
                  className="flex items-center gap-1"
                  rel="noreferrer"
                >
                  Threads
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#EEE"
                      d="M11.39 8.69c-.19-.55-.51-.94-.95-1.18-.19-.1-.39-.18-.6-.22v-.04c0-1.36-.55-2.3-1.65-2.8-.39-.18-.83-.27-1.32-.27h-.04c-1.02 0-1.8.36-2.31 1.08l.8.58c.35-.49.87-.74 1.53-.74h.02c.82 0 1.39.42 1.69 1.25.11.29.17.64.18 1.04-1.04.02-2.01.17-2.78.57-1.01.53-1.56 1.36-1.56 2.35 0 .66.24 1.21.7 1.63.39.36.88.54 1.46.54.87 0 1.58-.31 2.12-.93.22-.25.4-.54.54-.87.12.41.31.75.57 1.01.46.47 1.12.7 1.96.7.67 0 1.32-.17 1.93-.5l-.32-.77c-.49.27-1 .4-1.52.4-.55 0-.97-.14-1.26-.43-.29-.29-.43-.71-.43-1.26v-.07c0-.41.1-.78.29-1.11zm-3.23 2.35c-.5.61-.99.81-1.46.81-.31 0-.56-.09-.76-.27-.2-.18-.3-.42-.3-.72 0-.59.3-1.05.89-1.36.52-.27 1.21-.41 1.98-.42-.01.68-.12 1.21-.35 1.61v.35z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href=""
                  target="_blank"
                  className="flex items-center gap-1"
                  rel="noreferrer"
                >
                  강사 지원하기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <path
                      fill="#EEE"
                      fillRule="evenodd"
                      d="M5.333 4.667a2.667 2.667 0 1 1 5.334 0 2.667 2.667 0 0 1-5.334 0m0 4A3.333 3.333 0 0 0 2 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 3.333 3.333 0 0 0-3.333-3.333z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="" rel="noreferrer">
                  비즈니스/제휴 문의
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-shrink-0 flex-col gap-3 sm:gap-3.5 w-full sm:w-auto">
            <button className="h-10 sm:h-[42px] w-full sm:w-48 rounded-lg border border-[#222] bg-[#222] px-3 text-xs sm:text-sm font-semibold text-[#fff]">
              문의하기
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#666]">
              <div className="text-[#eee]">평일 10:00 - 18:00</div>
              <div className="hidden sm:block">점심시간 12 - 13시</div>
              <hr className="hidden sm:inline-block h-3 w-[1px] border-none bg-[#666]" />
              <div>주말 및 공휴일 제외</div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col border-t border-[#222] pt-3 sm:pt-4 text-[10px] sm:text-xs text-[#666]">
          <div className="flex items-center gap-1 sm:gap-2">
            <div>대모산 개발단</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
