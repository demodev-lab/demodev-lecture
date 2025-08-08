"use client";

import { ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export default function CourseSection({
  title,
  data,
  className = "",
}: CourseSectionProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLectures();
  
  // 제목에 따라 타입 결정
  const getType = () => {
    if (title.includes("챌린지")) return "challenge" as const;
    return "course" as const;
  };

  // react-slick 설정
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <section className={`py-4 sm:py-6 md:py-8 bg-transparent ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
            더보기
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
          </button>
        </div>

        {/* Course Carousel - 모바일에서는 가로 스크롤 */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {/* 데스크톱용 그리드 */}
          {data.map((courseData) => {
            // 챌린지인지 확인 (latpeed.com URL 포함 여부)
            const isChallenge = courseData.url.includes('latpeed.com');
            
            return (
              <Link
                key={courseData.id}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group block overflow-hidden"
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
                    sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer shadow-sm"
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
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                      isFavorite(courseData.id, getType()) ? "text-red-500 fill-current" : "text-gray-600"
                    }`} />
                  </div>
                </div>
                {/* Course Info */}
                <div className="p-4">
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
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900 ml-1">
                        {courseData.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({courseData.reviews?.toLocaleString()})
                      </span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    {courseData.category}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 모바일용 캐러셀 */}
        <div className="sm:hidden">
          <Slider {...sliderSettings} className="course-slider">
            {data.map((data) => {
              // 챌린지인지 확인 (latpeed.com URL 포함 여부)
              const isChallenge = data.url.includes('latpeed.com');
              
              return (
                <Link
                  key={data.id}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group block overflow-hidden w-[280px]"
                  href={isChallenge ? data.url : `/lecture/${data.id}`}
                  target={isChallenge ? "_blank" : "_self"}
                  rel={isChallenge ? "noopener noreferrer" : ""}
                >
                  {/* Course Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={data.image}
                      alt={data.title}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-md ${
                          data.badge === "BEST"
                            ? "bg-red-500 text-white"
                            : data.badge === "NEW"
                            ? "bg-green-500 text-white"
                            : data.isNew || data.badge.includes("2025")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {data.badge}
                      </span>
                    </div>

                    {/* Favorite Icon */}
                    <div
                      className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer shadow-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const lecture = {
                          id: data.id,
                          title: data.title,
                          instructor: { 
                            name: data.instructor || "데모데브", 
                            bio: "", 
                            avatar: "", 
                            experience: "",
                            specialties: []
                          },
                          description: data.description || "",
                          detailedDescription: "",
                          rating: data.rating,
                          reviews: data.reviews,
                          category: data.category,
                          image: data.image,
                          url: data.url,
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
                          badge: data.badge,
                          isNew: data.isNew,
                        };
                        toggleFavorite(lecture, getType());
                      }}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${
                        isFavorite(data.id, getType()) ? "text-red-500 fill-current" : "text-gray-600"
                      }`} />
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {data.title}
                    </h3>

                    {data.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {data.description}
                      </p>
                    )}

                    {data.rating && (
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900 ml-1">
                          {data.rating}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({data.reviews?.toLocaleString()})
                        </span>
                      </div>
                    )}

                    <div className="text-sm text-gray-500">
                      {data.category}
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
