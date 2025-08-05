"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Lecture, lectures } from "@/app/lecture/[id]/lectures";
import { CheckCircle } from "lucide-react";

export default function PaymentCompletePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderId = params.id as string;
  const lectureId = searchParams.get("lectureId");
  const paymentMethod = searchParams.get("paymentMethod");
  
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [paymentTime] = useState(new Date());

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
          <p className="text-gray-600">주문 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const finalPrice = lecture.price.discounted || lecture.price.original;
  const discountAmount = lecture.price.original - finalPrice;

  const getPaymentMethodName = (method: string | null) => {
    switch (method) {
      case 'card': return '신용·체크카드';
      case 'kakao': return '카카오페이';
      case 'toss': return '토스페이';
      case 'payco': return '페이코';
      default: return '신용·체크카드';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 상단 완료 메시지 */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-brand-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">주문 완료</h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span>주문번호:</span>
            <span className="font-semibold">{orderId}</span>
          </div>
          <p className="text-gray-600 mt-2">
            축하합니다! 이제 새로운 지식을 배울 수 있어요.
          </p>
        </div>

        {/* 구매 내역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽 섹션 - 구매한 강의 */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  구매한 강의수 1개
                </h3>
                
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
                    <h4 className="font-semibold text-gray-900">
                      {lecture.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {lecture.instructor.name}
                    </p>
                    <div className="flex items-baseline space-x-2 mt-2">
                      {lecture.price.discounted && (
                        <>
                          <span className="text-red-500 font-bold text-sm">
                            {Math.round((1 - lecture.price.discounted / lecture.price.original) * 100)}%
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ₩{finalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ₩{lecture.price.original.toLocaleString()}
                          </span>
                        </>
                      )}
                      {!lecture.price.discounted && (
                        <span className="text-lg font-bold text-gray-900">
                          ₩{finalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      신불하기를 위한 깔끔 완인
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 버튼 영역 */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => router.push('/mypage?tab=purchase')}
                className="flex-1 py-3 px-6 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                구매 내역 상세
              </button>
              <button
                onClick={() => router.push('/mypage')}
                className="flex-1 py-3 px-6 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
              >
                보유한 강의 보기
              </button>
            </div>
          </div>

          {/* 오른쪽 섹션 - 결제 금액 */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  총 결제 금액
                </h3>
                
                <div className="text-2xl font-bold text-gray-900 mb-6">
                  ₩{finalPrice.toLocaleString()}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">강의 금액</span>
                    <span className="text-gray-900">
                      ₩{lecture.price.original.toLocaleString()}
                    </span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">할인 금액</span>
                      <span className="text-red-500">
                        -₩{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t mt-4 pt-4 space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="text-gray-600">상태</div>
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      결제 완료
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-gray-600">결제 시각</div>
                    <div className="text-gray-900">
                      {paymentTime.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      }).replace(/\. /g, '. ')}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-gray-600">결제 수단</div>
                    <div className="text-gray-900">
                      {getPaymentMethodName(paymentMethod)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}