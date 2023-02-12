"use strict";
/*
  使用class关键字来定义一个类
    对象中主要包含两个部分:
      -属性
      -方法

*/
var Dog = /** @class */ (function () {
    // 使用 static 是静态属性 (类属性), 可直接通过 类访问
    //static age: number;
    //constructor 构造函数, 会在对象创建时调用
    //this 表示当前实例
    function Dog(name, age) {
        this.name = name;
        this.age = age;
    }
    //定义实例方法
    Dog.prototype.sayHello = function () {
        console.log('我叫' + this.name + '---汪汪汪');
    };
    return Dog;
}());
var dog1 = new Dog('小黑', 2);
var dog2 = new Dog('小白', 4);
console.log(dog1);
console.log(dog2);
dog1.sayHello();
dog2.sayHello();
