var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./entry.js",
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  output: {
    path: __dirname + "/build/",
    filename: "browser.min.js"
  }
};