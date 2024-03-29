/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        normal: ['Roboto', 'sans-serif'],
        special: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
};
