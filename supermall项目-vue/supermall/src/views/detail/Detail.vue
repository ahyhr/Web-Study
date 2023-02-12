<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probeType="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        @detailImgLoad="detailImgLoad"
        :detailInfo="detailInfo"
      />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-add-to-cart-info v-if="cartInfoShow" :cartInfo="cartInfo" @addToCart="addToCart" />
    <detail-bottom-bar @openCartInfo="openCartInfo" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue';
import DetailAddToCartInfo from './childComps/DetailAddToCartInfo.vue';

import {
  getDetail,
  GetRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "@/network/detail.js";
import { debounce } from "@/common/utils.js";
import { backTopMixin } from "@/common/mixin.js";
import Scroll from "@/components/common/scroll/Scroll.vue";


export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      cartInfo: {},
      cartInfoShow: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    DetailAddToCartInfo,
    Scroll,
  },
  //混入返回顶部按钮
  mixins: [backTopMixin],
  created() {
    this.ImageloadingCompleted = false;
    //1.保存id
    this.id = this.$route.query.id;
    //2.根据id请求数据
    getDetail(this.id).then((res) => {
      const data = res.result;
      //1.取出轮播图数据
      this.topImages = data.itemInfo.topImages;

      //2.创建商品对象 商品信息
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店家对象 店家信息
      this.shop = new Shop(data.shopInfo);
      
      //4.商品详细信息
      this.detailInfo = data.detailInfo;

      //5.商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.获取用户评价信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      
      //给getThemeTopY 防抖函数赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //Number.MAX_VALUE 最大值 用于简化滚动时 nav标题显示状态的判断
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 200);
    });

    //请求推荐数据
    GetRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    //nav标题点击
    titleClick(index) {
      //滚动到相应的主题
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    //详情页图片加载完成
    detailImgLoad() {
      //调用计算当前组件的y值
      this.getThemeTopY();
    },
    //详情页滚动时
    detailScroll(position){
      //1.获取y值
      const positionY = Math.abs(position.y);
      //2.根据滚动位置判断 nav标题索引
      for (let i = 0; i < this.themeTopYs.length-1; i++) {
        if (this.currentIndex != i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
        }
      }
      //3.改变nav标题显示状态
      this.$refs.nav.currentIndex = this.currentIndex;

      //设置返回顶部按钮显示/隐藏
      this.isShowBackTop = Math.abs(position.y) > 1000; 
    },

    //打开购物车小窗口
    openCartInfo(){
    this.cartInfo.realPrice =  this.goodsInfo.realPrice;
    this.cartInfo.title = this.goodsInfo.title;
    this.cartInfo.img = this.topImages[0];
    this.cartInfoShow = true;
    },

    //加入购物车
    addToCart(count){
      this.cartInfo.id = this.id;
      this.cartInfo.count = count;
      this.cartInfo.desc = this.goodsInfo.desc;
      //商品数据传入到 vuex 中  
      // this.$store.commit('addCart',this.cartInfo);

      //dispatch 可返回Promise
      this.$store.dispatch('addCart',this.cartInfo).then(res => {
        //商品添加成功
        //显示弹窗
        this.$toast.show(res,2000);
      }); 
    }
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background: white;
}
/* .detail-nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1;
} */
.content {
  /* height: calc(100% - 44px); */
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>