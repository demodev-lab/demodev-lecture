export interface Purchase {
  id: string;
  paymentNumber: string;
  paymentDate: string;
  status: "completed" | "pending" | "cancelled" | "refunded";
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

export type PurchaseStatus = "all" | "completed" | "pending" | "cancelled" | "refunded";

export interface PurchaseFilter {
  status: PurchaseStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
}