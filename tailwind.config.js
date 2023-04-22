/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{hbs,js}', './app/index.html'],
  theme: {
    extend: {
      boxShadow: (theme) => ({
        'outline-color': `0 0 0 3px ${theme('colors.teal.400')}`,
      }),
    },
  },
  plugins: [],
};
