<template>
  <div class="index">
    <el-container>
      <el-header>
        <h1 @click="home">MMALL ADMIN</h1>
        <div>
          <span style="marginRight:20px">欢迎，{{ username }}</span>
          <span style="color:#337AB7" @click="logoutClick">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <ul>
            <li>
              <p class="shou" @click="home">
                <i class="el-icon-platform-eleme"></i>Home
              </p>
            </li>
            <li>
              <p><i class="el-icon-data-analysis"></i>商品</p>
              <p class="er shou" @click="product">
                商品管理
              </p>
              <p class="er shou" @click="category">品类管理</p>
            </li>
            <li>
              <p><i class="el-icon-thumb"></i>订单</p>
              <p class="er shou" @click="order">订单管理</p>
            </li>
          </ul>
        </el-aside>
        <el-main><router-view></router-view></el-main>
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
    // 去首页
    home() {
      this.$router.push("/home");
    },
    // 商品管理
    product() {
      this.$router.push("/product");
    },
    // 品类管理
    category() {
      this.$router.push("/category");
    },
    // 订单管理
    order() {
      this.$router.push("/order");
    },
    // 退出
    async logoutClick() {
      let { data: res } = await this.$axios.logout();
      console.log(res);
      if (res.status === 0) {
        sessionStorage.clear();
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
        cursor: pointer;
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
        & > ul {
          & > li {
            border-bottom: 1px solid #e7e7e7;
            color: #337ac6;
            font-size: 14px;
            & > p {
              padding: 10px 15px;
            }
            & > p:hover {
              background: #eeeeee;
            }
            & > p.er {
              padding-left: 38px;
            }
            & > p.shou {
              cursor: pointer;
            }
          }
        }
      }

      & > .el-main {
        background-color: #fff;
        color: #333;
        min-height: 568px;
      }
    }
  }
}
</style>
