<template>
  <div clang="nav-menu">
    <!-- 收起/展开按钮 -->
    <div class="toggle-button" @click="toggleClick">|||</div>
    <el-menu
      class="menu"
      unique-opened
      :collapse-transition="false"
      :collapse="isCollapse"
      router
      :default-active="active"
    >
      <!-- 一级菜单 -->
      <el-submenu
        v-for="(item, index) in menuList"
        :key="item.id"
        :index="String(index)"
      >
        <template slot="title">
          <!-- 菜单 图标/标题 -->
          <i :class="incons[index]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item
          v-for="children in item.children"
          :key="children.id"
          :index="'/' + children.path"
        >
          <!-- 子菜单 图标/标题 -->
          <i class="el-icon-menu"></i>
          <span>{{ children.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      // 菜单图标
      incons: {
        0: "el-icon-user-solid",
        1: "el-icon-set-up",
        2: "el-icon-s-goods",
        3: "el-icon-s-claim",
        4: "el-icon-s-data",
      },
      isCollapse: false,
    };
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    toggleClick() {
      this.isCollapse = !this.isCollapse;
      this.$emit("toggleClick", this.isCollapse);
    }
  },
  computed: {
    // 导航菜单选中状态
    active() {
      return this.$route.path === '/goods/addGoods' ? '/goods' : this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.menu {
  background-color: white;
  border: none;
}
.toggle-button {
  background-color: white;
  border-bottom: 1px solid rgba(207, 207, 207, 0.534);
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #8a8484;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>