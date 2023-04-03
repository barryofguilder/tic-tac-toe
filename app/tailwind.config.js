module.exports = {
  content: ['./app/**/*.{css,hbs,html,js}'],
  theme: {
    extend: {
      boxShadow: theme => ({
        'outline-color': `0 0 0 3px ${theme('colors.teal.400')}`
      })
    }
  },
  plugins: []
};
