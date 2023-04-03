'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Tic Tac Toe',
    short_name: 'Tic Tac Toe',
    description: 'The game of tic tac toe.',
    start_url: '/',
    display: 'standalone',
    background_color: '#553C9A',
    theme_color: '#553C9A',
    icons: [],
    apple: {
      statusBarStyle: 'black-translucent',
    },
    ms: {
      tileColor: '#553C9A',
    },
  };
};
