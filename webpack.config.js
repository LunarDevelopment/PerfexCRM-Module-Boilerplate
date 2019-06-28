/*
 * Copyright (c) 2019.
 *
 */

const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/main.min.js',
        path: path.resolve(__dirname, 'assets')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
};


