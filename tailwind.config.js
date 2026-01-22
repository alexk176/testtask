/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'figma-bg': '#f4f4fc',
        'figma-primary': '#1d3178',
        'figma-secondary': '#15245e',
        'figma-success': '#19d16f',
        'figma-danger': '#fb2e86',
        'figma-text': '#8a91ab',
        'figma-text-light': '#a1a8c1',
        'figma-text-placeholder': '#c5cbe3',
        'figma-border': '#e8e6f1',
        'figma-border-light': '#e1e1e4',
        'figma-input-bg': '#f0eff2',
        'figma-input-border': '#e7e7ef',
        'figma-quantity-text': '#bebfc2',
        'figma-link': '#0843fc',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
