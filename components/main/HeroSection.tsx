"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  {
    id: 6,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_6.png",
    textColor: "white",
    backgroundColor: "#312292",
    href: "#",
  },
  {
    id: 7,
    title: "",
    subtitle: "",
    image: "/carousel/Frame_7.png",
    textColor: "white",
    backgroundColor: "#312292",
    href: "#",
  },
];


// Custom Arrow Components for React Slick
interface CustomArrowProps {
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
}

const CustomPrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button 
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center group transition-all duration-200"
      aria-label="이전 슬라이드"
    >
      <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

const CustomNextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button 
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center group transition-all duration-200"
      aria-label="다음 슬라이드"
    >
      <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // React Slick 설정 - 큰 화면에서는 3개, 작은 화면에서는 1개 슬라이드
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 기본: 큰 화면에서 3개 슬라이드 표시
    slidesToScroll: 1,
    centerMode: true, // 중앙 정렬
    centerPadding: "0%", // 양쪽 패딩
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1200, // 1200px 이하에서 1개 슬라이드만 표시
        settings: {
          slidesToShow: 1,
          centerPadding: "8%",
        }
      },
      {
        breakpoint: 768, // 모바일
        settings: {
          slidesToShow: 1,
          centerPadding: "60px",
        }
      },
      {
        breakpoint: 480, // 작은 모바일
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        }
      }
    ]
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Carousel with React Slick */}
      <div className="relative py-8 w-full">
        <div className="hero-carousel-wrapper w-full">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide.id} className="px-22 py-1">
                <div className="relative overflow-hidden h-[280px] sm:h-[360px] md:h-[400px] lg:h-[428px] xl:h-[450px] max-w-[720px] rounded-xl mx-auto bg-white shadow-lg">
                  <a href={slide.href} className="block relative h-full w-full">
                    <Image
                      src={slide.image}
                      alt="banner"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 60vw, 720px"
                      className="object-cover rounded-xl"
                      priority
                      quality={100}
                    />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

