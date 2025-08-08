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
      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 block cursor-pointer group overflow-hidden course-card"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden course-card-image">
        <Image
          src={lecture.image}
          alt={lecture.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Heart Icon */}
        <div 
          className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(lecture);
          }}
        >
          <Heart className={`h-5 w-5 transition-colors cursor-pointer ${
            isFavorite(lecture.id) 
              ? "text-red-500 fill-current" 
              : "text-gray-600"
          }`} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 course-card-content min-h-[120px] flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base leading-tight line-clamp-2 course-card-title">
            {lecture.title}
          </h3>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center mb-2 course-card-rating">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-semibold text-gray-900">
              {lecture.rating || '4.9'}
            </span>
            <span className="ml-1 text-sm text-gray-500">
              ({lecture.reviews || 483})
            </span>
          </div>

          {/* Instructor and Category */}
          <div className="text-sm text-gray-600 course-card-category">
            {lecture.instructor.name} • {lecture.category}
          </div>
        </div>
      </div>
    </Link>
  );
}