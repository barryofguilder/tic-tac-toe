'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'asset-cache': {
      include: ['assets/**/*'],
    },

    postcssOptions: {
      compile: {
        plugins: [require('tailwindcss')('app/tailwind.config.js'), require('autoprefixer')],
        // you need this otherwise we won't recompile on changes in the `app`-tree
        includePaths: ['app'],
        cacheInclude: [/.*\.(css|hbs|html|js)$/, /.tailwind\.config\.js$/],
      },
    },

    'ember-service-worker': {
      registrationStrategy: 'inline',
    },
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
