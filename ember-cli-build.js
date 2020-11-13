'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { join } = require('path');
const isProduction = EmberApp.env() === 'production';
const purgeCSS = {
  module: require('@fullhuman/postcss-purgecss'),
  options: {
    content: [
      // Specify all paths in the application that include Tailwind classes.
      join(__dirname, 'app', 'index.html'),
      join(__dirname, 'app', 'styles', '**', '*.css'),
      join(__dirname, 'app', 'pods', '**', '*.hbs'),
      join(__dirname, 'app', 'pods', '**', '*.js'),
    ],

    // Include any special characters you're using in this regular expression.
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'asset-cache': {
      include: ['assets/**/*'],
    },

    postcssOptions: {
      compile: {
        plugins: [
          require('tailwindcss')('app/tailwind.config.js'),
          require('autoprefixer'),
          // Only apply the purge CSS plugin to the production builds.
          ...(isProduction ? [purgeCSS] : []),
        ],
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
