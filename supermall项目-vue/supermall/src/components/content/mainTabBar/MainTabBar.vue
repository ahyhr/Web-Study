.<template>
  <div>
    <tab-bar>
        <tab-bar-item link="/home">
          <img slot="item-img-active" src="@/assets/img/tabber/home_active.svg" alt="">
          <img slot="item-img" src="@/assets/img/tabber/home.svg" alt="">
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item link="/category">
          <img slot="item-img-active" src="@/assets/img/tabber/category_active.svg" alt="">
          <img slot="item-img" src="@/assets/img/tabber/category.svg" alt="">
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item link="/shopcart">
          <img slot="item-img-active" src="@/assets/img/tabber/shopcart_active.svg" alt="">
          <img slot="item-img" src="@/assets/img/tabber/shopcart.svg" alt="">
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item link="/profile">
          <img slot="item-img-active" src="@/assets/img/tabber/profile_active.svg" alt="">
          <img slot="item-img" src="@/assets/img/tabber/profile.svg" alt="">
          <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar.vue'
import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'

export default {
  components: { TabBar, TabBarItem },
  name: 'MainTabBar',
  
}
</script>

<style>

</style>