/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-green': '#DDF4E7',
        'medium-green': '#67C090',
        'teal': '#26667F',
        'dark-blue': '#124170',
      },
      textColor: {
        'DEFAULT': '#000000',
      }
    },
  },
  plugins: [],
}