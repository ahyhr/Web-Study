<template>
  <!-- 角色列表页面 -->
  <div class="roles">
    <breadcrumb :titles="['权限管理', '角色列表']" />

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-button type="primary" @click="addUserButton">添加角色</el-button>
      <!-- 列表 -->
      <roles-table :roleList="roleList" @setUser="setUser"/>
    </el-card>

    <!-- 添加用户按钮弹窗 -->
    <add-user-dialog ref="addUserDialogRef" />
    <!-- 编辑按钮弹窗 -->
    <edit-user-dialog ref="editUserDialogRef" :editUserid="editUserid" />
  </div>
</template>

<script>
import { getRoleList } from "@/network/power";
import Breadcrumb from "@/components/Breadcrumb.vue";
import RolesTable from "./childComps/RolesTable.vue";
import AddUserDialog from "./childComps/addUserDialog.vue";
import EditUserDialog from "./childComps/editUserDialog";


export default {
  name: "Roles",
  data() {
    return {
      roleList: [],
      editUserid: null
    };
  },
  components: {
    Breadcrumb,
    RolesTable,
    AddUserDialog,
    EditUserDialog
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 编辑用户
    setUser(id) {
      this.editUserid = id;
      this.$refs.editUserDialogRef.dialogVisible = true;
    },
    // 添加用户按钮
    addUserButton() {
      this.$refs.addUserDialogRef.dialogVisible = true;
    },

    //---------------网络请求--------------
    async getRoleList() {
      const { data: res } = await getRoleList();
      if (res.meta.status !== 200)
        return this.$message.error("获取权限列表失败");
      // 请求成功
      this.roleList = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
}
</style>