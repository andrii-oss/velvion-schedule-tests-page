import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // default breakpoints but with 40px removed
      screens: {
        "2xl": "1440px",
      },
    },
    // custom begins here
    extend: {
      screens: {
        // custom screens for most popular usages
        smobile: "395px",
        mobile: "495px",
        lmobile: "580px",
        tablet: "768px",
        ltablet: "920px",
        laptop: "1280px",
        desktop: "1440px",
        bdesktop: "1728px",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Arial", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "Arial", "sans-serif"],
      },
      colors: {
        // Base colors
        cream: "#f9f9f7",
        dark: "#2b2d2f",
        black: "#0a0a0a",
        light: "#ededed",
        blue: "#8898a8",
        gray: "#7e7e7e",
        "dark-gray": "#3c3d42",
        cyan: "#5dc6d5",
        "cyan-light": "#c3e7ed",
        neutral: "#B2BCC7",
        placeholder: "#cccccc",
      },
      transform: {
        "translate-center": "translate(-50%, -50%)",
      },
      borderRadius: {},
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
