.<template>
<div>
  <h2>个人档案</h2>
  <h3>name:{{$route.query.name}}</h3>
  <h3>age:{{$route.query.age}}</h3>
  <h3>height:{{$route.query.height}}</h3>
</div>
</template>

<script>
export default {
  name: 'Profile',
  created() {
    console.log('档案创建');
  },
  destroyed() {
    console.log('档案销毁');
  },
}
</script>

<style>

</style>