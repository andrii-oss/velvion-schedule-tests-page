"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cepLocation");
    }
  }, []);

  return (
    <div className="min-w-full flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center justify-center max-w-[600px] mx-auto">
        <div className="w-full flex flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/success-icon.svg"
              alt="Success"
              width={100}
              height={100}
            />
          </div>

          <h1 className="text-[32px] dark:text-cyan-light text-dark sm:text-[36px] mb-3 tracking-[-0.01em] font-helvetica-neue font-semibold">
            Pagamento confirmado
          </h1>
          <p className="text-[14px] sm:text-[16px] dark:text-cyan-light text-blue leading-[22px] text-center mb-9">
            Obrigado por confiar na gente. Sua assinatura está ativa e tudo está
            pronto para começar do jeito certo.
          </p>

          <p className="text-[14px] sm:text-[16px] text-dark leading-[22px] mb-8 p-5 bg-cyan-light rounded-2xl text-center">
            Antes de liberar seus exames, precisamos que você responda um
            questionário bem rápido. Isso nos ajuda a entender você de forma
            precisa e montar sua experiência do jeito mais útil possível. <br />
            <br />
            Leva poucos minutos e faz muita diferença.
          </p>

          <div className="w-full flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="w-full sm:flex-1 py-[14px] transition-all duration-300 ease-out font-semibold bg-cyan border-2 border-transparent hover:border-cyan hover:bg-transparent hover:text-cyan text-dark"
            >
              <Link href="https://www.velvion.com.br">Começar agora</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
