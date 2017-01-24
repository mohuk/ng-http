var webpack = require('webpack');
var coreConfig = require('./core');
var webpackMerge = require('webpack-merge');

const ENV = process.env.ENV = process.env.ENV = 'development';

module.exports = webpackMerge(coreConfig, {

  entry: {
    'main': './demo/main.ts',
    'vendor': './demo/vendor.ts'
  },
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: 'dist',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    host: '0.0.0.0',
    port: 7070
  }
});
