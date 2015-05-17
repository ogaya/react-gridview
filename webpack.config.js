module.exports = {
  entry: "./src/react-gridview.jsx",
  output: {
    filename: "./dist/[name].js"
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
