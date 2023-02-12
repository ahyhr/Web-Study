/*
  语法:
      let 变量: 类型;
      let 变量: 类型 = 值;

      function fn(参数:类型, 参数:类型):返回值类型{
        ...
      }
*/

let a: number = 20;

function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(123, 456));


//字面量进行声明
let b: 10;
b = 10;

//可以使用 | 来连接多个类型 (联合类型)
let c: 'male' | 'female';
c = 'male';
c = 'female';

let d: boolean | string;
d = true;
d = 'hello'

//any 表示任意类型,相当于关闭对该变量的类型检测(相当于js)
// let e: any;

//声明变量如果不指定类型,TS解析器会自动判断变量的类型为ant (隐式any)
let e;
e = 10;
e = 'hello';
e = true;

//unknown 实际上就是一个类型安全的any
//unknown 类型的变量不能直接赋值给其他变量
let f: unknown;
f = 10;
f = true;
f = 'hello';

let g: string;

if (typeof f === 'string') {
  g = f
}


//类型断言, 可以用来告诉解析器变量的实际类型
//两种语法:
g = f as string;
g = <string>f;


//void表示空(undefined), 表示没有返回值的函数
function fn(): void {

}

//never 表示永远不会返回结果
//比如报错,一旦程序报错代码立即结算,永远不会返回结果
function fn2(): never {
  throw new Error('报错了')
}


