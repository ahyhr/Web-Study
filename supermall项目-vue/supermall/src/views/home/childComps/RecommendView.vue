.<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 30px 0;
  border-bottom: 12px solid #eee;
}
.recommend div {
  flex: 1;
}
.recommend img {
  width: 65px;
}
</style>