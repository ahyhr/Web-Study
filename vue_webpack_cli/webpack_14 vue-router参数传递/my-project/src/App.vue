<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="/user/ + userid">User</router-link> |
      <!-- 传递参数  params 传递简单数据      query传递多数据 -->
      <router-link :to="{ path: '/Profile', query: { yhr } }">Profile</router-link >
      
      <!-- 使用代码跳转 
      -- <button @click="butClick">User</button>
        <button @click="butClick2">Profile</button>
      -->
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: 133456,
      yhr: {
        name: "yhr",
        age: 21,
        height: 178,
      },
    };
  },
  methods: {
    //使用代码跳转 和 传递参数
    butClick(){
      this.$router.push('/user/' + this.userid);
    },
    butClick2(){
      this.$router.push({
        path: '/Profile',
        query: {
          yhr :this.yhr
        }
      })
    }
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
