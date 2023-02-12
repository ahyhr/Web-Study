<template>
  <div class="shop-info">
    <div class="shio-top">
      <div class="logo"><img :src="shop.logo" alt="" /></div>
      <span>{{ shop.name }}</span>
    </div>
    <div class="middle">
      <div class="middle-left">
        <div class="total-sales">
          <span class="number">{{ shop.sells | sellCountFilter }}</span>
          <span>总销量</span>
        </div>
        <div class="all-goods">
          <span class="number">{{ shop.goodsCount }}</span>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="middle-right">
        <table>
          <tr v-for="(item, index) of shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-more': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              {{ item.isBetter ? "高" : "低" }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div>进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    //销量显示方式
    sellCountFilter(price) {
      return price >= 10000 ? (price / 10000).toFixed(1) + '万' : price;
    },
  },
};
</script>

<style scoped>
.shio-top {
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
}
.shio-top .logo {
  width: 50px;
  height: 50px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.shio-top .logo img {
  width: 100%;
  height: 100%;
}

.middle {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.middle div {
  flex: 1;
}
.middle .middle-left {
  display: flex;
  border-right: 2px solid #eee;
}
.middle .middle-left div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13.5px;
}
.middle .middle-left div span {
  margin: 3px 0;
  text-align: left;
}
.middle .middle-left .number {
  font-size: 17px;
}

.middle .middle-right {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.middle .middle-right table {
  border-spacing: 10px;
}
.better {
  color: white;
  background: green;
}
.better-more {
  color: white;
  background: orange;
}
.score {
  color: green;
}
.score-more {
  color: orange;
}

.shop-bottom{
  margin: 0 auto;
  width: 120px;
  text-align: center;
  padding: 5px;
  background: #eee;
  border-radius: 10px;
  font-size: 14px;
}
</style>