//记分牌类
class ScorePanel {
  //记录分数和等级
  score: number = 0;
  level: number = 1;

  //等级上限
  maxLevel: number;

  //每几分升一级 
  upScore: number;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  //maxLevel默认值10, upScore默认10
  constructor(maxLevel:number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  //加分
  addScore(){
    this.scoreEle.innerHTML = ++this.score + '';
    //每10分升一级
    if (this.score % this.upScore === 0) {
      this.leverUp();
    }
  }
  //加等级
  leverUp(){
    //最大等级10级
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel