<template>
  <div class="user-dialog">
    <el-dialog
      :title="title"
      :visible.sync="DialogVisible"
      width="50%"
      @close="DialogClosed"
      @open="DialogOpen"
    >
      <!-- 内容 -->
      <el-form
        :model="title === '添加用户' ? addFrom : editFrom"
        :rules="FromRules"
        ref="FromRef"
        label-width="70px"
        label-position="left"
        status-icon
      >
        <!--添加用户按钮显示表单  -->
        <div v-if="title === '添加用户'">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addFrom.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addFrom.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addFrom.mobile"></el-input>
          </el-form-item>
        </div>
        <!--修改用户信息按钮显示表单  -->
        <div v-else>
          <el-form-item  label="用户名" prop="username">
            <el-input disabled v-model="editFrom.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editFrom.mobile"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入验证规则
import { isEmail, isMobile } from "@/utils/validate";
import { addUser, getUserBuyId, editUserBuyId } from "@/network/user";

export default {
  name: "UserDialog",
  props: {
    title: {
      type: String,
      default: "默认值",
    },
    userId: Number,
  },
  data() {
    // 验证邮箱函数
    const checkEmail = (rule, value, callback) => {
      if (isEmail(value)) return callback();
      callback(new Error("邮箱格式错误"));
    };
    const checkMobile = (rule, value, callback) => {
      if (isMobile(value)) return callback();
      callback(new Error("电话号码错误"));
    };
    return {
      // 对话框的显示和隐藏
      DialogVisible: false,
      // 表单数据
      addFrom: {
        username: "abc",
        password: "123456",
        email: "123456@qq.com",
        mobile: "18766663311",
      },
      //验证规则
      FromRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },

      // 修改用户信息
      editFrom: {},
    };
  },
  methods: {
    //设置用户 确认按钮
    setUser() {
      // 验证表单是否通过
      this.$refs.FromRef.validate(async (valid) => {
        if (!valid) return;
        if (this.title === "添加用户") {
          console.log("添加用户");
          //发送添加用户请求
          const { data: res } = await addUser(this.addFrom);
          // 请求失败
          if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
          //请求成功
          this.$message.success(res.meta.msg);
          //刷新页面
          this.$parent.getUserList();
          // 关闭对话框
          this.DialogVisible = false;
        } else {
          console.log("修改用户信息");
          const { data: res } = await editUserBuyId(
            this.editFrom.id,
            this.editFrom.email,
            this.editFrom.mobile
          );
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
          //修改成功
          this.$message.success(res.meta.msg);
          this.$parent.getUserList();
          this.DialogVisible = false;
        }
      });
    },
    //对话框关闭
    DialogClosed() {
      this.$refs.FromRef.resetFields();
    },
    //对话框打开
    async DialogOpen() {
      if (this.title === "添加用户") return;
      // 根据ID 用户数据
      const { data: res } = await getUserBuyId(this.userId);
      if (res.meta.status !== 200)
        return this.$message.error("查询用户信息失败");
      // 成功
      // 保存用户数据
      this.editFrom = res.data;
    },
  },
};
</script>

<style>
</style>