const path = require('path');
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,{
    mode: "production",
    output: {
        filename: "static/js/[name].[contenthash].bundle.js",
        path: path.join(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract css into files
                    'css-loader'
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash].css",
    }), new CleanWebpackPlugin(),]
})
