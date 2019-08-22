var webpack = require('webpack');
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {

  output: {
    filename: 'build/static/app/[name]'
  },

  entry: {
    'vendor/js/vendor.min.js': './webpack-config/vendor.ts',
    'app-components.min.js': './webpack-config/app-components.ts',
  },

  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          'expose-loader?jQuery',
          'expose-loader?$'
        ]
      },
      {
        test: require.resolve('modernizr'),
        use: [ 
          'expose-loader?Modernizr',
          'imports-loader?this=>window!exports-loader?window.Modernizr'
        ]
      },
      {
        test: require.resolve('detectizr'),
        use: [
          'expose-loader?Detectizr',
          'imports-loader?this=>window!exports-loader?window.Detectizr'
        ]
      },
      {
        test: require.resolve('lodash'),
        use: [
          'expose-loader?_'
        ]
      },
      {
        test: require.resolve('moment'),
        use: [
          'expose-loader?moment'
        ]
      },
      {
        test: require.resolve('fastclick'),
        use: [
          'expose-loader?FastClick'
        ]
      },
      {
        test: require.resolve('angular'),
        use: [
          'expose-loader?angular'
        ]
      },
      {
        test: require.resolve('d3'),
        use: [
          'expose-loader?d3'
        ]
      },
      {
        test: require.resolve('log4javascript'),
        use: [
          'expose-loader?log4javascript'
        ]
      },
      {
        test: require.resolve('highcharts'),
        use: [
          'expose-loader?Highcharts'
        ]
      },
      {
        test: require.resolve('phoneformat'),
        use: [
          {
            loader: 'expose-loader',
            options: 'goog'
          }, {
            loader: 'imports-loader?this=>window!exports-loader?goog'
          },
          {
            loader: StringReplacePlugin.replace({
              replacements: [
                {
                  pattern: /var i18n/ig,
                  replacement: function (match, p1, offset, string) {
                    return 'window.i18n';
                  }
                }
              ]})
          }
        ]
      },
      {
        test: /vendor.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: './webpack-config/tsconfig-webpack.json'
        }
      },
      {
        test: require.resolve('isotope/dist/isotope.pkgd'),
        loaders: [
          'imports-loader?this=>window'
        ]
      }
    ]
  },

  plugins: [

    new StringReplacePlugin(),

    // FIXME - test moment locales with server:predit
    // Fixes warning in moment-with-locales.min.js
    //   Module not found: Error: Can't resolve './locale' in ...
    new webpack.IgnorePlugin(/\.\/locale$/)

  ]
};
