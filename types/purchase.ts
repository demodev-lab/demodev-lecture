export interface Purchase {
  id: string;
  paymentNumber: string;
  paymentDate: string;
  status: "order_pending_unpayable" | "order_pending_payable" | "order_cancelled" | "completed" | "payment_cancelled" | "refund_pending" | "refunded";
  lecture: {
    id: number;
    title: string;
    subtitle: string;
    badge: string;
    instructor: string;
    image?: string;
  };
  pricing: {
    originalPrice: number;
    couponDiscount: number;
    voucherDiscount: number;
    pointsUsed: number;
    finalAmount: number;
  };
  refundable: boolean;
}

export type PurchaseStatus = "all" | "order_pending_unpayable" | "order_pending_payable" | "order_cancelled" | "completed" | "payment_cancelled" | "refund_pending" | "refunded";

export interface PurchaseFilter {
  status: PurchaseStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
}