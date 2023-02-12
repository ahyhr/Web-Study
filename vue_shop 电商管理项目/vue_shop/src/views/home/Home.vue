<template>
  <div id="home">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="header">
        <h3 @click="titleClick">宜购后台管理系统</h3>
        <el-button class="button" @click="loginOut">
          <i class="iconfont icon-tuichu"></i>
        </el-button>
      </el-header>

      <el-container class="mian-container">
        <el-aside class="aside" :width="isCollapse ? '65px' : '201px'">
          <!-- 导航菜单 -->
          <nav-menu :menuList="menuList" @toggleClick="toggleClick" />
        </el-aside>
        <!-- 内容 -->

        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenuList } from "@/network/home";
import NavMenu from "../home/childComps/navMenu/NavMenu";

export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      isCollapse: false,
    };
  },
  created() {
    //获取左侧菜单数据
    this.getMenuList();
  },
  methods: {
    // 退出登录
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.replace("/login");
      this.$message("退出登录");
    },
    toggleClick(isCollapse) {
      this.isCollapse = isCollapse;
    },
    titleClick() {
      if (this.$route.path == "/welcome") return;
      this.$router.push("/welcome");
    },
    //--------------数据请求-------------
    async getMenuList() {
      const { data: res } = await getMenuList();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
    },
  },
  components: {
    NavMenu,
  },
};
</script>

<style lang="less" scoped>
@import url('../../assets/font/iconfont.css');
#home {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
.mian-container {
  width: 100%;
  height: calc(100% - 60px);
}
.header {
  background-color: white;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.12);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.555);
  padding: 0;
  > h3 {
    height: 100%;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
}
.button {
  margin-right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover .icon-tuichu::before{
  color: red;
}


.aside {
  background-color: white;
  box-shadow: 2px 0 1px -2px rgba(167, 167, 167, 0.12);
  z-index: 2;
  transition: width 0.2s ease;
  border-right: 1px solid rgba(207, 207, 207, 0.534);
}

.main {
  background-color: white;
}

</style>