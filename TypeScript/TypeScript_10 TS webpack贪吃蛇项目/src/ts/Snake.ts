class Snake {
  // 表示蛇头的元素
  head: HTMLElement;
  // 蛇的身体(包括蛇头)
  bodies: HTMLCollection; //HTMLCollection添加新元素会自动补充
  // 蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇头坐标
  get X(){
    return this.head.offsetLeft;
  }
  get Y(){
    return this.head.offsetTop;
  }

  // 设置色蛇头坐标
  set X(value: number){
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了!");
    }
    //发生掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      }else {
        value = this.X + 10;
      }
    }

    //移动身体
    this.moveBody();
    this.head.style.left = value + 'px';
    //检查有没有撞到自己
    this.checkHeadBody();
  }
  set Y(value: number){
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了!");
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      }else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 蛇增加身体
  addBody(){
    //beforeend 结束标签前(加到最后)
    this.element.insertAdjacentHTML('beforeend','<div></div>');
  }

  //蛇身体移动方法
  moveBody(){
    for (let i = this.bodies.length-1; i>0; i--) {
      //获取前一个身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      
      //将值设置到当前身体
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  //检查身体是否和蛇头碰撞
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (bd.offsetLeft === this.X && bd.offsetTop === this.Y) {
        throw new Error("撞到自己了");
      }
    }
  }
}

export default Snake