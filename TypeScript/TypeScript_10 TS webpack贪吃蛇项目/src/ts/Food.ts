//定义食物类Food
class Food{
  element: HTMLElement;
  constructor(){
    //获取food元素赋值给element
    this.element = document.getElementById("food")!;
  }

  //定义获取坐标方法
  get X(){
    return this.element.offsetLeft;
  }
  get Y(){
    return this.element.offsetTop;
  }

  //修改食物位置
  change(){
    //生成随机位置 0-290
    //蛇移动一次为10, 食物位置为10的倍数
    let top =  Math.round(Math.random() * 29) * 10;
    let left =  Math.round(Math.random() * 29) * 10;

    this.element.style.top = top + 'px';
    this.element.style.left = left + 'px';
  }
}

export default Food