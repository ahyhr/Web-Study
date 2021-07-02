<template>
  <div class="hello">
    <h2>---使用mutations方法修改---</h2>
    <h3>{{ $store.state.MutationsMod.counter }}</h3>
    <button @click="sub">-</button>
    <button @click="add">+</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <h3>{{$store.state.MutationsMod.students}}</h3>
    <button @click="addStudent">添加学生</button>
  </div>
</template>

<script>
import { ADDD, SUBB } from "../store/mutations-types";

export default {
  name: "Mutations",
  methods: {
    add() {
      this.$store.commit(ADDD);
    },
    sub() {
      this.$store.commit(SUBB);
    },
    addCount(count) {
      //payload 负载
      this.$store.commit("incrementCounts", count);
    },
    addStudent() {
      const stu = { id: 5, name: "小紫", age: 30 };
      //提交方式  为提交整个对象
      this.$store.commit({
        type: "addStudent",
        stu,
      });
    },
  },
};
</script>


<style>
</style>
