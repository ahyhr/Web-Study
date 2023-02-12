<template>
  <div id="app">
    <scroll class="content">
      <HelloWorld/>
    </scroll>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Scroll from './components/Scroll.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Scroll,
   
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.content{
  height: 100vh;
  background: burlywood;
}
</style>
