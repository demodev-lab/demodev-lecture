"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
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

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
        <div className="hero-carousel-wrapper">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            centerMode={true}
            containerClass="carousel-container"
            itemClass="carousel-item"
            dotListClass="custom-dot-list-style"
            arrows={true}
            showDots={true}
            swipeable={true}
            draggable={false}
            focusOnSelect={false}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="carousel-slide px-1">
                <div
                  role="group"
                  aria-roledescription="slide"
                  className="relative overflow-hidden rounded-lg h-[200px] sm:h-[240px] md:h-[280px] lg:h-[280px]"
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
                          className="object-cover scale-[1]"
                          priority
                        />
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-[20px] left-[20px] sm:bottom-[30px] sm:left-[30px] md:bottom-[40px] md:left-[40px] z-[1] w-[calc(100%-40px)] sm:w-[calc(100%-60px)] md:w-[calc(100%-80px)]">
                        {slide.badge && (
                          <div className="mb-2 text-sm font-normal break-keep text-white">
                            {slide.badge}
                          </div>
                        )}
                        <div className="mb-2 text-[18px]/[24px] sm:text-[20px]/[26px] md:text-[24px]/[30px] font-bold break-keep text-white">
                          {slide.title.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < slide.title.split("\n").length - 1 && (
                                <br />
                              )}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs/[16px] sm:text-sm/[18px] font-normal break-keep text-white">
                          {slide.subtitle}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <style jsx global>{`
        /* React Multi Carousel Custom Styles */
        .hero-carousel-wrapper {
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .hero-carousel-wrapper .carousel-container {
          padding: 30px 0;
        }
        
        .hero-carousel-wrapper .carousel-item {
          opacity: 0.4;
          transition: all 0.3s ease;
          transform: scale(0.85);
        }
        
        .hero-carousel-wrapper .react-multi-carousel-item--active {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Dots */
        .hero-carousel-wrapper .react-multi-carousel-dot-list {
          bottom: -30px;
          position: relative;
        }
        
        .hero-carousel-wrapper .react-multi-carousel-dot button {
          background: rgba(255, 255, 255, 0.5);
          border: none;
          width: 10px;
          height: 10px;
          margin: 0 4px;
        }
        
        .hero-carousel-wrapper .react-multi-carousel-dot--active button {
          background: rgba(255, 255, 255, 1);
        }
        
        /* Arrows */
        .hero-carousel-wrapper .react-multiple-carousel__arrow {
          background: rgba(0, 0, 0, 0.4);
          min-width: 60px;
          min-height: 80px;
          border-radius: 8px;
          transition: all 0.3s ease;
          opacity: 0.7;
        }
        
        .hero-carousel-wrapper .react-multiple-carousel__arrow:hover {
          background: rgba(0, 0, 0, 0.6);
          opacity: 1;
        }
        
        .hero-carousel-wrapper .react-multiple-carousel__arrow::before {
          color: #fff;
          font-size: 24px;
          font-weight: bold;
        }
        
        .hero-carousel-wrapper .react-multiple-carousel__arrow--left {
          left: 20px;
          padding-right: 15px;
        }
        
        .hero-carousel-wrapper .react-multiple-carousel__arrow--right {
          right: 20px;
          padding-left: 15px;
        }
        
        /* Center mode adjustment */
        .hero-carousel-wrapper .react-multi-carousel-track {
          display: flex !important;
          align-items: center;
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .hero-carousel-wrapper .carousel-item {
            opacity: 1;
            transform: scale(1);
          }
          
          .hero-carousel-wrapper .react-multiple-carousel__arrow {
            min-width: 50px;
            min-height: 70px;
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}