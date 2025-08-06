import { Suspense } from "react";
import PaymentPage from "@/components/payment/PaymentPage";

export default function Payment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <PaymentPage />
    </Suspense>
  );
}