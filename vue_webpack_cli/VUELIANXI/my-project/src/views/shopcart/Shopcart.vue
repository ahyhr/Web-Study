.<template>
  <div>
    <h2>购物车</h2>
    <shopcart-vuex></shopcart-vuex>
  </div>
</template>

<script>
import ShopcartVuex from './ShopcartVuex.vue'
export default {
  name: 'Shopcart',
  components: { ShopcartVuex },
}
</script>

<style>

</style>