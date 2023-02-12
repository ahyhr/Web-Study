.<template>
  <div class="tab-bar-item" @click="itemClick">
    <div>
      <div v-if="isActive"><slot name="tab-active-img"></slot></div>
      <div v-else><slot name="tab-img"></slot></div>
      <div :style="{ color:activeStyle}"><slot name="tab-text"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: true,
    };
  },
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => {});
    },
  },
  computed: {
    isActive(){
      //indexOf() 包含
      return this.$route.path.indexOf(this.path) !== -1;
      // return this.$route.path == this.path;
    },
    activeStyle(){
      return this.isActive ? this.activeColor : '';
    }
  }
};
</script>

<style>
#tab-bar .tab-bar-item {
  flex: 1;
  height: 1.1rem;
  text-align: center;
  font-size: 0.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#tab-bar .tab-bar-item img {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
}

</style>