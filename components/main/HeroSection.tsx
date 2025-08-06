"use client";

import Image from "next/image";
import Carousel, { ArrowProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  textColor: "white" | "black";
  backgroundColor: string;
  href: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_1.png",
    textColor: "white",
    backgroundColor: "#6659F4",
    href: "#",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_2_1.png",
    textColor: "white",
    backgroundColor: "#5142E8",
    href: "#",
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_3_1.png",
    textColor: "white",
    backgroundColor: "#432FD3",
    href: "#",
  },
  {
    id: 4,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_4.png",
    textColor: "white",
    backgroundColor: "#3A28B1",
    href: "#",
  },
  {
    id: 5,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_5.png",
    textColor: "white",
    backgroundColor: "#312292",
    href: "#",
  },
];

// CarouselItem 컴포넌트의 props 타입 정의
interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  carouselState?: unknown;
  rtl?: boolean;
}

// Custom Arrow Components to filter out unwanted props
const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
  // carouselState와 rtl을 제거하고 나머지 props만 사용
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const { carouselState, rtl, ...arrowProps } = rest as any;
  return (
    <button 
      {...arrowProps}
      onClick={onClick}
      className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-20 text-brand-700 rounded-lg transition-all duration-300 flex items-center justify-center group"
      aria-label="이전 슬라이드"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
  // carouselState와 rtl을 제거하고 나머지 props만 사용
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const { carouselState, rtl, ...arrowProps } = rest as any;
  return (
    <button 
      {...arrowProps}
      onClick={onClick}
      className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-20  text-brand-700 rounded-lg transition-all duration-300 flex items-center justify-center group"
      aria-label="다음 슬라이드"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// CarouselItem wrapper to filter out unwanted props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CarouselItem = ({ carouselState, rtl, ...props }: CarouselItemProps) => (
  <div {...props} />
);

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 모든 브레이크포인트에서 동일한 설정을 사용하므로 간소화
  const responsive = {
    all: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative">
      {/* Main Hero Carousel */}
      <div className="relative h-[428px] overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            centerMode={true}
            containerClass="py-6 sm:py-8"
            itemClass="px-0.5 carousel-item-padding"
            arrows={true}
            showDots={false}
            swipeable={true}
            draggable={true}
            focusOnSelect={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            dotListClass="!bottom-2 sm:!bottom-4"
          >
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="px-1 rounded-lg">
                <div
                  role="group"
                  aria-roledescription="slide"
                  className="relative overflow-hidden h-[428px] carousel-slide"
                >
                  <a href={slide.href} className="block relative h-full w-full">
                    <Image
                      src={slide.image}
                      alt="banner"
                      fill
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="object-contain rounded-lg"
                      priority
                      quality={100}
                    />
                  </a>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* 
  Note: Additional carousel styling is handled through a CSS module or Tailwind's @layer directive
  to avoid global style pollution. The react-multi-carousel library requires some CSS overrides
  that can't be achieved with utility classes alone.
*/