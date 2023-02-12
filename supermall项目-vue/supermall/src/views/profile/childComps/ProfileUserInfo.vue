<template>
  <div class="user-info">
    <profile-user-info-item>
      <div slot="top">0.00</div>
      <div slot="top2">元</div>
      <div slot="bottom">我的余额</div>
    </profile-user-info-item>
    <profile-user-info-item>
      <div slot="top">0</div>
      <div slot="top2">个</div>
      <div slot="bottom">我的优惠</div>
    </profile-user-info-item>
    <profile-user-info-item>
      <div slot="top">0</div>
      <div slot="top2">分</div>
      <div slot="bottom">我的积分</div>
    </profile-user-info-item>
  </div>
</template>

<script>
import ProfileUserInfoItem from './ProfileUserInfoItem'

export default {
  name: 'ProfileUser',
  components: {
    ProfileUserInfoItem
  }
}
</script>

<style>
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-info :last-child {
  border: none;
}
</style>