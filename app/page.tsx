import HeroSection from "@/components/HeroSection";
// import CategoryIcons from "@/components/CategoryIcons";
import CourseSection from "@/components/CourseSection";
import { challenges, courses } from "@/data/courses";
import StudentReviews from "@/components/StudentReviews";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      {/* <CategoryIcons /> */}
      <CourseSection title="지금 진행중인 챌린지" data={challenges} />
      <CourseSection title="지금 가장 주목받는 강의" data={courses} />
      <StudentReviews />
    </main>
  );
}
