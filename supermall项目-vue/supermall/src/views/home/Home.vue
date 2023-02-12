<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购乐多</div></nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isShowTabControl"
      />

    <scroll class="content" ref="scroll" 
      :probeType="3" 
      :pullUpLoad=true
      @scroll="cententScroll" 
      @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      />
    <goods-list :goods="goods[currentType].list" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
// import BackTop from "@/components/common/backTop/BackTop.vue";

import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home.js";
import { backTopMixin } from "@/common/mixin.js"
import Scroll from "@/components/common/scroll/Scroll.vue";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  //mixins 混入返回顶部
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY: 0
    };
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  updated() {
    //获取tabControl offsetTop  吸顶效果
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
  },
  methods: {
    /*
      事件监听相关
    */
    tabClick(index) {
      //点击tab 切换内容
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //将吸顶效果tab 和 正常tab 进行同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //返回顶部
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0);
    // },

    //监听滚动位置 
    cententScroll(position){
      //1.设置返回顶部按钮显示/隐藏
      this.isShowBackTop = Math.abs(position.y) > 1000;

      //2.设置tab吸顶效果
      this.isShowTabControl = Math.abs(position.y) >= this.tabOffsetTop;
    },
    //下拉加载更多
    loadMore(){
      console.log('到达底部了');
      this.getHomeGoods(this.currentType);
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 2000);

    },

    /*
      网络请求相关
    */
    //进行封装
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //将数据添加到list中
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  /*
    解决bester-scroll 离开页面时记录位置问题
  */
  //进入页面时
  activated() {
    //滚动到记录位置
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  //离开页面时
  deactivated() {
    //记录当前位置
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>


<style scoped>
/* scoped 作用域 只在当前页面有效(可以使用重复名) */
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: rgb(248, 247, 247);
}
.tab-control {
  position: relative;
  z-index: 9; 
  top: -0.5px;
  background: #fff;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>