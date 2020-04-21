const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/dist'),
    library: 'reactHelpfulHooks',
    libraryTarget: 'umd'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: false
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    react: 'react'
  }
};
