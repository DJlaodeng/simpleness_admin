<template>
  <div class="product">
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 搜索查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region">
          <el-option label="按商品ID查询" value="shanghai"></el-option>
          <el-option label="按商品名称查询" value="beijing"></el-option>
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
      <el-table-column prop="date" label="ID" width="150"> </el-table-column>
      <el-table-column prop="name" label="信息"> </el-table-column>
      <el-table-column prop="address" label="价格"> </el-table-column>
      <el-table-column prop="address" label="状态"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
    <!-- 分页器 -->
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
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
      pageNum: 1
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
    },
    // 查询
    onInquire() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
// .product {
// }
</style>
