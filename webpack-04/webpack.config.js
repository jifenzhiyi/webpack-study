const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 打包模式
  mode: 'development',
  // 出口
  output: {
    // 存放路径，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 资源名称
    filename: '[name]_[hash:6].js',
  },
  devServer: {
    open: true,
    port: 9001,
    contentBase: './dist',
    proxy: {
      '/api': {
        target: 'http://localhost:9002/',
      },
    },
    hot: true,
    // 即便HMR不生效, 浏览器不自动刷新
    hotOnly: true,
  },
  // loader 模块转换器 模块处理器
  module: {
    rules: [
      {
        test: /\.css$/,
        // 多个loader是有执行顺序的，自后往前
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // loader: 'file-loader',
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[contenthash:6].[ext]',
              outputPath: 'images/',
              limit: 2048,
            },
          },
        ],
      },
      {
        test: /\.(woff2|eot|ttf||woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[contenthash:6].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // plugin: [],
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './myLoaders'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/index_[contenthash:6].css',
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
