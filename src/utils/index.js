// 模块接口文件，暴漏给外部模块使用

// 导入核心模块
import { request } from "./core";
// 导入请求方式
import METHODS from "./methods";
// 导入请求接口
import URL from "./url";
import qs from "qs";

const API = {
  // 登录
  login(params) {
    return request(METHODS.POST, URL.LOGIN, qs.stringify(params));
  },
  // 退出
  logout() {
    return request(METHODS.POST, URL.LOGOUT);
  },
  // 商品管理表格数据
  product(params) {
    return request(METHODS.GET, URL.PRODUCT + qs.stringify(params));
  },
  // 商品管理查询
  search(params) {
    return request(METHODS.GET, URL.SEARCH + qs.stringify(params));
  },
  // 商品管理查询
  status(params) {
    return request(METHODS.GET, URL.STATUS + qs.stringify(params));
  },
  // 商品管理查看
  look(params) {
    return request(METHODS.GET, URL.LOOK + qs.stringify(params));
  },
  // 商品管理 查看 分类
  categoryId(params) {
    return request(METHODS.GET, URL.CATEGROYID + qs.stringify(params));
  },

  // 注册
  register() {}
};

export default {
  // 将对象注入到Vue全局
  install(Vue) {
    Vue.prototype.$axios = API;
  }
};
