export interface CouponMain {
  coupon_id: string;
  discount_type: "percentage" | string;
  discount: number;
  code: string;
}

export interface CouponData {
  coupon_data: CouponMain | null;
  discount_amount: number;
  discount_percentage: number;
  final_value: number;
  installment_count: number | null;
  installment_remainder: number | null;
  installment_value: number | null;
  last_installment_value: number | null;
  message: string;
  original_value: number;
  valid: boolean;
}