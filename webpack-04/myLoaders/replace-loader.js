module.exports = function (source) {
  const result = source.replace('hello', '哇塞');
  this.callback(null, result);
};
