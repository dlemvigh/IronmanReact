var path = require('path');
var webpack = require('webpack');

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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
    }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
