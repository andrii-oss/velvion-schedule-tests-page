"use client";

import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/theme-provider";
import { Button } from "../ui/button";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-[30px] flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={121}
          height={32}
          className="h-8 w-fit"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 absolute right-6"
          aria-label="Toggle theme"
        >
          <span suppressHydrationWarning>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </span>
        </Button>
      </div>
    </header>
  );
}
