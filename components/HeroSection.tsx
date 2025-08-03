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
    image: "/hero_1.png",
    textColor: "white",
    backgroundColor: "rgb(59, 130, 246)",
    href: "#",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    image: "/hero_2.png",
    textColor: "white",
    backgroundColor: "rgb(37, 99, 235)",
    href: "#",
  },
  {
    id: 3,
    title: "",
    subtitle: "",
    image: "/hero_3.png",
    textColor: "white",
    backgroundColor: "rgb(29, 78, 216)",
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
      className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-20 text-black rounded-lg transition-all duration-300 flex items-center justify-center group"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
      className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-20  text-black rounded-lg transition-all duration-300 flex items-center justify-center group"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
      <div className="relative h-[240px] sm:h-[280px] md:h-[320px] lg:h-[340px] overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            centerMode={true}
            containerClass="py-6 sm:py-8"
            itemClass="px-1 sm:px-2 carousel-item-padding"
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
              <CarouselItem key={slide.id} className="px-1">
                <div
                  role="group"
                  aria-roledescription="slide"
                  className="relative overflow-hidden rounded-lg h-[200px] sm:h-[240px] md:h-[280px] lg:h-[280px] carousel-slide"
                >
                    <a href={slide.href} className="block h-full w-full">
                      {/* Background */}
                      <div
                        className="relative top-0 left-0 h-full w-full"
                        style={{ backgroundColor: slide.backgroundColor }}
                      />

                      {/* Image Container */}
                      <div className="absolute top-0 left-0 mx-auto my-0 flex h-full w-full justify-end p-0">
                        <div className="relative h-full w-full">
                          <Image
                            src={slide.image}
                            alt="banner"
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 z-[1] w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)]">
                          {slide.badge && (
                            <div className="mb-1 sm:mb-2 text-xs sm:text-sm font-normal break-keep text-white">
                              {slide.badge}
                            </div>
                          )}
                          <div className="mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl lg:text-[24px]/[30px] font-bold break-keep text-white">
                            {slide.title.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < slide.title.split("\n").length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs sm:text-sm md:text-base font-normal break-keep text-white">
                            {slide.subtitle}
                          </div>
                        </div>
                      </div>
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