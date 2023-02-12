module.exports.fun = function(mongoose){
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://127.0.0.1/mongoose_Model",{useNewUrlParser:true,useUnifiedTopology:true});
    mongoose.connection.once("open",function(err){
    if (!err) {
        console.log("已连接--mod");
        }
    });
};