
const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'client.js'
  },
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: __dirname,
    modulesDirectories: [ 'js', 'styles']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass'],
      },
      // the url-loader uses DataUrls for small woff files.
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      // the file-loader emits files.
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
};
