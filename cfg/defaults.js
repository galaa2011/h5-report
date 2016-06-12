'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;
// let ExtractTextPlugin = require("extract-text-webpack-plugin");
function getDefaultModules() {
  return {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        loader: 'style-loader!css-loader?root=../!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(ico|png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192&name=fonts/[hash:8].[name].[ext]'
      },
      {
        test: /\.(mp4|ogg|svg|eot|ttf)$/,
        loader: 'file-loader?name=fonts/[hash:8].[name].[ext]'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};