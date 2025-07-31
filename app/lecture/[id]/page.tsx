import {
  lectures,
  getLevelText,
  formatPrice,
  getDiscountRate,
} from "./lectures";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Users,
  Globe,
  CheckCircle,
  PlayCircle,
  Star,
} from "lucide-react";

interface LecturePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LecturePage({ params }: LecturePageProps) {
  const { id } = await params;
  const lectureId = parseInt(id);
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) {
    notFound();
  }

  const discountRate = getDiscountRate(lecture.price);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-600">
            <span>홈</span>
            <span className="mx-2">{">"}</span>
            <span>{lecture.category}</span>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-900 font-medium">강의 상세</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Section with Overlay Info */}
            <div className="relative">
              <div className="aspect-video relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl overflow-hidden">
                <Image
                  src={lecture.image}
                  alt={lecture.title}
                  fill
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

            {/* Best Reviews Section */}
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
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
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

            {/* Meta Information */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>총 {lecture.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {lecture.enrolledStudents.toLocaleString()}명 수강중
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{lecture.language}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-700"
                    >
                      {getLevelText(lecture.level)}
                    </Badge>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center mt-6 pt-6 border-t">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">
                      {lecture.instructor.name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">
                        {lecture.instructor.name}
                      </p>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">
                        {lecture.instructor.experience} 경력
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {lecture.instructor.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  강의 소개
                </h2>
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {lecture.detailedDescription}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  이런 걸 배워요
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lecture.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
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

            {/* Reviews Section */}
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
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Info Card */}
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
                      <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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

              {/* Additional Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    강의 정보
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 강의 시간</span>
                      <span className="font-medium">{lecture.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">수강생</span>
                      <span className="font-medium">
                        {lecture.enrolledStudents.toLocaleString()}명
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">난이도</span>
                      <span className="font-medium">
                        {getLevelText(lecture.level)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">강사</span>
                      <span className="font-medium">
                        {lecture.instructor.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">업데이트</span>
                      <span className="font-medium">
                        {lecture.lastUpdated}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for dynamic routes (선택사항)
export async function generateStaticParams() {
  return lectures.map((lecture) => ({
    id: lecture.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LecturePageProps) {
  const { id } = await params;
  const lectureId = parseInt(id);
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) {
    return {
      title: "강의를 찾을 수 없습니다",
    };
  }

  return {
    title: `${lecture.title} | DemoLearn`,
    description: lecture.description || `${lecture.title} 강의 상세 정보`,
  };
}