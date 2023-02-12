<template>
  <div class="edit-param-dialog">
    <el-dialog
      title="编辑参数"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialog"
      @open="openDialog"
    >
      <!-- 表单 -->
      <el-form
        :model="editParamForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        status-icon
      >
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="editParamForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getParamBuyId, editParams } from '@/network/goods'
export default {
  name: "editParamDialog",
  props: {
    cateId: Number,
    attr_id:Number,
    activeName: String,
    title: String
  },
  data() {
    return {
      dialogVisible: false,
      editParamForm: {},
      rules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    editParams(){
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        //  发送添加参数请求
        const { data: res } = await editParams(
          this.cateId,
          this.attr_id,
          this.editParamForm.attr_name,
          this.activeName
        );
        if (res.meta.status !== 200) return this.$message.error("修改参数失败");
        this.$message.success("修改成功");
        // // 刷新列表
        this.$parent.getParamsList();
        this.dialogVisible = false;
      });
    },

    async openDialog() {
      // 查询参数
      const { data: res } = await getParamBuyId(this.cateId, this.attr_id, this.activeName);
      if (res.meta.status !== 200) return this.$message.error("获取参数失败");
      this.editParamForm = res.data;
      console.log(res);
    },
    closeDialog() {
      // 重置表单
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped>
</style>