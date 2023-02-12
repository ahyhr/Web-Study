//父类
class Aminal {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log('动物在叫');
  }
  run() {
    console.log(this.name + '在跑');
  }
}

//子类
//extends 继承
class Dog extends Aminal{
  //对方法进行重写
  sayHello() {
    console.log('汪汪汪');
  }
}
class Cat extends Aminal{
  sayHello() {
    console.log('喵喵喵');
  }
}

const dog1 = new Dog('小狗',2);
const cat1 = new Cat('小猫',1);

console.log(dog1);
console.log(cat1);
dog1.run();
cat1.run();
dog1.sayHello();
cat1.sayHello();
