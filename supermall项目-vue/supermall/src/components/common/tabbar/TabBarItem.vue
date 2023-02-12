.<template>
  <div class="tab-bar-item" @click="itemClick">
    <div>
      <div v-if="isActive"><slot name="item-img-active"></slot></div>
      <div v-else><slot name="item-img"></slot></div>
      <div :style="{color:changeColor}"><slot name="item-text"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
 name: 'TabBarItem',
 props:{
   link:String,
   textColor: {
     type: String,
     default: 'red'
   }
 },
 data() {
   return {
    //  isActive: false
   }
 },
 methods: {
   //点击 根据路由跳转页面
   itemClick(){
     this.$router.replace(this.link).catch(err => {});
   },
 },
 computed: {
   //根据路由判断显示状态
   isActive(){
    return this.$route.path == this.link;
   },
   //改变文字颜色
   changeColor(){
     return this.isActive ? this.textColor : '';
   }
 }
}
</script>

<style>
 .tab-bar-item{
   flex: 1;
   font-size: 14px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
 .tab-bar-item img{
   width: 24px;
   margin-bottom: 2px;
   vertical-align: middle;
   position: relative;
   left: 50%;
   transform: translateX(-12px);
 }
</style>