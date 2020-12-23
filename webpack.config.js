import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export default {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve('./public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
        ]
    },
    mode: 'development',
    devtool: 'cheap-source-map',
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'src/index.html', to: 'index.html'},
            ],
        }),
    ]
}
