import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PurchaseBenefits() {
  const benefitsList = [
    "Mais de 80 exames laboratoriais para o corpo todo",
    "Insights personalizados de médicos especialistas",
    "Consulta clínica completa baseada nos seus resultados",
    "Acompanhamento dos seus resultados ao longo dos anos em um único lugar seguro",
    "Acesso à plataforma VelvionOS por 12 meses",
  ];
  return (
    <section className="py-[36px] mb-[36px] bg-cyan-light rounded-lg p-6">
      <h2 className="text-dark  text-2xl font-helvetica-neue font-medium mb-6">
        A Velvion inclui:
      </h2>
      <ul className="list-disc list-inside">
        {benefitsList.map((benefit, index) => {
          const isFirst = index === 0;
          const isLast = index === benefitsList.length - 1;
          const isMiddle = !isFirst && !isLast;

          return (
            <li
              key={benefit}
              className={cn(
                !isLast && "border-b border-gray",
                isFirst && "pb-4",
                isMiddle && "py-4",
                isLast && !isFirst && "pt-4",
                "flex items-center gap-3 text-dark text-[16px] leading-[22px] font-helvetica-neue font-medium"
              )}
            >
              <Image
                src="/check-circle.svg"
                alt="Check"
                width={24}
                height={24}
              />
              {benefit}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
