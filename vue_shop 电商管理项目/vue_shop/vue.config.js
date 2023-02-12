const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false, // 生产环境是否要生成 sourceMap
  publicPath: './' //   部署应用包时的基本 URL
};
