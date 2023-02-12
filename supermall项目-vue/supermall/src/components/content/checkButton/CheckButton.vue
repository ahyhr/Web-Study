<template>
  <div class="check-button" :class="{'check':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>  
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px !important;
  border-radius: 50%;
  border: 2px solid #eee !important;
  margin: 0;
}
.check-button img {
  width: 100%;
  height: 100%;
}
.check {
  background: var(--color-tint);
  border:none !important;
}
</style>