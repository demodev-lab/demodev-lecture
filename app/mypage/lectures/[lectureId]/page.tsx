import { notFound } from "next/navigation";
import { getLectureById } from "@/data/lectures";
import LecturePlayerLayout from "@/components/lecture/LecturePlayerLayout";

export default async function LecturePlayerPage({
  params,
}: {
  params: Promise<{ lectureId: string }>;
}) {
  const { lectureId } = await params;
  const lecture = getLectureById(lectureId);

  if (!lecture) {
    notFound();
  }

  return <LecturePlayerLayout lecture={lecture} />;
}

export async function generateStaticParams() {
  // 실제로는 API에서 모든 강의 ID를 가져와야 함
  return [
    { lectureId: "1" },
    { lectureId: "2" },
  ];
}