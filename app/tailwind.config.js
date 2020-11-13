module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      boxShadow: theme => ({
        'outline-color': `0 0 0 3px ${theme('colors.teal.400')}`,
      }),
    },
  },
  variants: {},
  plugins: [],
};
