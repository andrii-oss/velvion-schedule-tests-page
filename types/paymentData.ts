export interface PaymentData {
  bankSlipUrl: string;
  billingType: string;
  customer: string;
  dateCreated: string; // ISO string
  description: string;
  dueDate: string; // YYYY-MM-DD
  externalReference: string | null;
  id: string;
  installmentCount: number | null;
  installmentValue: number | null;
  interestValue: number | null;
  invoiceNumber: string;
  invoiceUrl: string;
  netValue: number;
  originalValue: number | null;
  status: string;
  transactionReceiptUrl: string | null;
  value: number;
}