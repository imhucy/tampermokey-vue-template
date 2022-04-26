const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const monkey = require('./monkey.dev.config')
module.exports = {
  entry: monkey.config.entry, // 入口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${monkey.header.name.toLowerCase().replace(' ', '-')}.js`,
  },
  mode: 'development',
  devtool: 'cheap-source-map',
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
    ],
  },
  devServer: {
    // 开发服务器
    // contentBase: '../dist'
  },
  externals: {
    $: 'window.jQuery',
    Vue: 'window.Vue',
    vue: 'window.Vue',
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.ProvidePlugin({
      $: '$',
      Vue: 'Vue',
      vue: 'Vue',
    }),
    new HtmlWebpackPlugin({
      cdn: monkey.header.require.slice(0, -1),
      template: path.resolve(__dirname, './example/index.html'),
    }),
  ],
}
