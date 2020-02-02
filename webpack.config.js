module.exports = {
  mode: "development",
  entry: {
    popup: "./src/popup.jsx"
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]],
            sourceMap: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
