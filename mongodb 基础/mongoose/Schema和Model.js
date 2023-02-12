var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongoose_test",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.once("open",function(err){
    if (!err) {
        console.log("数据库已连接~~~"); 
    }
});

//将mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;
//创建Schema (模式/约束)对象
var stuSchema = new Schema({
        name:String,
        age:Number,
        gender:{
            type:String,
            default:"男"    //可以设置默认值
        },
        address:String
});

/*
    通过Schema创建Model
        -Model代表数据库中的集合,通过Model才能对数据库进行操作
        -mongoose.model(modelName,schema)
            -modelName 要映射的集合名
*/
var StuModel = mongoose.model("student",stuSchema);

//向数据库中插入一个文档
StuModel.create({
    name:"小王",
    age:20,
    gender:"男",
    address:"广东"
},function(err){
    if (!err) {
        console.log("插入成功~~~")
    }
});
