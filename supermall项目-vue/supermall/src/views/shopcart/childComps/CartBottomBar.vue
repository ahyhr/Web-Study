<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkAllClick">
      <check-button :isChecked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="all-price">
      <span>合计: ￥{{ allPrice }}</span>
    </div>
    <div class="calculate" @click="calculateClick">
      <span>去结算（{{ checkLength }}）</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    //全选按钮
    checkAllClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.check = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.check = true));
      }
    },
        //去结算按钮
    calculateClick() {
      let check = false;

      for (const item of this.$store.state.cartList) {
        if (item.check) {
          check = true;
        }
      }
      //如果没有选中商品 弹窗弹窗
      if (!check) {
        this.$toast.show('请选择购买的商品',2000);
      }
    }
  },
  computed: {
    //合计 选中 的商品
    allPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.check;
        })
        .reduce((previous, item) => {
          return previous + item.realPrice * item.count;
        }, 0)
        .toFixed(2);
    },
    //结算数量
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.check;
      }).length;
    },
    //全选显示状态
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) return false;

      return this.$store.state.cartList.every((item) => {
        return item.check;
      });
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  background: whitesmoke;
  position: relative;
  bottom: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
.bottom-bar div {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-content,
.all-price,
.calculate {
  flex: 1;
  display: flex;
  align-items: center;
}
.check-content span {
  margin-left: 5px;
}
.all-price {
  flex: 2;
}
.all-price span {
  margin-left: -60px;
}
.calculate {
  flex: 0 0 100px;
  background: rgb(231, 67, 7);
  color: whitesmoke;
}
</style>