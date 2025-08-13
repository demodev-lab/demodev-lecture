"use client";

import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRef } from "react";

export interface Course {
  id: number;
  badge: string;
  title: string;
  instructor?: string;
  description?: string;
  rating: number | null;
  reviews: number | null;
  category: string;
  image: string;
  isNew?: boolean;
  url: string;
}

interface CourseSectionProps {
  title: string;
  data: Course[];
  className?: string;
}

// Custom Arrow Components
interface CustomArrowProps {
  onClick?: () => void;
  onMove?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carouselState?: any;
}

const CustomLeftArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-5 touch-target w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors focus-visible-ring hidden md:flex"
      aria-label="이전 슬라이드"
    >
      <ChevronLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-5 touch-target w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors focus-visible-ring hidden md:flex"
      aria-label="다음 슬라이드"
    >
      <ChevronRight className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default function CourseSection({
  title,
  data,
  className = "",
}: CourseSectionProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLectures();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carouselRef = useRef<any>(null);
  
  // 제목에 따라 타입 결정
  const getType = () => {
    if (title.includes("챌린지")) return "challenge" as const;
    return "course" as const;
  };

  // 반응형 설정 - 정수 아이템으로 깔끔하게
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 0,
    },
    laptop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
      slidesToSlide: 3,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 0,
    },
  };

  // 강의 카드 렌더링 함수
  const renderCourseCard = (courseData: Course) => {
    const isChallenge = courseData.url.includes('latpeed.com');
    
    return (
      <Link
        key={courseData.id}
        className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group block overflow-hidden h-full"
        href={isChallenge ? courseData.url : `/lecture/${courseData.id}`}
        target={isChallenge ? "_blank" : "_self"}
        rel={isChallenge ? "noopener noreferrer" : ""}
      >
        {/* Course Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={courseData.image}
            alt={courseData.title}
            fill
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 gpu-accelerated"
            priority={courseData.image === "/demodev_word.svg"}
          />
          {/* Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span
              className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded-md ${
                courseData.badge === "BEST"
                  ? "bg-red-500 text-white"
                  : courseData.badge === "NEW"
                  ? "bg-green-500 text-white"
                  : courseData.isNew || courseData.badge.includes("2025")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {courseData.badge}
            </span>
          </div>
          {/* Favorite Icon */}
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 rounded-full bg-white transition-colors shadow-sm touch-target-sm focus-visible-ring"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const lecture = {
                id: courseData.id,
                title: courseData.title,
                instructor: { 
                  name: courseData.instructor || "데모데브", 
                  bio: "", 
                  avatar: "", 
                  experience: "",
                  specialties: []
                },
                description: courseData.description || "",
                detailedDescription: "",
                rating: courseData.rating,
                reviews: courseData.reviews,
                category: courseData.category,
                image: courseData.image,
                url: courseData.url,
                duration: "",
                level: "beginner" as const,
                language: "한국어",
                lastUpdated: "",
                enrolledStudents: 0,
                price: { original: 0, currency: "KRW" },
                learningOutcomes: [],
                prerequisites: [],
                tags: [],
                chapters: [],
                certificateProvided: false,
                hasSubtitles: false,
                supportedDevices: [],
                badge: courseData.badge,
                isNew: courseData.isNew,
              };
              toggleFavorite(lecture, getType());
            }}
            aria-label={isFavorite(courseData.id, getType()) ? "찜 해제" : "찜하기"}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite(courseData.id, getType()) ? "text-red-500 fill-current" : "text-gray-600"
            }`} />
          </button>
        </div>
        {/* Course Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 leading-tight">
            {courseData.title}
          </h3>
          {courseData.description && (
            <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {courseData.description}
            </p>
          )}
          {courseData.rating && (
            <div className="flex items-center mb-2">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 ml-1">
                {courseData.rating}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1">
                ({courseData.reviews?.toLocaleString()})
              </span>
            </div>
          )}
          <div className="text-xs sm:text-sm text-gray-500">
            {courseData.category}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className={`py-6 sm:py-8 md:py-10 lg:py-12 bg-transparent ${className}`}>
      <div className="container-responsive">
        {/* Section Header - 월급쟁이 부자들 스타일 */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {/* 데스크톱용 네비게이션 버튼 - 더보기 대신 화살표 */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => carouselRef.current?.previous()}
              className="touch-target w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors focus-visible-ring"
              aria-label="이전"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => carouselRef.current?.next()}
              className="touch-target w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors focus-visible-ring"
              aria-label="다음"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Course Carousel - 모든 디바이스에서 캐러셀 사용 */}
        <div className="course-slider-container relative">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite={false}
            autoPlay={false}
            autoPlaySpeed={999999}
            arrows={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            showDots={false}
            swipeable={true}
            draggable={true}
            partialVisible={false}
            containerClass="course-carousel-container"
            itemClass="px-2 sm:px-3"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            ssr={false}
          >
            {data.map((courseData) => renderCourseCard(courseData))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}