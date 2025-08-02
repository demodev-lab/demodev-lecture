export default function LecturesSidebar() {

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* 프론트엔드 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold text-blue-600">프론트엔드</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">React</span></li>
            <li><span className="text-gray-600">Vue.js</span></li>
            <li><span className="text-gray-600">Next.js</span></li>
            <li><span className="text-gray-600">TypeScript</span></li>
            <li><span className="text-gray-600">UI/UX</span></li>
          </ul>
        </div>

        {/* 백엔드 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">백엔드</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">Node.js</span></li>
            <li><span className="text-gray-600">Spring Boot</span></li>
            <li><span className="text-gray-600">Django</span></li>
            <li><span className="text-gray-600">Go</span></li>
            <li><span className="text-gray-600">Database</span></li>
          </ul>
        </div>

        {/* AI/머신러닝 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">AI/머신러닝</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">Python</span></li>
            <li><span className="text-gray-600">TensorFlow</span></li>
            <li><span className="text-gray-600">PyTorch</span></li>
            <li><span className="text-gray-600">데이터 분석</span></li>
            <li><span className="text-gray-600">챗봇/LLM</span></li>
          </ul>
        </div>

        {/* DevOps/클라우드 섹션 */}
        <div className="mb-8">
          <div className="py-2">
            <h3 className="text-lg font-semibold">DevOps/클라우드</h3>
          </div>
          <ul className="mt-2 space-y-2 pl-4">
            <li><span className="text-gray-600">AWS</span></li>
            <li><span className="text-gray-600">Docker</span></li>
            <li><span className="text-gray-600">Kubernetes</span></li>
            <li><span className="text-gray-600">CI/CD</span></li>
            <li><span className="text-gray-600">클라우드 아키텍처</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}