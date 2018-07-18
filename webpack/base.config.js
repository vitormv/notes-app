const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: config.jsEntry,
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../src/'),
            vendor: path.resolve(__dirname, '../node_modules/'),
        },
        extensions: ['.js', '.jsx'],
        mainFields: ['browser', 'main'],
    },
    mode: 'development',
    stats: {
        assets: false,
        chunks: false,
        children: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: config.htmlEntry,
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(config.root, 'src/index.electron.js'),
                to: config.buildPath,
            },
        ]),
    ],
    output: {
        filename: config.targetPath.js,
        path: config.buildPath,
    },
};
