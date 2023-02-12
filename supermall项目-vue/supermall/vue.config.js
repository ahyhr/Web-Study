//定义vue引用别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components'
      }
    }
  }
}