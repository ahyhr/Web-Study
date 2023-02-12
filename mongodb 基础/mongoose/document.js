var mongoose = require("mongoose");
var mon = require("./mon");
mon.fun(mongoose);

var Schema = mongoose.Schema;
var stusSchema = new Schema({
    name:String,
    age:Number,
    gender:String
});
var StusModel = mongoose.model("stus",stusSchema);

//创建一个Document
var stu = new StusModel({
    name:"奔波霸",
    age:254,
    gender:"未知"
});


