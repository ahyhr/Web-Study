<template>
  <div class="edit-user-dialog">
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogVisible"
      width="50%"
      @close="DialogClosed"
      @open="DialogOpen"
    >
      <!-- 表单 -->
      <el-form
        ref="editUserDialog"
        :model="editUserFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editUserFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editUserFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserBuyId, editUserBuyId } from "@/network/power";

export default {
  name: "editUserDialog",
  props: {
    editUserid: Number,
  },
  data() {
    return {
      dialogVisible: false,
      editUserFrom: {
        roleName: "",
        roleDesc: "",
      },
      FromRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 编辑用户
    editUser() {
      this.$refs.editUserDialog.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await editUserBuyId(
          this.editUserid,
          this.editUserFrom.roleName,
          this.editUserFrom.roleDesc
        );
        if (res.meta.status !== 200) return this.$message.error("修改失败");
        this.$message.success("修改成功");
        this.$parent.getRoleList();
        this.dialogVisible = false;
      });
    },
    //打开弹窗
    async DialogOpen() {
      const { data: res } = await getUserBuyId(this.editUserid);
      if (res.meta.status !== 200) return this.$message.error("查询角色失败");
      this.editUserFrom = res.data;
    },
    // 关闭弹窗
    DialogClosed() {},
  },
};
</script>

<style>
</style>