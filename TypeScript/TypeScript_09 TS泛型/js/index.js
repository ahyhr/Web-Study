"use strict";
/*
  在定义函数或是类时, 如果遇到类型不明确就可以使用泛型
  <T> 定义泛型
*/
function fn(a) {
    return a;
}
//可以直接调用具有泛型的函数
console.log(fn(10)); //  不指定泛型TS可以自动对类型进行推断
console.log(fn('abc'));
