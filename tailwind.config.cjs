/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,jsx,js}"],
  theme: {
    fontFamily: {
      'sans': ['Helvetica'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
