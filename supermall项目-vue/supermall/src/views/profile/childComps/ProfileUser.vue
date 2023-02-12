<template>
  <div class="user">
    <div class="img">
      <slot name="img">
        <img src="~assets/img/profile/avatar.svg" alt="" />
      </slot>
    </div>
    <div class="center">
      <div class="center-top">登录/注册</div>
      <div class="center-bottom">
        <div class="center-bottom-img"><img src="~assets/img/profile/phone.svg" alt="" /></div>
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="right">〉</div>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",
};
</script>

<style scoped>
.user {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: var(--color-tint);
  color: whitesmoke;
}
.img {
  width: 50px;
  height: 50px;
}
.img img{
  width: 100%;
  height: 100%;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  flex: 1;
  padding: 0 10px;
}
.center .center-top {
  margin-bottom: 5px;
  font-size: 14px;
}
.center .center-bottom {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.center .center-bottom .center-bottom-img {
  width: 16px;
  height: 16px;
  margin-left: -3px;
}
.center img {
  width: 100%;
  height: 100%;
}
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 40px;
}
</style>