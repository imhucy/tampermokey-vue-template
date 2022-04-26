const path = require('path')
const fs = require('fs')
const moment = require('moment')

const colors = require('colors')
const webpack = require('webpack')
    // vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const monkey = require('./monkey.dev.config')
if (!fs.existsSync('test'))
    fs.mkdirSync('test')
fs.writeFileSync('./test/header.js', monkey.buildedHeader())

// eslint-disable-next-line no-console
console.log(
        `[${colors.grey(`${moment().format('HH:mm:ss')}`)}][${colors.grey('Webpack')}] ${colors.green(
    '复制文件 test/header.js 内容到你的油猴插件之中',
  )}`,
)

module.exports = {
  entry: monkey.config.entry,
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: `${monkey.header.name.toLowerCase().replace(' ', '-')}.js`,
  },
  watch: true,
  mode: process.env.NODE_ENV || 'none',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.css$/,
      //   exclude: /(node_modules)/,
      //   use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }]
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    new VueLoaderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
}