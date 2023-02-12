<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item="item"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: { CartListItem, Scroll },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 45px);
}
.cart-list :last-child {
  border: none;
}
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}

</style>