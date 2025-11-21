"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const optionsList = [
  {
    id: "1",
    title: "À vista, economize R$100",
    price: "R$1.088",
    methods: "Credit, Pix, or Debit",
  },
  {
    id: "2",
    title: "À vista, economize",
    price: "12x R$99",
    methods: "Credito",
  },
];

export default function PurchaseOptions() {
  const [selectedOption, setSelectedOption] = useState<string>("1");
  return (
    <div className="pb-[36px] mb-[36px] border-b border-gray dark:border-cyan-light">
      <h2 className="text-dark dark:text-cyan-light text-2xl font-helvetica-neue font-semibold mb-3">
        Escolha uma opção
      </h2>
      <p className="text-blue text-[16px] font-medium">
        Selecione a forma de pagamento que preferir.
      </p>
      <div className="flex flex-col lmobile:flex-row justify-between gap-5 mt-6">
        {optionsList.map((option) => (
          <button
            onClick={() => setSelectedOption(option.id)}
            key={option.id}
            className={cn(
              "flex flex-1 flex-col gap-1 border  border-gray dark:border-cyan-light rounded-lg p-4 max-h-[132px] text-left",
              selectedOption === option.id ? "border-cyan bg-cyan-light" : "hover:border-cyan/30 hover:bg-cyan-light/30 dark:hover:bg-cyan-light/10 transition-all duration-300 ease-out"
            )}
          >
            <h3
              className={cn(
                " text-base font-medium ",
                selectedOption === option.id ? "text-light-dark" : "text-blue"
              )}
            >
              {option.title}
            </h3>
            <p
              className={cn(
                " text-[28px] font-bold ",
                selectedOption === option.id ? "text-dark" : "dark:text-cyan-light"
              )}
            >
              {option.price}
            </p>
            <p
              className={cn(
                "text-base font-medium ",
                selectedOption === option.id ? "text-light-dark" : "text-blue"
              )}
            >
              {option.methods}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
