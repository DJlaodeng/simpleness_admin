<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">{{ form.name }} </el-form-item>
      <el-form-item label="商品描述"> {{ form.subtitle }}</el-form-item>
      <el-form-item label="当前状态">
        <p v-if="form.status == 1">在售</p>
        <p v-if="form.status == 2">已下架</p>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="form.region">
          <el-option label="请选择一级品类"></el-option>
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="form.regions">
          <el-option label="请选择er级品类"></el-option>
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input placeholder="请输入内容" v-model="form.price" disabled>
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input placeholder="请输入内容" v-model="form.stock" disabled>
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <img style="width: 100px; height: 100px" :src="form.imageHost" />
      </el-form-item>
      <el-form-item label="商品详情"
        ><p v-html="form.detail"></p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/Breadcrumb";
export default {
  name: "Detail",
  components: { Breadcrumb },
  data() {
    return {
      form: { region: "", regions: "" },
      category: [],
      categorys: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.look({ productId: this.$store.state.lookId }).then(res => {
        console.log(res);
        this.form = res.data.data;
        console.log(this.form);
        this.$axios.categoryId({ categoryId: 0 }).then(res => {
          console.log(res);
          this.category = res.data.data;
        });
        this.$axios
          .categoryId({ categoryId: this.form.parentCategoryId })
          .then(res => {
            console.log(res);
            this.categorys = res.data.data;
          });
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin-left: 150px;
  .el-input {
    width: 300px;
  }
}
</style>
