class fileWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('fileWebpackPlugin', (compilation, cb) => {
      const len = Object.keys(compilation.assets).length;
      let content = `文件数量：${len}\r\n文件名称：`;
      for (let fileName in compilation.assets) {
        var strFileName = fileName.replace(/(.*\/)*([^.]+).*/gi, '$2');
        content += `\r\n${strFileName.replace(/\.\w+$/, '')}`;
      }
      compilation.assets['test.txt'] = {
        source: function () {
          return content;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}

module.exports = fileWebpackPlugin;
// 暗号:做人嘛，最重要的是开心
