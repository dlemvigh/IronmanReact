const path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = {
  mode: "development",
  entry: ["./client/index.js"],
  output: {
    path: path.join(__dirname, "build", "client"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"]
              }
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /\.modules\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.modules\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          }, // translates CSS into CommonJS

          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|wav|mp3|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
    // alias: {
    //   react: "preact-compat",
    //   "react-dom": "preact-compat"
    // }
  },
  plugins: [
    // new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: "client/index.html"
    }),
    new WebpackBar()
    // new BundleAnalyzerPlugin()
  ]
  // devtool: 'cheap-eval-source-map',
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: 'babel',
  //       query: {
  //         presets: ['react', 'es2015', 'stage-0'],
  //         plugins: ['./babelRelayPlugin'].map(require.resolve)
  //       }
  //     }, {
  //       test: /\.(png|jpg|jpeg|gif|svg)$/,
  //       loader: 'url-loader?limit=10000'
  //     }, {
  //       test: /\.(eot|ttf|wav|mp3|woff|woff2)$/,
  //       loader: 'file-loader',
  //     }, {
  //       test: /\.scss$/,
  //       loaders: [
  //         'style',
  //         'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
  //         'resolve-url',
  //         'sass'
  //       ]
  //     }
  //   ]
  // },
  // plugins: [
  //   new FaviconsWebpackPlugin({
  //     logo: path.join(__dirname, 'client', 'Media', 'ironman-logo.jpg'),
  //     title: 'Ironman 70.3',
  //     background: '#fff',
  //     inject: true
  //   }),
  //   new HtmlWebpackPlugin({
  //     inject: true,
  //     template: 'client/index.html',
  //   }),
  //   new ScriptExtHtmlWebpackPlugin({
  //     defaultAttribute: 'async'
  //   }),
  //   new webpack.DefinePlugin({
  //     "process.env": {
  //       NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  //     }
  //   }),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ]
};
