<template>
  <div class="param-tag">
    <el-tag
      type="warning"
      effect="plain"
      v-for="(tag, index) in currentItem.attr_vals"
      :key="index"
      closable
      @close="handleClose(index)"
    >
      {{ tag }}
    </el-tag>

    <el-input
      v-if="currentItem.inputVisible"
      v-model="currentItem.inputValue"
      class="input-new-tag"
      ref="saveTagInput"
      size="small"
      clearable
      maxlength="200"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
import { editParams } from "@/network/goods";
export default {
  name: "ParamTag",
  props: {
    currentItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    //关闭 Tag
    handleClose(index) {
      // 删除当前tag
      this.currentItem.attr_vals.splice(index, 1);
      // 提交保存AttrVals
      this.saveAttrVals().then(status=>{
        if (status !== 200) return this.$message.error("删除失败!");
        this.$message.success("删除成功");
      });
    },
    // 文本框失去焦点或按下回车键
    async handleInputConfirm() {
      if (!this.currentItem.inputValue)
        return (this.currentItem.inputVisible = false);
      // 添加输入的参数
      this.currentItem.attr_vals.push(this.currentItem.inputValue.trim());
      this.currentItem.inputValue = "";
      // 提交报错添加的AttrVals参数
      this.saveAttrVals().then(status=>{
        if (status !== 200) return this.$message.error("添加失败!");
        this.$message.success("添加成功");
      });
      // 切换为tag显示状态
      this.currentItem.inputVisible = false;
    },
    // + New Tag 点击
    showInput() {
      // 显示文本框
      this.currentItem.inputVisible = true;
    },

    // -------网络请求------
    // 提交attr_vals 保存到数据库
    async saveAttrVals() {
      const { data: res } = await editParams(
        this.currentItem.cat_id,
        this.currentItem.attr_id,
        this.currentItem.attr_name,
        this.currentItem.attr_sel,
        this.currentItem.attr_vals.join(",")
      );
    return res.meta.status;
    },
  },
};
</script>

<style scoped>
.input-new-tag {
  width: 120px;
}
.el-tag,
.input-new-tag,
.el-button {
  margin: 5px;
}
</style>