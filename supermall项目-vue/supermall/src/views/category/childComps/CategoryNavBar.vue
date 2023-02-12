<template>
  <div class="left-nav-bar">
    <ul>
      <li
        @click="navClick(index)"
        :class="{'active':currentIndex==index}"
        v-for="(item, index) in typeList"
        :key="index"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryNavBar',
  props: {
    typeList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    //导航点击事件
    navClick(index) {
      this.currentIndex = index;
      this.$emit('navClick',index);
    },
  },
};
</script>

<style scoped>
.left-nav-bar ul li {
  height: 40px;
  text-align: center;
  font-size: 14px;
  padding: 0 5px;
  line-height: 40px;
  background: whitesmoke;
}
.active {
  background: white !important;
  color: var(--color-tint);
  border-left: 3px solid var(--color-tint);
}
</style>