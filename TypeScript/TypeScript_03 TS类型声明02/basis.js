//object 表示一个对象  (一般不使用没有限制对象)
var a;
a = {};
a = function () { };
//------------定义对象
//{} 用来指定对象中可以包含哪些属性
//属性名后加?, 表示属性可选(可写可不写)
var b;
b = { name: 'str', age: 18 };
//[propName:string]: any 表示任意类型的属性
var c;
c = { name: 'yhr', age: 21, gender: '男' };
//------------定义函数
//设置函数结构的类型声明
var d;
d = function (n1, n2) {
    return n1 + n2;
};
//------------定义数组
//表示字符串数组
var arr;
arr = ['a', 'b', 'c'];
//表示数值数组
var arr2;
arr2 = [1, 2, 3];
//元组, 表示固定长度的数组
var arr3;
arr3 = ['str1', 'str3', 3];
//------------定义枚举
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
var obj;
obj = {
    name: 'yhr',
    gender: Gender.male
};
console.log(obj.gender === Gender.female);
