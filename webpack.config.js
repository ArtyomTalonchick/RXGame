const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 3000,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'public', to: ''},
            ]
        }),
    ]
};