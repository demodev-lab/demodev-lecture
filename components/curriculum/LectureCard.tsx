import { Star, Heart } from "lucide-react";
import Image from "next/image";
import { Lecture } from "@/app/lecture/[id]/lectures";
import { useFavoriteLectures } from "@/contexts/FavoriteLecturesContext";

interface LectureCardProps {
  lecture: Lecture;
}

export default function LectureCard({ lecture }: LectureCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLectures();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Thumbnail */}
      <div className="aspect-video relative bg-gray-200 overflow-hidden">
        <Image
          src={lecture.image}
          alt={lecture.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Heart Icon */}
        <div 
          className="absolute top-4 right-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(lecture);
          }}
        >
          <Heart className={`h-7 w-7 transition-opacity cursor-pointer ${
            isFavorite(lecture.id) 
              ? "text-red-500 fill-current opacity-100" 
              : "text-white fill-white opacity-80 hover:opacity-100"
          }`} />
        </div>
        {/* No badges */}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-3 text-base leading-snug line-clamp-2">
          {lecture.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-2 text-base font-semibold text-gray-900">
            {lecture.rating || '4.9'}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            ({lecture.reviews || 483})
          </span>
        </div>

        {/* Instructor and Category */}
        <div className="text-sm text-gray-600">
          {lecture.instructor.name} • {lecture.category}
        </div>
      </div>
    </div>
  );
}