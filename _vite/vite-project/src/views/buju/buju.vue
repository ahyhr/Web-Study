<template>
  <div class="buju">
    <template v-for="item of 37" :key="item">
      <div class="item">{{ item }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const state = reactive({});
</script>

<style lang="scss" scoped>
.buju {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    $item-margin: 5px;
    $item-row-number: 4;
    width: calc((100% / $item-row-number) - (2 * $item-margin));
    height: 100px;
    margin: $item_margin;
    color: white;
    line-height: 100px;
    text-align: center;
    background: skyblue;
  }
}
</style>
