"use client";

import { ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
            더보기
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((data) => (
            <Link
              key={data.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
              href={`/lecture/${data.id}`}
            >
              {/* Course Image */}
              <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
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

                {/* Favorite Icon - button을 div로 변경 */}
                <div
                  className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // 좋아요 기능 구현
                  }}
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {data.title}
                </h3>

                {/* Description */}
                {data.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {data.description}
                  </p>
                )}

                {/* Rating */}
                {data.rating && (
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {data.rating}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({data.reviews?.toLocaleString()})
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="text-sm text-gray-500 mb-3">
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
