"use client";

import React from "react";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";
import { Heart, Star, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FavoriteLectures() {
  const { favoriteLectures, removeFromFavorites } = useFavoriteLectures();

  if (favoriteLectures.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center py-12">
          <Heart className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">관심 강의가 없습니다</h3>
          <p className="text-sm text-gray-400">강의 상세 페이지에서 하트 버튼을 눌러 관심 강의로 추가해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">관심 클래스</h2>
          <span className="text-sm text-gray-500">
            총 {favoriteLectures.length}개의 강의
          </span>
        </div>
      </div>

      {/* 관심 강의 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteLectures.map((lecture) => (
          <div key={lecture.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* 썸네일 */}
            <div className="aspect-video relative bg-gray-200">
              <Image
                src={lecture.image}
                alt={lecture.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
              {/* 하트 버튼 */}
              <button
                onClick={() => removeFromFavorites(lecture.id)}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                aria-label="관심 강의에서 제거"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>

            {/* 내용 */}
            <div className="p-4">
              <Link href={`/lecture/${lecture.id}`} className="block">
                <h3 className="font-semibold text-gray-900 mb-2 text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                  {lecture.title}
                </h3>
              </Link>

              {/* 평점 */}
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-semibold text-gray-900">
                  {lecture.rating || '4.9'}
                </span>
                <span className="ml-1 text-xs text-gray-500">
                  ({lecture.reviews || 483})
                </span>
              </div>

              {/* 강사 및 카테고리 */}
              <div className="text-xs text-gray-600 mb-3">
                {lecture.instructor.name} • {lecture.category}
              </div>

              {/* 가격 */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-400 line-through">
                    {lecture.price.original.toLocaleString()}원
                  </span>
                  <span className="ml-2 font-bold text-gray-900">
                    {lecture.price.discounted 
                      ? lecture.price.discounted.toLocaleString() 
                      : lecture.price.original.toLocaleString()
                    }원
                  </span>
                </div>
                <Link
                  href={`/lecture/${lecture.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  상세보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 