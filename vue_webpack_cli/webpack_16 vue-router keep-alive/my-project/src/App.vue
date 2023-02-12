<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="/user/ + userid">User</router-link> |
      <!-- 传递参数  params 传递简单数据      query传递多数据 -->
      <router-link :to="{ path: '/Profile', query: { name, age, height } }">Profile</router-link>

      <!-- 使用代码跳转 
      -- <button @click="butClick">User</button>
        <button @click="butClick2">Profile</button>
      -->
    </div>
    <!-- keep-alive 
        不使用keep-alive 每次点击跳转时都会重新创建页面
        避免每次重新创建页面
        属性: include 只有匹配的组件被缓存
              exclude  匹配的组件不会缓存  多个不加空格
     -->
    <keep-alive exclude="Profile">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: 133456,
      name: "yhr",
      age: 21,
      height: 178,
    };
  },
  methods: {
    //使用代码跳转 和 传递参数
    butClick() {
      this.$router.push("/user/" + this.userid);
    },
    butClick2() {
      this.$router.push({
        path: "/Profile",
        query: {
          name: this.name,
          age: this.age,
          height: this.height,
        },
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

.router-link-active {
  color: #42b983;
}
</style>
