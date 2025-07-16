"use client";

import Image from "next/image";

// 베스트글 데이터
const bestPosts = [
  {
    rank: 1,
    title:
      "[밥잘] 부동산 시작 막막해요  :: 이 글 먼저 읽으세요 _ 부동산 초보가 무턱대고 현장에 가면 벌어지는 일",
    href: "/community/3209433",
  },
  {
    rank: 2,
    title:
      "투자는 '타이밍'이 아니라 '준비'입니다. 서울 4급지 1호기 복기 (feat. 망설였던 나 vs 결심한 나)",
    href: "/community/3208188",
  },
  {
    rank: 3,
    title: "내집마련 기초반 분임 진행을 위한 임장 루트 그리는 방법(왕초보용)",
    href: "/community/3213828",
  },
  {
    rank: 4,
    title: "[Q&A] 고수들의 매일 부동산 공부 루틴이 뭔지 궁금합니다.",
    href: "/community/3205040",
  },
];

// 전문가 칼럼 데이터
const expertColumn = {
  category: "전문가칼럼",
  title: "엔비디아, TSMC 파죽지세. CPI물가우려 외 250716 미국마감시황",
  content:
    "2025년 7월 16일(수) 미국 증시 마감 시황 --- 1. 주요 지수 마감 현황 다우지수 44,023.29 (-0.98%) S&P500 6,243.76 (-0.40%) 나스닥 20,677.80 (+0.18%) --- 2. 미국 증시 요약 7월 16일 뉴욕증시는 소비자물가지수(CPI) 발표와 트럼프 대통령의 관세 정책 영향으로 혼조세를 보였습니다. 장 초",
  author: {
    name: "제도권주식분석",
    profileImage: "/demodev_word.svg",
  },
  href: "/community/3214764",
};

export default function CommunitySection() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 px-0 pt-5 pb-14">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Image
          alt="커뮤니티 안내 이미지"
          loading="lazy"
          width={80}
          height={80}
          className="h-20 w-20"
          src="https://build.weolbu.com/_next/static/media/communtiy-talk-bubble.7e4337a8.png"
        />
        <p className="flex text-2xl font-normal text-black">
          바이브 코더들이 함께하는,{" "}
          <span className="font-bold">&nbsp;대모산 개발단 커뮤니티</span>
        </p>
      </div>

      {/* Content Cards */}
      <div className="flex justify-center h-[250px] gap-4">
        {/* 오늘의 베스트글 */}
        <div className="flex flex-col bg-[#fff] w-[582px] gap-4.5 rounded-lg p-[28px]">
          <p className="border-b border-b-[#f1f2f4] font-bold pb-3 text-lg/[22px]">
            오늘의 베스트글
          </p>
          <ul className="flex flex-col gap-4.5 text-base">
            {bestPosts.map((post) => (
              <li key={post.rank}>
                <a
                  className="flex cursor-pointer items-center gap-1 leading-5"
                  href={post.href}
                >
                  <p className="text-primary-500 mr-2 shrink-0 font-extrabold">
                    {post.rank}
                  </p>
                  <p className="line-clamp-1 font-medium">{post.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 전문가칼럼 */}
        <a
          className="flex flex-col bg-white w-[283px] gap-2 rounded-lg p-[28px]"
          href={expertColumn.href}
        >
          <p className="text-primary-500 text-sm/[normal] font-medium">
            {expertColumn.category}
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-bold break-all line-clamp-2 text-xl/[26px]">
              {expertColumn.title}
            </p>
            <p className="font-normal break-all text-[#788194] line-clamp-3 text-sm/5">
              {expertColumn.content}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Image
                alt={`프로필 사진-${expertColumn.author.name}`}
                loading="lazy"
                width={30}
                height={30}
                className="h-[30px] w-[30px] rounded-full object-cover"
                src={expertColumn.author.profileImage}
              />
              <div className="flex items-center gap-0.5">
                <p className="text-sm/[normal] font-medium tracking-[0.14px]">
                  {expertColumn.author.name}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    fill="#FAA53D"
                    d="M8.487 2.136c.316-.181.71-.181 1.026 0l1.323.76c.13.074.275.12.425.132l1.537.13a1 1 0 0 1 .83.577l.604 1.36c.059.133.148.252.262.346l1.164.971c.277.231.4.59.317.934l-.346 1.44a.9.9 0 0 0 0 .428l.346 1.44a.93.93 0 0 1-.317.934l-1.164.97a.96.96 0 0 0-.262.347l-.605 1.36a1 1 0 0 1-.829.577l-1.537.13c-.15.013-.296.058-.425.132l-1.323.76c-.316.181-.71.181-1.026 0l-1.323-.76a1 1 0 0 0-.425-.132l-1.537-.13a1 1 0 0 1-.83-.577l-.604-1.36a.96.96 0 0 0-.262-.346l-1.164-.971a.93.93 0 0 1-.317-.934l.346-1.44a.9.9 0 0 0 0-.428l-.346-1.44a.93.93 0 0 1 .317-.934l1.164-.97a.96.96 0 0 0 .262-.347l.605-1.36a1 1 0 0 1 .829-.577l1.537-.13c.15-.013.296-.058.425-.132z"
                  ></path>
                  <path
                    fill="#fff"
                    d="m6.78 8.458-1.164-.474a.5.5 0 0 0-.65.657l1.2 2.859h5.667l1.2-2.86a.5.5 0 0 0-.65-.656l-1.163.474a.5.5 0 0 1-.62-.211L9.432 6.242a.5.5 0 0 0-.864 0L7.4 8.247a.5.5 0 0 1-.62.211"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </a>

        {/* 월부 레터 배너 */}
        <a
          href="https://weolbu.stibee.com"
          target="_blank"
          className="relative cursor-pointer h-full w-[283px]"
          rel="noreferrer"
        >
          <div className="relative cursor-pointer h-full w-[283px]">
            <Image
              alt="월부 레터"
              loading="lazy"
              width={849}
              height={750}
              className="h-full w-auto bg-transparent"
              src="https://build.weolbu.com/_next/static/media/community-wb-letter-banner-pc.82a1c3b4.webp"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
