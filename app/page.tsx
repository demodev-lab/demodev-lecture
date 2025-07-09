import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryNavigation from "@/components/CategoriNavigation";
import CourseSection from "@/components/CourseSection";
import Footer from "@/components/Footer";
import {
  newCourses,
  popularCourses,
  editorChoiceCourses,
  hobbyCourses,
  certificationCourses,
} from "@/data/courses";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoryNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <CourseSection title="신규 오픈 강좌" courses={newCourses} />
          <CourseSection title="이번 주 인기 강좌" courses={popularCourses} />
          <CourseSection title="에디터 추천 강좌" courses={editorChoiceCourses} />
          <CourseSection title="원포인트 취미 강좌" courses={hobbyCourses} />
          <CourseSection title="지금 뜨는 자격증 강좌" courses={certificationCourses} />
        </div>
      </main>

      <Footer />
    </div>
  );
}