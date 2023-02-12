.<template>
  <div>
    <h1 :class="{ active: !ist }">{{ message }}</h1>
    <p class="active">{{ message }}</p>
    <button @click="butClick">按钮</button>
    <!-- 使用子组件 -->
    <AppC/>
  </div>
</template>

<script>
//引入AppC模块
import AppC from './AppC.vue'

export default {
  name: "App",
  data() {
    return {
      message: "webpack",
      ist: true,
    };
  },
  methods: {
    butClick() {
      if (this.ist) {
        this.message = "......";
      } else {
        this.message = "webpack";
      }
      this.ist = !this.ist;
    },
  },//注册组件
  components:{
    AppC
  }
};
</script>

<style>
.active {
  color: white;
}
</style>