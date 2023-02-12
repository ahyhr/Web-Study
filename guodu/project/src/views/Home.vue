<template>
  <div class="home">
    <van-stepper v-model="$store.state.count" @plus="plus" @minus="minus" />
    <van-button type="primary" @click="butClick">请求按钮</van-button>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in $store.state.list" :key="item.acm">
        <img :src="item.image" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    plus() {
      this.$store.commit("plus");
    },
    minus() {
      this.$store.commit("minus");
    },
    butClick() {
      this.$store.dispatch("getImgList");
    },
  },
};
</script>

<style>
  img {
    width: 100%;
    height: 100%;
  }
</style>