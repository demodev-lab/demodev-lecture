"use client";

import { Flame, BarChart3, BookOpen, FileText } from "lucide-react";

// 더미 데이터
const dummyLearningData = {
  weeklyGoal: 3, // 주간 목표 강의 수
  completedThisWeek: 0,
  level: 1,
  levelName: "마음은부자",
  weeklyProgress: [
    { day: "1단계", completed: false },
    { day: "2단계", completed: false },
    { day: "3단계", completed: false },
    { day: "4단계", completed: false },
  ],
  stats: {
    studying: 0,
    completed: 0,
    liked: 0,
  },
  recentActivity: {
    popularPost: {
      views: 0,
      total: 3,
    }
  }
};

export default function MyPageDashboard() {
  return (
    <div className="space-y-6">
      {/* 학습 현황 카드 */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              {dummyLearningData.levelName} 
              <span className="ml-1 sm:ml-2 text-blue-600">Lv.{dummyLearningData.level}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              팔로워 {dummyLearningData.stats.studying} · 팔로잉 {dummyLearningData.stats.completed} · 획득 뱃지 {dummyLearningData.stats.liked}
            </p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
            후기 쓰기
          </button>
        </div>

        {/* 주간 학습 진행도 */}
        <div className="border-t pt-4 sm:pt-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h4 className="font-medium flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              인기글 조회
            </h4>
            <span className="text-xs sm:text-sm text-gray-500">
              {dummyLearningData.recentActivity.popularPost.views}/{dummyLearningData.recentActivity.popularPost.total}
            </span>
          </div>

          {/* 주간 진행 상태 */}
          <div className="flex justify-between items-center">
            {dummyLearningData.weeklyProgress.map((stage, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">{stage.day}</div>
                <div className="relative">
                  <div className="h-20 sm:h-24 md:h-32 bg-gray-100 rounded-lg mx-1 sm:mx-2">
                    {/* 진행도 바 */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${
                        stage.completed ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                      style={{ height: stage.completed ? '100%' : '10%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 및 콘텐츠 */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* 탭 헤더 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button className="px-6 py-4 text-sm font-medium text-gray-900 border-b-2 border-gray-900">
              강의
            </button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              과제 관리
            </button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
              조편성
            </button>
          </div>
        </div>

        {/* 빈 상태 메시지 */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 text-base">
              아직 수강한 강의가 없어요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}