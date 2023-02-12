//引入定义的常量
import { ADD_COUNTER,ADD_TO_CART } from './mutations-types.js'

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事件单一一点

  //添加商品数量
  [ADD_COUNTER](state,data) {
    data.oldProduct.count += data.obj.count;
  },
  //添加到购物车
  [ADD_TO_CART](state,obj) {
    obj.check = false;
    state.cartList.push(obj);
  }
}