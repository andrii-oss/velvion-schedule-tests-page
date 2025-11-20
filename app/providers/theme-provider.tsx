"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Спочатку читаємо тему з DOM (встановлену скриптом)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });
  const [mounted] = useState(() => typeof window !== "undefined");

  const updateTheme = (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      // Завжди оновлюємо DOM
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
      // Дебаг: перевіряємо, чи клас додався
      console.log(
        "Theme updated:",
        newTheme,
        "Has dark class:",
        root.classList.contains("dark")
      );
    }
  };

  const handleSetTheme = (newTheme: Theme) => {
    updateTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  // Прослуховуємо зміни системної теми
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Оновлюємо тему тільки якщо користувач не вибрав тему вручну
      if (!localStorage.getItem("theme")) {
        const newTheme: Theme = e.matches ? "dark" : "light";
        updateTheme(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: handleSetTheme, toggleTheme, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
