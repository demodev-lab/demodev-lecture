"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  title: string;
  instructor?: string;
  category: string;
  rating: number | null;
  reviews: number | null;
  image: string;
  badge: string;
  url: string;
  isNew?: boolean;
}

export default function CourseCard({
  title,
  instructor,
  category,
  rating,
  reviews,
  image,
  badge,
  url,
  isNew,
}: CourseCardProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          <Image
            src={image}
            alt={title}
            className="w-full object-cover rounded-t-lg"
            width={300}
            height={192}
          />

          {/* Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-black/70 text-white text-xs"
          >
            {badge}
          </Badge>

          {/* New Badge */}
          {isNew && (
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-red-500 text-white text-xs"
            >
              NEW
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {instructor && (
            <p className="text-sm text-gray-600 mb-3">{instructor}</p>
          )}

          <p className="text-sm text-gray-500 mb-3">{category}</p>

          {/* Rating */}
          {rating && reviews && (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">
                ⭐ {rating}
              </span>
              <span className="text-xs text-gray-500">({reviews})</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
