// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const unplugin = require("./unplugin-auto-import/unplugin");
const WebpackBar = require("webpackbar");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  plugins: [
    unplugin,
    new WebpackBar(),
    new HtmlWebpackPlugin({
      title: "智能可视化",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
  ],
  module: {
    rules: [
      // 高版本js转浏览器兼容的js
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        // less打包
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:8]",
              },
              import: {
                filter: (url) => {
                  return url !== "/iconfont/iconfont.css";
                },
              },
            },
          },
          { loader: "postcss-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
        include: /\.module\.less$/,
      },
      {
        // less打包
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              import: {
                filter: (url) => {
                  return url !== "/iconfont/iconfont.css";
                },
              },
            },
          },
          { loader: "postcss-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
        exclude: /\.module\.less$/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    hot: true,
    port: 8082,
  },
};
