/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'primary-50': '#f5f6f9',
        'primary-100': '#f5f6f9',
        'primary-200': '#d6dce7',
        'primary-300': '#bac3d6',
        'primary-400': '#98a6c2',
        'primary-500': '#7f8cb2',
        'primary-600': '#6d77a3',
        'primary-700': '#616894',
        'primary-800': '#4e5273',
        'primary-900': '#454963',
        'primary-950': '#2d2f3e',
      }
    }
  },
  plugins: [],
}