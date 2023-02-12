//混入

//混入 返回顶部按钮
import BackTop from '@/components/common/backTop/BackTop.vue';
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    //返回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
  },
}