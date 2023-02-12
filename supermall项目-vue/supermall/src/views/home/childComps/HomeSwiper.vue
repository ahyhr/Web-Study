<template>
  <!-- <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper> -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.acm">
      <img :src="item.image" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
// import { Swiper , SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      deault() {
        return [];
      },
    },
  },
  // components: {
  //   Swiper,
  //   SwiperItem,
  // },
};
</script>

<style scoped>
.my-swipe img {
  width: 100%;
  height: 100%;
}
</style>