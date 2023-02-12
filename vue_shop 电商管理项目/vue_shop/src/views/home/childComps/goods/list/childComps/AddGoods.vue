<template>
  <div class="add-goods">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 提示 -->
      <el-alert title="添加商品" type="info" show-icon center> </el-alert>

      <!-- 步骤条 -->
      <el-steps
        class="steps"
        finish-status="success"
        :active="activeIndex"
        simple
      >
        <el-step
          v-for="(title, index) in titleList"
          :key="index"
          :title="title"
        ></el-step>
      </el-steps>

      <!-- 表单 -->
      <el-form
        :model="addForm"
        :rules="addFormrules"
        ref="addFormRef"
        label-position="top"
      >
        <!-- 标签页 -->
        <el-tabs
          tab-position="left"
          @tab-click="tabClick"
          :before-leave="beforeLeave"
        >
          <el-tab-pane
            v-for="(title, index) in titleList.slice(0, 5)"
            :key="index"
            :label="title"
          >
            <!-- 基本信息 -->
            <div v-if="index == 0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="addForm.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="addForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat">
                <!--  级联选择器 -->
                <el-cascader
                  v-model="selectedCateKeys"
                  :options="cateList"
                  :props="props"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </el-form-item>
            </div>
            <!-- 商品参数 -->
            <div v-if="index == 1">
              <el-form-item
                v-for="item in manyTableData"
                :key="item.attr_id"
                :label="item.attr_name"
              >
                <!-- 复选框 -->
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox
                    v-for="(item, index) in item.attr_vals"
                    :label="item"
                    :key="index"
                    border
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <!-- 商品属性 -->
            <div v-if="index == 2">
              <el-form-item
                v-for="item in onlyTableData"
                :key="item.attr_id"
                :label="item.attr_name"
              >
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </div>
            <!-- 商品图片 -->
            <div v-if="index == 3">
              <!-- 上传图片
                  action 后台图片API地址 -->
              <el-upload
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                :headers="headersObj"
                :on-success="onSuccess"
                :on-error="onError"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <!-- 商品内容 -->
            <div v-if="index == 4">
              <quill-editor
                ref="myQuillEditor"
                v-model="addForm.goods_introduce"
                @blur="onEditorBlur($event)"
              />
              <el-button type="primary" class="addButon" @click="addButClick"
                >添加商品</el-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 预览图片弹窗 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img class="dialogImg" :src="PreviewPath" />
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, getParamsList, addGoods } from "@/network/goods";

export default {
  name: "AddGoods",
  data() {
    // 验证表单输入数字
    const checkNumber = (rule, value, callback) => {
      if (/^\d+$/.test(value)) return callback();
      callback(new Error("输入格式错误"));
    };
    return {
      // 进度条索引
      activeIndex: 0,
      titleList: [
        "基本信息",
        "商品参数",
        "商品属性",
        "商品图片",
        "商品内容",
        "完成",
      ],
      // 表单数据
      addForm: {
        goods_name: "",
        goods_price: null,
        goods_number: null,
        goods_weight: null,
        // 分类列表key
        goods_cat: "",
        // 上传的图片临时路径 数组
        pics: [],
        // 商品内容介绍
        goods_introduce: "",
        // 商品参数
        attrs: [],
      },
      // 表单验证规则
      addFormrules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      // 商品分类数据
      cateList: [],
      // 级联选择器选中项数组
      selectedCateKeys: [],
      // 级联选择器配置对象
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 商品参数数据
      manyTableData: [],
      // 商品属性数据
      onlyTableData: [],
      //上传图片请求头
      headersObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      // 预览图片路径
      PreviewPath: "",
      dialogVisible: false,
    };
  },
  async created() {
    // 请求商品分类数据
    this.getCateList();
  },
  methods: {
    // 添加商品按钮
    addButClick() {
      // 验证表单
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 处理动态参数数据
        this.manyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(","),
          };
          this.addForm.attrs.push(newInfo);
        });
        // 处理静态参数数据
        this.onlyTableData.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          };
          this.addForm.attrs.push(newInfo);
        });
        // 发送添加商品请求
        const {data:res} = await addGoods(this.addForm);
        if (res.meta.status !== 201) return this.$message.error("添加商品失败");
        this.$message.success("添加商品成功");
        this.$router.push('/goods')
        console.log(res);
      });
    },
    // 联级选择器变化
    handleChange() {
      // 选择不是三级菜单 清空
      if (this.selectedCateKeys.length != 3) {
        this.selectedCateKeys = [];
      }
      this.addForm.goods_cat = this.selectedCateKeys.join(",");
    },
    // 标签点击
    tabClick(event) {
      if (this.selectedCateKeys.length != 3) return;
      //获取商品参数数据
      if (event.index == 1) {
        this.getParamsList("many");
      }
      //获取商品属性数据
      if (event.index == 2) this.getParamsList("only");
      // 和步骤条保持联动
      this.activeIndex = parseInt(event.index);
    },
    // 标签离开时
    beforeLeave(activeName, oldActiveName) {
      // 没有选择商品分类
      if (oldActiveName == 0 && this.selectedCateKeys.length != 3) {
        this.$message.warning("请先选择商品分类");
        return false;
      }
    },
    // 处理图片预览
    handlePreview(file) {
      // 保存预览图片路径
      this.PreviewPath = file.response.data.url;
      // 打开弹窗
      this.dialogVisible = true;
    },
    // 处理图片移除
    handleRemove(file) {
      // 获取要删除的图片路径
      const filePath = file.response.data.tmp_path;
      // 获取所在数组索引
      const i = this.addForm.pics.findIndex((x) => {
        x.pic === filePath;
      });
      // 在数组中删除
      this.addForm.pics.splice(i, 1);
      this.$message.success("移除成功");
    },
    //图片上传成功
    onSuccess(response) {
      // 保存上传的图片临时路径
      const picInfo = { pic: response.data.tmp_path };
      this.addForm.pics.push(picInfo);
      this.$message.success("上传成功");
    },
    // 图片上传失败
    onError(err) {
      this.$message.error("上传失败!");
    },
    // 富文本框失去焦点
    onEditorBlur() {
      this.activeIndex = 5
    },
    // ---------网络请求--------
    // 请求商品分类数据
    async getCateList() {
      const { data: res } = await getCateList();
      if (res.meta.status !== 200)
        return this.$message.error("获取商品列表失败");
      this.cateList = res.data;
    },
    // 获取参数列表
    async getParamsList(sel) {
      const { data: res } = await getParamsList(this.cateId, sel);
      if (res.meta.status !== 200)
        return this.$message.error("获取参数数据失败");
      // 分别储存数据
      if (sel === "many") {
        // attr_vals 转为数组
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals.length
            ? item.attr_vals.split(",")
            : [];
        });
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
  },
  computed: {
    // 分类id
    cateId() {
      return this.selectedCateKeys.length === 3
        ? this.selectedCateKeys[2]
        : null;
    },
  },
};
</script>

<style scoped>
.box-card,
.el-tabs {
  margin-top: 20px;
}
.steps {
  margin-top: 20px;
  background-color: #f4f4f580;
}

.el-tabs /deep/.el-tabs__item {
  padding: 0 20px 0 0;
}
.el-checkbox {
  margin: 0 5px !important;
}
.dialogImg {
  width: 100%;
}
.quill-editor /deep/.ql-editor {
  min-height: 300px;
}
.addButon {
  margin-top: 15px;
}
</style>