import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface VideoHeroSectionProps {
  lecture: Lecture;
}

export default function VideoHeroSection({ lecture }: VideoHeroSectionProps) {
  return (
    <div className="relative">
      <div className="aspect-video relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl overflow-hidden">
        <Image
          src={lecture.image}
          alt={lecture.title}
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Badges Overlay */}
        <div className="absolute top-6 left-6 flex items-center space-x-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold">
            2025 NEW
          </span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
            {lecture.badge}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white text-3xl font-bold leading-tight mb-2">
            {lecture.title}
          </h1>
          <p className="text-gray-200 text-lg">
            {lecture.description}
          </p>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full p-6 transition-all">
            <PlayCircle className="w-16 h-16 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}