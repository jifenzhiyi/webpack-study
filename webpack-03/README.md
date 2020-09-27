# webpack-03 搭建

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

```

### Customize configuration

See webpack [Configuration](https://webpack.js.org/)
See postcs [Configuration](https://github.com/postcss/postcss/blob/master/docs/README-cn.md)
