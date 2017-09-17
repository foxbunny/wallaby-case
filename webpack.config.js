/**
 * Webpack 2 configuration
 *
 * (c) 2017, CUBE Team
 * All rights reserved.
 */

"use strict";

const CONFIG = require("./package.json");
const path = require("path");

const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require("webpack");

const basePlugins = [
  // Global definitions
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(CONFIG.version),
  }),
  // Generate skeleton HTML file
  new HtmlWebpackPlugin({
    inject: true,
    template: "static/index.html"
  }),
  // Copy locales to target directory
  new CopyWebpackPlugin([
    {from: "static/locales", to: "locales"},
    {from: "static/favicon/favicon.ico", to: "favicon.ico"},
    {from: "static/favicon", to: "images/favicon"},
  ], {debug: "info"}),
  // Show nice progress bar
  new ProgressBarPlugin(),
];

const developmentPlugins = [
  // Enable hot module replacement
  // see https://webpack.js.org/configuration/dev-server/#devserver-hot
  new webpack.HotModuleReplacementPlugin(),
  // Do not dump CSS into a separate file
  new ExtractTextPlugin({
    disable: true,
  }),
]

const productionPlugins = [
  // Support older plugins/loaders that still use global options
  // see https://webpack.js.org/plugins/loader-options-plugin/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  // Minify JavaScript
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
    screwIe8: true,  // our support target is IE10+
    sourceMap: false,
  }),
  // Dump CSS into a separate file
  new ExtractTextPlugin({
    filename: "style-[contenthash].css",
  }),
];

const plugins = basePlugins.concat(
  process.env.NODE_ENV === "production" ? productionPlugins : developmentPlugins
);

const CSSLoaders = (loaders) => {
  return ExtractTextPlugin.extract({
    use: [
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: "[local]-[hash:base64:5]",
          sourceMap: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
    ].concat(loaders),
    fallback: "style-loader",
  });
}

module.exports = (env) => {
  if (env && env.profile === "yes") {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: "server",
    }));
  }

  return {
    context: __dirname,
    entry: {
      shell: [
        "es5-shim",
        "es6-shim",
        "es6-promise/auto",
        "whatwg-fetch",
        "./src",
      ],
    },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].[hash].js",
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [
        path.join(__dirname, "src"),
        path.join(__dirname, "static"),  // <-- for images in static/images
        "node_modules"
      ],
    },
    module: {
      rules: [
        {
          test: /\.webfont\.json$/,
          use: CSSLoaders([{
            loader: "webfonts-loader",
          }]),
        },
        {
          test: /\.html$/,
          use: "raw-loader",
        },
        {
          test: /\.(gif|png|jpg|svg|ttf|eot|woff)$/,
          use: [
            "file-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          use: [
            "ts-loader",
            "tslint-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: CSSLoaders([{
            loader: "sass-loader",
            options: {
              includePaths: [path.join(__dirname, "src", "shared-styles")],
              sourceMap: true,
            }
          }]),
        },
        {
          test: /\.handlebars$/,
          use: "handlebars-loader",
        },
      ]
    },
    plugins: plugins,
    devServer: {
      historyApiFallback: true,
      hot: true,
      overlay: true,
      disableHostCheck: true,
      proxy: {
        "/api": {
          target: "https://staging-app.company.guru",
          changeOrigin: true,
        },
      },
    },
    devtool: 'inline-source-map',
  };
};
