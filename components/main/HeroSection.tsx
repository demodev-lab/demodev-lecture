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

// Custom Arrow Components for react-slick
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomPrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !absolute !left-2 sm:!left-4 lg:!left-6 !top-1/2 !-translate-y-1/2 !w-10 !h-10 sm:!w-12 sm:!h-12 lg:!w-14 lg:!h-14 !text-white !bg-black/20 hover:!bg-black/40 !rounded-lg !transition-all !duration-300 !flex !items-center !justify-center !group !z-10`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
      aria-label="이전 슬라이드"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

const CustomNextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !absolute !right-2 sm:!right-4 lg:!right-6 !top-1/2 !-translate-y-1/2 !w-10 !h-10 sm:!w-12 sm:!h-12 lg:!w-14 lg:!h-14 !text-white !bg-black/20 hover:!bg-black/40 !rounded-lg !transition-all !duration-300 !flex !items-center !justify-center !group !z-10`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
      aria-label="다음 슬라이드"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // react-slick 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    focusOnSelect: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
        }
      }
    ]
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="relative">
      {/* Main Hero Carousel */}
      <div className="relative h-[428px] overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Slider {...settings} className="hero-slider">
            {slides.map((slide) => (
              <div key={slide.id} className="px-2">
                <div className="relative overflow-hidden h-[380px] carousel-slide">
                  <a href={slide.href} className="block relative h-full w-full">
                    <Image
                      src={slide.image}
                      alt={`슬라이드 ${slide.id}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain rounded-lg transition-transform duration-500 hover:scale-105"
                      priority={slide.id <= 3}
                      quality={90}
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

/* 
  Note: Additional carousel styling is handled through a CSS module or Tailwind's @layer directive
  to avoid global style pollution. The react-slick library requires some CSS overrides
  that can't be achieved with utility classes alone.
*/