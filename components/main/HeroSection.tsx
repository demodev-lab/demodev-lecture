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
      className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 touch-target w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center group transition-all duration-200 focus-visible-ring"
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
      className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 touch-target w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center group transition-all duration-200 focus-visible-ring"
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

  // React Slick 설정 - 세밀한 반응형 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 기본: 3개 표시
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "80px",
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    initialSlide: 0,
    mobileFirst: false,
    rtl: false,
    // 모바일 터치 최적화
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 2560, // 초대형 모니터
        settings: {
          slidesToShow: 3.5,
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 1920, // Full HD
        settings: {
          slidesToShow: 3,
          centerPadding: "80px",
        }
      },
      {
        breakpoint: 1440, // 노트북
        settings: {
          slidesToShow: 2.5,
          centerPadding: "60px",
        }
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 2.2,
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 1.8,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768, // md - 태블릿 및 모바일
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // centerMode 활성화로 무한 루프 개선
          centerPadding: "40px", // 양옆 슬라이드가 살짝 보이도록
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          touchThreshold: 10,
          speed: 300,
        }
      },
      {
        breakpoint: 640, // sm - 모바일
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          touchThreshold: 10,
          speed: 300,
        }
      },
      {
        breakpoint: 480, // xs - 소형 모바일
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
          arrows: false,
          dots: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 4000,
          swipe: true,
          swipeToSlide: true,
          touchMove: true,
          touchThreshold: 10,
          speed: 300,
        }
      }
    ]
  };

  if (!mounted) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="relative py-3 sm:py-4 lg:py-6 px-4 sm:px-0">
          <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel - 모바일에서는 컨테이너 너빔, 데스크톱에서는 전체 화면 너빔 */}
      <div className="relative py-3 sm:py-4 lg:py-6 px-4 sm:px-0">
        <div 
          className="sm:mx-[-50vw] sm:w-[100vw] sm:relative sm:left-[50%] sm:right-[50%]"
        >
        <div className="hero-carousel-wrapper w-full hero-mobile-fix">
          <Slider {...settings} className="hero-slider">
            {slides.map((slide, index) => (
              <div key={slide.id} className="px-0 sm:px-2 lg:px-3">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 gpu-accelerated">
                  <a 
                    href={slide.href} 
                    className="block relative w-full"
                    aria-label={`슬라이드 ${index + 1}`}
                  >
                    {/* 반응형 이미지 컨테이너 - 모바일 최적화 */}
                    <div className="relative w-full">
                      {/* 모바일에서 고정 높이, 데스크톱은 aspect ratio 사용 */}
                      <div className="relative w-full h-[200px] sm:h-[250px] md:h-auto md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2/1]">
                        <Image
                          src={slide.image}
                          alt={`Hero banner ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, (max-width: 1600px) 40vw, 33vw"
                          className="object-cover"
                          priority={index < 3}
                          quality={95}
                          style={{ 
                            objectPosition: 'center' 
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* 그라데이션 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      </div>
    </section>
  );
}