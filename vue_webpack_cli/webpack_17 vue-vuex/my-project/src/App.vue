<template>
  <div id="app">
    <h2>---app组件---</h2>
    <h3>{{$store.state.counter}}</h3>
    <h3>{{$store.state.info}}</h3>
    <button @click="updataInfo">vue.set()/vue.delete 响应式添加/删除</button>
    <mutations></mutations>
    <getters></getters>
    <actions></actions>
    <modules></modules>
  </div>
</template>

<script>
import Actions from './components/Actions.vue'
import Getters from './components/Getters.vue'
import Modules from './components/Modules.vue'
import Mutations from './components/Mutations.vue'

export default {
  data() {
    return {
      isop:true
    }
  },
  components: {
    Mutations,
    Getters,
    Actions,
    Modules
  },
  methods: {
    updataInfo(){
      this.$store.commit('updataInfo',this.isop);
      this.isop = !this.isop;
    }
  },
}
</script>

<style>

</style>
