<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div @click="selectClick">
        <i class="icon select" :class="{'select-active':selectActive}"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-right">
      <div class="cart" @click="openCartInfo">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>  
</template>

<script>
export default {
  naem: 'DetailBottomBar',
  data() {
    return {
      selectActive: false
    }
  },
  methods: {
    selectClick(){
      this.selectActive =! this.selectActive;
    },
    openCartInfo(){
      this.$emit('openCartInfo');
    }
  },
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom-bar .bar-left, .bar-right{
  display: flex;
  width: 50%;
  height: 100%;
}
.bottom-bar .bar-left div {
  flex: 1;
  font-size: 13px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.bottom-bar .bar-left div i {
  width: 22px;
  height: 22px;
  vertical-align: middle;
}
.icon{
  display: block;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat;
  background-size: 100%;
}
.service {
  background-position: 0 -53px ;
}
.shop {
  background-position: 0 -99px;
}
.select {
  background-position: 0 0px;
}
.select-active {
  background-position: 0 -28px;
}


.bar-right div {
  flex: 1;
  text-align: center;
  line-height: 49px;
  font-size: 14px;
}
.bar-right .cart {
  background: #ffde0e;
  
}
.bar-right .buy {
  background: #ff779a;
  color: white;
}
</style>