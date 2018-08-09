/**
 * Created by host on 2016/8/31.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var helpers = require('./helpers');
//var projectRoot=helpers.root('../');
var CopyWebpackPlugin=require("copy-webpack-plugin");
module.exports = {
    entry: {
        app: './src/main.js'
    },

    resolve: {
        extensions: ['', '.js', '.vue']
    },
    transformToRequire: {
        "audio": "src"
    },
    module: {
        loaders: [
            //  使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue'
            },
            // 使用babel 加载 .js 结尾的文件
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query:{
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            },

            // 使用less-loader、css-loader和style-loade 加载 .less 结尾的文件
            {
                test: /\.(css|less)$/,
                // 将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
                exclude: /node_modules/
            },
            // 加载图片音视频
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10,
                    // 路径要与当前配置文件下的publicPath相结合n
                    name:'images/[name].[ext]?[hash:7]'
                }
            },
            //加载音视频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|lrc)(\?.*)?$/,
                loader: 'file',
                query: {
                    name: 'video/[name].[ext]'
                 }
            },
            // 加载图标
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file',
                query: {
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里
                   // limit: 10,
                    name: 'fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin("js/vueCommon.js"),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/static',
                to:'static/'
            }

        ], {
            ignore: [],
            copyUnmodified: true,
            debug:"debug"
        } )
    ]
};
