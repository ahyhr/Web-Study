//object 表示一个对象  (一般不使用没有限制对象)
let a: object;
a = {};
a = function (){};


//------------定义对象
//{} 用来指定对象中可以包含哪些属性
//属性名后加?, 表示属性可选(可写可不写)
let b: {name: string, age?: number};
b = {name: 'str', age: 18};

//[propName:string]: any 表示任意类型的属性
let c: {name: string, [propName:string]: any};
c = {name: 'yhr', age: 21, gender: '男'};


//------------定义函数
//设置函数结构的类型声明
let d: (a: number,b: number)=>number;
d = function (n1: number, n2: number):number {
  return n1 + n2;
}



//------------定义数组
//表示字符串数组
let arr: string [];
arr = ['a', 'b', 'c'];

//表示数值数组
let arr2: number [];
arr2 = [1, 2, 3];

//元组, 表示固定长度的数组
let arr3: [string,string,number];
arr3 = ['str1', 'str3', 3];



//------------定义枚举
enum Gender {
  male = 0,
  female = 1
}

let obj: {name: string, gender: Gender};
 obj = {
   name: 'yhr',
   gender: Gender.male
 }
console.log(obj.gender === Gender.male);


//------------类型别名
type myType = 1 | 2 | 3 | 4 | 5;
let t1: myType;
let t2: myType;
t1 = 2;