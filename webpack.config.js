const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { request } = require('express')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { resolve } = require('path-browserify')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    devServer: {
        static: './build',
        port: 9000,
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({})
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/build',
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }),
        new CopyWebpackPlugin([
            { context: 'src/', from: '**/*.html' },
            { context: 'src/', from: 'imgs/**/*' }
        ]),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,            }
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
                'css-loader', // interpreta @import, url()...
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            type: 'asset/resource'
        }, {
            test: /.(map|ttf|otf|eot|svg|woff(2)?)$/,
            type: 'asset/resource'
        }]
    }
}