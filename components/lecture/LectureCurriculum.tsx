"use client";

import React, { useState, useEffect } from "react";
import { Lecture, LectureSection } from "@/types/lecture";
import { ChevronDown, ChevronUp, PlayCircle, CheckCircle2, Clock, Award, Target, TrendingUp } from "lucide-react";
import { lectureStore } from "@/utils/lectureStore";

interface LectureCurriculumProps {
  lecture: Lecture;
  currentChapterId: string;
  onChapterSelect: (chapterId: string) => void;
}

export default function LectureCurriculum({
  lecture,
  currentChapterId,
  onChapterSelect,
}: LectureCurriculumProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    lecture.sections.map(section => section.id)
  );
  const [chapterProgress, setChapterProgress] = useState<Map<string, boolean>>(new Map());
  const [liveProgress, setLiveProgress] = useState(lecture.progress);
  const [completedChapters, setCompletedChapters] = useState(lecture.completedChapters);

  // 실시간 챕터 진도 업데이트
  useEffect(() => {
    const updateProgress = () => {
      const progressMap = new Map<string, boolean>();
      const lectureProgress = lectureStore.getLectureProgress(lecture.id);
      
      if (lectureProgress) {
        for (const [chapterId, progress] of lectureProgress.entries()) {
          progressMap.set(chapterId, progress.completed);
        }
      }
      
      setChapterProgress(progressMap);
      
      // 전체 진도 업데이트
      const overallProgress = lectureStore.calculateOverallProgress(lecture.id);
      setLiveProgress(overallProgress.percentage);
      setCompletedChapters(overallProgress.completedChapters);
    };

    // 초기 진도 로드
    updateProgress();

    // lectureStore 변경 구독
    const unsubscribe = lectureStore.subscribe(updateProgress);

    return unsubscribe;
  }, [lecture.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getSectionProgress = (section: LectureSection) => {
    const completedChapters = section.chapters.filter(ch => chapterProgress.get(ch.id) || false).length;
    return section.chapters.length > 0 ? (completedChapters / section.chapters.length) * 100 : 0;
  };

  // 현재 챕터 진도 가져오기
  const currentChapterProgress = lectureStore.getChapterProgress(lecture.id, currentChapterId);
  const currentChapterPercentage = currentChapterProgress?.progressPercentage || 0;
  
  // 성취 배지 및 다음 목표 관련
  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => liveProgress < m) || 100;
  
  // 다음 목표 계산 함수
  const getNextGoal = () => {
    const remainingChapters = lecture.totalChapters - completedChapters;
    
    if (liveProgress === 100) {
      return {
        title: "🎉 강의 완주!",
        description: "모든 강의를 완료했습니다!",
        target: "완료",
        isCompleted: true
      };
    }
    
    if (liveProgress < 25) {
      return {
        title: "🚀 학습 시작하기",
        description: `첫 배지까지 ${Math.max(0, currentMilestone - Math.round(liveProgress))}% 남았어요!`,
        target: `${currentMilestone}%`,
        isCompleted: false
      };
    }
    
    if (liveProgress < 50) {
      return {
        title: "📚 절반 달성하기",
        description: `중간 지점까지 ${Math.max(0, currentMilestone - Math.round(liveProgress))}% 남았어요!`,
        target: `${currentMilestone}%`,
        isCompleted: false
      };
    }
    
    if (liveProgress < 75) {
      return {
        title: "🏃‍♂️ 막바지 스퍼트",
        description: `막바지까지 ${Math.max(0, currentMilestone - Math.round(liveProgress))}% 남았어요!`,
        target: `${currentMilestone}%`,
        isCompleted: false
      };
    }
    
    if (liveProgress < 100) {
      if (remainingChapters === 1) {
        return {
          title: "🏁 마지막 강의!",
          description: "마지막 강의만 남았어요! 완주까지 한 발짝!",
          target: "100%",
          isCompleted: false
        };
      }
      
      return {
        title: "🎯 완주 목전!",
        description: `완주까지 ${remainingChapters}개 강의 남았어요!`,
        target: "100%",
        isCompleted: false
      };
    }
    
    return {
      title: "다음 목표",
      description: `${currentMilestone}% 달성까지 ${Math.max(0, currentMilestone - Math.round(liveProgress))}% 남았어요!`,
      target: `${currentMilestone}%`,
      isCompleted: false
    };
  };
  
  const nextGoal = getNextGoal();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b space-y-4">
        <h2 className="text-lg font-semibold">강의 커리큘럼</h2>
        
        {/* 기본 정보 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{lecture.totalChapters}개 강의</span>
          <span>{Math.floor(lecture.totalDuration / 3600)}시간 {Math.floor((lecture.totalDuration % 3600) / 60)}분</span>
        </div>

        {/* 통합 진도율 바 */}
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
            <span className="text-sm text-gray-500">{Math.round(liveProgress)}%</span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              {/* 전체 완료된 진도 (파란색) */}
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 absolute"
                style={{ width: `${liveProgress}%` }}
              />
              
              {/* 현재 챕터 진행 중인 부분 (연한 녹색으로 오버레이) */}
              {currentChapterPercentage > 0 && currentChapterPercentage < 100 && (
                <div
                  className="bg-green-400/60 h-3 rounded-full transition-all duration-300 absolute"
                  style={{ 
                    width: `${Math.min(liveProgress + (currentChapterPercentage * (100/lecture.totalChapters) / 100), 100)}%`,
                    left: `${liveProgress}%`
                  }}
                />
              )}
              
              {/* 진도 표시기 */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-sm transition-all duration-500"
                style={{ 
                  left: `${Math.min(liveProgress + (currentChapterPercentage > 0 && currentChapterPercentage < 100 ? (currentChapterPercentage * (100/lecture.totalChapters) / 100) : 0), 100)}%`,
                  transform: 'translateX(-50%) translateY(-50%)'
                }}
              />
            </div>
            
          </div>
          
          {/* 진도 설명 */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>완료: {completedChapters}개</span>
            {currentChapterPercentage > 0 && currentChapterPercentage < 100 && (
              <span>시청 중: {Math.round(currentChapterPercentage)}%</span>
            )}
            <span>남은 강의: {lecture.totalChapters - completedChapters}개</span>
          </div>
        </div>

        {/* 성취 배지 */}
        {liveProgress >= 25 && (
          <div>
            <h4 className="text-sm font-medium mb-2">획득한 배지</h4>
            <div className="flex gap-2">
              {liveProgress >= 25 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">시작</span>
                </div>
              )}
              {liveProgress >= 50 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">중간</span>
                </div>
              )}
              {liveProgress >= 75 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">막바지</span>
                </div>
              )}
              {liveProgress === 100 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">완주!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 다음 목표 */}
        <div className={`rounded-lg p-3 ${
          nextGoal.isCompleted 
            ? "bg-green-50 border border-green-200" 
            : "bg-blue-50 border border-blue-200"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                nextGoal.isCompleted ? "text-green-900" : "text-blue-900"
              }`}>
                {nextGoal.title}
              </p>
              <p className={`text-xs mt-1 ${
                nextGoal.isCompleted ? "text-green-700" : "text-blue-700"
              }`}>
                {nextGoal.description}
              </p>
            </div>
            <div className={`text-lg font-bold ${
              nextGoal.isCompleted ? "text-green-600" : "text-blue-600"
            }`}>
              {nextGoal.target}
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {lecture.sections.map((section) => (
          <div key={section.id} className="bg-white">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium text-sm">{section.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{section.chapters.length}개 강의</span>
                  <span>·</span>
                  <span>
                    {Math.floor(
                      section.chapters.reduce((acc, ch) => acc + ch.duration, 0) / 60
                    )}분
                  </span>
                </div>
                {getSectionProgress(section) > 0 && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${getSectionProgress(section)}%` }}
                    />
                  </div>
                )}
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="bg-gray-50">
                {section.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => onChapterSelect(chapter.id)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors border-l-2 ${
                      currentChapterId === chapter.id
                        ? "bg-blue-50 border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {chapterProgress.get(chapter.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : currentChapterId === chapter.id ? (
                        <PlayCircle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm ${
                          currentChapterId === chapter.id
                            ? "font-medium text-blue-600"
                            : chapterProgress.get(chapter.id)
                            ? "text-gray-600"
                            : "text-gray-800"
                        }`}
                      >
                        {chapter.order}. {chapter.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(chapter.duration)}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}