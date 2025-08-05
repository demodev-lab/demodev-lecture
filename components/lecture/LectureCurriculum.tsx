"use client";

import React, { useState } from "react";
import { Lecture, LectureSection } from "@/types/lecture";
import { ChevronDown, ChevronUp, PlayCircle, CheckCircle2, Clock } from "lucide-react";

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
    const completedChapters = section.chapters.filter(ch => ch.completed).length;
    return (completedChapters / section.chapters.length) * 100;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">강의 커리큘럼</h2>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span>{lecture.totalChapters}개 강의</span>
          <span>{Math.floor(lecture.totalDuration / 3600)}시간 {Math.floor((lecture.totalDuration % 3600) / 60)}분</span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${lecture.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {lecture.completedChapters}/{lecture.totalChapters} 완료 ({lecture.progress}%)
          </p>
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
                      {chapter.completed ? (
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
                            : chapter.completed
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