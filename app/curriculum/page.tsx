import { curriculum } from "@/app/lecture/[id]/lectures";
import LecturesHero from "@/components/curriculum/LecturesHero";
import LecturesGrid from "@/components/curriculum/LecturesGrid";
import LecturesSidebar from "@/components/curriculum/LecturesSidebar";

export default function LecturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <LecturesHero />

      {/* Main Content with Sidebar */}
      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <LecturesSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-8 py-6">
          {/* Section Title and Filter */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">오리지널</h2>
            <div className="flex items-center space-x-4">
              <select className="text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>인기순</option>
                <option>최신순</option>
                <option>평점순</option>
                <option>가격순</option>
              </select>
            </div>
          </div>

          {/* Lecture Cards Grid */}
          <LecturesGrid lectures={curriculum} />
        </div>
      </div>
    </div>
  );
}

// SEO Metadata
export const metadata = {
  title: '모든 강의 | DemoLearn',
  description: '전문가들이 만든 고품질 강의로 새로운 기술을 배워보세요. 웹개발, AI/머신러닝, 앱개발 등 다양한 분야의 강의를 제공합니다.',
};