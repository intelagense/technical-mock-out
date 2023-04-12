/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js",],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

