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

      {/* 학습 통계 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700">작성글</h4>
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyLearningData.stats.studying}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">전체 작성글 수</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700">댓글단 글</h4>
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyLearningData.stats.completed}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">참여한 글 수</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700">지정한 글</h4>
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyLearningData.stats.liked}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">북마크한 글 수</p>
        </div>
      </div>

      {/* 빈 상태 메시지 */}
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
        <p className="text-sm sm:text-base text-gray-500">작성글이 없습니다.</p>
        <button className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
          지금 가장 인기글 보러가기
        </button>
      </div>
    </div>
  );
}