<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    <p>当前商品分类ID：0</p>
    <br />
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="品类ID" width="150"> </el-table-column>
      <el-table-column prop="name" label="品类名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text" size="small"
            >修改名称</el-button
          >
          <el-button type="text" size="small">查看其子品类</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/Breadcrumb";
export default {
  name: "Category",
  components: { Breadcrumb },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    // 获取分类数据
    getCategory() {
      this.$axios.categoryId({ categoryId: 0 }).then(res => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    // 修改名称按钮
    editClick(row) {
      console.log(row);
      this.$prompt("请输入新的品类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.name
      })
        .then(({ value }) => {
          this.$axios
            .editName({
              categoryId: row.id,
              categoryName: value
            })
            .then(res => {
              console.log(res);
              this.getCategory();
              this.$message({
                type: "success",
                message: res.data.data
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// .category{}
</style>
