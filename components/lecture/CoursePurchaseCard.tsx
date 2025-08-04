import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Lecture } from "@/app/lecture/[id]/lectures";
import { formatPrice, getDiscountRate } from "@/lib/lecture-utils";

interface CoursePurchaseCardProps {
  lecture: Lecture;
}

export default function CoursePurchaseCard({ lecture }: CoursePurchaseCardProps) {
  const discountRate = getDiscountRate(lecture.price);

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Title and Rating */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-black text-white text-xs px-2 py-1 rounded font-bold">
              ORIGINAL
            </span>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
              LIVE
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3">
            {lecture.title}
          </h2>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(lecture.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-900">
              {lecture.rating}
            </span>
            <span className="text-blue-600 text-sm">
              {lecture.reviews?.toLocaleString()}개 후기
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-red-500 font-bold">
                {discountRate}%
              </span>
              <span className="text-gray-400 line-through text-sm">
                {lecture.price.original.toLocaleString()}원
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {formatPrice(lecture.price)}
            </div>
          </div>
        </div>

        {/* Course Options */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            수강 옵션
          </h4>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">
                  온라인 강의+라이브코칭
                </p>
                <p className="text-sm text-gray-600">
                  강의 토요일에 라이브코칭으로 질의응답까지
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {formatPrice(lecture.price)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">
              상품 금액
            </span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(lecture.price)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" aria-label="관심 강의로 추가">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
              강의 구매하기
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}