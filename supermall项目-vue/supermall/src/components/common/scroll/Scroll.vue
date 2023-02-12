<template>
<!-- 封装 better-scroll -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    //决定是否在页面监听滚动 
    probeType: {
      type: Number,
      default: 0
    },
    //决定是否监听下拉到底部
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //scroll To 返回顶部方法 
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time);
    },
    //到达底部继续请求
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    //重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh(){
      this.scroll.refresh();
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM: true,
      observeImage: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //监听滚动位置
    this.scroll.on('scroll',position => {
      this.$emit('scroll',position);
    });

    this.scroll.on('pullingUp',() => {
      // console.log('到达底部');
      this.$emit('pullingUp');
    })
  },
};
</script>

<style>
</style>