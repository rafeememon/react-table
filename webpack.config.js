const webpack = require('webpack');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    implementation: require('sass')
  }
};

module.exports = {
  mode: 'development',

  entry: {
    table: './demo/table/index.tsx',
    expandedTable: './demo/expandedTable/index.tsx'
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'tslint-loader', enforce: 'pre' },
      { test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', sassLoader] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ]
  }
};
