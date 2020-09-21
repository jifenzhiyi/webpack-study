const path = require('path')

module.exports = {
  // 入口
  entry: './src/index.js',
  // 打包模式
  mode: 'development',
  // 出口
  output: {
    // 存放路径，必须是绝对路径
    path: path.resolve(__dirname, './build'),
    // 资源名称
    filename: 'index.js',
  }
}