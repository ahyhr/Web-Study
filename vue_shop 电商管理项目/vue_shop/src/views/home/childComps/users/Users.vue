<template>
  <div class="users" ref="users">
    <!-- 面包屑 -->
    <breadcrumb :titles="['用户管理','用户列表']"/>

    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 第一行 搜索框/添加用户 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            @keyup.enter.native="getUserList"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userlist" border stripe max-height="430px">
        <el-table-column align="center" show-overflow-tooltip type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="email"
          label="邮箱"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="mobile"
          label="电话"
        ></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <!-- 开关 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="190px"
          align="center"
          header-align="left"
        >
          <template v-slot="scope">
            <el-button-group>
              <!-- 修改用户按钮 -->
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editUser(scope.row.id)"
              ></el-button>
              <!-- 删除用户按钮 -->
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.id)"
              ></el-button>
              <el-tooltip
                effect="light"
                content="分配角色"
                placement="top"
                enterable
              >
                <!-- 分配角色按钮 -->
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-setting"
                  @click="setRole(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[2, 5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改/添加用户对话框 -->
    <user-dialog ref="userDialog" :title="dialogTitle" :userId="userId" />
    <!-- 分配角色按钮对话框 -->
    <user-set-role-dialog ref="usersetRoleDialog" :userInfo="userInfo"/>

  </div>
</template>

<script>
import UserDialog from "./childComps/UserDialog.vue";
import Breadcrumb from '@/components/Breadcrumb.vue';
import userSetRoleDialog from './childComps/userSetRoleDialog';
import { getUserList, userStateChanged, DeleteUserBuyId } from "@/network/user";

export default {
  name: "Users",
  data() {
    return {
      //
      queryInfo: {
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示多少条数据
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      // 提示框标题
      dialogTitle: "",
      userId: null,
      // 当前用户角色
      userInfo: {}
    };

  },
  components: { Breadcrumb, UserDialog, userSetRoleDialog },
  created() {
    //获取用户列表
    this.getUserList();
  },
  methods: {
    //-----------操作用户----------
    //添加用户
    addUser() {
      this.dialogTitle = "添加用户";
      // 打开提示框
      this.$refs.userDialog.DialogVisible = true;
    },
    // 修改用户
    editUser(id) {
      this.userId = id;
      this.dialogTitle = "修改用户信息";
      this.$refs.userDialog.DialogVisible = true;
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("确定删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除用户
          this.DeleteUser(id);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    //分配角色
    setRole(userInfo) {
      this.$refs.usersetRoleDialog.DialogVisible = true;
      this.userInfo = userInfo;
    },


    //-----------修改状态-----------
    async userStateChange(userInfo) {
      // 发送修改用户状态请求
      const { data: res } = await userStateChanged(
        userInfo.id,
        userInfo.mg_state
      );
      //修改失败
      if (res.meta.status !== 200) {
        //状态不变
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error(res.meta.msg);
      }
      //修改成功
      this.$message.success(res.meta.msg);
    },
    //-----------操作页码-----------
    // 监听页码 改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      if (this.queryInfo.pagesize === newSize) return;
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },

    // --------请求数据-----------
    async getUserList() {
      const { data: res } = await getUserList(this.queryInfo);
      // 获取失败 return
      if (res.meta.status !== 200)
        return this.$message.error("用户列表获取失败");
      // 成功保存数据
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    async DeleteUser(id) {
      const { data: res } = await DeleteUserBuyId(id);
      if (res.meta.status !== 200) return this.$message.error("删除失败");
      // 判断是否为本页最后一行 解决删除本页最后一行时不刷新问题
      let num =(this.total / this.queryInfo.pagesize).toFixed(2).split('.');
      if (num[1] == 20 || num[1] == 50 || num[1] == 10 || num[1] == '06') this.queryInfo.pagenum--;
      this.getUserList();
    },
  },
};
</script>

<style lang="less" scoped>
.users {
  width: 100%;
  height: 100%;
}
.box-card {
  box-sizing: border-box;
  width: 100%;
  max-height: 95%;
  margin-top: 20px;
}
.el-table {
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>