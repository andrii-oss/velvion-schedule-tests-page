"use client";

import { ReactNode } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1 py-[40px] px-6 h-full">{children}</main>
      <Footer />
    </div>
  );
}
