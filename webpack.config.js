const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const betterWebpackProgress = require('better-webpack-progress');
const checkEnv = require('@drawbotics/check-env');
const Stylish = require('webpack-stylish');


checkEnv([ 'NODE_ENV' ]);


const WEBPACK_PORT = 4000;


module.exports = {
  mode: process.env.NODE_ENV,
  optimization: {
		minimize: false,
	},
  devtool: 'cheap-module-source-map',
  stats: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fnfy.js',
    sourceMapFilename: 'fnfy.js.map',
    library: 'fnfy',
    libraryTarget: 'umd',
  },
  externals: [
    'react',
  ],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new Stylish(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new ProgressPlugin(betterWebpackProgress({
      mode: 'compact',
    })),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [ path.resolve(__dirname, 'src') ],
        use: [ 'babel-loader' ],
      },
    ],
  },
};
