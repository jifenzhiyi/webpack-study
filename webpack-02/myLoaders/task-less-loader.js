const less = require('less');

module.exports = function (source) {
  less.render(source, (e, output) => {
    const css = JSON.stringify(output.css);
    const result = `const e = document.createElement('style');
    e.innerHTML = ${css};
    document.head.appendChild(e);`;
    this.callback(e, result);
  });
};

// 暗号：可以做，但没必要
