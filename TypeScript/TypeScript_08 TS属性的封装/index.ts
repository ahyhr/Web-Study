class Person {
  /*
    public 修饰的属性可以在任意位置访问(修改) 默认值
    private 私有属性只能在当前类中修改
    protected 受包含属性, 可以在当前类和子类中使用
  */
  public _name: string;
  private _age: number;
  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }
  /*
    private 私有属性  外部访问或修改时需要通过 get/set 方法 可以在方法内部进行限制
      getter 方法用来读取属性
      setter 方式用来设置属性
  */
  get age() { return this._age };
  set age(value: number) { value >= 0 ? this._age = value : this._age }
}

const per = new Person('yhr', 22);

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
class A {
  //可以直接将属性定义在构造函数中  (语法糖)
  constructor(public name: string, public age: number) {
  }
}

const a = new A('aaa',18);
console.log(a);
