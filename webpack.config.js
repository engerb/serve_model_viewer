const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const path = require('path');

module.exports = {
    module: {
        rules: [
        {
            test: /\.s[ac]ss$/i,
            use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            ],
        },
        // test for glb or somethin to signify uncompressed
        // run draco
        // give compressed to file-loader instead
        {
            test: /\.(png|svg|jpg|gif|glb|hdr|zip)$/,
            use: [{
                loader: 'file-loader'
            }]
        },
        {
            test: /\.(js|jsx|jsm)$/,
            exclude: /node_modules/,
            resolve: {
                extensions: ['.js', '.jsx', '.jsm']
            },
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader",
                }
            ]
        }, 
        ],
    },
    resolve: {
        alias: {
            three$: 'three/build/three.min.js',
            'three/.*$': 'three',
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html',
            favicon: './src/assets/img/favicon.svg'
        }),
        new webpack.ProvidePlugin({
            THREE: 'three',
            TWEEN: 'tween',
            // CCapture: 'ccapture',
        }),
    ]
};
