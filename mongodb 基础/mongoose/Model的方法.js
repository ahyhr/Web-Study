var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongoose_Model",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.once("open",function(err){
    if (!err) {
        console.log("已连接--mod");
    }
});

var Schema = mongoose.Schema;
var stusSchema = new Schema({
    name:String,
    age:Number,
    gender:String
});
var StusModel = mongoose.model("stus",stusSchema);
//创建多个
// StusModel.create([
//         {
//             name:"小东",
//             age:26,
//             gender:"男"
//         },{
//             name:"小将",
//             age:21,
//             gender:"男"
//         }
//     ],function(){
//     console.log("创建完成");
// });


/*
    -查询
        Model.find(conditions,[projection],[options],[callback])
            -查询所有符合条件的文档，总返回数组
        Model.findById(id,[projection],[options],[callback])
            -根据id查询
        Model.findOne(conditions,[projection],[options],[callback])
            -查询符合条件的第一个文档

            conditions  查询的条件
            projection  投影 获取需要的字段
                -两种方式
                    {name:1, id:0}
                    "name,-_id"
            options    查询选项(skip limit)跳过 显示
            callback    回调函数，查询结果通过回调函数返回
                            -如果不传，则不会查找
           
        
*/                                      
StusModel.find({age:21},"-gender",{skip:1,limit:1},function(err,docs){
    if (!err) {
        //docs为Document 文档对象      find() 返回数组
        console.log(docs);
    }
});

StusModel.findById("5f9780ecfdd3732018fbcd81",function(err,doc){
    if (!err) {
        console.log(doc);
    }
});

/*
    修改
Model.update(conditions,doc,[options],[callback])
Model.updateMany(conditions,doc,[options],[callback])
Model.updateOne(conditions,doc,[options],[callback])
    -参数:
        conditions  查询条件
        doc         修改后的对象
        options     配置参数
        callback    回调函数

*/
StusModel.updateOne({name:"小王"},{$set:{age:21}},function(err,doc){
    if (!err) {
        console.log(doc);
    }
});

/*
    删除
StusModel.deleteOne(conditiongs,[callback])
StusModel.deleteMany(conditiongs,[callback])
*/
// StusModel.deleteOne({name:"小东"},function(err){
//     if (!err) {
//         console.log("删除成功~~");
//     }
// });

/*
    Model.count(conditiongs,[callback])
        -统计文档的数量     不传为统计所有
*/
StusModel.count({age:21},function(err,count){
    if (!err) {
        console.log(count);
    }
})