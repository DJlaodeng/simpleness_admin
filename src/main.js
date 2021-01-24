import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 导入请求
import API from "./utils/index";
// 挂载到Vue
Vue.use(API);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import "./assets/scss/reset.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
