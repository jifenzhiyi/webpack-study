const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 入口
  entry: './src/index.js',
  // entry: {
  //   index: './src/index.js',
  //   login: './src/login.js',
  // },
  // 打包模式
  mode: 'development',
  // 出口
  output: {
    // 存放路径，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 资源名称
    filename: '[name]-[chunkhash:6].js',
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
        use: ['kkb-style-loader', 'kkb-css-loader', 'kkb-less-loader'],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader',
      //     'less-loader',
      //   ],
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          'replace-loader',
          {
            loader: 'replace-loader-async',
            options: {
              name: '名字',
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './myLoaders'],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    // new htmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'login.html',
    //   chunks: ['login'],
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'css/index-[chunkhash:6].css',
      filename: 'css/index-[contenthash:6].css',
    }),
  ],
};
