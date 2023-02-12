<template>
  <div class="tab-control-item">
    <div class="img"><slot name="img"><img src="~assets/img/profile/message.svg" alt=""></slot></div>
    <div class="text"><slot name="text">我的消息</slot></div>
  </div>
</template>

<script>
export default {
  name: 'ProfileTabControl'
}
</script>

<style scoped>
.tab-control-item {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 38px;
}
.tab-control-item div {
  height: 100%;
  display: flex;
  align-items: center;
}
.tab-control-item .img {
  margin-left: 15px;
}
.tab-control-item img {
  width: 20px;
  height: 20px;
}
.text {
  flex: 1;
  font-size: 13.5px;
  margin-left: 10px;
  border-bottom: 2px solid #eee;
}
</style>