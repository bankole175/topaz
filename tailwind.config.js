/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      kfGray: '#828282',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      danger: colors.red,
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      playfair: ['Playfair Display', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
