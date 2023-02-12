"use strict";
var Person = /** @class */ (function () {
    function Person(name, age) {
        this._name = name;
        this._age = age;
    }
    Object.defineProperty(Person.prototype, "age", {
        /*
          private 私有属性  外部访问或修改时需要通过 get/set 方法 可以在方法内部进行限制
            getter 方法用来读取属性
            setter 方式用来设置属性
        */
        get: function () { return this._age; },
        set: function (value) { value >= 0 ? this._age = value : this._age; },
        enumerable: false,
        configurable: true
    });
    ;
    return Person;
}());
var per = new Person('yhr', 22);
//修改私有属性 会调用 set age 方法
per.age = 33;
//访问  调用get age方法
console.log(per.age);
// class A {
//   name: string;
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
var A = /** @class */ (function () {
    //可以直接将属性定义在构造函数中  (语法糖)
    function A(name, age) {
        this.name = name;
        this.age = age;
    }
    return A;
}());
var a = new A('aaa', 18);
console.log(a);
