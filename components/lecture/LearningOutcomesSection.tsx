import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface LearningOutcomesSectionProps {
  lecture: Lecture;
}

export default function LearningOutcomesSection({ lecture }: LearningOutcomesSectionProps) {
  return (
    <>
      {/* Course Description */}
      <Card id="lecture-description">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            강의 소개
          </h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {lecture.detailedDescription}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            이런 걸 배워요
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lecture.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}