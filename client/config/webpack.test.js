/**
 * Created by host on 2016/8/31.
 */
var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',
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
            // 使用css-loader和style-loader 加载 .css 结尾的文件

            // 使用less-loader、css-loader和style-loade 加载 .less 结尾的文件

            // 加载图片
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
            // 加载图标
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file',
                query: {
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里
                    limit: 10,
                    name: 'fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            },
            {
                test: /\.lrc$/,
                loader: 'lrc',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10,
                    // 路径要与当前配置文件下的publicPath相结合n
                    name:'images/[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    vue:{
        loaders:{
            js:"isparta-loader"
        }
    },
    isparta:{
        embedSource:true,
        noAutoWrap:true,
        babel:{
            presets:['es2015']
        }
    }
}
