<template>
  <section>
    <div class="Breadcrumb">
      <el-breadcrumb separator="--">
        <el-breadcrumb-item
          v-for="(item, index) in $route.meta.name"
          :key="index"
          >{{ item }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-button
      v-if="$route.meta.name.length == 1"
      type="primary"
      icon="el-icon-plus"
      >{{ $route.meta.btn[0] }}</el-button
    >
  </section>
</template>

<script>
export default {
  name: "Breadcrumb"
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.Breadcrumb {
  .el-breadcrumb {
    font-size: 28px;
    font-weight: bold;
  }
}
.el-button {
  float: right;
}
</style>
