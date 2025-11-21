"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer/Footer";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <div className="h-full flex flex-col">
        <Header />
        <main className="flex-1 py-[40px] px-6 dark:bg-dark bg-cream">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
