"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "회원가입/로그인",
    question: "회원가입은 어떻게 하나요?",
    answer: "홈페이지 상단의 '회원가입' 버튼을 클릭하여 휴대폰 번호 인증 후 필요한 정보를 입력하시면 간단하게 가입이 완료됩니다. 소셜 로그인(카카오, 네이버, 구글)을 통해서도 간편하게 가입하실 수 있습니다."
  },
  {
    id: 2,
    category: "회원가입/로그인",
    question: "비밀번호를 잊어버렸어요.",
    answer: "로그인 화면에서 '비밀번호 찾기'를 클릭하시고, 가입 시 등록한 이메일 또는 휴대폰 번호를 입력하시면 비밀번호 재설정 링크를 보내드립니다."
  },
  {
    id: 3,
    category: "수강신청/결제",
    question: "강의는 어떻게 수강신청 하나요?",
    answer: "원하시는 강의 상세 페이지에서 '수강신청' 버튼을 클릭하신 후, 결제 정보를 입력하시면 됩니다. 신용카드, 계좌이체, 간편결제 등 다양한 결제 수단을 지원합니다."
  },
  {
    id: 4,
    category: "수강신청/결제",
    question: "수강료 환불은 가능한가요?",
    answer: "수강 시작 전에는 100% 환불이 가능합니다. 수강 시작 후에는 진도율에 따라 환불 금액이 차등 적용됩니다. 자세한 환불 정책은 이용약관을 참고해 주세요."
  },
  {
    id: 5,
    category: "수강신청/결제",
    question: "할인 쿠폰은 어떻게 사용하나요?",
    answer: "결제 페이지에서 쿠폰 코드 입력란에 보유하신 쿠폰 코드를 입력하시면 자동으로 할인이 적용됩니다. 쿠폰은 마이페이지에서도 확인하실 수 있습니다."
  },
  {
    id: 6,
    category: "강의 수강",
    question: "강의 수강 기간은 어떻게 되나요?",
    answer: "대부분의 강의는 수강 신청일로부터 무제한으로 수강이 가능합니다. 일부 강의의 경우 수강 기간이 제한될 수 있으며, 이는 강의 상세 페이지에서 확인하실 수 있습니다."
  },
  {
    id: 7,
    category: "강의 수강",
    question: "모바일에서도 수강이 가능한가요?",
    answer: "네, 모바일 웹브라우저를 통해 언제 어디서나 강의를 수강하실 수 있습니다. 안정적인 인터넷 환경에서 이용하시기를 권장합니다."
  },
  {
    id: 8,
    category: "강의 수강",
    question: "강의 자료는 어디서 다운로드 받나요?",
    answer: "각 강의 페이지의 '강의 자료' 탭에서 다운로드 받으실 수 있습니다. 강의별로 제공되는 자료가 다를 수 있으니 강의 상세 페이지를 확인해 주세요."
  },
  {
    id: 9,
    category: "기타",
    question: "강사로 지원하고 싶어요.",
    answer: "홈페이지 하단의 '강사 지원하기' 메뉴를 통해 지원하실 수 있습니다. 강의 계획서와 샘플 영상을 준비해 주시면 검토 후 연락드리겠습니다."
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = ["전체", "회원가입/로그인", "수강신청/결제", "강의 수강", "기타"];

  const filteredFAQs = selectedCategory === "전체" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-8 border-b border-gray-200">
            <Link 
              href="/"
              className="text-brand-500 hover:text-brand-600 text-sm mb-4 inline-block"
            >
              ← 홈으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">자주 묻는 질문</h1>
            <p className="text-gray-600">궁금하신 점을 빠르게 해결해 드립니다.</p>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-brand-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium text-brand-600 bg-brand-50 rounded mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-gray-900 font-medium">{item.question}</h3>
                    </div>
                    {openItems.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">찾으시는 답변이 없나요?</h3>
              <p className="text-gray-600 mb-4">
                고객센터로 문의해 주시면 친절하게 답변해 드리겠습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">이메일 문의</p>
                  <p className="font-medium text-gray-900">demodev.works@gmail.com</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">운영시간</p>
                  <p className="font-medium text-gray-900">평일 10:00 - 18:00</p>
                  <p className="text-sm text-gray-600">점심시간 12:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}