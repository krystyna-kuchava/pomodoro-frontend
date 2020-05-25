const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js"
    },
    resolve: {
        alias: {
            //'@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'), // alias for less helpers
            //'@assets-root-path': path.resolve(__dirname, 'src/assets'), // alias for assets (use for images & fonts)
            '@assets-images-svg': path.resolve(__dirname, 'src/assets/images/svg-images'),
            '@assets-fonts': path.resolve(__dirname, 'src/assets/fonts'),
            //'@roots': path.resolve(__dirname, 'src'),
            //'@components': path.resolve(__dirname, 'src/app/components'),
            //handlebars: 'handlebars/dist/handlebars'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};
