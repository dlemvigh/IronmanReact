var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build/client'),
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
    }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-autoprefixer!postcss')
    }, {
    test: /\.scss$/,
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'resolve-url',
        'sass'
    ]
}]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'client', 'Media', 'ironman-logo.jpg'),
      inject: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      "process.env": { 
        NODE_ENV: JSON.stringify("production") 
      }
    }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      // compress: {
      //   screw_ie8: true, // React doesn't support IE8
      //   warnings: false
      // },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
};
