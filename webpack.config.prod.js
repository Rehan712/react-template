const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  mode: "production",
  entry: ["babel-polyfill", "./src/js/index.jsx", "./src/css/styles.scss"],
  output: {
    path: `${__dirname}/dist/js`,
    filename: "bundle.js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "env"],
              plugins: [
                "transform-object-rest-spread",
                "transform-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: [
                "transform-object-rest-spread",
                "transform-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          //devEnv ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          //devEnv ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    mainFields: ["browser", "main", "module"],
    extensions: [".js", ".jsx"]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/styles.css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new SWPrecacheWebpackPlugin({
      // filename: "service-worker.js",
      // // filepath: `${__dirname}/dist/service-worker.js`,
      // // staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      // staticFileGlobsIgnorePatterns: [
      //   /\.map$/,
      //   /asset-manifest\.json$/,
      //   /\.gz$/
      // ],
      // navigateFallback: "/index.html",
      // minify: true, // minify and uglify the script
      // runtimeCaching: [
      //   {
      //     handler: "networkFirst",
      //     urlPattern: /^https?.*/
      //   }
      // ]
      // cacheId: "evaluator-dashboard",
      // dontCacheBustUrlsMatching: /\.\w{8}\./,
      // filename: "service-worker.js",
      // minify: true,
      // navigateFallback: `${__dirname}/dist/index.html`,
      // staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]

      cacheId: "eliiss",
      filename: "service-worker.js",
      filepath: `${__dirname}/dist/service-worker.js`,
      minify: true,
      staticFileGlobs: [
        `/${__dirname}/dist/**/*.{css,js}`,
        `/${__dirname}/dist/imgaes/**`
      ],
      stripPrefix: `/${__dirname}/dist`
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json" // Not to confuse with manifest.json
    })
  ]
};