//引入mongoose
var mongoose = require("mongoose");
//连接数据库        mongoose_test数据库名
mongoose.connect("mongodb://127.0.0.1/mongoose_text",{useNewUrlParser: true,useUnifiedTopology:true});

//数据库连接监听
mongoose.connection.once("open",function(){
    console.log("数据库已连接");
});

//数据库断开监听
mongoose.connection.once("close",function(){
    console.log("数据库已断开~~~");
});

/*
断开数据库连接指令(一般不会使用)
    -MongoDB数据库只需连接一次
*/
mongoose.disconnect();