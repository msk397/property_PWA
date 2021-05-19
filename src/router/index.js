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
        path: "/user/dashboard",
        name: "user-dashboard",
        meta:{
          title: '物业管理系统-管理员首页'
        },
        component: () =>
            import("../views/UserPage/UserDashboard"),
      },
      {
        path: "/user/people",
        name: "user-people",
        meta:{
          title: '物业管理系统-人员管理'
        },
        component: () =>
            import("../views/UserPage/people"),
        children:[
          {
            path: "/user/people/adminmess",
            name: "user-people-mess",
            meta:{
              title: '物业管理系统-员工管理'
            },
            component: () =>
                import("../views/UserPage/mess"),
          },
          {
            path: "/user/people/custmess",
            name: "user-people-custmess",
            meta:{
              title: '物业管理系统-业主信息'
            },
            component: () =>
                import("../views/UserPage/custmess"),
          },
        ],
      },
      {
        path: "/user/other",
        name: "user-other",
        meta:{
          title: '物业管理系统-其他事务'
        },
        component: () =>
            import("../views/UserPage/other"),
        children:[
          {
            path: "/user/other/charge",
            name: "user-other-charge",
            meta:{
              title: '物业管理系统-缴费管理'
            },
            component: () =>
                import("../views/UserPage/charge"),
          }, {
            path: "/user/other/fix",
            name: "user-other-fix",
            meta:{
              title: '物业管理系统-报修管理'
            },
            component: () =>
                import("../views/UserPage/fix"),
          },{
            path: "/user/other/poster",
            name: "user-other-poster",
            meta:{
              title: '物业管理系统-公告管理'
            },
            component: () =>
                import("../views/UserPage/poster"),
          },
        ],
      },
      {
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
      },{
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
      {
        path: "/user/custmess",
        name: "user-custmess",
        meta:{
          title: '物业管理系统-业主信息'
        },
        component: () =>
            import("../views/UserPage/custmess"),
      },
    ]
  },{
    path: "/cust",
    component: () => import("../views/CustPage/Cust"),
    children: [
      {
        path: "/cust/dashboard",
        name: "cust-dashboard",
        meta:{
          //
          title: '物业管理系统-业主首页'
        },
        component: () =>
            import("../views/CustPage/CustDashboard"),
      },
      {
        path: "/cust/charge",
        name: "cust-charge",
        meta:{
          //
          title: '物业管理系统-缴费'
        },
        component: () =>
            import("../views/CustPage/CustCharge"),
      },
      {
        path: "/cust/fix",
        name: "cust-fix",
        meta:{
          //
          title: '物业管理系统-报修'
        },
        component: () =>
            import("../views/CustPage/CustFix"),
      },
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
