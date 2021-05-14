import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Sign-in"),
    meta:{
      title: '物业管理系统-登录'
    }
  },
  {
    path: "/user",
    component: () => import("../views/UserPage/user"),
    children: [
      {
        path: "/user",
        name: "user-dashboard",
        meta:{
          title: '物业管理系统-管理员首页'
        },
        component: () =>
            import("../views/UserPage/UserDashboard"),
      }, {
        path: "/user/charge",
        name: "user-charge",
        meta:{
          title: '物业管理系统-缴费管理'
        },
        component: () =>
            import("../views/UserPage/charge"),
      }, {
        path: "/user/fix",
        name: "user-fix",
        meta:{
          title: '物业管理系统-报修管理'
        },
        component: () =>
            import("../views/UserPage/fix"),
      }, {
        path: "/user/custmess",
        name: "user-custmess",
        meta:{
          title: '物业管理系统-业主信息'
        },
        component: () =>
            import("../views/UserPage/custmess"),
      }, {
        path: "/user/poster",
        name: "user-poster",
        meta:{
          title: '物业管理系统-公告管理'
        },
        component: () =>
            import("../views/UserPage/poster"),
      },
      {
        path: "/user/adminmess",
        name: "user-mess",
        meta:{
          title: '物业管理系统-员工管理'
        },
        component: () =>
            import("../views/UserPage/mess"),
      },
    ]
  },{
    path: "/cust",
    component: () => import("../views/CustPage/Cust"),
    children: [
      {
        path: "/cust",
        name: "cust-dashboard",
        meta:{
          //
          title: '物业管理系统-业主首页'
        },
        component: () =>
            import("../views/CustPage/CustDashboard"),
      },
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
