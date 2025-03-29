import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/index/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#F3F3F3',
        blue: '#2D73F3',
        orange: '#F29B2E',
        yellow: '#F2B42E',
        black: '#282C33',
        gray: '#3E4248',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // 슬라이더의 절반까지 이동
        },
        zoomBg: {
          '0%': { 'background-size': '140%' },
          '100%': { 'background-size': '100%' },
        },
        modalFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite', // 애니메이션 정의
        zoomBg: 'zoomBg 5s ease-in-out',
        modalFadeIn: 'modalFadeIn 0.5s ease-in-out forwards',
        modalFadeOut: 'modalFadeOut 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
