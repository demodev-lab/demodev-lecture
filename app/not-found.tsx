import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-brand-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}