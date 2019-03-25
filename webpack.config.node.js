module.exports = {
  mode: "development",
  entry: ["./src/js/index.jsx", "./src/css/styles.scss"],
  output: {
    path: `${__dirname}/dist/js`,
    filename: "bundle.js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  watch: true,

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
  devtool: "source-map"
};