.<template>
  <div>
    <tab-bar>
      <tab-bar-item path='/home' activeColor="blue">
        <div slot="tab-img">
          <img src="@/assets/img/tabber/home.svg" alt="" />
        </div>
        <div slot="tab-active-img">
          <img src="@/assets/img/tabber/home_active.svg" alt="" />
        </div>
        <div slot="tab-text"><div>首页</div></div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <div slot="tab-img">
          <img src="@/assets/img/tabber/category.svg" alt="" />
        </div>
        <div slot="tab-active-img">
          <img src="@/assets/img/tabber/category_active.svg" alt="" />
        </div>
        <div slot="tab-text"><div>分类</div></div>
      </tab-bar-item>
      <tab-bar-item path='/shopcart'>
        <div slot="tab-img">
          <img src="@/assets/img/tabber/shopcart.svg" alt="" />
        </div>
        <div slot="tab-active-img">
          <img src="@/assets/img/tabber/shopcart_active.svg" alt="" />
        </div>
        <div slot="tab-text"><div>购物车</div></div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <div slot="tab-img">
          <img src="@/assets/img/tabber/profile.svg" alt="" />
        </div>
        <div slot="tab-active-img">
          <img src="@/assets/img/tabber/profile_active.svg" alt="" />
        </div>
        <div slot="tab-text"><div>我的</div></div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "./tabbar/TabBar.vue";
import TabBarItem from "./tabbar/TabBarItem.vue";

export default {
  name: 'MainTabBar',
  components:{
    TabBar,
    TabBarItem,
  }
}
</script>

<style>

</style>