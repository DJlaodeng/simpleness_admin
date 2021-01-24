<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator="--">
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb"
};
</script>

<style lang="scss" scoped>
.Breadcrumb {
  .el-breadcrumb {
    font-size: 28px;
    font-weight: bold;
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
}
</style>
