<template>
  <div class="add-cate-dialog">
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%"
      @open="DialogOpen"
      @close="DialogClose"
    >
      <!-- 表单 -->
      <el-form
        ref="addCateFromRef"
        :model="addCateFrom"
        :rules="FromRules"
        label-width="90px"
        label-position="left"
        status-icon
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateFrom.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="roleDesc">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, addCategories } from "@/network/goods";

export default {
  name: "addCateDialog",
  data() {
    return {
      dialogVisible: false,
      addCateFrom: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
      },
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
      },
      // 父级列表
      parentCateList: [],
      // 级联选择器配置对象
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true,
      },
      // 选中项id数组
      selectedKeys: [],
    };
  },
  methods: {
    // 确定添加分类
    addCate(){
      // 验证表单
      this.$refs.addCateFromRef.validate(async valid => {
        if (!valid) return
        const {data:res} = await addCategories(this.addCateFrom);
        if (res.meta.status !== 201) return this.$message.error("创建分类失败");
        this.$message.success("创建成功");
        this.$parent.$parent.getCateList();
        this.dialogVisible = false;
      })
    },
    // 级联选择器变化
    handleChange() {
      // 是否选择分类
      if (this.selectedKeys.length > 0) {
        // 要添加的父分类 id 为数组最后一项
        this.addCateFrom.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        // 设置分类层级
        this.addCateFrom.cat_level = this.selectedKeys.length;
        return;
      } else {
        this.addCateFrom.cat_pid = 0;
        this.addCateFrom.cat_level = 0;
      }
    },

    // 弹窗打开
    async DialogOpen() {
      const { data: res } = await getCateList(2);
      if (res.meta.status !== 200)
        return this.$message.error("获取父级商品失败");
      this.parentCateList = res.data;
    },
    // 弹窗关闭
    DialogClose() {
      //清空当前数据
      this.$refs.addCateFromRef.resetFields();
      this.addCateFrom.cat_pid = 0;
      this.addCateFrom.cat_level = 0;
      this.selectedKeys = [];
    }
  },
};
</script>

<style scoped>
</style>