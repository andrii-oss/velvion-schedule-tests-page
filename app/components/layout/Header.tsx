"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/ModeToggle";

export default function Header() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const currentTheme = mounted ? resolvedTheme || theme : "dark";
  const logoSrc = `/logo-${currentTheme === "light" ? "light" : "dark"}.svg`;

  return (
    <header className="sticky top-0 z-50 w-full dark:bg-dark bg-cream">
      <div className="container mx-auto px-6 py-[25px] sm:py-[30px] flex items-center justify-center">
        <Image
          src={logoSrc}
          alt="logo"
          width={195}
          height={32}
          className="w-[105px] h-[17px] mobile:w-[195px] mobile:h-[32px]"
        />
        <ModeToggle />
      </div>
    </header>
  );
}
