/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,js}"],
  theme: {
    fontFamily: {
      'sans': ['Helvetica'],
    },
    colors:{
        'light-blue' : '#55BDE5',
        'dark-blue' : '#146887',
        'light-grey' : '#D9D9D9',
        'dark-grey' : '#9CA3AF',
        'sky-blue' : "#97B2F1",
        'white': '#FFFFFF',
    },
    aspectRatio: {
      '2/1': '2 / 1',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
