.<template>
  <div>
    <h2>我是用户</h2>
    <p>......</p>
    <h3>用户id:{{userid}}</h3>
  </div>
</template>

<script>
export default {
  computed:{
    userid(){
      //this.$route.params 为当前活跃的路由
      return this.$route.params.userid;
    }
  }
}
</script>

<style>

</style>