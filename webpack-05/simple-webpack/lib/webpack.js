const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = class webpack {
  constructor(options) {
    // console.log(options);
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
  }
  run() {
    const info = this.parse(this.entry);
    // 递归处理所有依赖
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let j in dependencies) {
          this.modules.push(this.parse(dependencies[j]));
        }
      }
    }
    const obj = {};
    this.modules.forEach((item) => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    console.log(obj);
    // 代码生成，文件生成
    this.file(obj);
  }
  parse(entryFile) {
    // 如何读取模块的内容
    const content = fs.readFileSync(entryFile, 'utf-8');
    const ast = parser.parse(content, {
      sourceType: 'module',
    });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        // path.dirname(entryFile) // result 从./src/index.js中取出src目录
        const newPathName =
          './' + path.join(path.dirname(entryFile), node.source.value);
        dependencies[node.source.value] = newPathName;
      },
    });
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return {
      entryFile,
      dependencies,
      code,
    };
  }
  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    // 生成bundle
    const bundle = `(function(modules) {
      function require(module) {
        function newRequire(relativePath) {
          return require(modules[module].dependencies[relativePath]);
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(newRequire, exports, modules[module].code)
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`;
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
};

// 暗号：有点感动了怎么办？
// 作业：实现模块依赖分析函数
// 要求：
/*
  提交代码截图，
  根据模块路径，
  开始分析该模块的依赖，
  对该模块进行内容处理，
  提取该模块的依赖路径，
  最终返回模块路径，
  模块的依赖信息，
  处理后的代码信息
*/
