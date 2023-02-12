<template>
  <div class="tab-control">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tab-control :last-child :last-child {
  border: none;
}
</style>