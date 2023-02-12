//引入定义的常量
import { ADD_COUNTER, ADD_TO_CART } from './mutations-types.js'

export default {
  //添加到购物车界面数据处理
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //此处拷贝一份断绝引用关系
      const obj = { ...payload };

      let oldProduct = null;
      for (const item of context.state.cartList) {
        //id是否相同
        if (item.id === obj.id) {
          oldProduct = item;
        }
      }

      if (oldProduct) {
        //id 相同只增加个数
        // oldProduct.count += obj.count;
        context.commit(ADD_COUNTER, { oldProduct, obj });
        resolve('商品数量加' + obj.count);
      } else {
        // context.state.cartList.push(obj);
        context.commit(ADD_TO_CART, obj);
        resolve('商品添加成功');
      }
    })
  }
}