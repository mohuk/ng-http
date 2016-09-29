var webpack = require('webpack');
var coreConfig = require('./core');
var webpackMerge = require('webpack-merge');

const ENV = process.env.ENV = process.env.ENV = 'development';

module.exports = webpackMerge(coreConfig, {
  entry: {
    'index': './index.ts'
  },

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: 'dist',
    filename: '[name].js',
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
  ]
});
