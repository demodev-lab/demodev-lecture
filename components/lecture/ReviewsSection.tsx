import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface ReviewsSectionProps {
  lecture: Lecture;
}

export default function ReviewsSection({ lecture }: ReviewsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            후기
          </h2>
          <span className="text-gray-600 font-medium">
            총 {lecture.reviews?.toLocaleString()}개
          </span>
        </div>

        {/* Rating Overview */}
        <div className="mb-8">
          <div className="flex items-center space-x-8">
            {/* Overall Rating */}
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(lecture.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-gray-900">{lecture.rating}</span>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1 max-w-md">
              {[
                { stars: 5, count: Math.floor((lecture.reviews || 0) * 0.85), color: 'bg-blue-500' },
                { stars: 4, count: Math.floor((lecture.reviews || 0) * 0.12), color: 'bg-blue-400' },
                { stars: 3, count: Math.floor((lecture.reviews || 0) * 0.02), color: 'bg-gray-300' },
                { stars: 2, count: Math.floor((lecture.reviews || 0) * 0.008), color: 'bg-gray-300' },
                { stars: 1, count: Math.floor((lecture.reviews || 0) * 0.002), color: 'bg-gray-300' }
              ].map((item) => (
                <div key={item.stars} className="flex items-center space-x-3 mb-1">
                  <span className="text-sm text-gray-600 w-3">{item.stars}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / (lecture.reviews || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="space-y-4 mb-6">
          {/* Gender Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 mr-2">성별</span>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
              전체
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              남성 {Math.floor((lecture.reviews || 0) * 0.27).toLocaleString()}
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              여성 {Math.floor((lecture.reviews || 0) * 0.73).toLocaleString()}
            </button>
          </div>

          {/* Age Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 mr-2">나이</span>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
              전체
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              20대 {Math.floor((lecture.reviews || 0) * 0.17).toLocaleString()}
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              30대 {Math.floor((lecture.reviews || 0) * 0.33).toLocaleString()}
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              40대 {Math.floor((lecture.reviews || 0) * 0.25).toLocaleString()}
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              50대 이상 {Math.floor((lecture.reviews || 0) * 0.25).toLocaleString()}
            </button>
          </div>

          {/* Experience Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 mr-2">학습정도</span>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full font-medium">
              전체
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              처음강의에요 {Math.floor((lecture.reviews || 0) * 0.28).toLocaleString()}
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">유용한순</span>
            <button className="text-sm text-gray-500 hover:text-gray-700">최신순</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">별점순</button>
          </div>
        </div>

        {/* Review Items */}
        <div className="space-y-6">
          {/* Sample Review 1 */}
          <div className="border-b pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">우</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">우유병</span>
                  <span className="text-sm text-gray-500">30대</span>
                  <span className="text-sm text-gray-500">여성</span>
                  <span className="text-sm text-gray-500">처음강</span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium">5.0</span>
                  <span className="ml-4 text-sm text-gray-500">2024-11-28</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  처음 강의를 들었는데 정말 만족스러웠습니다. AI 도구들을 실제로 어떻게 활용해야 하는지 명확하게 알려주셔서 바로 적용할 수 있었어요. 
                  강사님의 설명도 이해하기 쉽고, 실습 위주로 진행되어서 지루하지 않았습니다. 개발을 처음 시작하는 분들에게 강력히 추천합니다!
                </p>
                <p className="text-gray-600 text-sm">
                  초보자도 무리 없이 대화형으로 교감할 수 있어서 정말 좋았습니다.
                  정말 쉽게만지자고, 쓸 수 있어야 좋았고요.
                  현재 강의에 대해서도 좋아보고 강의를 들고있는데 정말이를 돌려주자머니 실질적으로
                  수익을 하게 되어보고 정말 좋았고요.
                </p>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    <span className="mr-1">👍</span>
                    <span className="mr-2">8</span>
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    더보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Review 2 */}
          <div className="border-b pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">김</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">김개발자</span>
                  <span className="text-sm text-gray-500">40대</span>
                  <span className="text-sm text-gray-500">남성</span>
                  <span className="text-sm text-gray-500">처음강</span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-medium">5.0</span>
                  <span className="ml-4 text-sm text-gray-500">2024-11-27</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  40대에 개발을 시작하면서 걱정이 많았는데, 이 강의 덕분에 자신감을 얻었습니다. 
                  AI 도구들이 이렇게 강력한지 몰랐어요. 복잡할 것 같았던 웹 개발이 생각보다 접근하기 쉽더라구요. 
                  나이와 상관없이 누구나 따라할 수 있도록 친절하게 가르쳐주셔서 감사합니다.
                </p>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    <span className="mr-1">👍</span>
                    <span className="mr-2">12</span>
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    더보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Review 3 */}
          <div className="border-b pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">이</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">이학습자</span>
                  <span className="text-sm text-gray-500">20대</span>
                  <span className="text-sm text-gray-500">여성</span>
                  <span className="text-sm text-gray-500">처음강</span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2 text-sm font-medium">4.0</span>
                  <span className="ml-4 text-sm text-gray-500">2024-11-26</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  전반적으로 좋은 강의였습니다. AI 도구 사용법을 차근차근 알려주셔서 도움이 많이 되었어요. 
                  다만 조금 더 실전 예제가 많았으면 좋았을 것 같아요. 그래도 초보자 입장에서는 충분히 만족스러운 강의였습니다.
                </p>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    <span className="mr-1">👍</span>
                    <span className="mr-2">5</span>
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    더보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            후기 더보기
          </button>
        </div>
      </CardContent>
    </Card>
  );
}