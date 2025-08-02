import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface LectureCardProps {
  lecture: Lecture;
}

export default function LectureCard({ lecture }: LectureCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Thumbnail */}
      <div className="aspect-video relative bg-gray-200 overflow-hidden">
        <Image
          src={lecture.image}
          alt={lecture.title}
          fill
          className="object-cover"
        />
        {/* Heart Icon */}
        <div className="absolute top-3 right-3">
          <Heart className="h-6 w-6 text-white" />
        </div>
        
        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <Badge className="bg-black text-white text-xs font-bold">
            ORIGINAL
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
          {lecture.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">{lecture.rating || '4.9'}</span>
          <span className="ml-1 text-sm text-gray-500">
            ({lecture.reviews || 483}) {lecture.category}
          </span>
        </div>
      </div>
    </div>
  );
}