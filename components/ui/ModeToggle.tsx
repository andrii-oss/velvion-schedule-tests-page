"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className="h-[40px] border-0 p-2 smobile:p-2.5 cursor-pointer absolute right-6 top-10"
        variant="outline"
        iconSize="lg"
        disabled
      >
        <Moon className="h-4 w-4 smobile:h-[1.3rem] smobile:w-[1.3rem]" />
      </Button>
    );
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <Button
      className="h-[40px] border-0 p-2 smobile:p-2.5 cursor-pointer absolute right-6 top-10"
      variant="outline"
      iconSize="lg"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 smobile:h-[1.3rem] smobile:w-[1.3rem] text-cyan" />
      <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 smobile:h-[1.3rem] smobile:w-[1.3rem] text-cyan" />
    </Button>
  );
}
