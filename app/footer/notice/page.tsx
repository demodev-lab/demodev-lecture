import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
            <p className="text-gray-500">시행일: 2025년 1월 1일</p>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-700 leading-relaxed mb-6">
                주식회사 대모산 개발단(이하 '회사')은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 
                적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 
                절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제1조 (개인정보의 처리목적)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>홈페이지 회원가입 및 관리</strong><br/>
                  회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 목적으로 
                  개인정보를 처리합니다.
                </li>
                <li>
                  <strong>재화 또는 서비스 제공</strong><br/>
                  서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증을 목적으로 개인정보를 처리합니다.
                </li>
                <li>
                  <strong>고충처리</strong><br/>
                  민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보의 목적으로 개인정보를 처리합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 
                처리·보유합니다.
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>홈페이지 회원가입 및 관리</strong>: 회원 탈퇴 시까지<br/>
                  다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지</li>
                    <li>홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</li>
                  </ul>
                </li>
                <li>
                  <strong>재화 또는 서비스 제공</strong>: 재화·서비스 공급완료 및 요금결제·정산 완료 시까지<br/>
                  다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록
                      <ul className="list-circle pl-6 mt-1 space-y-1">
                        <li>표시·광고에 관한 기록: 6개월</li>
                        <li>계약 또는 청약철회, 대금결제, 재화 등의 공급기록: 5년</li>
                        <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제3조 (처리하는 개인정보의 항목)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>홈페이지 회원가입 및 관리</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>필수항목: 이메일, 비밀번호, 이름, 휴대전화번호</li>
                    <li>선택항목: 생년월일, 성별</li>
                  </ul>
                </li>
                <li>
                  <strong>재화 또는 서비스 제공</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>필수항목: 이메일, 이름, 휴대전화번호, 결제정보</li>
                    <li>선택항목: 주소, 배송 메시지</li>
                  </ul>
                </li>
                <li>
                  <strong>인터넷 서비스 이용과정에서 자동으로 생성되어 수집되는 정보</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제4조 (개인정보의 제3자 제공)</h2>
              <p className="text-gray-700 leading-relaxed">
                회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 
                「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제5조 (개인정보처리의 위탁)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        위탁받는 자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        위탁하는 업무
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        (주)토스페이먼츠
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        결제 처리 및 정산
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Amazon Web Services
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        클라우드 서버 운영 및 관리
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제6조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>
                <li>제1항에 따른 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 
                하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.</li>
                <li>제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 "개인정보 처리 
                방법에 관한 고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>
                <li>개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제7조 (개인정보의 파기)</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>
                <li>정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 
                하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</li>
                <li>개인정보 파기의 절차 및 방법은 다음과 같습니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                    <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제8조 (개인정보의 안전성 확보조치)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>개인정보 취급 직원의 최소화 및 교육: 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 
                시행하고 있습니다.</li>
                <li>내부관리계획의 수립 및 시행: 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</li>
                <li>해킹 등에 대비한 기술적 대책: 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 
                주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
                <li>개인정보의 암호화: 이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 
                전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</li>
                <li>접속기록의 보관 및 위변조 방지: 개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 
                도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</li>
                <li>개인정보에 대한 접근 제한: 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 
                접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</li>
                <li>쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 
                하드디스크에 저장되기도 합니다.</li>
                <li>쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 
                이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
                <li>쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구→인터넷 옵션→개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
                <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제10조 (개인정보 보호책임자)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 
                개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">개인정보 보호책임자</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>성명: 홍길동</li>
                  <li>직책: 개인정보보호팀장</li>
                  <li>연락처: 02-1234-5678</li>
                  <li>이메일: privacy@demodev.com</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제11조 (권익침해 구제방법)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 
                상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
                <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">제12조 (개인정보 처리방침 변경)</h2>
              <p className="text-gray-700 leading-relaxed">
                이 개인정보처리방침은 2025년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 
                시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                공고일자: 2023년 12월 25일<br/>
                시행일자: 2025년 1월 1일
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}