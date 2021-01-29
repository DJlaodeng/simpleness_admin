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
          <span v-if="scope.row.status == 1">在售</span>
          <span v-if="scope.row.status == 2">已下架</span>
          <el-button
            class="mini"
            size="mini"
            type="warning"
            v-if="scope.row.status == 1"
            >下架</el-button
          >
          <el-button
            class="mini"
            size="mini"
            type="warning"
            v-if="scope.row.status == 2"
            >上架</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="lookClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="editClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
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
      this.tableData = res.data.list;
    },
    // 查询
    onInquire() {
      console.log("submit!");
    },
    // 查看
    lookClick() {},
    // 编辑
    editClick() {}
  }
};
</script>

<style lang="scss" scoped>
.product {
  .mini {
    padding: 5px;
    margin-left: 3px;
  }
}
</style>
