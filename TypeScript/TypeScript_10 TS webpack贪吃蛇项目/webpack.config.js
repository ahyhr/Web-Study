//引入一个包 (拼接路径)
const path = require('path');
//引入html插件 (自动生成html文件)
const HTMLWebpackPlugin = require('html-webpack-plugin');
//引入clean插件 (build 时会清空dist文件夹)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//webpack中的所有配置信息
module.exports = {
  //入口文件
  entry: "./src/index.ts",
  //打包文件的所在目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    //打包后的文件名称
    filename: "bundle.js",
    environment:{
      //关闭webpack的箭头函数
      arrowFunction: false,
      const: false 
    },
   
  },

  //指定webpack打包时要使用的模块
  module: {
    //指定要加载的规则
    rules: [
      {
        //test指定的是规则生效的文件
        test: /\.ts$/,
        //要使用的loader
        use: [
          //配置babel
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义环境
              presets:[
                [
                  //指定环境插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的浏览器
                    targets:{
                      "ie":"11"
                    },
                    //corejs 版本
                    "corejs":"3",
                    //使用corejs的方式 "usage" 按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader',
        ],
        //要排除的文件
        exclude: /node-modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
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
    ]
  },

  //配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title:　"自定义title"
      // 指定html模版, 会按照该模版生成 dist/index.html文件
      template: "./src/index.html"
    }),
  ],

  //设置引用模块
  resolve: {
    //.ts .js 结尾可作为模块进行引用 
    extensions: ['.ts', '.js']
  }
}
