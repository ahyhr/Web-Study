.<template>
  <div class="tabControl">
    <div class="tabItem" :class="{active:currentIndex==index}" @click="tabClick(index)" v-for="(item,index) of titles" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  },
}
</script>

<style>
  .tabControl{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tabItem{
    flex: 1;
  }
  .tabItem span{
    padding: 5px;
  }

  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>