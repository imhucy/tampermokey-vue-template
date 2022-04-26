const path = require('path')
const monkey = require('./monkey.config')
const webpack = require('webpack')

const Terser = require('terser-webpack-plugin')
const BannerPlugin = require('webpack/lib/BannerPlugin')
    // vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = {
    entry: monkey.config.entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: monkey.header.name.toLowerCase().split(' ').join('-') + '.user.js'
    },
    mode: process.env.NODE_ENV || 'none',
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //   {
            //     test: /\.css$/,
            //     exclude: /(node_modules)/,
            //     use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }]
            //   },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new Terser({
            terserOptions: {
                // mangle: false,
                output: {
                    beautify: false
                }
            }
        }),
        new BannerPlugin({
            banner: monkey.buildedHeader(),
            raw: true
        })
    ]
}