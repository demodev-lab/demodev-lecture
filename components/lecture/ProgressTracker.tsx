"use client";

import React, { useState, useEffect } from "react";
import { Lecture } from "@/types/lecture";
import { Award, Target, TrendingUp } from "lucide-react";
import { lectureStore } from "@/utils/lectureStore";

interface ProgressTrackerProps {
  lecture: Lecture;
  currentChapterId: string;
}

export default function ProgressTracker({ lecture, currentChapterId }: ProgressTrackerProps) {
  const [liveProgress, setLiveProgress] = useState(lecture.progress);
  const [completedChapters, setCompletedChapters] = useState(lecture.completedChapters);

  const currentChapterIndex = lecture.sections
    .flatMap(section => section.chapters)
    .findIndex(chapter => chapter.id === currentChapterId);

  const totalChapters = lecture.totalChapters;
  const currentChapterNumber = currentChapterIndex + 1;

  const nextChapter = lecture.sections
    .flatMap(section => section.chapters)
    .find((chapter, index) => index === currentChapterIndex + 1);

  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => liveProgress < m) || 100;

  // 실시간 진도 업데이트 구독
  useEffect(() => {
    const updateProgress = () => {
      const progressData = lectureStore.calculateOverallProgress(lecture.id);
      setLiveProgress(progressData.percentage);
      setCompletedChapters(progressData.completedChapters);
    };

    // 초기 진도 로드
    updateProgress();

    // lectureStore 변경 구독
    const unsubscribe = lectureStore.subscribe(updateProgress);

    return unsubscribe;
  }, [lecture.id]);

  // 현재 챕터의 개별 진도 가져오기
  const currentChapterProgress = lectureStore.getChapterProgress(lecture.id, currentChapterId);
  const currentChapterPercentage = currentChapterProgress?.progressPercentage || 0;

  return (
    <div className="space-y-4">
      {/* 통합 진도율 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">진도율</h3>
            {currentChapterPercentage > 0 && currentChapterPercentage < 100 && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                현재 {Math.round(currentChapterPercentage)}%
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{Math.round(liveProgress)}% ({completedChapters}/{totalChapters})</span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            {/* 전체 완료된 진도 (파란색) */}
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 absolute"
              style={{ width: `${liveProgress}%` }}
            />
            
            {/* 현재 챕터 진행 중인 부분 (연한 녹색으로 오버레이) */}
            {currentChapterPercentage > 0 && currentChapterPercentage < 100 && (
              <div
                className="bg-green-400/60 h-4 rounded-full transition-all duration-300 absolute"
                style={{ 
                  width: `${Math.min(liveProgress + (currentChapterPercentage * (100/totalChapters) / 100), 100)}%`,
                  left: `${liveProgress}%`
                }}
              />
            )}
            
            {/* 진도 표시기 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-sm transition-all duration-500"
              style={{ 
                left: `${Math.min(liveProgress + (currentChapterPercentage > 0 && currentChapterPercentage < 100 ? (currentChapterPercentage * (100/totalChapters) / 100) : 0), 100)}%`,
                transform: 'translateX(-50%) translateY(-50%)'
              }}
            />
          </div>
          
          {/* 마일스톤 표시 */}
          <div className="absolute top-0 left-0 w-full h-4 flex">
            {milestones.map(milestone => (
              <div
                key={milestone}
                className="relative"
                style={{ width: `${milestone}%` }}
              >
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 -mt-0.5 ${
                    liveProgress >= milestone ? "bg-blue-700" : "bg-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 진도 설명 */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>완료: {completedChapters}개</span>
          {currentChapterPercentage > 0 && currentChapterPercentage < 100 && (
            <span>시청 중: {Math.round(currentChapterPercentage)}%</span>
          )}
          <span>남은 강의: {totalChapters - completedChapters}개</span>
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
      {liveProgress >= 25 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">획득한 배지</h4>
          <div className="flex gap-3">
            {liveProgress >= 25 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">시작</span>
              </div>
            )}
            {liveProgress >= 50 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">중간</span>
              </div>
            )}
            {liveProgress >= 75 && (
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-600">막바지</span>
              </div>
            )}
            {liveProgress === 100 && (
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
      {liveProgress < 100 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">다음 목표</p>
              <p className="text-xs text-blue-700 mt-1">
                {currentMilestone}% 달성까지 {Math.max(0, currentMilestone - Math.round(liveProgress))}% 남았어요!
              </p>
            </div>
            <div className="text-2xl font-bold text-blue-600">{currentMilestone}%</div>
          </div>
        </div>
      )}
    </div>
  );
}