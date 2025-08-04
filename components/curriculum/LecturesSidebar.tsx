export default function LecturesSidebar() {

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* 오리지널 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold text-blue-600">오리지널</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">바이브 빌더스</span></li>
          </ul>
        </div>

        {/* 바이브 코딩 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">바이브 코딩</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">프롬프트 엔지니어링</span></li>
            <li><span className="text-gray-600">컨텍스트 엔지니어링</span></li>
            <li><span className="text-gray-600">AI 도구 활용</span></li>
          </ul>
        </div>

        {/* 앱/웹 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">앱/웹</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">앱 바이브 코딩 입문</span></li>
            <li><span className="text-gray-600">웹 바이브 코딩 입문</span></li>
            <li><span className="text-gray-600">앱 수익화</span></li>
            <li><span className="text-gray-600">웹 수익화</span></li>
          </ul>
        </div>

        {/* 자동화 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">자동화</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">n8n</span></li>
            <li><span className="text-gray-600">Make</span></li>
            <li><span className="text-gray-600">PyTorch</span></li>
            <li><span className="text-gray-600">크롤링</span></li>
            <li><span className="text-gray-600">AI 업무 자동화</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}