<template>
  <div class="index">
    <el-container>
      <el-header>
        <h1>MMALL ADMIN</h1>
        <div>
          <span style="marginRight:20px">欢迎，{{ username }}</span>
          <span style="color:#337AB7" @click="logoutClick">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      username: sessionStorage.getItem("username")
    };
  },
  methods: {
    async logoutClick() {
      let { data: res } = await this.$axios.logout();
      console.log(res);
      if (res.status === 0) {
        this.$message.info("退出成功！");
        this.$router.push("/login");
      } else {
        alert("gagaga");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  & > .el-container {
    & > .el-header {
      background-color: #f8f8f8;
      color: #777777;
      line-height: 60px;
      border: 1px solid #e7e7e7;
      display: flex;
      justify-content: space-between;
      & > h1 {
        font-size: 24px;
      }
      & > div {
        & > span:nth-of-type(2) {
          cursor: pointer;
        }
      }
    }
    & > .el-container {
      & > .el-aside {
        background-color: #f8f8f8;
        color: #333;
        text-align: center;
        line-height: 200px;
      }

      & > .el-main {
        background-color: #fff;
        color: #333;
        text-align: center;
        min-height: 568px;
      }
    }
  }
}
</style>
