.<template>
  <div>
    <p class="activec">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "AppC",
  data() {
    return {
      message: "我是App的子组件(AppC)",
    };
  },
};
</script>

<style>
.activec {
  color: blue;
}
</style>