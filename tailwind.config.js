/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'selector',
  theme: {
    screens: {
      'tablet': '700px',
      'desktop': '1000px',
      'platform': '1100px'
    },
    extend: {},
  },
  plugins: [],
}