const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env, options) => {
  return {
    resolve: {
      extensions: ['.js', '.vue'],
    },
    entry: './src/main.js',
    output: {
      filename: 'index_bundle.js',
      path: path.resolve(__dirname, 'public'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader', // 1st
            'css-loader', // 2nd
            'postcss-loader' // 3rd
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader', // 1st
            'css-loader', // 2nd
            'postcss-loader', // 3rd
            'sass-loader' // 4th
          ]
        }
      ]
    },
    plugins: [
      new HtmlPlugin({
        template: './src/index.html'
      }),
      new VueLoaderPlugin(),
    ]
  }
}