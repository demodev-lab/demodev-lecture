"use client";

import { ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";

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
  return (
    <section className={`py-8 sm:py-10 md:py-12 bg-transparent ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            더보기
            <ChevronRight className="w-4 h-4 ml-0.5 sm:ml-1" />
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {data.map((data) => (
            <Link
              key={data.id}
              className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
              href={`/lecture/${data.id}`}
            >
              {/* Course Image */}
              <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />

                {/* Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <span
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium rounded ${
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
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Course 데이터를 Lecture 형태로 변환
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
                  <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                    isFavorite(data.id, getType()) ? "text-red-500 fill-current" : "text-gray-600"
                  }`} />
                </div>
              </div>

              {/* Course Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 leading-tight">
                  {data.title}
                </h3>

                {/* Description */}
                {data.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    {data.description}
                  </p>
                )}

                {/* Rating */}
                {data.rating && (
                  <div className="flex items-center mb-1.5 sm:mb-2">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900 ml-0.5 sm:ml-1">
                      {data.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-0.5 sm:ml-1">
                      ({data.reviews?.toLocaleString()})
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="text-xs sm:text-sm text-gray-500">
                  {data.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
