const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "autoindex",
            template: "./src/index.pug",
            inject: false,
            templateParameters: {
                APIPATH: '/autoindexjson',
                author: 'Martin',
                url: 'https://github.com/ecator/autoindex'
            }
        }), new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 102400
                        }
                    }
                ]
            },
            {
                test: /favicon\.ico$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    target: ['web', 'es5'],
    mode: "development"
};
