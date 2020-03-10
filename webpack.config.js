const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    target: 'electron-main',
    entry: './src/index.ts',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'code.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.ts'],
    },
    node: {
        fs: 'empty',
        child_process: 'empty', // eslint-disable-line camelcase
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                transpileOnly: true,
            },
        }],
    },
    plugins: [
        new CopyPlugin([
            { from: 'static', to: '.' },
        ]),
    ],
}
