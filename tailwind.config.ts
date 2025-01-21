import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--inter)', 'roboto'], // Agrega la variable aquí
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#FF8232',
        primaryHover: '#e26a20',    // Color principal personalizado
        primaryLight: '#fc8942',    // Color principal personalizado
        secondary: '#373737',  // Color secundario personalizado
        white: '#FFFFFF',      // Color blanco personalizado
        success: 'rgb(5 150 105)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0px)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        slideLeftFadeIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeftFadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0px)' },
          '100%': { opacity: '0', transform: 'translateX(20px)' },
        },
        slideRightFadeIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRightFadeOut: {
          '0%': { opacity: '1', transform: 'translateX(0px)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        fadeOut: 'fadeOut 0.6s ease-out forwards',
        slideLeftFadeIn: 'slideLeftFadeIn 0.6s ease-out forwards',
        slideLeftFadeOut: 'slideLeftFadeOut 0.6s ease-out forwards',
        slideRightFadeIn: 'slideRightFadeIn 0.6s ease-out forwards',
        slideRightFadeOut: 'slideRightFadeOut 0.6s ease-out forwards',
      },
    },
  },
  safelist: [
    'animate-fadeIn',
    'animate-fadeOut',
    'animate-slideLeftFadeIn',
    'animate-slideLeftFadeOut',
    'animate-slideRightFadeIn',
    'animate-slideRightFadeOut',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('preline/plugin'),
  ],
};
export default config;
