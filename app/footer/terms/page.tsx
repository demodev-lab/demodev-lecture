import React from "react";
import Link from "next/link";

export default function TermsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">서비스 이용약관</h1>
            <p className="text-gray-500">시행일: 2025년 1월 1일</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1장 총칙</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제1조 (목적)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    본 약관은 주식회사 대모산 개발단(이하 "회사"라 합니다)에서 제공하는 인터넷 관련 서비스(접속 가능한 유·무선 단말기의 종류와 관계없이 
                    회사가 제공하는 이용 가능한 모든 서비스를 의미하며, 이하 "서비스"라 합니다)를 이용함에 있어 회사와 회원의 권리·의무, 책임사항을 규정
                    함을 그 목적으로 합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제2조 (용어의 정의)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>"사이트"란 회사가 재화 또는 서비스(이하 "상품 등"이라 합니다)를 회원에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 상품 등을 
                    거래할 수 있도록 설정한 가상의 영업장을 말하며 회사가 모바일 환경에서 서비스하는 모바일 웹과 앱을 포함합니다.</li>
                    <li>"회원"이란 회운 사이트에서 정한 소정의 절차를 거쳐 회원가입을 한 자로서, 약관에 따라 회사가 제공하는 서비스를 이용할 수 있는 자를 말
                    합니다.</li>
                    <li>"아이디(ID)"란 회은 회원의 식별과 서비스의 이용을 위하여 회원이 설정하고 회사가 승인하여 등록된 전자우편주소 또는 소셜 서비스 연동
                    을 통해 수집된 전자우편주소를 말합니다.</li>
                    <li>"비밀번호(Password)"란 회은 회원의 동일성 확인과 회원의 권익 및 비밀보호를 위하여 회원 스스로가 설정하여 사이트에 등록한 문자와
                    숫자의 조합을 말합니다.</li>
                    <li>"포인트"란 회은 회원이 서비스 이용에 따른 혜택 또는 서비스 이용상 편의를 위해 회원이 서비스를 이용하는 과정에서 적립 및 사용이 가능
                    하도록 회사가 본 약관에 정한 바에 따라 제공하는 것으로서 서비스 이용요금 결제 시 활용할 수 있는 수단을 말 가상의 데이터를 말합니다. 구
                    체적인 이용 방법, 그 명칭 및 현금 환급 가능성 등은 회사가 정하며 따라 달라질 수 있습니다.</li>
                    <li>"쿠폰"이란 회운 상품 등을 구매하거나 사이트가 제공하는 서비스를 이용할 때 표시된 금액 또는 비율만큼 할인을 받을 수 있는 쿠폰을 말합
                    니다.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2장 회원가입 및 관리</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제3조 (회원가입)</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
                    <li>회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>가입신청자가 본 약관 제8조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                        <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                        <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                      </ul>
                    </li>
                    <li>회원가입계약의 성립시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제4조 (회원정보의 변경)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    회원은 마이페이지를 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디 등은 
                    수정이 불가능합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3장 서비스 이용</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제5조 (서비스의 제공)</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>회사는 회원에게 아래와 같은 서비스를 제공합니다.
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>온라인 강의 콘텐츠 제공 서비스</li>
                        <li>챌린지 및 부트캠프 서비스</li>
                        <li>커뮤니티 서비스</li>
                        <li>기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스</li>
                      </ul>
                    </li>
                    <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
                    <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 
                    중단할 수 있습니다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제6조 (서비스의 변경)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4장 계약해지 및 이용제한</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제7조 (회원탈퇴 및 자격 상실 등)</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.</li>
                    <li>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                        <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                        <li>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5장 기타</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제8조 (면책조항)</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                    <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                    <li>회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">제9조 (준거법 및 재판관할)</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                    <li>본 약관과 관련한 사항은 대한민국 법령에 따라 규정되고 이행됩니다.</li>
                    <li>서비스 이용과 관련하여 회사와 회원 간에 발생한 분쟁에 대해서는 민사소송법상의 관할법원에 소를 제기합니다.</li>
                  </ol>
                </div>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                본 약관은 2025년 1월 1일부터 적용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}