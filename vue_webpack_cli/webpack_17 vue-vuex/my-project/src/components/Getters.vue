.<template>
  <div>
    <h2>---getters变化后---</h2>
    <h4>平方</h4>
    <h3>{{$store.getters.powerCounter}}</h3>
    <h4>大于20岁</h4>
    <h3>{{$store.getters.more20Age}}</h3>
    <h4>大于20岁数量</h4>
    <h3>{{$store.getters.more20AgeLength}}</h3>
    <h4>大于(25)岁 可传参数</h4>
    <h2>{{$store.getters.moreAge(25)}}</h2>

  </div>
</template>

<script>
export default {
  name: "Getters",
};
</script>

<style>
</style>