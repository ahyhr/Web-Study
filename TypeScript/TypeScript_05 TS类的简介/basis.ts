/*
  使用class关键字来定义一个类
    对象中主要包含两个部分:
      -属性
      -方法

*/

class Dog {
  // 定义实例属性 , 需要通过实例去访问
  name:string;
  age: number;

  // 使用 static 是静态属性 (类属性), 可直接通过 类访问
  //static age: number;

  //constructor 构造函数, 会在对象创建时调用
  //this 表示当前实例
  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
  }

  //定义实例方法
  sayHello() {
    console.log('我叫'+ this.name +'---汪汪汪');
    
  }
}

const dog1 = new Dog('小黑', 2);
const dog2 = new Dog('小白', 4);

console.log(dog1);
console.log(dog2);

dog1.sayHello();
dog2.sayHello();
