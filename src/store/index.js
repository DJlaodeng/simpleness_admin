import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { lookId: "", editId: "" },
  mutations: {
    // 商品管理查看的id
    getLookId(state, val) {
      state.lookId = val;
    },
    // 商品管理 修改的id
    getEditId(state, val) {
      state.editId = val;
    }
  },
  actions: {},
  modules: {},
  plugins: [
    //会自动保存创建的状态。刷新还在
    //storage:存储方式。（sessionStorage,localStarage）
    //key:定义本地存储中的key
    createPersistedState({
      storage: sessionStorage,
      key: ""
    })
  ]
});
