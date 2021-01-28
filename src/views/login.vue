<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item>
        <p>欢迎登录-MMALL管理系统</p>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "admin"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 异步函数写法
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return;
        let { data: res } = await this.$axios.login(this.ruleForm);
        if (res.status != 0) {
          this.$message.error(res.msg);
        } else {
          sessionStorage.setItem("username", res.data.username);
          this.$message.success(res.msg);
          this.$router.push("/index");
        }
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  & > .el-form {
    border: 1px solid #ddd;
    width: 370px;
    height: 225px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
    border-radius: 5px;
    p {
      color: #000;
      font-size: 26px;
      text-align: center;
    }
    .el-input,
    .el-button {
      width: 100%;
    }
  }
}
</style>
