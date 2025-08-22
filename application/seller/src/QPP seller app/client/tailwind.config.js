/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    extend: {
      colors: {
        pak: {
          50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",
          500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d"
        },
        brand: {
          50:"#eaf3ff",100:"#d6e7ff",200:"#aecfff",300:"#85b7ff",400:"#5c9fff",
          500:"#347fff",600:"#1e5fd1",700:"#164aa5",800:"#0f3579",900:"#0a2454"
        }
      },
      boxShadow: { soft: "0 10px 30px -10px rgba(10,36,84,0.25)" },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        scroll: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" } // moves one full copy width
        },
        "scroll-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        scroll: "scroll var(--duration,40s) linear infinite",
        "scroll-reverse": "scroll-reverse var(--duration,40s) linear infinite"
      }
    } 
  },
  plugins: [],
}
