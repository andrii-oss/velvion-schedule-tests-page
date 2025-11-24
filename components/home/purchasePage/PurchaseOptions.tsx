"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const optionsList = [
  {
    type: 1,
    title: "À vista, economize R$100",
    price: "R$1.088",
    methods: "Credit, Pix, or Debit",
  },
  {
    type: 12,
    title: "À vista, economize",
    price: "12x R$99",
    methods: "Credito",
  },
];

export default function PurchaseOptions() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>("");

  const sendPromoCode = async () => {
    if (!promoCode.trim()) return;
    // Тут можна додати логіку валідації та застосування промокоду
    console.log("Promo code:", promoCode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendPromoCode();
    }
  };
  return (
    <section className="pb-[36px] mb-[36px] border-b border-gray dark:border-cyan-light">
      <h2
        id="payment-options-heading"
        className="text-dark dark:text-cyan-light text-2xl font-helvetica-neue font-medium mb-3"
      >
        Escolha uma opção
      </h2>
      <p className="text-blue text-[16px] font-medium">
        Selecione a forma de pagamento que preferir.
      </p>
      <div
        role="radiogroup"
        aria-labelledby="payment-options-heading"
        className="flex flex-col lmobile:flex-row justify-between gap-5 mt-6"
      >
        {optionsList.map((option) => (
          <button
            type="button"
            role="radio"
            aria-checked={selectedOption === option.type}
            onClick={() => setSelectedOption(option.type)}
            key={option.type}
            className={cn(
              "flex flex-1 flex-col gap-1 border border-gray dark:border-cyan-light rounded-lg p-4 min-h-[132px] text-left",
              selectedOption === option.type
                ? "border-cyan bg-cyan-light"
                : "hover:border-cyan/30 hover:bg-cyan-light/30 dark:hover:bg-cyan-light/10 transition-all duration-300 ease-out"
            )}
          >
            <span
              className={cn(
                "text-base font-medium",
                selectedOption === option.type ? "text-light-dark" : "text-blue"
              )}
            >
              {option.title}
            </span>
            <span
              className={cn(
                "text-[28px] font-bold",
                selectedOption === option.type
                  ? "text-dark"
                  : "dark:text-cyan-light"
              )}
            >
              {option.price}
            </span>
            <span
              className={cn(
                "text-base font-medium",
                selectedOption === option.type ? "text-light-dark" : "text-blue"
              )}
            >
              {option.methods}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col smobile:flex-row gap-3 mt-6">
        <Input
          type="text"
          placeholder="Cupom de desconto"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-cyan h-[60px] dark:border-cyan border-2"
          aria-label="Cupom de desconto"
        />
        <Button
          type="button"
          onClick={sendPromoCode}
          variant="outline"
          disabled={!promoCode.trim()}
          className="smobile:w-auto w-full h-[60px] border-2 hover:text-white"
        >
          Aplicar
        </Button>
      </div>
    </section>
  );
}
