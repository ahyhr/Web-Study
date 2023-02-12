<template>
  <div class="edit-order-dialog">
    <el-dialog
      title="修改地址"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <!-- 表单 -->
      <el-form
        ref="addressFrom"
        :model="addressFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="省市区/县">
          <el-cascader
            v-model="addressFrom.address1"
            :options="cityData"
            :props="{ expandTrigger: 'hover' }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressFrom.address2"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 城市数据
import cityData from "@/utils/city_data2017_element";

export default {
  name: "editOrderDialog",
  data() {
    return {
      dialogVisible: false,
      // 地址表单信息
      addressFrom: {
        address1: "",
        address2: "",
      },
      // 表单规则
      FromRules: {
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      cityData,
    };
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>