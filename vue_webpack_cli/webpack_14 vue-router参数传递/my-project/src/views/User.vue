.<template>
  <h2>用户id:{{userID}}</h2>
</template>

<script>
export default {
  computed:{
    userID(){
      return this.$route.params.userid;
    }
  }
}
</script>

<style>

</style>