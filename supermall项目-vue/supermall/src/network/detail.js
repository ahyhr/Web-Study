import { request } from "./request";

export function getDetail(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//推荐商品数据
export function GetRecommend(){
  return request({
    url: '/recommend'
  })
}

//将请求的杂乱数据进行整合
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.columns = columns;
    this.service = services;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam{
  constructor(info,rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
