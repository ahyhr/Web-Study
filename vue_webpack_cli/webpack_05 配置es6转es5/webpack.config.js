const path = require('path')

module.exports = {
  entry:'./src/js/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    publicPath:'dist/'  //在引用时 会在路径前添加 dist/ (引用dist文件夹下的文件)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
       {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载的图片,小于limit时,会将图片编译成base64字符串形式
              //当加载的图片,大于limit时,需要使用file-loader模块进行加载(不需要进行配置)
              limit: 13000,    //1024 * kb
              name: 'img/[name].[hash:8].[ext]'  //设置打包后图片的命名格式 (图片大于limit才会生效)
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

//es6转es5
//bable-loader


//配置图片文件
//url-loader
//file-loader (不需要进行配置)
//设置name  规则命名打包完成后的图片



//配置css文件     
//安装    style-loader   css-loader
//npm install style-loader --save-dev
//npm install --save-dev css-loader

//使用 module  rules 
//详细见webpack官网




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