const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "./src"),
  dist: path.resolve(__dirname, "./dist"),
  assets: "assets/",
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: "js/[name].js",
    path: PATHS.dist,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/assets/images`, to: "assets/images" },
        { from: `${PATHS.src}/assets/fonts`, to: "assets/fonts" },
        { from: `${PATHS.src}/static`, to: "" },
      ],
    }),
  ],
};
