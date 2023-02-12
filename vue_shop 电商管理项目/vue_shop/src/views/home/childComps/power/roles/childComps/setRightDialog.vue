<template>
  <div class="set-right-dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @open="dialogOpen"
      @close="dialogClose"
    >
      <!-- 树形控件 -->
      <el-tree
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defkeys"
        ref="treeRef"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRightsList, allotRights } from "@/network/power";

export default {
  name: "setRightDialog",
  props: {
    // 当前角色数据
    currentRole: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      // 所有权限数据
      rightsList: [],
      // 树形控件属性绑定对象
      treeProps: {
        children: "children",
        label: "authName",
      },
      // 默认选择的权限id
      defkeys: []
    };
  },
  methods: {
    // 分配权限按钮
    async allotRights() {
      // 获取当前半选中,和选中id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      // , 分割
      const idStr = keys.join(',');
      // 请求数据
      const { data:res } = await allotRights(this.currentRole.id, idStr);
      if (res.meta.status !== 200) return this.$message.error("分配权限失败");
      this.$message.success("分配成功");
      this.$parent.$parent.$parent.getRoleList();
      this.dialogVisible = false;
    },

    // 弹窗打开
    async dialogOpen() {
      // 获取权限列表
      const { data: res } = await getRightsList("tree");
      if (res.meta.status !== 200) return this.$message.error("获取权限列表失败");
      this.rightsList = res.data;
      // 勾选当前已经有的权限
      this.getLeafKeys(this.currentRole,this.defkeys);
    },
    // 弹窗关闭时清空  默认选中数组
    dialogClose(){
      this.defkeys = [];
    },


    // 通过递归获取当前角色 所有三级权限的id, 保存到defkeys数组中
    getLeafKeys(node, arr) {
      // 不包含children 为三级节点
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
  },
};
</script>

<style scoped>
</style>