/*
  语法:
      let 变量: 类型;
      let 变量: 类型 = 值;

      function fn(参数:类型, 参数:类型):返回值类型{
        ...
      }
*/
var a = 20;
function sum(a, b) {
    return a + b;
}
console.log(sum(123, 456));
//字面量进行声明
var b;
b = 10;
//可以使用 | 来连接多个类型 (联合类型)
var c;
c = 'male';
c = 'female';
var d;
d = true;
d = 'hello';
//any 表示任意类型,相当于关闭对该变量的类型检测(相当于js)
// let e: any;
//声明变量如果不指定类型,TS解析器会自动判断变量的类型为ant (隐式any)
var e;
e = 10;
e = 'hello';
e = true;
//unknown 实际上就是一个类型安全的any
//unknown 类型的变量不能直接赋值给其他变量
var f;
f = 10;
f = true;
f = 'hello';
var g;
if (typeof f === 'string') {
    g = f;
}
console.log(g);
