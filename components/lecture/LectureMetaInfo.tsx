import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Globe } from "lucide-react";
import { Lecture } from "@/app/lecture/[id]/lectures";
import { getLevelText } from "@/lib/lecture-utils";

interface LectureMetaInfoProps {
  lecture: Lecture;
}

export default function LectureMetaInfo({ lecture }: LectureMetaInfoProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>총 {lecture.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {lecture.enrolledStudents.toLocaleString()}명 수강중
            </span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            <span>{lecture.language}</span>
          </div>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className="border-green-500 text-green-700"
            >
              {getLevelText(lecture.level)}
            </Badge>
          </div>
        </div>

        {/* Instructor Info */}
        <div id="instructor" className="flex items-center mt-6 pt-6 border-t">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-brand-500 rounded-full mr-4 flex items-center justify-center">
            <span className="text-lg font-semibold text-white">
              {lecture.instructor.name[0]}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-semibold text-gray-900">
                {lecture.instructor.name}
              </p>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {lecture.instructor.experience} 경력
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {lecture.instructor.bio}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}