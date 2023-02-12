"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//父类
var Aminal = /** @class */ (function () {
    function Aminal(name, age) {
        this.name = name;
        this.age = age;
    }
    Aminal.prototype.sayHello = function () {
        console.log('动物在叫');
    };
    Aminal.prototype.run = function () {
        console.log(this.name + '在跑');
    };
    return Aminal;
}());
//子类
//extends 继承
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //对方法进行重写
    Dog.prototype.sayHello = function () {
        console.log('汪汪汪');
    };
    return Dog;
}(Aminal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.sayHello = function () {
        console.log('喵喵喵');
    };
    return Cat;
}(Aminal));
var dog1 = new Dog('小狗', 2);
var cat1 = new Cat('小猫', 1);
console.log(dog1);
console.log(cat1);
dog1.run();
cat1.run();
dog1.sayHello();
cat1.sayHello();
