"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { getLectureById } from "@/data/lectures";
import LecturePlayerLayout from "@/components/lecture/LecturePlayerLayout";

export default function LecturePlayerPage({
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { lectureId } = use(params);
  const lecture = getLectureById(lectureId);

  if (!lecture) {
    notFound();
  }

  return <LecturePlayerLayout lecture={lecture} />;
}