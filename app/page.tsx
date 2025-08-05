import HeroSection from "@/components/main/HeroSection";
import CourseSection from "@/components/main/CourseSection";
import { challenges, courses } from "@/data/courses";
import StudentReviews from "@/components/main/StudentReviews";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CourseSection title="지금 진행중인 챌린지" data={challenges} />
      <CourseSection title="지금 가장 주목받는 강의" data={courses} />
      <StudentReviews />
    </>
  );
}
