/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'xl': '1032px',
      }
    }
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
