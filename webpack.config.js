const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        home: path.resolve(__dirname, "src/pages/home/index.tsx")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "scripts/[name].js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ["node_modules", "src", "pages", "components"]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: "home.html",
            template: path.resolve(__dirname, 'src/pages/home/index.html'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            }
        ]
    },
    devServer: {
        port: 9999,
        historyApiFallback: true,
        index: "home.html"
    },
    // 启用sourceMap
    devtool: "source-map",
}