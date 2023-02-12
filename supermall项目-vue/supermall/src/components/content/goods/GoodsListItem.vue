<template>
  <div class="goods-list-item" @click="itemClick">
    <!-- v-lazy 懒加载插件 -->
    <img :class="{'categoryShow':isCategory}" v-lazy="showImage" alt="" />
    <div class="item-info">
      <p>{{ goodsItem.title }}</p>
      <div>
        <span class="price">{{ goodsItem.price }}</span>
        <span class="cfav">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
    isCategory: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed:{
    showImage(){
      if (this.goodsItem.img) {
        return this.goodsItem.img;
      }
      return this.goodsItem.image || this.goodsItem.show.img;

    }
  },

  methods: {
    itemClick(){
      console.log('跳转详情页');
      // this.$router.push('/detail/' + this.goodsItem.iid)
      //路由传递id
      this.$router.push({
        path: '/detail',
        query: {
          id: this.goodsItem.iid
        }
      });
    },
  },
};
</script>

<style>
.goods-list-item {
  width: 48%;
  font-size: 13px;
  height: 100%;
}
.goods-list-item img {
  width: 100%;
  height: 227.51px;
  border-radius: 8px;
}
.goods-list-item p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}
.item-info {
  margin: 6px 0;
}
.item-info div {
  display: flex;
  justify-content: center;
}
.item-info span {
  margin: 0 5px;
}
.cfav::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg");
  background-size: 100%;
  vertical-align: text-top;
}
.price {
  color: var(--color-high-text);
}
.categoryShow {
  height: 170px !important;
}
</style>