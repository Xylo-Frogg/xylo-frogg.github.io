'use strict';
const path = require('path');
const packagejson = require('../package.json');
const webpack = require('webpack');
const SvgStore = require('webpack-svgstore-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*var BundleAnalyzerPlugin =
require('webpack-bundle-analyzer').BundleAnalyzerPlugin;*/

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry:  [
    packagejson.config.entry
  ],
  output: {
    path: resolve(packagejson.config.distfolder + '/js/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: [{'window': 'window'}],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader",
          options:{
            rootRelative:'./',
            helperDirs:resolve(packagejson.config.sourcefolder + '/js/helpers')
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpeg|jpg|gif)(\?.*)?$/,
        use:[
          {
            loader: 'file-loader',
            options: {
              include: [resolve(packagejson.config.sourcefolder)],
              limit: 1000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              include: [resolve(packagejson.config.sourcefolder)],
              limit: 1000,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  plugins: [
    new SvgStore.Options({
      // svgo options
      svgoOptions: {
        plugins: [
          { removeTitle: true }
        ]
      },
      prefix: 'ir-'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js/dist/umd/popper'
    }),
    new ExtractTextPlugin('../css/main.css'),
    new CopyWebpackPlugin([
      { from: resolve(packagejson.config.sourcefolder + '/images'), to: resolve(packagejson.config.distfolder + '/images') },
      { from: resolve(packagejson.config.sourcefolder + '/fonts'), to: resolve(packagejson.config.distfolder + '/fonts') }
    ])
  ]
};
