'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

const fs = require('fs')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// // const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const modulePath = resolve('src/modules/')
const moduleFiles = fs.readdirSync(modulePath)
console.log(moduleFiles)
const getEntris = () => {
  const entrys = {}
  moduleFiles.forEach(filename => {
    entrys[filename] = path.join(modulePath, `${filename}`, 'main.js')
  })
  return entrys
}
const entries = getEntris()

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    ...entries
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 解析的文件规则
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: []
}

// https://github.com/ampedandwired/html-webpack-plugin
// new HtmlWebpackPlugin({
//   filename: 'index.html',
//   template: 'index.html',
//   inject: true
// }),
for (var pathname in entries) {
  const indexPath = path.join(pathname, 'index.html')
  var conf = {
    // moduleFiles
    // path.resolve(__dirname, '../dist/index.html')
    filename: indexPath,
    template: 'index.html',
    inject: true,
    chunksSortMode: 'dependency'
  }
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['vendor', 'manifest', pathname]
    conf.hash = true
  }

  if (process.env.NODE_ENV === 'production') {
    // conf.filename = resolve(path.join('dist', indexPath))
    conf.minify = {
      // removeComments: true,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}
module.exports = webpackConfig
