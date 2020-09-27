# webpack-05 搭建

## 配置国内淘宝源 .npmrc

registry=https://registry.npm.taobao.org

## 安装依赖

```

npm install XXXXXX --save-dev

XXXXXXX
  => webpack webpack-cli html-webpack-plugin clean-webpack-plugin
  => style-loader css-loader less-loader less file-loader url-loader
  => postcss postcss-loader autoprefixer
  =》 mini-css-extract-plugin

```

## 备注

```

postcss 需要配置兼容浏览器的版本

HMR 热更新
css => new HotModuleReplacementPlugin()
js => module.hot.accept

Babel javascript编译器 语法转换
polyfill 工具库 @babel/polyfill 在目标环境中添加缺失特性
配置文件 .babelrc babel.config.js pageage.json中直接写babel babel-loader

安装
npm install babel-loader @babel/core @babel/preset-env -D
npm install @babel/polyfill -S 需要打包到生产依赖
npm install core-js@3 --save

支持jsx
npm install react react-dom --save
npm install --save-dev @babel/preset-react

自定义plugin plugin就是对webpack的功能拓展

总结
npx webpack
webpack -> config -> 打包入口 输出目录 -> 入口文件 -> 分析是否有依赖，以及依赖模块的路径
        -> 解析处理内容 (es6转es5) -> chunk code(缺失函数，require exports)

// simple-webpack
webpack.config.js
  entry
  output
  mode
Lib
  webpack.js
    Webpack Class
    Run()
      入口文件的路径
      分析文件的内容
        模块依赖路径
        内容处理
        chunkcode
      递归处理所有依赖（eq: index.js -> a.js -> b.js)
      生成bundle结构，生成文件放入dist目录
Bundle.js
  引入lib/webpack.js
  引入webpack options
  compiler = webpack(config)
  Compiler.run()
  node bundle.js

安装依赖
npm install @babel/parser -D
npm install @babel/traverse -D
npm install @babel/core -D
npm install @babel/preset-env -D

```

### Customize configuration

See webpack [Configuration](https://webpack.js.org/)
See postcs [Configuration](https://github.com/postcss/postcss/blob/master/docs/README-cn.md)
