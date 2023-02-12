<template>
  <div class="goods-list-table">
    <el-table :data="goodsList" border stripe>
      <!-- 展开项 -->
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column
        min-width="300px"
        prop="goods_name"
        label="商品名称"
      ></el-table-column>
      <el-table-column
        width="110px"
        align="center"
        prop="goods_price"
        label="商品价格(元)"
      ></el-table-column>
      <el-table-column
        width="110px"
        align="center"
        prop="goods_weight"
        label="商品重量"
      ></el-table-column>
      <el-table-column width="170px" align="center" label="创建时间">
        <template v-slot="scope">
          {{ scope.row.add_time | addTimeFormat }}
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="操作">
        <template v-slot="scope">
          <!-- 按钮 -->
          <el-button-group>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editGoods(scope.row.goods_id)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteGoods(scope.row.goods_id)"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑按钮弹窗 -->
    <edit-goods-dialog ref="editGoodsDialogRef" :goods_id="goods_id"/>
  </div>
</template>

<script>
import editGoodsDialog from './editGoodsDialog'
import { deleteGoodsBuyId } from '@/network/goods'
// 时间格式插件
import Moment from 'moment'

export default {
  name: 'goodsListTable',
  data() {
    return {
      goods_id: null
    }
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {editGoodsDialog},
  methods: {
    // 编辑商品
    editGoods(goods_id) {
      this.goods_id = goods_id;
      // 打开弹窗
      this.$refs.editGoodsDialogRef.dialogVisible = true;
    },
    // 删除商品
    async deleteGoods(goods_id) {
      // 发送删除请求
      this.$confirm("是否删除该参数?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          // 发送删除参数请求
          const { data: res } = await deleteGoodsBuyId(goods_id);
          if (res.meta.status !== 200) return this.$message.error("删除失败!");
          this.$message.success("删除成功!");
          // 刷新列表
          this.$parent.$parent.getGoodsList();
        })
        .catch(() => {
          this.$message("已取消删除");
        });
        
    }
  },
  filters: {
    // 格式化时间
    addTimeFormat(time) {
      return Moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>

<style scoped>
.goods-list-table {
  margin: 20px 0;
}
</style>