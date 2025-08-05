"use client";

const reviews = [
  {
    id: 1,
    title: "코딩 지식 없이 랜딩페이지 손쉽게 만들 수 있네요",
    content:
      "처음엔 아무것도 몰랐지만, 따라만 해도 랜딩페이지를 뚝딱 만들 수 있었어요. 지금은 이 페이지로 제 서비스도 소개하고, 실제 운영까지 해보고 있습니다.",
    name: "김ㅇㅇ",
    category: "랜딩페이지 챌린지 참여",
  },
  {
    id: 2,
    title: "5일 만에 웹 크롤러 만들 수 있을 줄은 몰랐어요",
    content:
      "5일 만에 웹 크롤러를 만들 수 있을 줄은 몰랐어요. 실제로 써먹을 수 있는 지식을 배워서 너무 만족스럽습니다!",
    name: "박ㅇㅇ",
    category: "크롤링 마스터 챌린지 참여",
  },
  {
    id: 3,
    title: "체계적인 학습으로 기초부터 탄탄하게",
    content:
      "처음엔 막막했는데 단계별로 잘 구성된 커리큘럼 덕분에 차근차근 실력을 쌓을 수 있었습니다. 질문할 때마다 친절하게 답변해주셔서 감사했어요.",
    name: "이ㅇㅇ",
    category: "랜딩페이지 챌린지 참여",
  },
];

export default function StudentReviews() {
  return (
    <div className="w-full overflow-hidden bg-brand-50">
      <div className="mx-auto my-0 flex flex-col sm:flex-row justify-between max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 gap-6 sm:gap-8">
        {/* Left Section - Title and Description */}
        <div className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[283px]">
          <div className="font-bold text-[#1c2a4b] text-xl sm:text-2xl leading-8">수강생 후기</div>
          <div className="mt-2 text-sm sm:text-base leading-5 sm:leading-[22px] font-normal text-[#1c2a4b]">
            나도 할 수 있을까 고민이 된다면
            <br />
            수강생들의 성공 경험을 들어보세요.
          </div>
        </div>

        {/* Right Section - Review Cards */}
        <div
          className="relative w-full sm:max-w-[calc(100%-240px)] lg:max-w-[883px]"
          role="region"
          aria-roledescription="carousel"
        >
          <div className="overflow-hidden">
            <div
              className="flex relative -ml-2 sm:-ml-4"
              style={{ transform: "translate3d(0px, 0px, 0px)" }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  role="group"
                  aria-roledescription="slide"
                  className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-2 sm:pl-4"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 sm:p-5 lg:p-6 shadow-sm h-full flex flex-col">
                    <h3 className="font-bold text-[#1c2a4b] text-base sm:text-lg mb-2 sm:mb-3">
                      {review.title}
                    </h3>
                    <p className="text-[#666] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-4 flex-1">
                      {review.content}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm mt-auto pb-1 sm:pb-2">
                      <span className="font-medium text-[#1c2a4b]">
                        {review.name}
                      </span>
                      <span className="text-[#999]">{review.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
