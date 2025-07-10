"use client";

import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  likeCount: number;
  thumbnail: string;
  isLiked?: boolean;
  url: string;
}

export default function CourseCard({
  title,
  instructor,
  category,
  price,
  originalPrice,
  rating,
  ratingCount,
  likeCount,
  thumbnail,
  isLiked = false,
  url,
}: CourseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          <Image
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
            width={100}
            height={100}
          />
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-3 right-3 w-8 h-8 p-0 rounded-full ${
              isLiked
                ? "bg-red-100 text-red-500 hover:bg-red-200"
                : "bg-white/80 text-gray-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-black/70 text-white text-xs"
          >
            {category}
          </Badge>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mb-3">{instructor}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
            </div>
            <span className="text-xs text-gray-500">({ratingCount})</span>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{likeCount}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}원
                </span>
              )}
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(price)}원
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
