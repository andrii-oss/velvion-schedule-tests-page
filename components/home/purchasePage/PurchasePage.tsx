"use client";

import PurchaseOptions from "./PurchaseOptions";
import PurchaseBenefits from "./PurchaseBenefits";
import PurchaseForm from "./PurchaseForm";
import { CouponData } from "@/types/couponTypes";
import { useState } from "react";

export default function PurchasePage() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [couponData, setCouponData] = useState<CouponData | null>(
    null
  );
  return (
    <div className="mx-auto max-w-[600px] flex flex-col w-full">
      <section className="pb-[36px] mb-[36px] border-b border-gray dark:border-cyan-light">
        <h1 className="text-[32px] dark:text-cyan text-dark sm:text-[36px] text-center mb-4 tracking-[-0.01em] font-helvetica-neue font-semibold">
          Ótimo, sua região é atendida.
        </h1>
        <p className="text-[18px] sm:text-[20px] dark:text-cyan-light text-blue leading-[26px] text-center max-w-[95%] mx-auto">
          Agora é o momento de cuidar da sua saúde de forma completa, do coração
          aos hormônios, dos sinais e marcadores de câncer à tireoide e além.
          Mantenha-se sempre um passo à frente.
        </p>
      </section>
      <PurchaseOptions onSelectedOption={setSelectedOption} selectedOption={selectedOption} couponData={couponData} onCouponData={setCouponData} />
      <PurchaseBenefits />
      <PurchaseForm couponData={couponData} />
    </div>
  );
}
