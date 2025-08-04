"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FindIdPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendVerification = () => {
    if (name && phone) {
      setLoading(true);
      // TODO: 실제 인증번호 발송 API 연동 필요
      setShowVerification(true);
      alert("인증번호가 발송되었습니다.");
      setLoading(false);
    }
  };

  const handleVerify = () => {
    // TODO: 실제 인증 API 연동 필요
    // 현재는 '123456'을 임시 인증번호로 사용
    if (verificationCode === "123456") {
      // TODO: 실제 사용자 아이디 조회 API 연동 필요
      alert("인증이 완료되었습니다.\n아이디: test@demodev.com");
      router.push("/");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-50 rounded-lg border border-brand-300 p-8 shadow-sm">
        {/* 탭 */}
        <div className="flex border-b border-gray-300 mb-8">
          <Link
            href="/find"
            className="flex-1 py-4 text-center font-medium text-brand-500 border-b-2 border-brand-500"
          >
            아이디(계정) 찾기 
          </Link>
          <Link
            href="/find/pw"
            className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700"
          >
            비밀번호 찾기
          </Link>
        </div>

        {/* 폼 */}
        <div className="space-y-4">
          {/* 이름 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요."
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          {/* 휴대폰 */}
          {name && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                휴대폰
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="휴대폰 번호를 입력하세요."
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendVerification}
                  disabled={!phone || loading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  인증요청
                </button>
              </div>
            </div>
          )}

          {/* 인증번호 */}
          {showVerification && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                인증번호 확인
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증번호를 입력하세요."
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <button
                  onClick={handleVerify}
                  disabled={!verificationCode || loading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  인증
                </button>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="pt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}