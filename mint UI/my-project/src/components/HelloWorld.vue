<template>
  <div class="hello">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in imgsList" :key="index">
        <img :src="item.image" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { getImages } from "../network/hello";
export default {
  name: "HelloWorld",
  data() {
    return {
      imgsList: [],
    };
  },
  created() {
    getImages().then((res) => {
      this.imgsList = res.data.data.banner.list;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item img{
  width: 100%;
  height: 100%;
}
</style>
