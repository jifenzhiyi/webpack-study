const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 入口 [spa mpa] 单页面 多页面
  // entry === string array object
  // entry: './src/index.js', // string
  entry: {  // object
    other: './src/index.js',
    a: './src/a.js',
  },
  // 打包模式 none development production
  mode: 'none',
  // 出口
  output: {
    // 存放路径，必须是绝对路径
    path: path.resolve(__dirname, './dist'),
    // 资源名称 占位符 [name] [hash] [chunkhask] [contenthash]
    filename: '[name]-[hash:6].js',
  },
  // loader 模块转换器 模块处理器
  module: {
    rules: [
      {
        test: /\.css/i,
        // 多个loader是有执行顺序的，自后往前
        use: ['style-loader', 'css-loader'],
      },
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
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
}

// spa 单页面应用 单入口
// mpa 多页面应用 利于seo