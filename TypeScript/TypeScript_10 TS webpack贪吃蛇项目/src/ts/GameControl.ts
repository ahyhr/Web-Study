import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

//游戏控制器
class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  //储存蛇移动的方向
  direction: string = '';
  //记录游戏是否结束
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  //游戏初始化方法
  init() {
    //绑定键盘按键按下的事件
    document.addEventListener('keydown', this.keydownHandler);
    this.run();
  }
  //创建一个键盘按下的响应函数
  keydownHandler = (event: KeyboardEvent) => {
    this.direction = event.key;
  }

  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      //向上移动
      case 'w':
      case 'ArrowUp':
      case 'Up':
        Y -= 10;
        break;
      //向下移动
      case 's':
      case 'ArrowDown':
      case 'Down':
        Y += 10;
        break;
      //向左移动
      case 'a':
      case 'ArrowLeft':
      case 'Left':
        X -= 10;
        break;
      //向右移动
      case 'd':
      case 'ArrowRight':
      case 'Right':
        X += 10;
        break;
    }

    //吃到食物
    this.checkEat(X ,Y);

    try {
      //修改蛇的x和y值
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      this.isLive = false;
      alert(error + '--游戏结束!');
    }

    this.isLive && setTimeout(() => {
      this.run();
    }, 300 - (this.scorePanel.level - 1) * 30);
  }

  //检查是否吃到食物方法
  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      //改变食物位置
      this.food.change();
      //增加蛇一节身体
      this.snake.addBody();
      //加一分
      this.scorePanel.addScore();
      
    }
  }

}

export default GameControl

