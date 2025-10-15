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
      },
    },
  },
  plugins: [],
};

export default config;
