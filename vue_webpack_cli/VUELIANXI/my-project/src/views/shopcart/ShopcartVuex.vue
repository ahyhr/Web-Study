.<template>
  <div class="shopcart-vuex">
    <h2>{{$store.getters.quCount}}</h2>
  </div>
</template>

<script>
export default {
  name: 'ShopcartVuex'
}
</script>

<style>
 .shopcart-vuex{
   background: lightskyblue;
 }
</style>