/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Token names are kept from the original project so every existing page re-skins automatically.
      colors: {
        cream: "#F1F5F3", // ice
        paper: "#FAFBFA",
        forest: { DEFAULT: "#0E5E5A", dark: "#0C2A2E", soft: "#3F8580" }, // electric blue / night
        sun: "#E0A83C", // signal yellow
        amber: "#F3E2B3",
        mist: "#DCE8E4",
        sky: "#BFD8D2",
        aqua: "#A9D8CE",
        peach: "#F2D5C8",
        ink: "#10272B",
        clay: "#C5472F", // pill red-orange
        line: "#CBDAD5",
        lilac: "#BCD3DA",
        electric: "#0E5E5A",
        night: "#0C2A2E",
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "system-ui", "sans-serif"],
        syne: ['"Syne Variable"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        sans: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,39,43,0.08)",
        card: "0 1px 2px rgba(16,39,43,0.05), 0 12px 28px -16px rgba(16,39,43,0.2)",
        lift: "0 2px 4px rgba(16,39,43,0.06), 0 20px 40px -20px rgba(16,39,43,0.28)",
        glow: "0 0 0 2px #A9D8CE",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" },
          "50%": {
            transform: "translateY(-16px) rotate(calc(var(--r,0deg) + 8deg))",
          },
        },
        rise: {
          from: { opacity: 0, transform: "translateY(40px) rotate(2deg)" },
          to: { opacity: 1, transform: "none" },
        },
        draw: { from: { strokeDashoffset: 1 }, to: { strokeDashoffset: 0 } },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(14,94,90,0.5)" },
          "70%,100%": { boxShadow: "0 0 0 10px rgba(14,94,90,0)" },
        },
        scan: {
          from: { transform: "translateY(-120%)" },
          to: { transform: "translateY(420%)" },
        },
        tick: {
          from: { opacity: 0, transform: "scale(0.4)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        blob: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(8%,-10%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-9%,7%,0) scale(0.92)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        rise: "rise 0.8s cubic-bezier(.2,.8,.2,1) both",
        draw: "draw 1.2s 0.9s ease-out both",
        verified:
          "tick 0.4s ease-out both, pulseRing 2.6s ease-out 1.4s infinite",
        scan: "scan 6s linear infinite",
        blob: "blob 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
