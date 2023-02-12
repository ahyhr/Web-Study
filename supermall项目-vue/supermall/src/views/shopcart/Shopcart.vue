.<template>
  <div class="shopcart">
    <nav-bar class="shopcart-navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

//从vuex中倒入mapGetters
import { mapGetters } from 'vuex';

export default {
  name: 'Shopcart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //mapGetters 辅助函数 将vuex store中的getter映射到计算属性
    //两种语法
    //1
    ...mapGetters(['cartLength'])
    //2.可以取别名
    // ...mapGetters({
    //   length: 'cartLength'
    // })
  }

}
</script>

<style scoped>
.shopcart {
  height: 100vh;
}
.shopcart-navbar {
  background: var(--color-tint);
  color: rgb(248, 247, 247);
}
</style>