const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: "node",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new WebpackShellPlugin({onBuildEnd: ['npm run nodemon']})
    ],
    externals: [nodeExternals()]
};