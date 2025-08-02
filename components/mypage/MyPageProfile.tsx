"use client";

import { useState } from "react";
import { Heart, BookOpen, Award } from "lucide-react";

// 더미 데이터
const dummyProfileData = {
  courses: {
    studying: 0,
    completed: 0,
    liked: 0,
  },
  achievements: [],
  recentActivity: [],
};

interface Tab {
  id: string;
  label: string;
  count: number;
}

export default function MyPageProfile() {
  const [activeTab, setActiveTab] = useState("studying");

  const tabs: Tab[] = [
    { id: "studying", label: "작성글", count: dummyProfileData.courses.studying },
    { id: "completed", label: "댓글단 글", count: dummyProfileData.courses.completed },
    { id: "liked", label: "지정한 글", count: dummyProfileData.courses.liked },
  ];

  return (
    <div className="space-y-6">
      {/* 프로필 통계 카드 */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">프로필 통계</h3>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
            <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyProfileData.courses.studying}</p>
            <p className="text-xs sm:text-sm text-gray-500">수강 중</p>
          </div>
          
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
            <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyProfileData.courses.completed}</p>
            <p className="text-xs sm:text-sm text-gray-500">수강 완료</p>
          </div>
          
          <div className="text-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-red-600 mx-auto mb-1 sm:mb-2" />
            <p className="text-lg sm:text-xl md:text-2xl font-bold">{dummyProfileData.courses.liked}</p>
            <p className="text-xs sm:text-sm text-gray-500">찜한 강의</p>
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">계정 관리</h3>
        <div className="space-y-2 sm:space-y-3">
          <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-sm sm:text-base text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            비밀번호 변경
          </button>
          <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-sm sm:text-base text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            이메일 변경
          </button>
          <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-left text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-md transition-colors">
            로그아웃
          </button>
        </div>
      </div>

      {/* 활동 내역 탭 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} <span className="ml-1">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 빈 상태 */}
        <div className="p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-3 sm:mb-4">
            {activeTab === "studying" && <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />}
            {activeTab === "completed" && <Award className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />}
            {activeTab === "liked" && <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />}
          </div>
          <p className="text-sm sm:text-base text-gray-500">
            {activeTab === "studying" && "아직 수강 중인 강의가 없습니다."}
            {activeTab === "completed" && "아직 수강 완료한 강의가 없습니다."}
            {activeTab === "liked" && "아직 찜한 강의가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}