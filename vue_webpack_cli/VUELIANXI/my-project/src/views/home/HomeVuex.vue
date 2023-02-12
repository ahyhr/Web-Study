.<template>
  <div class="home-vuex">
    <h2>{{$store.state.count}}</h2>
    <button @click="changeCount(1,$event)" value="-">-</button>
    <button @click="changeCount(5,$event)" value="+">+</button>
  </div>
</template>

<script>
export default {
  name: 'HomeVuex',
  methods: {
    changeCount(count,event){
      this.$store.commit({
        type: 'changeCount',
        count,
        event
      });
    },
  },
}
</script>

<style>
 .home-vuex{
   background: lightblue;
 }
 .home-vuex button{
   margin-right: 5px;
   width: 20px;
 }
</style>