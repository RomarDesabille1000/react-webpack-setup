const path = require('path');
const common = require('./webpack.common')
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "static/js/[name].js",
        path: path.join(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
    })],
})
