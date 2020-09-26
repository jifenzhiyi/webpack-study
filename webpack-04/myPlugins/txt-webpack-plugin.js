class txtwebpackPlugin {
  // constructor(options) {
  //   console.log(options);
  // }
  // 如何钩入hooks
  apply(compiler) {
    compiler.hooks.emit.tapAsync('txtwebpackPlugin', (compilation, cb) => {
      compilation.assets['test.txt'] = {
        source: function () {
          return 'hello webpack';
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
    compiler.hooks.compile.tap('txtwebpackPlugin', compilation => {
      console.log('hello compiler hook');
    });
  }
}

module.exports = txtwebpackPlugin;

// 暗号:做人嘛，最重要的是开心
// 作业:开发一个文件清单插件
// webpack每次打包结束后,自动产生一个打包文件清单,文件上记录文件名,文件数量等信息
