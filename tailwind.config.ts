import type { Config } from "tailwindcss";

export default {
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
      transform: {
        "translate-center": "translate(-50%, -50%)",
      },
      borderRadius: {},
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
