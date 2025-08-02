import { Lecture } from "@/app/lecture/[id]/lectures";
import LectureCard from "./LectureCard";

interface LecturesGridProps {
  lectures: Lecture[];
}

export default function LecturesGrid({ lectures }: LecturesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
}