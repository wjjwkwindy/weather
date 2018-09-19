/* eslint-disable indent */
let HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    //publicPath: 'build/' // 知道如何寻找资源
  },
  module: {
    rules: [
      // 加载babel
      // {
      //   test:/\.js$/,
      //   loader:'babel-loader',
      //   include:path.resolve(__dirname,'src')
      // },
      //加载scss
      // {
      //   test:/\.scss$/,
      //   loader:['style-loader','css-loader','sass-loader'],
      //   include:path.resolve(__dirname,'src')
      // }

      // 加载css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          // 必须这样写，否则会报错
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: false
            }
          }]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10,
            name: './utils/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src', 'index.html')
    // }),
    // 输出的文件路径
    new ExtractTextPlugin('css/[name].css')
  ]
};