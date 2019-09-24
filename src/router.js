import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      meta:{
        title:'登录'
      },
      component: () =>
        import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta:{
        title:'注册'
      },
      component: () =>
          import("./views/Register.vue")
    },
    {
      path: "/forget",
      name: "forget",
      meta:{
        title:'忘记密码'
      },
      component: () =>
          import("./views/Forget.vue")
    },
    {
      path: "/maillist",
      name: "maillist",
      meta:{
        title:'通讯录'
      },
      component: () =>
          import("./views/Maillist.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      meta:{
        title:'日程管理'
      },
      component: () =>
          import("./views/Calendar.vue")
    },
    {
      path: "/personnel",
      name: "personnel",
      meta:{
        title:'人员信息'
      },
      component: () =>
          import("./views/Personnel.vue")
    },
    {
          path: "/form",
          name: "form",
          meta:{
              title:'分布表单'
          },
          component: () =>
              import("./views/Form.vue")
      },
      {
          path: "/checkform",
          name: "checkform",
          component: () =>
              import("./views/CheckForm.vue")
      },
      {
          path: "/pay",
          name: "pay",
        meta:{
          title:'薪资管理'
        },
          component: () =>
              import("./views/Pay.vue")
      },
    {
      path: "/offer",
      name: "offer",
      meta:{
        title:'offer管理'
      },
      component: () =>
          import("./views/Offer.vue")
    },
    ]
});
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("user");
  if (user) {
    next();
  } else if (to.path === "/login" || to.path === "/register" || to.path === "/forget") {
    next();
  } else {
    next("/login");
  }
  if (to.matched[0].meta.title) {
    document.title = to.matched[0].meta.title;
  }
});
export default router