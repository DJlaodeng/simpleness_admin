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
        meta: ["Home"],
        component: () => import("../views/Home.vue")
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../views/Product.vue")
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/Category.vue")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/Order.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
