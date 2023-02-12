.<template>
  <div class="category">
    <nav-bar class="top-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <tab-control v-show="isShowTabControl" class="tab-control" :titles="['综合', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
    <div class="category-center">
      <scroll class="left-scroll">
        <category-nav-bar :typeList="typeList" @navClick="navClick" />
      </scroll>
      <scroll
        class="right-scroll"
        @scroll="scroll"
        :pullUpLoad="true"
        ref="scroll"
      >
        <category-detail-info :DetailList="DetailList" />
        <tab-control :titles="['综合', '新款', '精选']" @tabClick="tabClick" ref="tabControl"/>
        <goods-list
          class="goods"
          :goods="goods[currentType]"
          :isCategory="isCategory"
        />
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import CategoryNavBar from "./childComps/CategoryNavBar.vue";
import CategoryDetailInfo from "./childComps/CategoryDetailInfo.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import {
  getCategory,
  getSubcategory,
  getSubcategoryDetail,
  getGoods,
} from "@/network/category.js";
import { backTopMixin } from "@/common/mixin.js"


export default {
  name: "Category",
  components: {
    NavBar,
    CategoryNavBar,
    CategoryDetailInfo,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      isCategory: true,
      typeList: [],
      currentMaitKey: 3627,
      currentMiniWallkey: 10062603,
      DetailList: [],
      goods: {
        synthesize: [],
        new: [],
        sell: [],
      },
      currentType: "synthesize",
      positionY: [],
      currentIndex: 0,
      offsetTopY: 0,
      isShowTabControl: false,
    };
  },
  created() {
    //获取分类页面数据
    getCategory().then((res) => {
      this.typeList = res.data.category.list;

      //用于记录当前滚动的位置
      for (let i = 0; i < this.typeList.length; i++) {
        let obj = {};
        obj.title = this.typeList[i].title;
        obj.y = 0;
        obj.index = i;
        this.positionY.push(obj);
      }
    });

    //根据maitKey 获取详细数据 (默认请求 正在流行 数据)
    getSubcategory(this.currentMaitKey).then((res) => {
      this.DetailList = res.data.list;
    });

    //根据miniWallkey 获取右侧详情数据
    //综合数据
    getSubcategoryDetail(this.currentMiniWallkey).then((res) => {
      this.goods.synthesize = res;
    });
    //新款
    getGoods("new", 1).then((res) => {
      this.goods.new = res.data.list;
    });
    //精选
    getGoods("sell", 1).then((res) => {
      this.goods.sell = res.data.list;
    });
    console.log(this.goods);
  },
  updated() {
    //获取tabContorl 距离顶部位置
    this.offsetTopY = this.$refs.tabControl.$el.offsetTop;
  },
  methods: {
    //左导航点击
    navClick(index) {
      this.currentIndex = index;
      //滚动到之前位置
      this.$refs.scroll.scrollTo(0, this.positionY[index].y, 0);

      //获取当前选中的 maitKey
      this.currentMaitKey = this.typeList[index].maitKey;
      this.currentMiniWallkey = this.typeList[index].miniWallkey;
      //根据当前选中的maitKey请求相应数据
      getSubcategory(this.currentMaitKey).then((res) => {
        this.DetailList = res.data.list;
      });
      //根据当前选中的MiniWallkey请求相应数据
      getSubcategoryDetail(this.currentMiniWallkey).then((res) => {
        this.goods.synthesize = res;
      });
    },
    //右tab 点击
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "synthesize";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    scroll(position) {
      //记录当前标签滚动的位置
      this.positionY[this.currentIndex].y = position.y;

      //tabControl 吸顶
      this.isShowTabControl = Math.abs(position.y) >= this.offsetTopY;

      //backTop返回顶部显示/隐藏
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.top-nav {
  position: fixed;
  z-index: 2;
  color: whitesmoke;
  background: var(--color-tint);
}
.category-center {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  z-index: 0;
  overflow: hidden;
}
.left-scroll {
  flex: 0 0 25%;
  height: 100%;
}
.right-scroll {
  flex: 1;
  height: 100%;
  width: 75%;
}
.tab-control {
  position: fixed;
  background: white;
  width: 100%;
  top: 44px;
  z-index: 8;
  width: 75%;
  right: 0;
}
.goods-list-item img {
  height: 100px !important;
}
</style>