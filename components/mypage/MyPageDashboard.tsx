"use client";

import React, { useState } from "react";
import { BookOpen, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { getUserLectures } from "@/data/lectures";
import Image from "next/image";


const tabs = [
  {
    id: "lecture",
    label: "강의",
    icon: <BookOpen className="w-4 h-4 mr-1" />,
  }
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
    }
  };

  return (
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
            </button>
          ))}
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
