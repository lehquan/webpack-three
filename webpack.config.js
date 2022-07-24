const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  name: "webpack-three",
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      hash: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    host: "0.0.0.0", // Open every network Access.
    compress: true,
    port: 8082,
  },
}

