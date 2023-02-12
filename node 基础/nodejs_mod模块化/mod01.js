/*
    模块化
        -在node中，一个js文件就是一个模块
        -每一个js文件的js代码都是独立运行在一个函数中
        (arguments.callee)为此函数
*/

/*
    模块中的代码都是包装在一个函数中执行的，同时传递5个实参
    -   exports
            -该对象用来将变量或函数暴露到外面
    -   require
            -函数，用来引入外部模块
    -   module
            -module代表当前模块本身
            -exports就是module的属性
            -既可以用exports,也可以使用module.exports进行导出
    -   __filename
            -e:\STUDY\网页设计\下学期\nodejs_mod模块化\mod01.js
            -当前模块所在路径
    -   __dirname
            -当前文件夹所在路径
*/


/*
    通过 exports 向外部暴露属性或方法
*/
module.exports.a = "我是a";
exports.b = 2;
exports.fun = function(){};
console.log(__filename+"aaaa");
