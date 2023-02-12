/*
  abstract 开头的类是抽象类,
            抽象类不能用来创建对象,专门用来继承的类
*/
abstract class Animal {
  name: string;
  constructor(name:string) {
    this.name = name;
  }

  //抽象方法 没有方法体
  //  子类必须进行重写
  abstract satHello():void;
}

class Cat extends Animal{
  //在子类中添加属性
  age: number;

  constructor(name:string, age:number) {
    //如果在子类中写了构造函数, 必须调用父类构造函数
    // super 表示父类
    super(name);//表示调用父类构造函数
    this.age = age;
  }
  satHello(){
    console.log('喵喵喵');
    
  }
}


const cat = new Cat('喵喵',2);
console.log(cat);
