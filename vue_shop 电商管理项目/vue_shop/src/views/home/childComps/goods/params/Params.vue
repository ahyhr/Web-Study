<template>
  <!-- 参数列表页面 -->
  <div class="params">
    <!-- 面包屑 -->
    <breadcrumb :titles="['商品管理', '参数列表']" />
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-alert
        title="注意: 只允许为三级分类设置相关参数!"
        type="warning"
        show-icon
      >
      </el-alert>

      <!--  级联选择器 -->
      <el-row class="cat_opt">
        <el-col :span="24">
          选择商品分类:
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="props"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- 标签页 -->
      <el-tabs
        class="tabs"
        v-model="activeName"
        @tab-click="tabClick"
        type="card"
      >
        <el-tab-pane label="动态参数" name="many">
          <el-button
            size="small"
            type="primary"
            @click="addParam"
            :disabled="buttonDisabled"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <many-table
            :manyTableData="manyTableData"
            @editManyTableParams="editTableParams"
            @deleteManyTableParams="deleteTableParams"
          />
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            size="small"
            type="primary"
            @click="addParam"
            :disabled="buttonDisabled"
            >添加参数</el-button
          >
          <!-- 静态属性表格  -->
          <only-table
            :onlyTableData="onlyTableData"
            @editonlyTableParams="editTableParams"
            @deleteonlyTableParams="deleteTableParams"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数按钮弹窗 -->
    <add-param-dialog
      ref="addParamDialogRef"
      :title="addParamTitle"
      :cateId="cateId"
      :activeName="activeName"
    />
    <!-- 编辑参数按钮弹窗 -->
    <edit-param-dialog
      ref="editParamDialogRef"
      :title="addParamTitle"
      :cateId="cateId"
      :attr_id="attr_id"
      :activeName="activeName"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import ManyTable from "./childComps/ManyTable";
import OnlyTable from "./childComps/OnlyTable";
import addParamDialog from "./childComps/addParamDialog";
import editParamDialog from "./childComps/editParamDialog";
import { getCateList, getParamsList, deleteParams } from "@/network/goods";

export default {
  name: "Params",
  data() {
    return {
      // 商品分类列表
      cateList: [],
      // 级联选择器配置对象
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择器选中项数组
      selectedCateKeys: [],
      // 当前活跃标签页
      activeName: "many",
      oldActiveName: "",
      // 动态参数表格数据
      manyTableData: [],
      // 静态属性表格数据
      onlyTableData: [],
      buttonDisabled: true,
      // 当前参数id
      attr_id: null,
    };
  },
  components: {
    Breadcrumb,
    ManyTable,
    OnlyTable,
    addParamDialog,
    editParamDialog,
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 删除参数按钮
    deleteTableParams(attr_id) {
      console.log(attr_id);
      this.$confirm("是否删除该参数?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送删除参数请求
          this.deleteParams(attr_id);
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message("已取消删除");
        });
    },
    // 修改参数按钮
    editTableParams(attr_id) {
      this.attr_id = attr_id;
      this.$refs.editParamDialogRef.dialogVisible = true;
      console.log(attr_id);
    },
    // 添加参数按钮
    addParam() {
      this.$refs.addParamDialogRef.dialogVisible = true;
    },
    // 标签页点击
    tabClick() {
      // 标签页与当前相同 return
      if (this.oldActiveName === this.activeName) return;
      // 请求参数列表数据
      this.getParamsList();
      this.oldActiveName = this.activeName;
    },
    // 级联选择器变化
    handleChange() {
      // 选z中不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        // 清空当前选择
        this.selectedCateKeys = [];
        this.manyTableData = [];
        this.onlyTableData = [];
        this.buttonDisabled = true;
        return;
      }
      // 请求参数列表数据
      this.getParamsList();
      this.buttonDisabled = false;
    },

    // -------网络请求-------
    // 获取商品分类列表
    async getCateList() {
      const { data: res } = await getCateList();
      if (res.meta.status !== 200)
        return this.$message.error("获取商品列表失败");
      this.cateList = res.data;
    },
    // 获取参数列表
    async getParamsList() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        return;
      }
      const { data: res } = await getParamsList(this.cateId, this.activeName);
      if (res.meta.status !== 200)
        return this.$message.error("获取参数列表失败");
      // attr_vals 字符串转为数组用于遍历
      for (const item of res.data) {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
        // 为每个item添加单独控制+ New Tag 的 显示控制和值
        item.inputVisible = false; 
        item.inputValue = '';
      }
      // 判断数据储存位置
      if (this.activeName === "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    // 删除参数
    async deleteParams(attr_id) {
      const { data: res } = await deleteParams(this.cateId, attr_id);
      if (res.meta.status !== 200) return this.$message.error("删除失败");
      // 刷新列表
      this.getParamsList();
    },
  },
  computed: {
    // 获取级联选择器选择的分类id
    cateId() {
      return this.selectedCateKeys.length === 3
        ? this.selectedCateKeys[2]
        : null;
    },
    //添加参数弹窗标题
    addParamTitle() {
      return this.activeName === "many" ? "动态参数" : "静态属性";
    },
  },
};
</script>

<style scoped>
.box-card,
.cat_opt,
.tabs {
  margin-top: 20px;
}
.el-cascader {
  width: 20%;
}
</style>