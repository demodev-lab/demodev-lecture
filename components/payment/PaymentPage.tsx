"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Lecture, lectures } from "@/app/lecture/[id]/lectures";
import { formatPrice } from "@/lib/lecture-utils";
import { FaCreditCard } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lectureId = searchParams.get("lectureId");
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [couponCode, setCouponCode] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [availablePoints] = useState(0);

  useEffect(() => {
    if (lectureId) {
      const foundLecture = lectures.find((l) => l.id === parseInt(lectureId));
      if (foundLecture) {
        setLecture(foundLecture);
      }
    }
  }, [lectureId]);

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">강의 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const finalPrice = lecture.price.discounted || lecture.price.original;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">주문결제</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 섹션 - 주문 정보 및 결제 수단 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 주문 상품 정보 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-32 h-20 flex-shrink-0">
                    <Image
                      src={lecture.image}
                      alt={lecture.title}
                      fill
                      sizes="128px"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {lecture.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      온라인 강의+라이브코칭
                    </p>
                    <p className="font-bold text-gray-900 mt-2">
                      {formatPrice(lecture.price)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 쿠폰 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">쿠폰</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="쿠폰 코드를 입력하세요"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    쿠폰 사용
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">사용 가능 0</p>
              </CardContent>
            </Card>

            {/* 상품권 · 포인트 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  상품권 · 포인트
                </h3>
                
                {/* 상품권 */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700">상품권</label>
                  <div className="flex space-x-2 mt-2">
                    <input
                      type="text"
                      placeholder="상품권 번호를 입력하세요"
                      value={giftCardCode}
                      onChange={(e) => setGiftCardCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      선택 사용
                    </button>
                  </div>
                </div>

                {/* 포인트 */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={usePoints}
                        onChange={(e) => setUsePoints(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        포인트
                      </span>
                    </label>
                    <span className="text-sm text-gray-600">
                      사용 가능 {availablePoints.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 ml-6">
                    *총 결제 금액의 50%까지 사용 가능
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 결제 수단 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">결제 수단</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setSelectedPayment("card")}
                    className={`p-4 border rounded-lg transition-all ${
                      selectedPayment === "card"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FaCreditCard className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <p className="text-sm">신용·체크카드</p>
                  </button>

                  <button
                    onClick={() => setSelectedPayment("kakao")}
                    className={`p-4 border rounded-lg transition-all ${
                      selectedPayment === "kakao"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 flex items-center justify-center">
                      <RiKakaoTalkFill className="w-full h-full text-yellow-400" />
                    </div>
                    <p className="text-sm">카카오페이</p>
                  </button>

                  <button
                    onClick={() => setSelectedPayment("toss")}
                    className={`p-4 border rounded-lg transition-all ${
                      selectedPayment === "toss"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">toss</span>
                    </div>
                    <p className="text-sm">토스페이</p>
                  </button>

                  <button
                    onClick={() => setSelectedPayment("payco")}
                    className={`p-4 border rounded-lg transition-all ${
                      selectedPayment === "payco"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <p className="text-sm">페이코</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽 섹션 - 결제 금액 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">결제 금액</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">총 결제 금액</span>
                    <span className="font-medium">
                      {finalPrice.toLocaleString()}원
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">쿠폰 사용</span>
                    <span className="font-medium">0원</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">상품권 사용</span>
                    <span className="font-medium">0원</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">포인트 사용</span>
                    <span className="font-medium">0원</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">
                      총 결제 금액
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {finalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    // 실제로는 결제 API 호출 후 성공 시 이동
                    const orderId = Date.now().toString();
                    router.push(`/payment/${orderId}?lectureId=${lectureId}&paymentMethod=${selectedPayment}`);
                  }}
                  className="w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  결제하기
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  위의 결제 정보를 확인하였으며, 
                  <a href="#" className="text-blue-600 underline">구매조건</a> 및 
                  <a href="#" className="text-blue-600 underline">개인정보취급방침</a>에 동의합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}