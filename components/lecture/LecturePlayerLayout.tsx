"use client";

import React, { useState } from "react";
import { Lecture } from "@/types/lecture";
import VideoPlayer from "./VideoPlayer";
import LectureCurriculum from "./LectureCurriculum";
import ProgressTracker from "./ProgressTracker";
import { ArrowLeft, Share2, BookmarkPlus } from "lucide-react";
import Link from "next/link";

interface LecturePlayerLayoutProps {
  lecture: Lecture;
}

export default function LecturePlayerLayout({ lecture }: LecturePlayerLayoutProps) {
  const [currentChapterId, setCurrentChapterId] = useState(
    lecture.lastWatchedChapterId || lecture.sections[0]?.chapters[0]?.id || ""
  );
  const [showCurriculum, setShowCurriculum] = useState(true);

  const currentChapter = lecture.sections
    .flatMap(section => section.chapters)
    .find(chapter => chapter.id === currentChapterId);

  const handleChapterChange = (chapterId: string) => {
    setCurrentChapterId(chapterId);
  };

  const handleChapterComplete = () => {
    // 챕터 완료 처리 로직
    console.log("Chapter completed:", currentChapterId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/mypage"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold line-clamp-1">{lecture.title}</h1>
                <p className="text-sm text-gray-500">{lecture.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => console.log("Share")}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => console.log("Bookmark")}
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1">
          {/* 비디오 플레이어 */}
          <div className="bg-black">
            {currentChapter && (
              <VideoPlayer
                videoUrl={currentChapter.videoUrl || ""}
                chapterId={currentChapter.id}
                onComplete={handleChapterComplete}
              />
            )}
          </div>

          {/* 진도율 트래커 */}
          <div className="bg-white border-b">
            <div className="px-4 py-3">
              <ProgressTracker
                lecture={lecture}
                currentChapterId={currentChapterId}
              />
            </div>
          </div>

          {/* 모바일에서 커리큘럼 토글 버튼 */}
          <button
            className="lg:hidden w-full bg-white border-b px-4 py-3 text-left flex items-center justify-between"
            onClick={() => setShowCurriculum(!showCurriculum)}
          >
            <span className="font-medium">강의 목차</span>
            <span className="text-sm text-gray-500">
              {lecture.completedChapters}/{lecture.totalChapters} 완료
            </span>
          </button>

          {/* 강의 설명 */}
          <div className="bg-white p-4 lg:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {currentChapter?.title || "강의를 선택해주세요"}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>챕터 {currentChapter?.order}</span>
                <span>·</span>
                <span>{Math.floor((currentChapter?.duration || 0) / 60)}분</span>
              </div>
            </div>

            {lecture.subtitle && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">강의 소개</h3>
                <p className="text-gray-600">{lecture.subtitle}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">상세 설명</h3>
              <p className="text-gray-600 whitespace-pre-line">{lecture.description}</p>
            </div>
          </div>
        </div>

        {/* 사이드바 - 커리큘럼 */}
        <aside
          className={`${
            showCurriculum ? "block" : "hidden"
          } lg:block w-full lg:w-96 bg-white border-l`}
        >
          <LectureCurriculum
            lecture={lecture}
            currentChapterId={currentChapterId}
            onChapterSelect={handleChapterChange}
          />
        </aside>
      </div>
    </div>
  );
}