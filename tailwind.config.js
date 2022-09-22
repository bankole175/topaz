/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      kfGray: '#828282',
      kfLightGray: '#F4F5F5',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      danger: colors.red,
      red: colors.red,
    },
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      playfair: ['Playfair Display', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
