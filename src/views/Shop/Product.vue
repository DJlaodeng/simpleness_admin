<template>
  <div class="product">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 搜索查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region">
          <el-option label="按商品ID查询" value="按商品ID查询"></el-option>
          <el-option label="按商品名称查询" value="按商品名称查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.search" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onInquire">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="150"> </el-table-column>
      <el-table-column prop="name" label="信息">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
          <p>{{ scope.row.subtitle }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">
            <span>在售</span>
            <el-button
              class="mini"
              size="mini"
              type="warning"
              @click="statusClick(scope.row.id)"
              >下架</el-button
            >
          </div>
          <div v-if="scope.row.status == 2">
            <span>已下架</span>
            <el-button
              class="mini"
              size="mini"
              type="warning"
              @click="statusClicks(scope.row.id)"
              >上架</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="lookClick(scope.row.id)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="editClick(scope.row.id)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pageClick"
    >
    </el-pagination>
  </div>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb";
export default {
  name: "Product",
  components: { Breadcrumb },
  data() {
    return {
      formInline: {
        search: "",
        region: "按商品ID查询"
      },
      tableData: [],
      pageNum: 1,
      total: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 表格数据
    async getTableData() {
      let { data: res } = await this.$axios.product({ pageNum: this.pageNum });
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    // 查询
    onInquire() {
      console.log("submit!");
      if (this.formInline.region == "按商品ID查询") {
        console.log("按商品ID查询");
        this.$axios
          .search({
            listType: "search",
            pageNum: this.pageNum,
            productId: this.formInline.search
          })
          .then(res => {
            console.log(res);
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          });
      } else {
        console.log("按商品名称查询");
        this.$axios
          .search({
            listType: "search",
            pageNum: this.pageNum,
            productName: this.formInline.search
          })
          .then(res => {
            console.log(res);
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          });
      }
    },
    // 查看
    lookClick(id) {
      console.log(id);
      this.$store.commit("getLookId", id);
      this.$router.push("/detail");
    },
    // 编辑
    editClick(id) {
      console.log(id);
      this.$store.commit("getEditId", id);
      this.$router.push("/edit");
    },
    // 分页
    pageClick(q) {
      console.log(q);
      this.pageNum = q;
      this.onInquire();
    },
    // 下架按钮
    statusClick(id) {
      console.log(id);
      this.$confirm("确认要下架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改产品销售状态成功!"
          });
          this.$axios
            .status({
              productId: id,
              status: 2
            })
            .then(res => {
              console.log(res);
              this.onInquire();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 上架按钮
    statusClicks(id) {
      console.log(id);
      this.$confirm("确认要上架该商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改产品销售状态成功!"
          });
          this.$axios
            .status({
              productId: id,
              status: 1
            })
            .then(res => {
              console.log(res);
              this.onInquire();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  .mini {
    padding: 5px;
    margin-left: 3px;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
