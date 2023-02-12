var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongoose_people",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.once("open",function(err){
    if (!err) {
        console.log("已连接");
    }
});
var Schema = mongoose.Schema;
var peopSchema = new Schema({
    name:String,
    age:Number,
    gender:{
        type:String,
        default:"男"
    },
    identity:{
        type:String,
        default:"人"
    }
});
var PeopModel = mongoose.model("people",peopSchema);
PeopModel.create({
    name:80,
    age:26,
    gender:"男"
},function(err){
    if (!err) {
        console.log("创建成功");
    }
});
