<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc ">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end "></div>
      <div class="clear-fix"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img @load="imgLoad" v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    //图片加载完成
    imgLoad(){
      this.$emit('detailImgLoad');
    }
  },
};
</script>

<style scoped>
.goods-info {
  margin-top: 25px;
  border-top: 4px solid #eee;
}
.info-desc {
  margin: 15px 0;
  padding: 0 8px;
}
.info-desc .start,.end {
  width: 80px;
  height: 4px;
  border-bottom: 2px solid slategrey;
}
.start::before,.end::after {
  content: "";
  width: 4px;
  height: 4px;
  display: block;
  background: black;
}
.info-desc .desc {
  font-size: 13px;
  text-align: justify;
  margin: 10px 0;
}
.info-desc .end{
  float: right;
}
.end::after{
  position: absolute;
  right: 8px;
}

.info-key{
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0 20px 0;
}

.info-list img{
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

</style>