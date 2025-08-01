import { Card, CardContent } from "@/components/ui/card";
import { Lecture } from "@/app/lecture/[id]/lectures";
import { getLevelText } from "@/lib/lecture-utils";

interface CourseInfoCardProps {
  lecture: Lecture;
}

export default function CourseInfoCard({ lecture }: CourseInfoCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">
          강의 정보
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">총 강의 시간</span>
            <span className="font-medium">{lecture.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">수강생</span>
            <span className="font-medium">
              {lecture.enrolledStudents.toLocaleString()}명
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">난이도</span>
            <span className="font-medium">
              {getLevelText(lecture.level)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">강사</span>
            <span className="font-medium">
              {lecture.instructor.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">업데이트</span>
            <span className="font-medium">
              {lecture.lastUpdated}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}