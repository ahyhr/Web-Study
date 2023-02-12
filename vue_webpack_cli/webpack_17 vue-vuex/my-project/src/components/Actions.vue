.<template>
  <div class="actions">
    <h2>---actions处理异步操作---</h2>
    <h3>{{$store.state.students}}</h3>
    <button @click="updataInfo">更新</button>
  </div>
</template>

<script>
export default {
 name: 'Actions',
 methods: {
   updataInfo(){
     let arr = {id:5,name:'异步',age:30};
     this.$store.dispatch('aupdataInfo',arr).then(res =>{
       console.log(res);
       
     })
   }
 },
}
</script>

<style>
 
</style>