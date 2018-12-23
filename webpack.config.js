const path = require('path')
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = ($path) => {
    return path.resolve(__dirname, $path);
};

module.exports = (env, options) => {
    const devMode = options.mode !== "production";
    return {
        entry: {
            "common-styles": resolve("src/assets/styles/index.sass"),
            home: resolve("src/pages/home/index.tsx")
        },
        output: {
            path: path.resolve(__dirname, "demo"),
            filename: "scripts/[name].js",
            chunkFilename: "scripts/[name].[id].css"
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', 'sass', 'css', 'scss'],
            modules: ["node_modules", "src", "pages", "components", "models", "assets"]
        },
        plugins: [
            new CleanWebpackPlugin(['demo']),
            new MiniCssExtractPlugin({
                filename: devMode ? "assets/styles/[name].css" : "assets/styles/[name].[hash].css"
            }),
            new HtmlWebpackPlugin({
                filename: "home.html",
                template: path.resolve(__dirname, 'src/pages/home/index.html'),
                minify: !devMode
            }),
            new webpack.HotModuleReplacementPlugin()
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
                        presets: [["@babel/preset-env", {
                            //foceAllTransforms: !devMode
                        }], '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                        babelrc: false
                    }
                }, {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            fallback: "style-loader",
                            sourceMap: true
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                }, {
                    test: /\.tsx?$/,
                    use: ['ts-loader']
                }, {
                    test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
                }, {
                    test: /\.(jpg|png|svg)$/,
                    loader: "file-loader",
                    options: {
                        limit: 8192,
                        name: "/assets/images/[name].[ext]"
                    }
                }, {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    loader: "file-loader",
                    options: {
                        limit: 8192,
                        name: "/assets/fonts/[name].[ext]"
                    }
                }
            ]
        },
        devServer: {
            port: 9999,
            historyApiFallback: true,
            index: "home.html",
            hot: true
        },
        // 启用sourceMap
        devtool: devMode ? "source-map" : "",
    }
}