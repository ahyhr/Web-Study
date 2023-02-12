<template>
  <div class="welcome">
    <div class="box">
      <h1>宜购后台管理系统</h1>
      <p>180312004-应浩然</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
.welcome {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../../../assets/img/bg.jpg');
}
.box{
  text-align: center;
  color: rgba(76, 111, 150, 0.4);
  h1 {
    font-size: 35px;
  }
}
</style>