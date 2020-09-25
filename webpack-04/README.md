# webpack-02 搭建

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

```

### Customize configuration

See webpack [Configuration](https://webpack.js.org/)
See postcs [Configuration](https://github.com/postcss/postcss/blob/master/docs/README-cn.md)
