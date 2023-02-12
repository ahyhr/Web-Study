<template>
  <div class="edit-cate-dialog">
    <el-dialog
      title="编辑分类"
      :visible.sync="dialogVisible"
      width="50%"
      @open="DialogOpen"
    >
      <!-- 表单 -->
      <el-form
        ref="editCateFromRef"
        :model="editCateFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateFrom.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateBuyId, editCate } from '@/network/goods'

export default {
  name: 'editCateDialog',
  props: {
    currentCate: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      editCateFrom: {},
      FromRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      }
    }
  },
  methods: {
    // 确认修改分类
    editCate() {
      // 验证表单
      this.$refs.editCateFromRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const { data: res } = await editCate(this.editCateFrom.cat_id, this.editCateFrom.cat_name);
        if (res.meta.status !== 200) return this.$message.error("编辑失败");
        this.$message.success("编辑成功");
        // 更新界面
        this.$parent.$parent.$parent.getCateList();
        // 关闭弹窗
        this.dialogVisible = false;
      })
    },

    // 弹窗打开
    async DialogOpen() {
      // 获取当前分类数据
      const { data: res } = await getCateBuyId(this.currentCate.cat_id);
      if (res.meta.status !== 200) return this.$message.error("获取当前分类失败");
      this.editCateFrom = res.data;
    }
  },
}
</script>

<style scoped>
</style>