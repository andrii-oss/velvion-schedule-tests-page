"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/ModeToggle";
import { Button } from "../ui/button";
import { useAvailabilityStore } from "@/store/availability-store";
import { ArrowLeft } from "lucide-react";

export default function Header() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isAvailable = useAvailabilityStore((state) => state.isAvailable);
  const reset = useAvailabilityStore((state) => state.reset);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (isAvailable === true) {
      window.history.pushState(null, "", window.location.href);
    }
  }, [isAvailable]);

  useEffect(() => {
    const handlePopState = () => {
      if (isAvailable === true) {
        reset();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAvailable, reset]);

  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const logoSrc = `/logo-${currentTheme === "light" ? "light" : "dark"}.svg`;

  const handleBack = () => {
    reset();
  };

  return (
    <header className="w-full dark:bg-dark bg-cream relative">
      <div className="container mx-auto px-6 py-[25px] sm:py-[30px] flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="logo"
          width={195}
          height={32}
          className="w-[105px] h-[17px] mobile:w-[195px] mobile:h-[32px]"
        />
        <ModeToggle />
        {isAvailable === true && (
          <Button
            onClick={handleBack}
            className="absolute right-6 top-full h-[40px] border-0 p-2 smobile:p-2.5 flex items-center gap-2 text-cyan hover:text-cyan-light hover:bg-transparent"
            variant="ghost"
          >
            <ArrowLeft className="h-4 w-4 smobile:h-[1.3rem] smobile:w-[1.3rem]" />
            <span className="text-sm smobile:text-base">Voltar</span>
          </Button>
        )}
      </div>
    </header>
  );
}
