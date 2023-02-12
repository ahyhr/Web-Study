<template>
  <!-- 表格 -->
  <div class="table">
    <el-table :data="roleList" border stripe>
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-row
            class="bdbottom"
            :class="index === 0 ? 'bdtop' : ''"
            v-for="(item1, index) in scope.row.children"
            :key="item1.id"
            type="flex"
            align="middle"
          >
            <!-- 渲染一级权限 -->
            <el-col :span="5">
              <el-tag closable @close="removeRightBuyId(scope.row, item1.id)">{{
                item1.authName
              }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <!-- 渲染二,三级权限 -->
            <el-col :span="19">
              <el-row
                :class="index === 0 ? '' : 'bdtop'"
                v-for="(item2, index) in item1.children"
                :key="item2.id"
                type="flex"
                align="middle"
              >
                <!-- 二级权限 -->
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="removeRightBuyId(scope.row, item2.id)"
                    >{{ item2.authName }}</el-tag
                  >
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="18">
                  <el-tag
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    @close="removeRightBuyId(scope.row, item3.id)"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column align="center" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button-group class="button-group">
            <!-- 修改用户按钮 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="setUser(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除用户按钮 -->
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
              >删除</el-button
            >
            <!-- 分配角色按钮 -->
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配权限按钮对话框 -->
    <set-right-dialog ref="setRightDialogRef" :currentRole="currentRole"/>
  </div>
</template>

<script>
import { deleteUser, removeRight } from "@/network/power";
import setRightDialog from './setRightDialog'

export default {
  name: "RolesTable",
  data() {
    return {
      currentRole: {}
    }
  },
  props: {
    roleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 根据id删除对应的权限
    removeRightBuyId(role, rightid) {
      this.$confirm("是否删除该权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 删除当前权限
          const { data: res } = await removeRight(role.id, rightid);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功!");
          // 刷新当前行
          role.children = res.data;
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    // 编辑用户按钮
    setUser(id) {
      this.$emit("setUser", id);
    },
    // 删除用户按钮
    async deleteUser(id) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除请求
          const { data: res } = await deleteUser(id);
          if (res.meta.status !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
          // 刷新列表
          this.$parent.$parent.getRoleList();
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    // 展示分配权限对话框
    showSetRightDialog(role) {
      this.currentRole = role;
      this.$refs.setRightDialogRef.dialogVisible = true;
    }
  },
  components: {
    setRightDialog
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>