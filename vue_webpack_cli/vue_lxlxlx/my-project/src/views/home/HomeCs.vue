.<template>
  <div>
    <h2>{{$store.state.count}}</h2>
    <button @click="sub">-</button>
    <button @click="add">+</button>
  </div>
</template>

<script>
export default {
  name: 'HomeCs',
  methods: {
    add(){
      //commit 提交
      this.$store.commit('increment');
    },
    sub(){
      this.$store.commit('decrement');
    }
  },
}
</script>

<style>

</style>