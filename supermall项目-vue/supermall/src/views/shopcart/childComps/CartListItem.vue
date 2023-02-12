<template>
  <div class="cart-list-item">
    <div class="check-button" @click="checkClick">
      <check-button :isChecked="item.check" />
    </div>
    <div class="item-img">
      <img :src="item.img" alt="">
    </div>
    <div class="item-info">
      <p class="item-title">{{item.title}}</p>
      <p class="item-desc">{{item.desc}}</p>
      <div class="info-bottom">
        <div class="info-price">￥{{item.realPrice}}</div>
        <div>x{{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'

export default {
  components: { CheckButton },
  name: 'CartListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick(){
      this.item.check = !this.item.check;
    }
  },
}
</script>

<style scoped>
.cart-list-item {
  width: 100%;
  border-bottom: 2px solid #eee;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
}
.check-button {
  display: flex;
  margin-right: 5px;
  flex-direction: column;
  justify-content: center;
  height: 100px;
}
.item-img {
  width: 80px !important;
  height: 110px;
  border-radius: 5px;
  overflow: hidden;
}
.item-img img {
  width: 100%;
  height: 100%;
  flex: 1;
}
.item-info {
  flex: 1;
  min-width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
}
.item-title, .item-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 600;
}
.item-desc {
  font-size: 14px;
  font-weight: normal;
  margin-top: -15px;
}
.info-bottom {
  display: flex;
  justify-content: space-between;
}
.info-price {
  font-size: 17px;
  font-weight: 600;
  color: rgb(255, 145, 0);
}
</style>