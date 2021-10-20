const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isAnalyze = process.env.npm_config_webpackAnalyzer
const devAnalyze = process.env.npm_config_webpackAnalyzerForDev

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production"
    const isDevelopment = argv.mode === "development"

    const entry = {
        main: "./src/index.js",
    }

    const output = {
        filename: isDevelopment ? "static/js/[name].js" : "static/js/[name].[contenthash].bundle.js",
        chunkFilename: isDevelopment ? "static/js/[name].chunk.js" : "static/js/[name].[contenthash].chunk.js",
        path: path.join(__dirname, 'build'),
    }

    //Default Mode
    let mode = "development"

    const module = {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                use: {
                    // using objects to specify name
                    loader: "file-loader",
                    options:{
                        name: isDevelopment ? "[name].[ext]" : "[name].[contenthash].[ext]",
                        outputPath: 'static/media'
                    }
                },
            },
        ]
    }

    const optimization = {
        minimizer: [],
        //Separate Node
        splitChunks: {
            chunks: "all",
            minSize: 0,
            maxInitialRequests: 10,
            maxAsyncRequests: 10,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                    }
                },
                common: {
                    minChunks: 2,
                    priority: -10
                }
            }
        },
        runtimeChunk: "single"
    }

    const plugins = [
        new CopyPlugin({
            patterns: [
                { from: './public/favicon.ico', to: ''},
                { from: './public/manifest.json', to: ''},
                { from: './public/logo.png', to: ''},
            ],
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "static/css/[name].css" : "static/css/[name].[contenthash].css",
            chunkFilename: isDevelopment ? "static/css/[name].chunk.css" : "static/css/[name].[contenthash].chunk.css",
        }), new CleanWebpackPlugin(),
    ]

    const devServer = {
        historyApiFallback: true,
    }

    //Set Up
    if(isDevelopment){
        plugins.push(
            new HtmlWebpackPlugin({
                template: './public/index.html',
            })
        )
        devServer.hot = true
    }
    if(devAnalyze){
        plugins.push(
            new BundleAnalyzerPlugin(),
        )
    }

    if(isProduction || isAnalyze){
        //Change Mode
        mode = "production"
        optimization.minimizer.push(
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
        )
    }

    if(isAnalyze){
        plugins.push(
            new BundleAnalyzerPlugin(),
        )
    }

    return {
        mode: mode,
        entry: entry,
        performance: { hints: false },
        output: output,
        module: module,
        optimization: optimization,
        plugins: plugins,
        devServer: devServer
    }
};
