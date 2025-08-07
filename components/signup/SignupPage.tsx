"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendVerification = () => {
    if (phone.length < 10) {
      alert("휴대폰 번호를 정확히 입력해주세요.");
      return;
    }
    
    // 임시로 인증번호는 "123456"으로 고정
    setShowVerification(true);
    alert("인증번호가 발송되었습니다.\n임시 인증번호: 123456");
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      if (verificationCode === "123456") {
        // 임시 인증 성공
        alert("인증이 완료되었습니다.\n회원가입이 완료되었습니다.");
        router.push("/");
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-gray-50 rounded-lg border border-brand-300 p-8 shadow-sm">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-center mb-12">회원가입</h1>

        {/* 폼 */}
        <div className="space-y-6">
          {/* 휴대폰 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">휴대폰</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="휴대폰 번호를 입력하세요."
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <button
                onClick={handleSendVerification}
                disabled={!phone || loading}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                인증요청
              </button>
            </div>
          </div>

          {/* 인증번호 확인 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">인증번호 확인</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호를 입력하세요."
                disabled={!showVerification}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              />
              <button
                onClick={handleVerify}
                disabled={!verificationCode || !showVerification || loading}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                인증
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}