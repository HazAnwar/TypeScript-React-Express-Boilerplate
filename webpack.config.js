const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/client/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            favicon: './src/client/favicon.ico',
            title: "Hazik's Web App",
            description: "Web application for Hazik's web app"
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/client/robots.txt', to: './' },
                { from: './src/client/manifest.json', to: './' }
            ],
        })
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        static: './build',
        compress: true,
        watchFiles: ['./src/client**'],
        hot: true,
        port: 3001,
    }
};