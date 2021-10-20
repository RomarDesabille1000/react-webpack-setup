const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        main: "./src/index.js",
    },
    //Enable Source Map for Development
    //devtool: 'source-map',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(svg|png|j?g|gif)$/,
                use: {
                    // using objects to specify name
                    loader: "file-loader",
                    options:{
                        name: "[name].[contenthash].[ext]",
                        outputPath: 'static/media'
                    }
                },
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: './public/favicon.ico', to: ''},
              { from: './public/manifest.json', to: ''},
              { from: './public/logo.png', to: ''},
            ],
          }),
        new BundleAnalyzerPlugin()
    ]
};