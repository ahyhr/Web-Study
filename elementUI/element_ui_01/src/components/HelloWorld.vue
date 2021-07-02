<template>
  <div class="hello">
    <el-carousel :interval="3000" trigger="click" >
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
        <h3 class="small"><img :src="item.image" alt=""></h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { slideShowImg } from '@/network/helloWorld.js'

export default {
  name: "HelloWorld",
  data() {
    return {
      bannerList: []
    };
  },
  created() {
    slideShowImg().then(res => {
      this.bannerList = res.data.banner.list;
      console.log(this.bannerList);
    })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
    color: #036cf5;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #e7a3a3;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #fcfcfc;
  }
  .small img {
  width: 100%;
  height: 100%;
}
</style>
