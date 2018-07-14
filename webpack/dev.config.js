const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const config = require('./config');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = merge(baseConfig, {
    devServer: {
        contentBase: config.buildPath,
        noInfo: true,
        overlay: true,
    },
    plugins: [
        new ErrorOverlayPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: config.baseSassFiles,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [
                            ':data-src',
                            'img:src',
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg|woff(2)?|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: config.targetPath.media,
                },
            },
        ],
    },
});
