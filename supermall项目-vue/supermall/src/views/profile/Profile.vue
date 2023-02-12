.<template>
  <div class="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    
    <profile-user>
      <img slot="img" src="~assets/img/profile/avatar.svg" alt="">
    </profile-user>

    <profile-user-info />

    <profile-tab-control class="tab-control1">
      <profile-tab-control-itme>
        <img slot="img" src="~assets/img/profile/message.svg" alt="">
        <div slot="text">我的消息</div>
      </profile-tab-control-itme>
      <profile-tab-control-itme>
        <img slot="img" src="~assets/img/profile/pointer.svg" alt="">
        <div slot="text">积分商城</div>
      </profile-tab-control-itme>
      <profile-tab-control-itme>
        <img slot="img" src="~assets/img/profile/vip.svg" alt="">
        <div slot="text">会员卡</div>
      </profile-tab-control-itme>
    </profile-tab-control>

    <profile-tab-control>
      <profile-tab-control-itme>
        <img slot="img" src="~assets/img/profile/cart.svg" alt="">
        <div slot="text">我的购物车</div>
      </profile-tab-control-itme>
      <profile-tab-control-itme>
        <img slot="img" src="~assets/img/profile/shopping.svg" alt="">
        <div slot="text">下载购物APP</div>
      </profile-tab-control-itme>
    </profile-tab-control>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import ProfileUser from './childComps/ProfileUser.vue'
import ProfileUserInfo from './childComps/ProfileUserInfo.vue'
import ProfileTabControl from './childComps/ProfileTabControl.vue'
import ProfileTabControlItme from './childComps/ProfileTabControlItme.vue'

export default {
  name: 'Profile',
  components: {
    NavBar,
    ProfileUser,
    ProfileUserInfo,
    ProfileTabControl,
    ProfileTabControlItme,
  }
}
</script>

<style scoped>
.nav-bar {
  color: whitesmoke;
  background: var(--color-tint);
}
.tab-control1 {
  border-top: 12px solid rgba(238, 238, 238, 0.5);
  border-bottom: 12px solid rgba(238, 238, 238, 0.5);;
}
</style>