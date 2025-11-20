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
        smobile: "375px",
        mobile: "428px",
        lmobile: "600px",
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
        // Surface colors (backgrounds)
        "surface-light": "#f9f9f7",
        "surface-dark": "#2B2D2F",
        "surface-black": "#0a0a0a",

        // Text colors
        "text-primary": "#2B2D2F",
        "text-primary-dark": "#ededed",
        "text-secondary": "#8898A8",
        "text-secondary-dark": "#C3E7ED",
        "text-muted": "#7E7E7E",
        "text-muted-dark": "#C3E7ED",

        // Border colors
        "border-default": "#7E7E7E",
        "border-default-dark": "#C3E7ED",
        "border-input": "#3C3D42",
        "border-input-dark": "#C3E7ED",

        // Accent colors
        "accent-color": "#5DC6D5",
        "accent-light": "#C3E7ED",

        // Placeholder colors
        placeholder: "#CCCCCC",
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
