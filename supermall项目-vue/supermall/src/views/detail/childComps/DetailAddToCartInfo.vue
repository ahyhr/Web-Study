<template>
  <div class="cart-info">
    <div class="top">
      <span @click="closeCart">X</span>
    </div>
    <div class="content">
      <div class="info-img">
        <img :src="cartInfo.img" alt="" />
      </div>
      <div class="info-title">
        <span>{{ cartInfo.title }}</span>
      </div>
      <div class="add">
        <button @click="sub" :disabled="count <= 1">-</button>
        <span>x{{ count }}</span>
        <button @click="add">+</button>
      </div>
    </div>
    <div class="total-prices">
      <div>
        <span>总计:</span>
        <span class="price">{{ totalPrices }}</span>
        <span>元</span>
      </div>
      <div class="buy" :class="{'banned-click':bannedClick}" @click="addToCart">{{str}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailAddToCartInfo",
  props: {
    cartInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: 1,
      str: '加入',
      bannedClick: false
    };
  },
  methods: {
    sub() {
      this.count--;
    },
    add() {
      this.count++;
    },
    //关闭购物车
    closeCart(){
      this.$parent.cartInfoShow = false;
    },
    //加入购物车
    addToCart(){
      this.bannedClick = true;
      this.str = '已加入';
      this.$emit('addToCart',this.count);
    }
  },
  computed: {
    totalPrices(){
      return (this.cartInfo.realPrice * this.count).toFixed(2);
    }
  },
};
</script>

<style scoped>
.cart-info {
  width: 100%;
  background: white;
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;
  z-index: 2;
}
.top{
  height: 20px;
  background: whitesmoke;
  border-bottom: 1px solid rgb(201, 201, 201);
}
.top span{
  border-radius: 50%;
  border: 1px solid rgb(141, 141, 141);
  width: 20px;
  height: 20px;
  float: right;
  text-align: center;
}
.top span::after {
  content: "";
  clear: both;
  display: block;
}
.content {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.cart-info .content div {
  height: 70px;
}
.content .info-img {
  width: 50px;
  height: 70px;
}
.info-img img {
  width: 100%;
  height: 100%;
}
.content .info-title {
  margin: 0 20px;
  width: 150px;
}
.info-title span {
  display: block;
  height: 70px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: justify;
}
.content .add {
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add :nth-child(2) {
  width: 25px;
  margin: 0 5px;
  text-align: center;
}
.add button {
  width: 20px;
  height: 20px;
}
.total-prices {
  display: flex;
  justify-content: space-between;
}
.total-prices div {
  padding: 10px;
}
.price{
  color: rgb(228, 166, 176);
  margin: 0 5px;
}
.buy {
  width: 100px;
  height: 100%;
  background: pink;
  text-align: center;
}
.banned-click {
  pointer-events: none;
  background: whitesmoke;
}
</style>