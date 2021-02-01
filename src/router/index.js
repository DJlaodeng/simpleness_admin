import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/index",
    redirect: "/home",
    name: "index",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: { name: ["Home"] },
        component: () => import("../views/Home.vue")
      },
      {
        path: "/product",
        name: "product",
        meta: { name: ["商品管理"], btn: ["添加商品"] },
        component: () => import("../views/Shop/Product.vue")
      },
      {
        path: "/detail",
        name: "detail",
        meta: { name: ["商品管理", "商品详情"] },
        component: () => import("../views/Shop/Product/Detail.vue")
      },
      {
        path: "/edit",
        name: "edit",
        meta: { name: ["商品管理", "修改商品"] },
        component: () => import("../views/Shop/Product/Edit.vue")
      },
      {
        path: "/add",
        name: "add",
        meta: { name: ["商品管理", "添加商品"] },
        component: () => import("../views/Shop/Product/Add.vue")
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/Shop/Category.vue")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/Order/Order.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
