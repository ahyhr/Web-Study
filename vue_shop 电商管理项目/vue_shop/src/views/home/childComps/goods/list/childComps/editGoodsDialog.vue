<template>
  <div class="edit-goods-dialog">
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogVisible"
      width="50%"
      @open="DialogOpen"
    >
      <!-- 表单 -->
      <el-form
        ref="editGoodsFrom"
        :model="editGoodsFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editGoodsFrom.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="goods_price">
          <el-input v-model="editGoodsFrom.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goods_number">
          <el-input v-model="editGoodsFrom.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="goods_weight">
          <el-input v-model="editGoodsFrom.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsButId, editGoods } from "@/network/goods";

export default {
  name: "editGoodsDialog",
  props: {
    goods_id: Number,
  },
  data() {
    // 验证表单输入数字
    const checkNumber = (rule, value, callback) => {
      if (/^\d+$/.test(value)) return callback();
      callback(new Error("输入格式错误"));
    };
    return {
      dialogVisible: false,
      //表单数据
      editGoodsFrom: {},
      // 表单验证规则
      FromRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 确认修改数据
    editGoods() {
      // 验证表单
      this.$refs.editGoodsFrom.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await editGoods(
          this.goods_id,
          this.editGoodsFrom
        );
        if (res.meta.status !== 200) return this.$message.error("修改失败");
        this.$message.success("修改成功");
        this.$parent.$parent.$parent.getGoodsList();
        this.dialogVisible = false;
      });
    },
    // 弹窗打开
    async DialogOpen() {
      // 根据id请求商品数据
      const { data: res } = await getGoodsButId(this.goods_id);
      if (res.meta.status !== 200)
        return this.$message.error("获取商品数据失败");
      this.editGoodsFrom = res.data;
    },
  },
};
</script>

<style scoped>
</style>