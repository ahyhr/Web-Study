<template>
  <div class="category-detail-info">
    <div class="info" v-for="(item,index) in DetailList" :key="index">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <span class="info-title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryDetailInfo',
  props: {
    DetailList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.category-detail-info {
  display:  flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.category-detail-info :last-child {
  flex: 0;

}
.info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.info img {
  width: 60px;
  height: 60px;
}
.info-title {
  font-size: 13px;
  margin-top: 5px;
}
</style>