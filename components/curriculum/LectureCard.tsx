import { Star, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Lecture } from "@/app/lecture/[id]/lectures";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";

interface LectureCardProps {
  lecture: Lecture;
}

export default function LectureCard({ lecture }: LectureCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLectures();
  
  return (
    <Link 
      href={`/lecture/${lecture.id}`}
      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 block cursor-pointer group overflow-hidden h-full flex flex-col"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={lecture.image}
          alt={lecture.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 gpu-accelerated"
        />
        {/* Heart Icon */}
        <button 
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 touch-target-sm bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm focus-visible-ring"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(lecture);
          }}
          aria-label={isFavorite(lecture.id) ? "찜 해제" : "찜하기"}
        >
          <Heart className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
            isFavorite(lecture.id) 
              ? "text-red-500 fill-current" 
              : "text-gray-600"
          }`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base leading-tight line-clamp-2">
            {lecture.title}
          </h3>
        </div>

        <div className="mt-auto">
          {/* Rating */}
          <div className="flex items-center mb-1 sm:mb-2">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-xs sm:text-sm font-semibold text-gray-900">
              {lecture.rating || '4.9'}
            </span>
            <span className="ml-1 text-xs sm:text-sm text-gray-500">
              ({lecture.reviews || 483})
            </span>
          </div>

          {/* Instructor and Category */}
          <div className="text-xs sm:text-sm text-gray-600 line-clamp-1">
            {lecture.instructor.name} • {lecture.category}
          </div>
        </div>
      </div>
    </Link>
  );
}