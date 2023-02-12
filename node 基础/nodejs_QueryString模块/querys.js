/*
    querystring
        -将url对象转换成字符串
    
    querystring.stringify({对象},"分割符","值分隔符:")
        -将对象转换为字符串
    querystring.parse("","分割符","值分隔符:")
        -将字符串转换为对象
    querystring.escape("")
        -转换成浏览器可认字符串
    querystring.unescape("")
        -浏览器字符串转换
*/
var querystring = require("querystring");
console.log(querystring);

var strfy = querystring.stringify({
    name:"yhr",
    course:[
        "qianf",
        "mongod"
    ],
    form:"shanghai"
},",",":");
console.log(strfy);

console.log(querystring.parse("name:yhr,course:qianf,course:mongod,form:shanghai",",",":"));


var qes = querystring.escape("北京")
console.log(qes);
console.log(querystring.unescape(qes));