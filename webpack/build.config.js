const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');

const WebpackConfig = {

  // Disable source maps on production builds
  devtool: false,

  entry: {
    // Plugin entry points
    'control/content/content': path.join(__dirname, '../src/control/content/content.js'),
    'control/design/design': path.join(__dirname, '../src/control/design/design.js'),
    'control/settings/settings': path.join(__dirname, '../src/control/settings/settings.js'),
    'widget/widget': path.join(__dirname, '../src/widget/js/app.js')
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },

  externals: {
    buildfire: 'buildfire',
    angular: 'angular'
  },

  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({'uglifyOptions': {'mangle': false}}),
    new HtmlWebpackPlugin({
      filename: 'control/content/index.html',
      inject: true,
      minify: { removeComments: true, collapseWhitespace: true },
      template: path.join(__dirname, '../src/control/content/index.html'),
      chunks: ['control/content/content']
    }),
    new HtmlWebpackPlugin({
      filename: 'control/design/index.html',
      inject: true,
      minify: { removeComments: true, collapseWhitespace: true },
      template: path.join(__dirname, '../src/control/design/index.html'),
      chunks: ['control/design/design']
    }),
    new HtmlWebpackPlugin({
      filename: 'control/settings/index.html',
      inject: true,
      minify: { removeComments: true, collapseWhitespace: true },
      template: path.join(__dirname, '../src/control/settings/index.html'),
      chunks: ['control/settings/settings']
    }),
    new HtmlWebpackPlugin({
      filename: 'widget/index.html',
      inject: true,
      minify: { removeComments: true, collapseWhitespace: true },
      template: path.join(__dirname, '../src/widget/index.html'),
      chunks: ['widget/widget']
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../src/control'),
      to: path.join(__dirname, '../dist/control'),
    }, {
      from: path.join(__dirname, '../src/widget'),
      to: path.join(__dirname, '../dist/widget'),
    }, {
      from: path.join(__dirname, '../src/resources'),
      to: path.join(__dirname, '../dist/resources'),
    }, {
      from: path.join(__dirname, '../plugin.json'),
      to: path.join(__dirname, '../dist/plugin.json'),
    }
    ], {
      ignore: ['*.js', 'index.html', '*.md']
    }),
    new ZipWebpackPlugin({
      path: path.join(__dirname, '../'),
      filename: `plugin.zip`
    })
  ]

};

module.exports = WebpackConfig;
