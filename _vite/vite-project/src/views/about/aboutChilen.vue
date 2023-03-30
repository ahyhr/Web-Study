<template>
  <div class="">
    {{ fName }}
    {{ state.obj.num }}
    <button @click="state.obj.num++">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject } from "vue";

const fName = inject("fName");
const state = reactive({
  obj: { num: 0 }
});
</script>

<style lang="scss" scoped></style>
