<template>
  <div class="user-info-item">
    <div class="item-top">
      <div class="top"><slot name="top">0.00</slot></div>
      <slot name="top2">元</slot>
    </div>
    <div class="item-bottom">
      <slot name="bottom">默认文字</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileUserInfoItem'
}
</script>

<style>
.user-info-item {
  flex: 1;
  border-right: 2px solid #eee;
  font-size: 13px;
  padding: 10px 0;
}
.item-top , .item-bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}
.item-top .top {
  font-size: 19px;
  color: orange;
  font-weight: 600;
}
</style>