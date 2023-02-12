<template>
  <!-- 分配角色按钮弹框 -->
  <div class="user-set-role-dialog">
    <el-dialog
      title="分配角色"
      :visible.sync="DialogVisible"
      width="50%"
      @open="DialogOpen"
    >
      <p>当前的用户: {{ userInfo.username }}</p>
      <p>当前的角色: {{ userInfo.role_name }}</p>
      <!-- 选择器 -->
      <el-select class="select" v-model="selectedRoleId" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from "@/network/power";
import { SetUserRole } from '@/network/user'

export default {
  name: "userSetRoleDialog",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      DialogVisible: false,
      roleList: [],
      selectedRoleId: ''
    };
  },
  methods: {
    //点击按钮分配角色 
    async saveRoleInfo() {
      if (!this.selectedRoleId) return this.$message("请选择要分配的角色");
      // 发送请求
      const { data:res } = await SetUserRole(this.userInfo.id, this.selectedRoleId);
      if (res.meta.status !== 200) return this.$message.error("设置角色失败");
      this.$message.success("设置角色成功");
      // 刷新页面
      this.$parent.getUserList();
      this.DialogVisible = false;
    },

    // 弹窗打开
    async DialogOpen() {
      this.selectedRoleId = '';
      const { data: res } = await getRoleList();
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败");
      this.roleList = res.data;
    },
  },
};
</script>

<style scoped>
p {
  margin: 5px 0;
}
.select {
  margin-top: 15px;
}
</style>