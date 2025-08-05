"use client";

import React, { useState } from "react";
import { Flame, BookOpen, Users, ClipboardList, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { getUserLectures } from "@/data/lectures";
import Image from "next/image";

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
    studying: 2,
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

const tabs = [
  {
    id: "lecture",
    label: "강의",
    icon: <BookOpen className="w-4 h-4 mr-1" />,
  },
  {
    id: "assignment",
    label: "과제 관리",
    icon: <ClipboardList className="w-4 h-4 mr-1" />,
  },
  {
    id: "group",
    label: "조편성",
    icon: <Users className="w-4 h-4 mr-1" />,
  },
];

type EmptyState = {
  icon: React.ReactNode;
  message: string;
  sub?: string;
};

export default function MyPageDashboard() {
  const [activeTab, setActiveTab] = useState("lecture");
  const userLectures = getUserLectures();

  // 빈 상태 메시지 탭별 내용
  const emptyStates: Record<string, EmptyState> = {
    lecture: {
      icon: <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />,
      message: "아직 수강한 강의가 없어요.",
      sub: "원하는 강의를 찾아 수강을 시작해보세요!",
    },
    assignment: {
      icon: <ClipboardList className="w-8 h-8 text-green-500 mx-auto mb-3" />,
      message: "아직 제출할 과제가 없어요.",
      sub: "과제가 등록되면 이곳에서 확인할 수 있어요.",
    },
    group: {
      icon: <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />,
      message: "아직 조편성이 이루어지지 않았어요.",
      sub: "조가 편성되면 이곳에서 확인할 수 있어요.",
    },
  };

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
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
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
                        stage.completed ? "bg-blue-500" : "bg-gray-200"
                      }`}
                      style={{ height: stage.completed ? "100%" : "10%" }}
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
        <div className="border-b border-gray-100 px-4 pt-2">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? "bg-gray-50 text-blue-600 border-b-2 border-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  }
                `}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.icon}
                {tab.label}
                {tab.id === "lecture" && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {dummyLearningData.stats.studying}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        {activeTab === "lecture" && userLectures.length > 0 ? (
          <div className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userLectures.map((lecture) => (
                <Link
                  key={lecture.id}
                  href={`/mypage/lectures/${lecture.id}`}
                  className="block bg-white rounded-lg border hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={lecture.thumbnail}
                      alt={lecture.title}
                      fill
                      className="object-cover"
                    />
                    {lecture.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${lecture.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                        {lecture.badge}
                      </span>
                      {lecture.progress === 100 && (
                        <span className="inline-block px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">
                          완료
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{lecture.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{lecture.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{Math.floor(lecture.totalDuration / 3600)}시간</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {lecture.progress > 0 ? (
                          <>
                            <PlayCircle className="w-3 h-3" />
                            <span>{lecture.completedChapters}/{lecture.totalChapters}</span>
                          </>
                        ) : (
                          <span>미수강</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 flex items-center justify-center min-h-[220px]">
            <div className="bg-gray-50 rounded-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
              {emptyStates[activeTab].icon}
              <p className="text-gray-700 text-base font-semibold mb-1">{emptyStates[activeTab].message}</p>
              {emptyStates[activeTab].sub && (
                <p className="text-gray-400 text-sm">{emptyStates[activeTab].sub}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
