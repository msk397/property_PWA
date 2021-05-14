import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import * as apexcharts from "./plugins/apexcharts";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'
Vue.use(VueAxios, axios)
Vue.config.productionTip = true;

new Vue({
  vuetify,
  apexcharts,
  router,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

