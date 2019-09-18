const path = require('path')
const { createDefaultConfig } = require('@open-wc/building-webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

// if you need to support IE11 use "modern-and-legacy-config" instead.
// const { createCompatibilityConfig } = require('@open-wc/building-webpack');
// module.exports = createCompatibilityConfig({
//   input: path.resolve(__dirname, './index.html'),
// });

const config = createDefaultConfig({
  input: path.resolve(__dirname, './src/index.html'),
})

module.exports = merge(config, {
  plugins: [
    new Dotenv({
      systemvars: true,
      defaults: true,
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/vendor', to: 'vendor' },
      { from: 'src/css', to: 'css' },
      { from: 'src/style.css', to: 'style.css' },
      'src/functions.js',
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['raw-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['raw-loader', 'sass-loader'],
      },
    ],
  },
})
