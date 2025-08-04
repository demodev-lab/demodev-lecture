export default function LecturesHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">
              demodev와 함께 성장하세요!
            </h1>
            <h2 className="text-3xl font-semibold mb-6">
              개발자 커리어, demodev에서 시작하세요
            </h2>
            <div className="text-2xl font-bold">
              2025 NEW
            </div>
            <div className="text-xl">
              실무 중심 강의, 실전 프로젝트, 커뮤니티까지
            </div>
          </div>
          
          {/* 오른쪽 인물 이미지 영역 */}
          <div className="flex-shrink-0 ml-8 flex items-center">
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
        </div>
      </div>
    </div>
  );
}