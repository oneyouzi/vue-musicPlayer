var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        publicPath:"/",
        filename: 'js/[name].[hash].js',
        chunkFilename:'js/[id].[hash].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy:{
            "/api":{
                target:"http://www.22lrc.com",
                changeOrigin:true
            },
            "/server/*":{
                target:"http://localhost:3000",
                changeOrigin:true
            }
        }
    }
});
/**
 * Created by host on 2016/8/31.
 */
