.<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive"><slot name="tab-active-img"></slot></div>
    <div v-else><slot name="tab-img"></slot></div>
    <div :style="{color:styleColor}"><slot name="tab-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path: String,
    textColor:{
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path).catch(err => {});
    }
  },
  computed: {
    isActive(){
      return this.$route.path == this.path;
    },
    styleColor(){
      return this.isActive ? this.textColor : '';
    }
  },
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
}
.tab-bar-item img{
  width:24px;
  height: 24px;
  vertical-align: middle;
};
</style>