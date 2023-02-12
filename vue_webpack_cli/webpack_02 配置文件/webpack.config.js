const path = require('path')

module.exports = {
  entry:'./src/js/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
}



//配置文件
// entry  :入口       
//output : 出口     使用path.resolve() 动态获取路径

//直接调用webpack命令,会默认使用全局webpack版本进行打包


//json文件中
//scripts中添加映射build
//使用 npm run build  会先找本地webpack



//开发时依赖   -D
//运行时依赖   -S


//devDependencies 开发依赖