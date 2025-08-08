import React from "react";
import Link from "next/link";

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <Link 
              href="/"
              className="text-brand-500 hover:text-brand-600 text-sm mb-4 inline-block"
            >
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">저작권 안내</h1>
            <p className="text-gray-500">대모산 개발단 콘텐츠 저작권 정책</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 저작권 보호</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                주식회사 대모산개발단(이하 "회사")이 운영하는 대모산 개발단 플랫폼에서 제공하는 모든 콘텐츠(강의 영상, 강의 자료, 텍스트, 
                이미지, 소스코드, 디자인 등)는 대한민국 저작권법 및 국제 저작권 협약에 의해 보호받고 있습니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                회사의 사전 서면 동의 없이 콘텐츠를 무단으로 복제, 배포, 전송, 전시, 판매, 대여, 2차 저작물 작성 등의 행위는 저작권법에 의해 
                엄격히 금지되며, 이를 위반할 경우 민·형사상의 책임을 질 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 콘텐츠 이용 범위</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">허용되는 이용</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>구매한 강의의 개인적인 학습 목적 시청</li>
                    <li>학습 목적의 개인 노트 작성</li>
                    <li>강의 내용을 바탕으로 한 개인 프로젝트 진행</li>
                    <li>출처를 명시한 일부 내용의 인용 (공정이용 범위 내)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">금지되는 이용</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>강의 영상의 다운로드, 녹화, 캡처 및 무단 배포</li>
                    <li>강의 자료의 무단 복제 및 재배포</li>
                    <li>상업적 목적의 무단 이용</li>
                    <li>계정 공유를 통한 다수의 이용</li>
                    <li>강의 내용을 그대로 복제한 2차 콘텐츠 제작</li>
                    <li>회사의 허가 없는 오프라인 강의 진행</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 지식재산권</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                대모산 개발단 플랫폼에서 사용되는 다음의 요소들은 회사의 지식재산권으로 보호받습니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>대모산 개발단 로고 및 브랜드 아이덴티티</li>
                <li>플랫폼 UI/UX 디자인</li>
                <li>자체 개발 교육 커리큘럼 및 콘텐츠 구성</li>
                <li>강의에서 제공되는 예제 코드 및 프로젝트</li>
                <li>플랫폼 소스코드 및 알고리즘</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 사용자 제작 콘텐츠</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                사용자가 플랫폼 내에서 작성한 리뷰, 질문, 답변 등의 콘텐츠에 대한 저작권은 해당 사용자에게 있습니다. 다만, 사용자는 해당 콘텐츠를 
                플랫폼에 게시함으로써 회사에 다음과 같은 권리를 부여합니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>플랫폼 내에서의 복제, 배포, 전시할 수 있는 권리</li>
                <li>서비스 홍보 및 마케팅 목적으로 사용할 수 있는 권리</li>
                <li>서비스 개선을 위해 분석하고 활용할 수 있는 권리</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 제3자 저작권</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                강의 내용 중 제3자의 저작물(오픈소스 라이브러리, 이미지, 글꼴 등)이 포함된 경우, 해당 저작물의 라이선스 조건을 준수해야 합니다. 
                각 저작물의 구체적인 라이선스 정보는 강의 자료에 명시되어 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 저작권 침해 신고</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 타인의 저작권을 존중하며, 저작권 침해 콘텐츠에 대해 엄격히 대응합니다. 플랫폼 내에서 저작권 침해가 의심되는 콘텐츠를 
                발견하신 경우, 다음 정보와 함께 신고해 주시기 바랍니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>저작권 침해가 의심되는 콘텐츠의 URL</li>
                <li>침해된 원저작물의 정보</li>
                <li>저작권자임을 증명할 수 있는 자료</li>
                <li>신고자의 연락처</li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">저작권 침해 신고 접수</h3>
                <p className="text-gray-700">이메일: copyright@demodev.com</p>
                <p className="text-gray-700">전화: 02-1234-5678</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 면책 조항</h2>
              <p className="text-gray-700 leading-relaxed">
                회사는 사용자가 강의 내용을 활용하여 제작한 결과물에 대한 책임을 지지 않습니다. 사용자는 학습한 내용을 활용할 때 제3자의 권리를 
                침해하지 않도록 주의해야 하며, 이로 인한 법적 책임은 전적으로 사용자에게 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 정책 변경</h2>
              <p className="text-gray-700 leading-relaxed">
                본 저작권 정책은 관련 법령의 개정이나 회사 정책 변경에 따라 수정될 수 있습니다. 중요한 변경 사항이 있을 경우, 플랫폼을 통해 
                사전에 공지하겠습니다.
              </p>
            </section>

            <div className="mt-12 p-6 bg-brand-50 rounded-lg">
              <h3 className="text-lg font-semibold text-brand-900 mb-3">Fair Use (공정이용)</h3>
              <p className="text-brand-800 leading-relaxed mb-3">
                교육 목적의 제한적인 인용은 출처를 명확히 표시하는 조건 하에 허용됩니다. 다음과 같은 형식으로 출처를 표시해 주세요:
              </p>
              <div className="bg-white p-4 rounded border border-brand-200">
                <p className="text-sm font-mono text-gray-700">
                  출처: 대모산 개발단 - [강의명] by [강사명]<br/>
                  URL: https://demodev.com/lecture/[lecture-id]
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                최종 수정일: 2025년 1월 1일<br/>
                © 2025 Demodev. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}