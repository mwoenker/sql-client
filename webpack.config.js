const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './client/index.js',
    },
    output: {
        path: path.resolve('./public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/, use: 'babel-loader',
            },
            {
                test: /\.(css)$/, use: ['style-loader', 'css-loader'],
            },
        ]
    },
    mode: 'development',
    devtool: 'cheap-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'client/index.html', to: 'index.html'},
            ],
        }),
    ]
}
