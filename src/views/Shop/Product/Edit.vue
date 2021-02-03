<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="form.region" @change="changeOne">
          <el-option label="请选择一级品类"></el-option>
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="form.regions" @change="changeTwo">
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
        <el-input placeholder="请输入内容" type="number" v-model="form.price">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input placeholder="请输入内容" type="number" v-model="form.stock">
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <img style="width: 100px; height: 100px" :src="form.imageHost" />
      </el-form-item>
      <el-form-item label="商品详情">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @focus="onEditorFocus($event)"
          @blur="onEditorBlur($event)"
          @change="onEditorChange($event)"
          class="editor"
        >
        </quill-editor>
        <form
          action
          method="post"
          enctype="multipart/form-data"
          id="uploadFormMulti"
        >
          <input
            style="display: none"
            :id="uniqueId"
            type="file"
            name="file"
            multiple
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="uploadImg('uploadFormMulti')"
          />
        </form>
      </el-form-item>
      <el-form-item> </el-form-item>
      <el-form-item> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/Breadcrumb";
// 富文本样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  ["link", "image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "Edit",
  components: { Breadcrumb, quillEditor },
  data() {
    return {
      form: {
        name: "",
        subtitle: "",
        price: "",
        stock: "",
        region: "",
        categoryvalue: "",
        regions: "",
        categorysvalue: "",
        subImages: "",
        content: ""
      },
      category: [],
      categorys: [],
      uniqueId: "uniqueId",
      // 富文本编辑器默认内容
      content: "",
      editorOption: {
        // 富文本编辑器配置
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: "请输入正文"
      }
    };
  },
  mounted() {
    this.getData();
    var _this = this;
    var imgHandler = async function(image) {
      if (image) {
        var fileInput = document.getElementById(_this.uniqueId); //隐藏的file文本ID
        fileInput.click(); //加一个触发事件
      }
    };
    _this.editor.getModule("toolbar").addHandler("image", imgHandler);
  },
  computed: {
    //当前富文本实例
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    // 一级分类
    changeOne(val) {
      console.log(val);
      this.form.categoryvalue = val;
    },
    // er 级分类
    changeTwo(val) {
      console.log(val);
      // this.form.categorysvalue = val;
    },
    // 提交按钮
    onSubmit() {
      // console.log("submit!");
      this.$axios
        .editSubmit({
          categoryId: this.form.categoryId,
          name: this.form.name,
          subtitle: this.form.subtitle,
          subImages: this.form.subImages,
          detail: this.content,
          price: this.form.price,
          stock: this.form.stock,
          status: this.form.status,
          id: this.form.id
        })
        .then(res => {
          console.log(res);
          this.$router.push("/product");
        });
    },
    // 获取数据
    getData() {
      console.log(this.$store.state.editId);
      this.$axios.look({ productId: this.$store.state.editId }).then(res => {
        console.log(res);
        this.form = res.data.data;
        this.content = res.data.data.detail;
        console.log(this.form);
        console.log(this.form.subImages);
        this.$axios.categoryId({ categoryId: 0 }).then(res => {
          console.log(res);
          this.category = res.data.data;
          this.form.region = this.form.parentCategoryId;
          this.$axios.categoryId({ categoryId: this.form.region }).then(res => {
            console.log(res);
            this.categorys = res.data.data;
            this.form.regions = this.form.categoryId;
          });
        });
      });
    },

    // 准备富文本编辑器
    onEditorReady() {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur() {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus() {},
    // 富文本编辑器 内容改变事件
    onEditorChange() {},
    uploadImg: async function() {
      var _this = this;
      //构造formData对象
      var formData = new FormData();
      formData.append("file", document.getElementById(_this.uniqueId).files[0]);

      try {
        //调用上传文件接口
        this.$http.productapi.uploadImgReq(formData).then(res => {
          //返回上传文件的地址
          let url = res;
          if (url != null && url.length > 0) {
            let Range = _this.editor.getSelection();
            url = url.indexOf("http") != -1 ? url : "http:" + url;
            //上传文件成功之后在富文本中回显(显示)
            _this.editor.insertEmbed(
              Range != null ? Range.index : 0,
              "image",
              url
            );
          } else {
            _this.$message.warning("图片上传失败");
          }
          //成功之后,将文件的文本框的value置空
          document.getElementById(_this.uniqueId).value = "";
        });
      } catch ({ message: msg }) {
        document.getElementById(_this.uniqueId).value = "";
        _this.$message.warning(msg);
      }
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
.editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
