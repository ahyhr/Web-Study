<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ObserveDOM from '@better-scroll/observe-dom'

//封装  better-scroll
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    //使用ref 避免发生重名,查找错误情况
      this.scroll = new BScroll(this.$refs.wrapper,{
        // observeDOM: true
    })
  },
}
</script>

<style>
</style>