import { lectures } from "./lectures";
import { notFound } from "next/navigation";

// Lecture Components
import VideoHeroSection from "@/components/lecture/VideoHeroSection";
import BestReviewsSection from "@/components/lecture/BestReviewsSection";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import LectureMetaInfo from "@/components/lecture/LectureMetaInfo";
import LearningOutcomesSection from "@/components/lecture/LearningOutcomesSection";
import CurriculumSection from "@/components/lecture/CurriculumSection";
import ReviewsSection from "@/components/lecture/ReviewsSection";
import CoursePurchaseCard from "@/components/lecture/CoursePurchaseCard";
import CourseInfoCard from "@/components/lecture/CourseInfoCard";

interface LecturePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LecturePage({ params }: LecturePageProps) {
  const { id } = await params;
  const lectureId = parseInt(id);
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm text-gray-600">
            <span>홈</span>
            <span className="mx-2">{">"}</span>
            <span>{lecture.category}</span>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-900 font-medium">강의 상세</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <VideoHeroSection lecture={lecture} />
            <BestReviewsSection />
            <LectureNavigation lecture={lecture} />
            <LectureMetaInfo lecture={lecture} />
            <LearningOutcomesSection lecture={lecture} />
            <CurriculumSection lecture={lecture} />
            <ReviewsSection lecture={lecture} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <CoursePurchaseCard lecture={lecture} />
              <CourseInfoCard lecture={lecture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for dynamic routes (선택사항)
export async function generateStaticParams() {
  return lectures.map((lecture) => ({
    id: lecture.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LecturePageProps) {
  const { id } = await params;
  const lectureId = parseInt(id);
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) {
    return {
      title: "강의를 찾을 수 없습니다",
    };
  }

  return {
    title: `${lecture.title} | DemoLearn`,
    description: lecture.description || `${lecture.title} 강의 상세 정보`,
  };
}