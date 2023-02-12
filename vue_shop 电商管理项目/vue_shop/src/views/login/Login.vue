<template>
  <div id="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="@/assets/img/tx.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <!-- 输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="bts">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/network/login";

export default {
  name: "Login",
  data() {
    return {
      //表单数据
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
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
      },
    };
  },
  methods: {
    //重置表单按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登录
    login() {
      //表单验证通过
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        //验证成功 发送登录请求
        const { data: res } = await login(this.loginForm).catch((err) => {
          this.$message.error("服务器连接失败");
        });

        //登录失败  return
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        //登录成功
        this.$message.success(res.meta.msg);
        // 存储token
        window.sessionStorage.setItem("token", res.data.token);
        // 跳转首页
        this.$router.replace("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: linear-gradient(to right,#fdfbfb,#ebedee);
  background: url("../../assets/img/bg.jpg") no-repeat;
  background-size: 100% auto;

  .login_box {
    width: 450px;
    height: 300px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }

  .avatar_box {
    width: 100px;
    height: 100px;
    overflow: hidden;
    position: relative;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
    background-color: #f7f7f736;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    border: 10px solid rgba(255, 255, 255, 0.397);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-form {
    transform: translateY(-25%);

    .bts {
      display: flex;
      justify-content: flex-end;
    }
  }
  .el-button {
    opacity: 0.8;
  }
}
</style>