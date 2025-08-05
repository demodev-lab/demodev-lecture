"use client";

import React from "react";
import { Lecture } from "@/types/lecture";
import { Award, Target, TrendingUp } from "lucide-react";

interface ProgressTrackerProps {
  lecture: Lecture;
  currentChapterId: string;
}

export default function ProgressTracker({ lecture, currentChapterId }: ProgressTrackerProps) {
  const currentChapterIndex = lecture.sections
    .flatMap(section => section.chapters)
    .findIndex(chapter => chapter.id === currentChapterId);

  const totalChapters = lecture.totalChapters;
  const currentChapterNumber = currentChapterIndex + 1;

  const nextChapter = lecture.sections
    .flatMap(section => section.chapters)
    .find((chapter, index) => index === currentChapterIndex + 1);

  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => lecture.progress < m) || 100;

  return (
    <div className="space-y-4">
      {/* 전체 진도율 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">전체 진도율</h3>
          <span className="text-sm text-gray-500">{Math.round(lecture.progress)}%</span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${lecture.progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-sm" />
            </div>
          </div>
          {/* 마일스톤 표시 */}
          <div className="absolute top-0 left-0 w-full h-3 flex">
            {milestones.map(milestone => (
              <div
                key={milestone}
                className="relative"
                style={{ width: `${milestone}%` }}
              >
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 -mt-1 ${
                    lecture.progress >= milestone ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 현재 챕터 정보 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">{currentChapterNumber}</span>
          </div>
          <div>
            <p className="text-sm font-medium">현재 수강 중</p>
            <p className="text-xs text-gray-500">전체 {totalChapters}개 중</p>
          </div>
        </div>
        {nextChapter && (
          <div className="text-right">
            <p className="text-xs text-gray-500">다음 강의</p>
            <p className="text-sm font-medium line-clamp-1">{nextChapter.title}</p>
          </div>
        )}
      </div>

      {/* 성취 배지 */}
      {lecture.progress >= 25 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">획득한 배지</h4>
          <div className="flex gap-3">
            {lecture.progress >= 25 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-bronze rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">시작</span>
              </div>
            )}
            {lecture.progress >= 50 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">중간</span>
              </div>
            )}
            {lecture.progress >= 75 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">막바지</span>
              </div>
            )}
            {lecture.progress === 100 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600 font-semibold">완주!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 다음 목표 */}
      {lecture.progress < 100 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">다음 목표</p>
              <p className="text-xs text-blue-700 mt-1">
                {currentMilestone}% 달성까지 {currentMilestone - Math.round(lecture.progress)}% 남았어요!
              </p>
            </div>
            <div className="text-2xl font-bold text-blue-600">{currentMilestone}%</div>
          </div>
        </div>
      )}
    </div>
  );
}