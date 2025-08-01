import { Card, CardContent } from "@/components/ui/card";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface CurriculumSectionProps {
  lecture: Lecture;
}

export default function CurriculumSection({ lecture }: CurriculumSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            커리큘럼
          </h2>
          <span className="text-gray-600 font-medium">
            총 {lecture.chapters.length}개 수업
          </span>
        </div>

        <div className="space-y-2">
          {/* Section Header */}
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {lecture.title} 완주 가이드 및 핵심 포인트
                </h3>
                <p className="text-sm text-gray-600">
                  기초부터 실전까지
                </p>
              </div>
            </div>
            <span className="text-gray-600 font-medium">
              {lecture.chapters.length}강
            </span>
          </div>

          {/* Chapters List */}
          <div className="space-y-1">
            {lecture.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {chapter.isFree ? (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {chapter.title}
                      </h4>
                      {chapter.isFree && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-medium">
                          무료
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {chapter.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{chapter.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Section */}
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">
                보너스 자료 및 Q&A
              </h3>
            </div>

            <div className="space-y-2 ml-9">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.5.866L10 15.196l-4.5 1.67A1 1 0 014 16V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    실습용 소스 코드 및 참고 자료
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    강사와의 Q&A 세션
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    추가 학습 가이드 및 로드맵
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}