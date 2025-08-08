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
      className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-700 rounded-lg flex items-center justify-center group"
      aria-label="이전 슬라이드"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
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
      className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-700 rounded-lg  flex items-center justify-center group"
      aria-label="다음 슬라이드"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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

  // 반응형 설정 - 심플한 구성
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      infinite: true,
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1023, min: 768 },
      infinite: true,
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-visible">
      {/* Main Hero Carousel */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[428px] hero-carousel-container overflow-visible py-4">
        <div className="mx-auto px-2 sm:px-6 lg:px-8 overflow-hidden">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            centerMode={true}
            partialVisible={false}
            containerClass="hero-carousel-container"
            itemClass="hero-carousel-item"
            arrows={true}
            showDots={true}
            swipeable={true}
            draggable={true}
            focusOnSelect={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            dotListClass="hero-dots"
            additionalTransfrom={0}
            minimumTouchDrag={80}
            rewind={false}
            rewindWithAnimation={false}
          >
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="">
                <div
                  role="group"
                  aria-roledescription="slide"
                  className="relative overflow-hidden h-[230px] sm:h-[270px] md:h-[330px] lg:h-[380px] carousel-slide rounded-lg mx-auto"
                  style={{ width: "760px" }}
                >
                  <a href={slide.href} className="block relative h-full w-full">
                    <Image
                      src={slide.image}
                      alt="banner"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 85vw, 760px"
                      className="object-contain"
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