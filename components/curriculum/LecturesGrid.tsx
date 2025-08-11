import { Lecture } from "@/app/lecture/[id]/lectures";
import LectureCard from "./LectureCard";

interface LecturesGridProps {
  lectures: Lecture[];
}

export default function LecturesGrid({ lectures }: LecturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
}