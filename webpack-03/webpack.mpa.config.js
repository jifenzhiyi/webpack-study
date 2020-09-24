const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const setMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
  entryFiles.map((item) => {
    const match = item.match(/pages\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = item;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: './public/index.html', // 默认同一种模版
        // template: pageName === 'home' ? './public/index.html' : './public/other.html', // 套用两种模版
        // template: path.join(__dirname, `./public/${pageName}.html`), // 每个页面不同模版
        filename: `${pageName}.html`,
        chunks: [pageName], // 可以加载多个chunks，根据需求自定义
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
  // 入口
  entry,
  // 打包模式
  mode: 'development',
  // 出口
  output: {
    // 存放路径，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 资源名称
    filename: '[name]_[chunkhash:6].js',
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
          MiniCssExtractPlugin.loader,
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
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './myLoaders'],
  },
  devtool: 'inline-source-map',
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index_[contenthash:6].css',
    }),
  ],
};

// 暗号：等价交换，炼金术不变的原则
