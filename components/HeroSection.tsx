"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

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

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => prev + 1);
  }, []);

  // 자동 슬라이드 (개선: 수동 조작 시 타이머 초기화)
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(nextSlide, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isPlaying, nextSlide]);

  // '무한' 루프를 위한 트랜지션 및 슬라이드 인덱스 조정 로직
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;

    if (currentSlide === slides.length + 1) {
      setIsTransitionEnabled(false); // 트랜지션 비활성화
      setCurrentSlide(1); // 첫 번째 슬라이드로 점프
    } else if (currentSlide === 0) {
      setIsTransitionEnabled(false); // 트랜지션 비활성화
      setCurrentSlide(slides.length); // 마지막 슬라이드로 점프
    }
  };

  // 점프 후 트랜지션을 다시 활성화하는 useEffect
  useEffect(() => {
    if (!isTransitionEnabled) {
      // DOM이 업데이트되고(transform 적용) 난 후에 트랜지션을 다시 켜야 합니다.
      // setTimeout을 사용해 다음 이벤트 루프에서 실행하도록 합니다.
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50); // 짧은 지연
      return () => clearTimeout(timer);
    }
  }, [isTransitionEnabled]);

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative">
      {/* Main Hero Carousel */}
      <div className="relative h-[340px] overflow-hidden">
        <div className="flex justify-center items-center h-full">
          {/* 무한 순환 캐러셀 */}
          <div
            ref={carouselRef}
            className="flex items-center gap-4"
            style={{
              transform: `translateX(calc(50% - 392px - ${
                currentSlide * 784
              }px))`,
              width: `${extendedSlides.length * 784}px`,
              transition: isTransitionEnabled
                ? "transform 700ms ease-in-out"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* 확장된 배열을 렌더링에 사용 */}
            {extendedSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <div
                  key={`slide-${index}-${slide.id}`}
                  role="group"
                  aria-roledescription="slide"
                  className={`relative overflow-hidden rounded-lg transition-opacity duration-700 ease-in-out w-[760px] h-[280px] flex-shrink-0 ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
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
                          width={760}
                          height={280}
                          className="inline-block h-full w-full object-cover"
                          priority={isActive}
                        />
                      </div>

                      {/* Content - 활성 슬라이드에만 표시 */}
                      {isActive && (
                        <div className="absolute bottom-[40px] left-[40px] z-[1] w-[calc(100%-80px)] transition-all duration-300 ease-in-out">
                          {slide.badge && (
                            <div className="mb-2 text-sm font-normal break-keep text-white">
                              {slide.badge}
                            </div>
                          )}
                          <div className="mb-2 text-[24px]/[30px] font-bold break-keep text-white">
                            {slide.title.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < slide.title.split("\n").length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm/[18px] font-normal break-keep text-white">
                            {slide.subtitle}
                          </div>
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-10 justify-center w-full flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={prevSlide}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-white text-sm">
            {currentSlide === 0
              ? slides.length
              : currentSlide === slides.length + 1
              ? 1
              : currentSlide}
            /{slides.length}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
