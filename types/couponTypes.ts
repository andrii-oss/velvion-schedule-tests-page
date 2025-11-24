export interface CouponData {
  coupon_id: string;
  discount_type: "percentage" | string;
  discount: number;
  code: string;
}

export interface CouponResponse {
  coupon_data: CouponData | null;
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