var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel', 
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['./babelRelayPlugin'].map(require.resolve)
        }   
      }, {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(eot|ttf|wav|mp3|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass'
        ]
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'client', 'Media', 'ironman-logo.jpg'),
      title: 'Ironman 70.3',
      background: '#fff',
      inject: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
