import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#6C63FF',
          600: '#5A52E0',
          700: '#4c46b8',
          800: '#3e3a8f',
          900: '#2e2a5f',
        },
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#FF6B6B',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        neutral: {
          50: '#F9F7FB',
          100: '#E8E9FF',
          200: '#d1d1e6',
          800: '#1E1E1E',
          900: '#0a0a0a',
        }
      },
      boxShadow: {
        'neu-sm': '3px 3px 8px #d1d1e6, -3px -3px 8px #ffffff',
        'neu-md': '5px 5px 15px #d1d1e6, -5px -5px 15px #ffffff',
        'neu-lg': '8px 8px 20px #d1d1e6, -8px -8px 20px #ffffff',
        'neu-inset': 'inset 2px 2px 5px #d1d1e6, inset -2px -2px 5px #ffffff',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow-pulse 4s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        first: "moveVertical 15s ease infinite", // 30s -> 15s (2x hızlı)
        second: "moveInCircle 10s reverse infinite", // 20s -> 10s (2x hızlı)
        third: "moveInCircle 20s linear infinite", // 40s -> 20s (2x hızlı)
        fourth: "moveHorizontal 20s ease infinite", // 40s -> 20s (2x hızlı)
        fifth: "moveInCircle 12s ease infinite", // 20s -> 12s (1.7x hızlı)
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
        '6000': '6s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
