.<template>
  <div class="goods-list">
    <goods-list-item
      :isCategory="isCategory"
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  components: { GoodsListItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    },
    isCategory: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
};
</script>

<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>