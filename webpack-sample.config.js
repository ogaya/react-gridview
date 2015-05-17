module.exports = {
  entry: "./sample/sample.jsx",
  output: {
    filename: "./sample/sample.bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!stylus-loader"
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: "url?limit=8192"
      }
    ]
  },

  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
