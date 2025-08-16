import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b6e5ff',
          300: '#84d4ff',
          400: '#42bbff',
          500: '#129ef0',
          600: '#0078c4',
          700: '#005e9d',
          800: '#004d80',
          900: '#00375c'
        }
      }
    }
  },
  plugins: []
} satisfies Config;