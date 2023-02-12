.<template>
  <div>
    <h2>首页</h2>
    <home-vuex></home-vuex>
  </div>
</template>

<script>
import HomeVuex from "./HomeVuex.vue";
export default {
  name: "Home",
  components: { HomeVuex },
};
</script>

<style>
</style>