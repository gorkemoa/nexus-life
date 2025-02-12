/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js}",
    "./assets/**/*.{html,js}",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'dark-gold': '#B4941E',
        'light-gold': '#F4CF37'
      }
    }
  },
  plugins: [],
} 