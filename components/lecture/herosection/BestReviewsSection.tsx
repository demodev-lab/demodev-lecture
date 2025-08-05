import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function BestReviewsSection() {
  return (
    <div className="mt-16">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          베스트 수강 후기
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Review 1 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-brand-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">우</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">
                      우아한법
                    </span>
                    <span className="text-sm text-gray-500">4일전</span>
                    <span className="text-sm text-gray-500">학생</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                실무에서 정말 도움이 되는 강의입니다. 특히 AI 도구들을 실제로 어떻게 활용해야 하는지 명확하게 알려주셔서 바로 적용할 수 있었어요.
                강사님의 설명도 이해하기 쉽고, 실습 위주로 진행되어서 지루하지 않았습니다. 개발을 처음 시작하는 분들에게 강력히 추천합니다!
              </p>
            </CardContent>
          </Card>

          {/* Review 2 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">빛</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">
                      빛나우투다
                    </span>
                    <span className="text-sm text-gray-500">40대</span>
                    <span className="text-sm text-gray-500">학생</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                40대에 개발을 시작하면서 걱정이 많았는데, 이 강의 덕분에 자신감을 얻었습니다.
                AI 도구들이 이렇게 강력한지 몰랐어요. 복잡할 것 같았던 웹 개발이 생각보다 접근하기 쉽더라구요.
                나이와 상관없이 누구나 따라할 수 있도록 친절하게 가르쳐주셔서 감사합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}