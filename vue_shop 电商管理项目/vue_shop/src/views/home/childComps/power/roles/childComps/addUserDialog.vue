<template>
  <div class="add-user-dialog">
    <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%" @close="DialogClosed">
      <!-- 表单 -->
      <el-form
        ref="addUserFromRef"
        :model="addUserFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addUserFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addUserFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleUser } from '@/network/power'

export default {
  name: "addUserDialog",
  data() {
    return {
      dialogVisible: false,
      addUserFrom: {
        roleName: "测试1",
        roleDesc: "人员",
      },
      FromRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 添加用户按钮
    addUser() {
      // 验证表单
      this.$refs.addUserFromRef.validate(async (valid)=> {
        if (!valid) return;
        // 验证表单成功发送请求
        const { data:res } = await addRoleUser(this.addUserFrom);
        if (res.meta.status !== 201) return this.$message.error('创建失败');
        // 成功
        this.$message.success(res.meta.msg);
        // 刷新列表
        this.$parent.getRoleList();
        // 关闭弹窗
        this.dialogVisible = false;
      })
    },


    // 关闭弹窗
    DialogClosed() {
      // 清空表单
      this.$refs.addUserFromRef.resetFields();
    }
  },
};
</script>

<style>
</style>