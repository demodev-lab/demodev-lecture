export default function LecturesHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 sm:py-10 lg:py-12">
      <div className="container-responsive">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              demodev와 함께 성장하세요!
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">
              개발자 커리어, demodev에서 시작하세요
            </h2>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
              2025 NEW
            </div>
            <div className="text-sm sm:text-base lg:text-xl">
              실무 중심 강의, 실전 프로젝트, 커뮤니티까지
            </div>
          </div>
          
          {/* Right Content - Hidden on Mobile */}
          <div className="hidden lg:flex flex-shrink-0 ml-8 items-center">
            <div className="flex space-x-4 mr-8">
              {/* 세 명의 인물을 나타내는 placeholder */}
              <div className="w-16 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div className="w-16 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <div className="w-16 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm">
                7.30(수) 오전11시
              </div>
              <div className="text-sm mt-1">
                선착순 접수 →
              </div>
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div className="lg:hidden mt-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm w-full sm:w-auto touch-target">
              7.30(수) 오전11시 선착순 접수 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}