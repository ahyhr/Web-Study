<template>
  <div class="add-param-dialog">
    <el-dialog
      :title="'添加' + title"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialog"
    >
      <!-- 表单 -->
      <el-form
        :model="addParamForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        status-icon
      >
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="addParamForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addParams } from "@/network/goods";

export default {
  name: "addParamDialog",
  props: {
    title: String,
    cateId: Number,
    activeName: String,
  },
  data() {
    return {
      dialogVisible: false,
      addParamForm: {
        attr_name: "",
      },
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
    };
  },
  methods: {
    // 确认添加参数按钮
    addParams() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        //  发送添加参数请求
        const { data: res } = await addParams(
          this.cateId,
          this.addParamForm.attr_name,
          this.activeName
        );
        if (res.meta.status !== 201) return this.$message.error("添加参数失败");
        this.$message.success("添加参数成功");
        // 刷新列表
        this.$parent.getParamsList();
        this.dialogVisible = false;
        console.log(res);
      });
    },
    // 弹窗关闭
    closeDialog() {
      // 重置表单
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped>
</style>