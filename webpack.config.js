const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/js/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    libraryTarget: "umd",
    filename: "[name].js"
  },
  mode: "production",
  resolve: {
    alias: {
      Css: "../css/",
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.jpg$/,
      use: ["file-loader?name=./images/[name].[hash:8].[ext]"]
    }, {
      test: /\.(html|htm)$/,
      use: ["html-withimg-loader"]
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html", //源文件
      filename: "index.html" //输出文件名
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",

    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}
