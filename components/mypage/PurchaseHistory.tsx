"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, RefreshCw } from "lucide-react";
import { Purchase, PurchaseStatus } from "@/types/purchase";
import DatePicker, { DateRange } from "./DatePicker";

// 더미 구매 데이터
const dummyPurchases: Purchase[] = [
  {
    id: "1",
    paymentNumber: "20250805125457239629116524853",
    paymentDate: "2025-08-05 12:54",
    status: "completed",
    lecture: {
      id: 1,
      title: "개발 몰라도 AI로 3시간이면 웹사이트 코딩 가능",
      subtitle: "초보자도 쉽게 따라할 수 있는 AI 활용 웹개발",
      badge: "웹개발",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 150000,
      couponDiscount: 30000,
      voucherDiscount: 0,
      pointsUsed: 5000,
      finalAmount: 115000,
    },
    refundable: true,
  },
  {
    id: "2",
    paymentNumber: "20250804165432876543219876543",
    paymentDate: "2025-08-04 16:32",
    status: "order_pending_payable",
    lecture: {
      id: 2,
      title: "바이브 코딩, 반드시 알아야 하는 것",
      subtitle: "효율적인 개발을 위한 바이브 코딩 핵심 가이드",
      badge: "웹개발",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 120000,
      couponDiscount: 20000,
      voucherDiscount: 0,
      pointsUsed: 0,
      finalAmount: 100000,
    },
    refundable: true,
  },
  {
    id: "3",
    paymentNumber: "20250803142857123456789012345",
    paymentDate: "2025-08-03 14:28",
    status: "refund_pending",
    lecture: {
      id: 3,
      title: "개발 아예 몰라도 커서로 AI 서비스 만들기",
      subtitle: "비전공자도 가능한 AI 서비스 개발 완전정복",
      badge: "BEST",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 200000,
      couponDiscount: 0,
      voucherDiscount: 20000,
      pointsUsed: 10000,
      finalAmount: 170000,
    },
    refundable: false,
  },
  {
    id: "4",
    paymentNumber: "20250802093045567890123456789",
    paymentDate: "2025-08-02 09:30",
    status: "payment_cancelled",
    lecture: {
      id: 4,
      title: "풀스택 앱 처음부터 끝까지? 바이브 코딩으로 직접 보여드립니다",
      subtitle: "실전 앱 개발 바이브 코딩으로 완전정복",
      badge: "앱개발",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 180000,
      couponDiscount: 30000,
      voucherDiscount: 0,
      pointsUsed: 0,
      finalAmount: 150000,
    },
    refundable: false,
  },
  // 추가 샘플 데이터 (모든 상태를 보여주기 위함)
  {
    id: "5",
    paymentNumber: "20250801113245789012345678901",
    paymentDate: "2025-08-01 11:32",
    status: "order_pending_unpayable",
    lecture: {
      id: 2,
      title: "바이브 코딩, 반드시 알아야 하는 것",
      subtitle: "효율적인 개발을 위한 바이브 코딩 핵심 가이드",
      badge: "웹개발",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 120000,
      couponDiscount: 0,
      voucherDiscount: 0,
      pointsUsed: 0,
      finalAmount: 120000,
    },
    refundable: false,
  },
  {
    id: "6",
    paymentNumber: "20250731095543210987654321098",
    paymentDate: "2025-07-31 09:55",
    status: "order_cancelled",
    lecture: {
      id: 3,
      title: "개발 아예 몰라도 커서로 AI 서비스 만들기",
      subtitle: "비전공자도 가능한 AI 서비스 개발",
      badge: "BEST",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 200000,
      couponDiscount: 0,
      voucherDiscount: 0,
      pointsUsed: 0,
      finalAmount: 200000,
    },
    refundable: false,
  },
  {
    id: "7",
    paymentNumber: "20250730145512345678901234567",
    paymentDate: "2025-07-30 14:55",
    status: "refunded",
    lecture: {
      id: 4,
      title: "풀스택 앱 처음부터 끝까지? 바이브 코딩으로 직접 보여드립니다",
      subtitle: "실전 앱 개발 바이브 코딩 완전정복",
      badge: "앱개발",
      instructor: "데모데브",
    },
    pricing: {
      originalPrice: 180000,
      couponDiscount: 20000,
      voucherDiscount: 0,
      pointsUsed: 0,
      finalAmount: 160000,
    },
    refundable: false,
  },
];

const statusOptions: { value: PurchaseStatus; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "order_pending_unpayable", label: "주문대기-결제불가" },
  { value: "order_pending_payable", label: "주문대기-결제가능" },
  { value: "order_cancelled", label: "주문대기취소" },
  { value: "completed", label: "결제완료" },
  { value: "payment_cancelled", label: "결제취소" },
  { value: "refund_pending", label: "환불대기" },
  { value: "refunded", label: "환불완료" },
];

// Fix: Remove 'noWrap' property from statusConfig and use a set for no-wrap statuses
const noWrapStatuses = new Set([
  "order_pending_unpayable",
  "order_pending_payable",
]);

const getStatusBadge = (status: string) => {
  const statusConfig: Record<
    string,
    { label: string; color: string }
  > = {
    order_pending_unpayable: { label: "주문대기-결제불가", color: "bg-red-100 text-red-600" },
    order_pending_payable: { label: "주문대기-결제가능", color: "bg-orange-100 text-orange-600" },
    order_cancelled: { label: "주문대기취소", color: "bg-gray-100 text-gray-600" },
    completed: { label: "결제완료", color: "bg-green-100 text-green-600" },
    payment_cancelled: { label: "결제취소", color: "bg-red-100 text-red-600" },
    refund_pending: { label: "환불대기", color: "bg-yellow-100 text-yellow-600" },
    refunded: { label: "환불완료", color: "bg-gray-100 text-gray-600" },
  };
  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color || "bg-gray-100 text-gray-600"}${noWrapStatuses.has(status) ? " whitespace-nowrap" : ""}`}
    >
      {config?.label || status}
    </span>
  );
};

export default function PurchaseHistory() {
  const [selectedStatus, setSelectedStatus] = useState<PurchaseStatus>("all");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // 드롭다운 ref 및 바깥 클릭 감지
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStatusDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStatusDropdownOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isStatusDropdownOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsStatusDropdownOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isStatusDropdownOpen]);

  const filteredPurchases = dummyPurchases.filter((purchase) => {
    // 상태 필터
    const statusMatch = selectedStatus === "all" || purchase.status === selectedStatus;
    
    // 날짜 범위 필터
    let dateMatch = true;
    if (selectedDateRange.startDate) {
      const purchaseDate = new Date(purchase.paymentDate);
      const startDate = selectedDateRange.startDate;
      const endDate = selectedDateRange.endDate || selectedDateRange.startDate;
      
      // 시간 정보를 제거하고 날짜만 비교
      const purchaseDateOnly = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), purchaseDate.getDate());
      const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      
      dateMatch = purchaseDateOnly >= startDateOnly && purchaseDateOnly <= endDateOnly;
    }
    
    return statusMatch && dateMatch;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">구매 내역</h2>
          
          {/* 필터 섹션 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* 날짜 필터 */}
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {selectedDateRange.startDate 
                  ? selectedDateRange.endDate 
                    ? `${selectedDateRange.startDate.getFullYear()}-${String(selectedDateRange.startDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDateRange.startDate.getDate()).padStart(2, '0')} ~ ${selectedDateRange.endDate.getFullYear()}-${String(selectedDateRange.endDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDateRange.endDate.getDate()).padStart(2, '0')}`
                    : `${selectedDateRange.startDate.getFullYear()}-${String(selectedDateRange.startDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDateRange.startDate.getDate()).padStart(2, '0')}`
                  : "결제일시"
                }
              </span>
            </button>
            
            {/* 상태 필터 드롭다운 */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsStatusDropdownOpen((open) => !open)}
                className={`flex items-center justify-between gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 min-w-[100px] transition-colors
                  ${isStatusDropdownOpen ? "ring-2 ring-blue-200" : ""}
                `}
                aria-haspopup="listbox"
                aria-expanded={isStatusDropdownOpen}
                aria-controls="status-dropdown-list"
                tabIndex={0}
              >
                <span className="text-sm text-gray-700 whitespace-nowrap">
                  {statusOptions.find(option => option.value === selectedStatus)?.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isStatusDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              <div
                className={`absolute right-0 mt-1 w-40 sm:w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20 transition-all duration-200
                  ${isStatusDropdownOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
                id="status-dropdown-list"
                role="listbox"
                style={{
                  minWidth: "8rem",
                }}
              >
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedStatus(option.value);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md transition-colors
                      ${selectedStatus === option.value ? "bg-blue-50 text-blue-700 font-semibold" : ""}
                      ${noWrapStatuses.has(option.value) ? "whitespace-nowrap" : ""}
                    `}
                    role="option"
                    aria-selected={selectedStatus === option.value}
                    tabIndex={isStatusDropdownOpen ? 0 : -1}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 구매 내역 리스트 */}
      <div className="space-y-4">
        {filteredPurchases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">구매 내역이 없습니다</h3>
              <p className="text-sm text-gray-400">아직 구매한 강의가 없어요.</p>
            </div>
          </div>
        ) : (
          filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* 상태 및 환불요청 버튼 */}
              <div className="p-4 sm:p-6 pb-4 flex justify-between items-start">
                <div>
                  {getStatusBadge(purchase.status)}
                </div>
                {purchase.refundable && (
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                    환불요청
                  </button>
                )}
              </div>

              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                {/* 강의 정보 */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {purchase.lecture.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">
                    {purchase.lecture.subtitle}
                  </p>
                  
                  {/* 결제 정보 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-gray-500 mb-4">
                    <div>
                      <span className="font-medium">결제번호</span>
                      <span className="ml-2">{purchase.paymentNumber}</span>
                    </div>
                    <div>
                      <span className="font-medium">결제날짜</span>
                      <span className="ml-2">{purchase.paymentDate}</span>
                    </div>
                  </div>
                </div>

                {/* 가격 정보 테이블 */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">상품가격</span>
                      <span className="text-gray-900">{purchase.pricing.originalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">쿠폰</span>
                      <span className="text-gray-900">{purchase.pricing.couponDiscount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">상품권</span>
                      <span className="text-gray-900">{purchase.pricing.voucherDiscount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">포인트</span>
                      <span className="text-gray-900">{purchase.pricing.pointsUsed.toLocaleString()}원</span>
                    </div>
                  </div>
                  
                  {/* 총 결제금액 */}
                  <div className="border-t mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">총 결제금액</span>
                      <span className="text-lg font-bold text-gray-900">
                        {purchase.pricing.finalAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 날짜 선택 달력 */}
      <DatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onDateRangeSelect={(range) => setSelectedDateRange(range)}
        selectedRange={selectedDateRange}
      />
    </div>
  );
}