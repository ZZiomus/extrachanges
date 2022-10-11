"use strict";

const path = require("path");
require("webpack");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/views-build"),
    publicPath: "/views-build/",
  },

  context: __dirname,
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        loader: "css-loader",

        options: {
          url: false,
        },
      },
    ],
  },
  node: {
    fs: "empty",
  },
};
