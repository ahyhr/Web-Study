<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left" class="left" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) of titles"
          :key="index"
          @click="itemClick(index)"
          :class="{ active: currentIndex == index }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.left img {
  position: relative;
  top: 5px;
}
.center {
  display: flex;
  justify-content: space-around;
}
.center div {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
</style>