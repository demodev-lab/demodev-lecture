"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Company Info */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            {/* <div className="w-6 h-6 bg-red-500 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
            </div> */}
            <span className="text-lg font-bold text-gray-800">
              대모산 개발단
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>대모산 개발단 챌린지</p>
          </div>
        </div>

        {/* Links */}
        {/* <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">
            이용약관
          </a>
          <a href="#" className="hover:text-gray-900">
            개인정보 보호 방침
          </a>
          <a href="#" className="hover:text-gray-900">
            고객센터
          </a>
        </div> */}

        {/* Company Details */}
        <div className="text-xs text-gray-500 space-y-1">
          {/* <p>(주)한국교육그룹 통신판매업 신고번호 : 제 2019-서울-01371호</p>
          <p>
            고객서비스 상담 전화 : 1588-6222 사업자등록번호 : 214-87-88737
            대표자 : 김영호 개인정보관리책임자 : 김미경
          </p>
          <p>
            Email: yourm4@koreaedugroup.com FAX: 02-6959-0789 사업장 주소 :
            서울시 강남구 강남대로 286(3,4층)
          </p> */}
          <p>
            대모산 개발단이 제공하는 모든 서비스에 대한 저작권 및 지적재산권은
            대모산 개발단에 귀속됩니다.
          </p>
          <p>Copyright ©대모산 개발단. All Rights Reserved.</p>
        </div>

        {/* Top Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
