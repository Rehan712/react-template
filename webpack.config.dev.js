const webpack = require("webpack");
module.exports = {
  mode: "development",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  entry: ["babel-polyfill", "./src/js/index.jsx", "./src/css/styles.scss"],
  output: {
    path: `${__dirname}/dist/js`,
    filename: "bundle.js",
    publicPath: "/js"
  },
  module: {
    rules: [
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
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env", "react"],
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
        use: [
          "style-loader",
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
        use: [
          "style-loader",
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
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },

  resolve: { extensions: [".jsx", ".js"] },

  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    port:process.env.PORT || 7000,
    hot:true,
    inline:true
  },

  devtool: "source-map"
};