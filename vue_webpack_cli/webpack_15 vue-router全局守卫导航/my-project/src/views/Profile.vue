.<template>
<div>
  <h2>个人档案</h2>
  <h3>name:{{$route.query.yhr.name}}</h3>
  <h3>age:{{$route.query.yhr.age}}</h3>
  <h3>height:{{$route.query.yhr.height}}</h3>

</div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style>

</style>