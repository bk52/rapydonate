const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    devServer: {
        port: 9400,
        static: path.join(__dirname, "/dist/"),
        hot: true,
        open: true,
        client: {
            overlay: false,
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg|webm)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            favicon: "./src/favicon.ico",
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
        }),
    ],
}